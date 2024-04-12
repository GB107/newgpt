import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MicModal from './MicModal';

describe('MicModal', () => {
  it('renders correctly with default message', () => {
    const { getByText } = render(<MicModal />);
    expect(getByText('Please speak...')).toBeInTheDocument();
  });

  it('renders correctly with error message', () => {
    const { getByText } = render(<MicModal error="Error message" />);
    expect(getByText('Error message')).toBeInTheDocument();
  });

  it('calls startRecognition when "Start" button is clicked', () => {
    const startRecognition = jest.fn();
    const { getByText } = render(<MicModal startRecognition={startRecognition} />);
    const startButton = getByText('Start');
    fireEvent.click(startButton);
    expect(startRecognition).toHaveBeenCalled();
  });

  it('calls handleModalClose when "Cancel" button is clicked', () => {
    const handleModalClose = jest.fn();
    const { getByText } = render(<MicModal handleModalClose={handleModalClose} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(handleModalClose).toHaveBeenCalled();
  });
});
