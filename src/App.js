import React, { useState, useEffect } from 'react';

import TextEntry from './components/TextEntry/TextEntry';
import ResponseDisplay from './components/ResponseDisplay/ResponseDisplay';
import MicModal from './components/MicModal/MicModal';
import Loader from './components/Loader/Loader';
import { CohereClient } from "cohere-ai";
import  { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'; 

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [listening, setListening] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [searchHistory, setSearchHistory] = useState([])
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

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

      speakText(generatedText);

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
    <div className="app-container">
      {/* <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> */}
      <div className="main-container">
        {window.innerWidth > 700 && (
          <div className="history-container">
            <>
              <h2>Search History:</h2>
              {showHistory && searchHistory.map((item, index) => (
                <div key={index} className="history-item">{item}</div>
              ))}
            </>
          </div>
        )}
        <div className="content-container">
          <h1>Welcome to NEWCHAT</h1>
          <p>Search manually or use the microphone:</p>
          <TextEntry
            darkMode={darkMode}
            inputValue={inputValue}
            handleChange={handleChange}
            handleMicClick={handleMicClick}
            listening={listening}
          />
          <button
            className="submit-button"
            onClick={handleButtonClick}
            disabled={listening} // Disable button while listening
          >
            Submit
          </button>
          {response && !loading && (
            <ResponseDisplay
              response={response}
              loading={loading}
              darkMode={darkMode}
              stopSpeaking={stopSpeaking}
            />
          )}
          {modalOpen && (
            <MicModal
              error={error}
              startRecognition={startRecognition}
              handleModalClose={() => setModalOpen(false)}
            />
          )}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default App;
