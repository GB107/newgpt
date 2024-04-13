import React, { useState, useEffect } from 'react';
import TextEntry from './components/TextEntry/TextEntry';
import ResponseDisplay from './components/ResponseDisplay/ResponseDisplay';
import MicModal from './components/MicModal/MicModal';
import Loader from './components/Loader/Loader';
import './App.css';
import { useLocalStorage } from './hooks/useHistory';
import { useSpeechRecognitionWithMicModal } from './hooks/SpeechRecognition';
import usePredictionHandler from './hooks/Handlesubmit';
import Button from './components/ButtonModal/ButtonModal';

const API_KEY = "zI6TjysqiHhgI13l2l1j2OWMRFPk9fsVo031alKC"

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [showHistory, setShowHistory] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const handleresponse = (text) => {
    setResponse(text);
  };

  const {loading, handleSubmit} = usePredictionHandler(API_KEY, handleresponse);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, [setSearchHistory]); 

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleMicClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const { listening} = useSpeechRecognitionWithMicModal(handleModalClose,handleresponse);

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
            handleMicClick={handleMicClick}
            listening={listening}
            inputValue={inputValue}
            handleChange={handleChange}
          />
          <Button
            children={"submit"}
            className="submit-button"
            onClick={() => handleSubmit(inputValue, handleresponse)}
            disabled={listening || loading}
          />
          {loading && <Loader />}
          {response && !loading && (
            <ResponseDisplay
              response={response}
            />
          )}
          {modalOpen && (
            <MicModal
              handleModalClose={handleModalClose}
              handleresponse={handleresponse}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
