import React, { useState, useEffect } from 'react';
import './home.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function Home() {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ title: '', date: '', body: '' });
    const [showModal, setShowModal] = useState(false);

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

        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Date of Entry 1
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
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
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
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
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}