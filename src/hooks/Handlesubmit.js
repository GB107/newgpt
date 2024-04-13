import { useState } from 'react';
import { useCohereClient } from './Cohere'; 
import { useLocalStorage } from './useHistory';

const usePredictionHandler = (API_KEY, handleresponse) => {
  const cohereClient = useCohereClient(API_KEY);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const handleSubmit = async (transcript) => {
    try {
      setLoading(true);
      const prediction = await cohereClient.generate({
        prompt: transcript,
        maxTokens: 550,
      });
      const generatedText = prediction.generations[0].text;
      speakText(generatedText);
      handleresponse(generatedText);
      saveToSearchHistory(transcript);
      return generatedText; 
    } catch (error) {
      console.error('Error occurred:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveToSearchHistory = (query) => {
    const updatedHistory = [query, ...searchHistory];
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const speakText = (response) => {
    try {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(response);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error occurred while speaking:', error);
    }
  };

  return { loading, handleSubmit };
};

export default usePredictionHandler;
