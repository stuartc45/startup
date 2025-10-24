import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import EntryButtons from './EntryButtons';
import EntryList from './EntryList';
import EntryModal from './entryModal';

export function Home() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', date: '', body: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(storedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  function handleAddEntry() {
    if (!newEntry.title || !newEntry.date || !newEntry.body) {
      alert('Please fill in all fields');
      return;
    }

    let updatedEntries;
    if (isEditing && editIndex !== null) {
      updatedEntries = [...entries];
      updatedEntries[editIndex] = newEntry;
    } else {
      updatedEntries = [...entries, newEntry];
    }

    setEntries(updatedEntries);
    setNewEntry({ title: '', date: '', body: '' });
    setIsEditing(false);
    setEditIndex(null);
  }

  function handleEdit(index) {
    setNewEntry(entries[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function handleDelete(index) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
    }
  }

  return (
    <main className="flex-fill">
      <div className="title-container">
        <h2 className="title">Your Entries</h2>
      </div>

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
