import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import MicIcon from '@mui/icons-material/Mic';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Textarea from '@mui/joy/Textarea';
import { CohereClient } from "cohere-ai";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const API_KEY = process.env.REACT_APP_API_KEY;

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <CircularProgress />
    </Box>
  );
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [listening, setListening] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(true); // New state to control history block visibility

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveToSearchHistory = (query) => {
    const updatedHistory = [query, ...searchHistory];
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const cohere = new CohereClient({
    token: API_KEY,
  });

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMicClick = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser.');
      return;
    }

    setModalOpen(true);
  };

  const startRecognition = () => {
    setListening(true);
    setError('');

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      console.log('Text from voice:', transcript);
      setModalOpen(false);
      handleButtonClick(transcript);

    };

    recognition.onerror = (event) => {
      setError('Error occurred during recognition. Please try again.');
      console.error('Error occurred during recognition:', event.error);
      setModalOpen(false);
    };

    recognition.onend = () => {
      setListening(false);
      setModalOpen(false);
    };
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = async (inputValue) => {
    try {
      console.log(`API_KEY: ${API_KEY}`);
      setLoading(true);
      const prediction = await cohere.generate({
        prompt: inputValue,
        maxTokens: 550,
      });

      console.log("Received prediction", prediction);
      const generatedText = prediction.generations[0].text;
      setResponse(generatedText);
      setIsSpeaking(true);
      setSpokenText(generatedText);

      speakText(generatedText); // Speak the generated text

      saveToSearchHistory(inputValue);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const stopSpeaking = () => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '999' }}>
        {darkMode ? (
          <LightModeIcon style={{ fontSize: '30px', cursor: 'pointer' }} onClick={toggleDarkMode} />
        ) : (
          <DarkModeIcon style={{ fontSize: '30px', cursor: 'pointer' }} onClick={toggleDarkMode} />
        )}
      </div>
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'flex-start', backgroundColor: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#000' }}>
        {window.innerWidth > 700 && (
          <div style={{ flex: '1', maxWidth: '500px', minHeight:'100vh', padding: '20px', borderRight: '1px solid #ccc', overflowY: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', borderRadius: '10px', display: window.innerWidth > 600 && window.innerHeight > 700 ? 'block' : 'none' }}>
            {/* Show history only if not in mobile view */}
            <>
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Search History:</h2>
              {showHistory && searchHistory.map((item, index) => (
                <div key={index} style={{ textAlign: 'right', marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: darkMode ? '#333' : '#f9f9f9' }}>{item}</div>
              ))}
            </>
          </div>
        )}
        <div style={{ flex: '1', maxWidth: '600px', padding: '20px', marginLeft: '12%' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to NEWCHAT</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>Search manually or use the microphone:</p>
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
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={handleMicClick}
              disabled={listening}
            >
              {listening ? 'Listening...' : <MicIcon />}
            </button>
          </div>
          <button
            style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '100%' }}
            onClick={handleButtonClick}
          >
            Submit
          </button>
          {response && !loading && (
            <div style={{ marginTop: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
              <h2 style={{ textAlign: 'center' }}>Response:</h2>
              <p>{response}</p>
              <button
                style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', width: '100%' }}
                onClick={stopSpeaking}
              >
                Stop Speaking
              </button>
            </div>
          )}
          {modalOpen && (
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
          )}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default App;
