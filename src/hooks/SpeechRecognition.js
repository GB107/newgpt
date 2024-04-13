import { useState } from 'react';
import usePredictionHandler from './Handlesubmit';

export const useSpeechRecognitionWithMicModal = ({ handleModalClose ,handleresponse}) => {
  const API_KEY = "zI6TjysqiHhgI13l2l1j2OWMRFPk9fsVo031alKC";
  const { handleSubmit, saveToSearchHistory } = usePredictionHandler(API_KEY, handleresponse);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState('');

  const startRecognition = () => {
    setListening(true);
    setError('');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = async (event) => {
      try {
        const transcript = event.results[0][0].transcript;
        handleSubmit(transcript, handleresponse)
        .then(result => {
          console.log(result, "handleSubmit");
        })
        .catch(error => {
          console.error('Error occurred:', error);
        });
      
        saveToSearchHistory(transcript);
      } catch (error) {
        setError('Error occurred during recognition. Please try again.');
        console.error('Error occurred during recognition:', error);
      }
    };

    recognition.onerror = (event) => {
      setError('Error occurred during recognition. Please try again.');
      console.error('Error occurred during recognition:', event.error);
    };

    recognition.onend = () => {
      setListening(false);
      handleModalClose();
    };
  };

  return { listening, error,startRecognition};
};
