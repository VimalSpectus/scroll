import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('First see the Data Show Components whele we check table head is show or not', () => {
  render(<App />);
  const aboutAnchorNode = screen.getByText(/DATA SHOW/i)
  expect(aboutAnchorNode).toBeInTheDocument();
  const title = screen.getByText(/Title/i)
  expect(title).toBeInTheDocument();
});

test('second we put id in main container', () => {
  render(<App />);
 const element = screen.getByTestId('custom-element')
 expect(element).toBeInTheDocument();
});

test('third  we check click in object',  () => {
  render(<App />);
});

