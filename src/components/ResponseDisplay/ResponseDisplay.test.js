import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResponseDisplay from './ResponseDisplay';

describe('ResponseDisplay', () => {
  it('renders response correctly', () => {
    const responseText = 'This is a test response.';
    const { getByText } = render(<ResponseDisplay response={responseText} />);
    expect(getByText(responseText)).toBeInTheDocument();
  });

  it('renders with dark mode styles', () => {
    const responseText = 'This is a test response.';
    const { getByText } = render(<ResponseDisplay response={responseText} darkMode={true} />);
    const responseElement = getByText(responseText);
    expect(responseElement).toHaveStyle({ color: '#fff' });
  });

  it('calls stopSpeaking when "Stop Speaking" button is clicked', () => {
    const stopSpeaking = jest.fn();
    const { getByText } = render(<ResponseDisplay response="Test response" stopSpeaking={stopSpeaking} />);
    const stopButton = getByText('Stop Speaking');
    fireEvent.click(stopButton);
    expect(stopSpeaking).toHaveBeenCalled();
  });
});
