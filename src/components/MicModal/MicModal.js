import React from 'react';

const MicModal = ({ error, startRecognition, handleModalClose }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
        <p>{error || 'Please speak...'}</p>
        {!error && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={{ margin: '5px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }} onClick={startRecognition}>Start</button>
            <button style={{ margin: '5px', padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }} onClick={handleModalClose}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MicModal;
