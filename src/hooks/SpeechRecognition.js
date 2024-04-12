import { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
export const useSpeechToText = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
  
    return { transcript, resetTranscript };
  };
export const useSpeechRecognitionWithMicModal = (handleSubmit) => {
    const [listening, setListening] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [transcript, setTranscript] = useState('');
  
    const startRecognition = () => {
      setListening(true);
      setError('');
      setModalOpen(true);
  
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.start();
  
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setModalOpen(false);
        handleSubmit(transcript);
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
  
    return { listening, modalOpen, error, transcript, startRecognition, handleModalClose };
  };
  