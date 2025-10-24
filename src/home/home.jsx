import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Home() {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ title: '', date: '', body: '' });
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

        const updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        setNewEntry({ title: '', date: '', body: '' });

        // Close the modal programmatically
        const modal = window.bootstrap.Modal.getInstance(modalRef.current);
        modal.hide();
    }


  return (
    <main className="flex-fill">
        <div className="title-container">
            <h2 className="title">Your Entries</h2>
        </div>
         <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createEntryModal"
        >
          Create Entry
        </button>
        <div className="button-group">
            <div className="button-container gap-2">
                <label for="button1" className="button1">Create Entry with Typing</label>
                <button id="button1" type="button" className="btn btn-outline-primary button1">Create</button>
            </div>
            <div className="button-container gap-2">
                <label for="button2" className="button2">Create Entry with Third Party Voice to Text</label>
                <button type="button" id="button2" className="btn btn-outline-primary button2">Create</button>
            </div>
        </div>

        <div className="accordion" id="journalAccordion">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Date of Entry 1
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#journalAccordion">
                    <div className="accordion-body">
                        <strong>Title of the Journal Entry</strong> This is the journal entry and all the things they want to write, these will populate from the database.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Date of Entry 2
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#journalAccordion">
                    <div className="accordion-body">
                        <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Date of Entry 3
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#journalAccordion">
                    <div className="accordion-body">
                        <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
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
                Create New Entry
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
              <button type="button" className="btn btn-primary" onClick={handleAddEntry}>
                Save Entry
              </button>
            </div>
          </div>
        </div>
        </div>
    </main>
  );
}