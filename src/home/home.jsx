
import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import EntryButtons from './EntryButtons';
import EntryList from './EntryList';
import EntryModal from './entryModal';
import { initWebSocket, onMessage, sendMessage } from './wsClient';
import DeviceStatus from './deviceStatus';

export function Home() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', date: '', body: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const modalRef = useRef(null);
  const [multiDevice, setMultiDevice] = useState(false);

  useEffect(() => {
    // Load cached entries first (instant UI)
    const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(stored);

    // Then update with backend entries
    fetch('/api/entries')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          // console.log("true");
        setEntries(data);
      } else if (data.entries) {
        // console.log("false");
        setEntries(data.entries);
      } else {
        console.error("Unexpected data format:", data);
      }
        localStorage.setItem('journalEntries', JSON.stringify(data));
      })
      .catch(err => console.error(err));
  }, []);

  // Initialize WebSocket
  useEffect(() => {
    initWebSocket();

    // Receive messages from other devices
    onMessage((msg) => {
      if (msg.type === "connected") {
        alert("Another device connected.");
        setMultiDevice(true);
      }

      if (msg.type === "entry-created") {
        setEntries((prev) => [...prev, msg.entry]);
      }

      if (msg.type === "entry-updated") {
        setEntries((prev) =>
          prev.map((e) => (e.id === msg.entry.id ? msg.entry : e))
        );
      }

      if (msg.type === "entry-deleted") {
        setEntries((prev) => prev.filter((e) => e.id !== msg.id));
      }
    });
  }, []);



async function handleAddEntry() {
  if (!newEntry.title || !newEntry.date || !newEntry.body) {
    alert('Please fill in all fields');
    return;
  }

  try {
    let updatedEntries;

    if (isEditing && editIndex !== null) {
      // ✅ Editing an existing entry
      const entryToUpdate = entries[editIndex];

      const response = await fetch(`/api/entry`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) throw new Error('Failed to update entry');

      const updatedEntry = await response.json();
      // console.log("updated entry");
      // console.log(updatedEntry);
      updatedEntries = [...entries];
      updatedEntries[editIndex] = updatedEntry;
      sendMessage({ type: "entry-updated", entry: updatedEntry });
    } else {
      // ✅ Creating a new entry
      const response = await fetch('/api/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) throw new Error('Failed to create entry');

      const savedEntry = await response.json();
      // console.log("about to add entry");
      // console.log(savedEntry);
      // setEntries(savedEntry);
      updatedEntries = [...entries, savedEntry];
      sendMessage({ type: "entry-created", entry: savedEntry });

    }

    // Update local state
    setEntries(updatedEntries);
    setNewEntry({ title: '', date: '', body: '' });
    setIsEditing(false);
    setEditIndex(null);
  } catch (err) {
    console.error(err);
    alert('Error saving entry');
  }
}

  function handleEdit(index) {
    setNewEntry(entries[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  async function handleDelete(index) {
    const entryToDelete = entries[index];

    if (!entryToDelete) {
      alert('Could not find entry to delete.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/entry/${entryToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
      sendMessage({ type: "entry-deleted", id: entryToDelete.id });
    } catch (err) {
      console.error(err);
      alert('Error deleting entry');
    }
  }

  return (
    <main className="flex-fill">
      <div className="title-container">
        <h2 className="title">Your Entries</h2>
      </div>

      <DeviceStatus multiDevice={multiDevice} />
      <EntryButtons />

      <EntryList
        entries={entries}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EntryModal
        modalRef={modalRef}
        isEditing={isEditing}
        newEntry={newEntry}
        setNewEntry={setNewEntry}
        onAddEntry={handleAddEntry}
      />
    </main>
  );
}
