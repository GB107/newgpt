import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to NEWCHAT')).toBeInTheDocument();
    expect(getByText('Search manually or use the microphone:')).toBeInTheDocument();
  });

  test('calls handleMicClick when microphone button is clicked', async () => {
    const { getByRole } = render(<App />);
    const micButton = getByRole('button', { name: 'Microphone' });
    fireEvent.click(micButton);
    await waitFor(() => expect(getByRole('dialog')).toBeInTheDocument());
  });

  test('updates input value when typing', () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText('Enter your text');
    fireEvent.change(input, { target: { value: 'Test input' } });
    expect(input.value).toBe('Test input');
  });

  test('calls handleButtonClick when submit button is clicked', () => {
    const { getByText } = render(<App />);
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    // You can add assertions related to the expected behavior after clicking the submit button
  });

  test('displays response when response is received', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Enter your text');
    const submitButton = getByText('Submit');
    fireEvent.change(input, { target: { value: 'Test input' } });
    fireEvent.click(submitButton);

    // Assuming response is displayed in the component once received,
    // you can check for the response text here
    await waitFor(() => expect(getByText('Example response')).toBeInTheDocument());
  });

  test('stops speaking when stopSpeaking is called', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Enter your text');
    const submitButton = getByText('Submit');
    fireEvent.change(input, { target: { value: 'Test input' } });
    fireEvent.click(submitButton);

    // Assuming there's a "Stop Speaking" button in the ResponseDisplay component
    const stopSpeakingButton = getByText('Stop Speaking');
    fireEvent.click(stopSpeakingButton);

    // You can add assertions related to the expected behavior after stopping speaking
  });

  // Add more tests as needed for other functionalities
});
