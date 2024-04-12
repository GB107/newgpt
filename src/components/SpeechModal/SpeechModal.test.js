import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SpeechModal from './SpeechModal';

describe('SpeechModal', () => {
  it('renders correctly with default message', () => {
    const { queryByText } = render(<SpeechModal modalOpen={true} />);
    expect(queryByText('Please speak...')).toBeInTheDocument();
  });

  it('renders correctly with error message', () => {
    const { queryByText } = render(<SpeechModal modalOpen={true} error="Error message" />);
    expect(queryByText('Error message')).toBeInTheDocument();
  });

  it('calls startRecognition when "Start" button is clicked', () => {
    const startRecognition = jest.fn();
    const { getByText } = render(<SpeechModal modalOpen={true} startRecognition={startRecognition} />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    expect(startRecognition).toHaveBeenCalled();
  });

  it('calls handleModalClose when "Cancel" button is clicked', () => {
    const handleModalClose = jest.fn();
    const { getByText } = render(<SpeechModal modalOpen={true} handleModalClose={handleModalClose} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(handleModalClose).toHaveBeenCalled();
  });

  it('does not render when modalOpen is false', () => {
    const { container } = render(<SpeechModal modalOpen={false} />);
    expect(container.firstChild).toBeNull();
  });
});
