import React from 'react';

const SpeechModal = ({ error, startRecognition, handleModalClose, modalOpen }) => {
  return (
    modalOpen && (
      <div className="modal">
        <div className="modal-content">
          <p>{error || 'Please speak...'}</p>
          {!error && (
            <div className="button-container">
              <button className="start-button" onClick={startRecognition}>Start</button>
              <button className="cancel-button" onClick={handleModalClose}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SpeechModal;
