import React from 'react';
import TextEntry from './components/TextEntry/TextEntry';
import ResponseDisplay from './components/ResponseDisplay/ResponseDisplay';
import MicModal from './components/MicModal/MicModal';
import Loader from './components/Loader/Loader';
<<<<<<< HEAD
import History from './components/History/History';
=======
import History from './components/History/History'; 
import { useLocalStorage } from './hooks/useHistory'; 
import { useSpeechRecognitionWithMicModal } from './hooks/SpeechRecognition';
import usePredictionHandler from './hooks/Handlesubmit';
import Button from './components/ButtonModal/ButtonModal';
import './App.css';

const API_KEY = "zI6TjysqiHhgI13l2l1j2OWMRFPk9fsVo031alKC"

const App = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleresponse = (text) => {
    setResponse(text);
  };

  const {loading, handleSubmit} = usePredictionHandler(API_KEY, handleresponse); 

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
          <History showHistory={true} />
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
