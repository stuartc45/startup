import React from 'react';

export default function EntryList({ entries, onEdit, onDelete }) {
  return (
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
                    onClick={() => onEdit(index)}
                    data-bs-toggle="modal"
                    data-bs-target="#createEntryModal"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => onDelete(index)}
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
  );
}
