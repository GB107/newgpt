import React from 'react';
import Textarea from '@mui/joy/Textarea';
import MicIcon from '@mui/icons-material/Mic';

const TextEntry = ({ darkMode, inputValue, handleChange, handleMicClick, listening }) => {
  return (
    <div style={{ position: 'relative' }}>
      <Textarea
        placeholder="Enter your text"
        value={inputValue}
        onChange={handleChange}
        sx={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '16px',
          backgroundColor: darkMode ? '#333' : '#fff',
          color: darkMode ? '#fff' : '#000',
          border: '1px solid #ccc',
          resize: 'vertical',
        }}
      />
      <button
        role="button" // Add role attribute
        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={handleMicClick}
        disabled={listening}
        aria-label={listening ? 'Listening' : 'Start voice input'}
      >
        {listening ? 'Listening...' : <MicIcon />}
      </button>
    </div>
  );
};

export default TextEntry;
