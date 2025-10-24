import React from 'react';

export default function EntryModal({ modalRef, isEditing, newEntry, setNewEntry, onAddEntry }) {
  return (
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
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              />
            </div>

            <div className="mb-3 text-start">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              />
            </div>

            <div className="mb-3 text-start">
              <label>Body</label>
              <textarea
                className="form-control"
                rows="4"
                value={newEntry.body}
                onChange={(e) => setNewEntry({ ...newEntry, body: e.target.value })}
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
              onClick={onAddEntry}
            >
              {isEditing ? 'Save Changes' : 'Save Entry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
