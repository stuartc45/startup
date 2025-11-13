import React from 'react';

export default function EntryButtons() {
  return (
    <div className="button-group">
      <div className="button-container gap-2">
        <label htmlFor="button1" className="button1">Create Entry with Typing</label>
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
        {/* <label htmlFor="button2" className="button2">Create Entry with Third Party Voice to Text</label>
        <button
          type="button"
          id="button2"
          className="btn btn-outline-primary button2"
        >
          Create
        </button> */}
      </div>
    </div>
  );
}
