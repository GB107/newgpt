import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('./hooks/useHistory', () => ({
  useLocalStorage: jest.fn(() => [['history item 1', 'history item 2'], jest.fn()]),
}));

jest.mock('./hooks/Cohere', () => ({
  useCohereClient: jest.fn(() => ({
    generate: jest.fn(() => ({
      generations: [{ text: 'Generated response' }],
    })),
  })),
}));

jest.mock('./hooks/SpeechRecognition', () => ({
  useSpeechRecognitionWithMicModal: jest.fn(() => ({
    listening: false,
    modalOpen: false,
    error: null,
    transcript: '',
    startRecognition: jest.fn(),
    handleModalClose: jest.fn(),
  })),
}));


window.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
};

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('handles input change', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter your text'); 
    fireEvent.change(input, { target: { value: 'Test input' } });
    expect(input.value).toBe('Test input');
  });

  it('submits input value when "Submit" button is clicked', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText('Enter your text');
    fireEvent.change(input, { target: { value: 'Test input' } });
    const submitButton = getByText('Submit');

  });


});
