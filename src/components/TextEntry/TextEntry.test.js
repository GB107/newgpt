import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextEntry from './TextEntry';

describe('TextEntry', () => {
  const handleChange = jest.fn();
  const handleMicClick = jest.fn();

  it('calls handleChange on text input change', () => {
    const darkMode = false;
    const inputValue = '';
    const { getByPlaceholderText } = render(
      <TextEntry darkMode={darkMode} inputValue={inputValue} handleChange={handleChange} handleMicClick={handleMicClick} />
    );
    const textarea = getByPlaceholderText('Enter your text');
    fireEvent.change(textarea, { target: { value: 'New text' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls handleMicClick on microphone button click', () => {
    const darkMode = false;
    const inputValue = '';
    const { getByTestId } = render(
      <TextEntry darkMode={darkMode} inputValue={inputValue} handleChange={handleChange} handleMicClick={handleMicClick} />
    );
    const micIcon = getByTestId('MicIcon');
    fireEvent.click(micIcon.parentElement); // Click the parent element of the MicIcon (the button)
    expect(handleMicClick).toHaveBeenCalled();
  });
});
