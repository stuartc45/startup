import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Home() {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ title: '', date: '', body: '' });
    const modalRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

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
            // update the existing entry
            updatedEntries = [...entries];
            updatedEntries[editIndex] = newEntry;
        } else {
            // add a new entry
            updatedEntries = [...entries, newEntry];
        }

        setEntries(updatedEntries);
        setNewEntry({ title: '', date: '', body: '' });
        setIsEditing(false);
        setEditIndex(null);

        // Close the modal programmatically
        // const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        
        // modal.hide();
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
         
        <div className="button-group">
            <div className="button-container gap-2">
                <label for="button1" className="button1">Create Entry with Typing</label>
                <button
                id="button1"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createEntryModal"
        >
          Create Entry
        </button>
            </div>
            <div className="button-container gap-2">
                <label for="button2" className="button2">Create Entry with Third Party Voice to Text</label>
                <button type="button" id="button2" className="btn btn-outline-primary button2">Create</button>
            </div>
        </div>

        <div className="accordion" id="journalAccordion">
        {entries.length === 0 ? (
          <p className="text-muted">No journal entries yet. Create one above!</p>
        ) : (
          entries.map((entry, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {entry.title} — {entry.date}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#journalAccordion"
              >
                <div className="accordion-body">
                    <p>{entry.body}</p>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleEdit(index)}
                        >
                        Edit
                        </button>
                        <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(index)}
                        >
                        Delete
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
        <div
        className="modal fade"
        id="createEntryModal"
        tabIndex="-1"
        aria-labelledby="createEntryModalLabel"
        aria-hidden="true"
        ref={modalRef}
        >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createEntryModalLabel">
                {isEditing ? 'Edit Entry' : 'Create New Entry'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 text-start">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newEntry.title}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, title: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 text-start">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={newEntry.date}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, date: e.target.value })
                  }
                />
              </div>
              <div className="mb-3 text-start">
                <label>Body</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={newEntry.body}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, body: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleAddEntry}
                >
                {isEditing ? 'Save Changes' : 'Save Entry'}
            </button>
            </div>
          </div>
        </div>
        </div>
    </main>
  );
}