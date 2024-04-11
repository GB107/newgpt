// Loader.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders CircularProgress component', () => {
    const { getByTestId } = render(<Loader />);
    const circularProgress = getByTestId('circular-progress');
    expect(circularProgress).toBeInTheDocument();
  });

  it('applies styles correctly', () => {
    const { getByTestId } = render(<Loader />);
    const loader = getByTestId('loader');
    expect(loader).toHaveStyle({ display: 'flex', justifyContent: 'center', marginTop: '20px' });
  });
});
