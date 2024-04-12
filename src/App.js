import React, { useState, useEffect } from 'react';
import TextEntry from './components/TextEntry/TextEntry';
import ResponseDisplay from './components/ResponseDisplay/ResponseDisplay';
import MicModal from './components/MicModal/MicModal';
import Loader from './components/Loader/Loader';
import './App.css';
import { useLocalStorage } from './hooks/useHistory';
import { useCohereClient } from './hooks/Cohere';
import { useSpeechRecognitionWithMicModal } from './hooks/SpeechRecognition';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);
  const cohereClient = useCohereClient(API_KEY);
  
  const handleSubmit = async (transcript) => {
    try {
      setLoading(true);
      const prediction = await cohereClient.generate({
        prompt: transcript,
        maxTokens: 550,
      });

      const generatedText = prediction.generations[0].text;
      setResponse(generatedText);
      speakText(generatedText);
      saveToSearchHistory(transcript);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const { listening, modalOpen, error, transcript, startRecognition, handleModalClose } = useSpeechRecognitionWithMicModal(handleSubmit);

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

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  const stopSpeaking = () => {
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.cancel();
    // setIsSpeaking(false);
  };

  return (
    <div className="app-container">
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
            inputValue={inputValue}
            handleChange={handleChange}
            handleMicClick={startRecognition}
            listening={listening}
          />
          <button
            className="submit-button"
            onClick={() => handleSubmit(inputValue)}
            disabled={listening} 
          >
            Submit
          </button>
          {response && !loading && (
            <ResponseDisplay
              response={response}
              loading={loading}
              stopSpeaking={stopSpeaking}
            />
          )}
          {modalOpen && (
            <MicModal
              error={error}
              handleModalClose={handleModalClose}
            />
          )}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default App;
