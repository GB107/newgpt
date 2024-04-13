import React from 'react';
import Button from '../ButtonModal/ButtonModal';

const ResponseDisplay = ({ response,darkMode}) => {
  
  const stopSpeaking = () => {
    console.log('stop speaking');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };
  
  return (
    <div style={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Response:</h2>
      <p style={{ color: darkMode ? '#fff' : '#000' }}>{response}</p>
      <Button 
      children={'Stop Speaking'}
      bg={'red'}
      onClick={stopSpeaking}/>
    </div>
  );
};

export default ResponseDisplay;
