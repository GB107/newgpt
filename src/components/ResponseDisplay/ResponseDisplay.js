import React from 'react';

const ResponseDisplay = ({ response, loading, darkMode, stopSpeaking }) => {
  return (
    <div style={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Response:</h2>
      <p style={{ color: darkMode ? '#fff' : '#000' }}>{response}</p>
      <button
        style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '100%' }}
        onClick={stopSpeaking}
      >
        Stop Speaking
      </button>
    </div>
  );
};

export default ResponseDisplay;
