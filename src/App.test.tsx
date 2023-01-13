import { createRoot } from 'react-dom/client';
import { screen } from '@testing-library/react';

test('extension is published', () => {
  render(<App />);
  const linkElement = screen.getByText(/A very awesome Step Extension./i);
  expect(linkElement).toBeInTheDocument();
});

root.unmount();


//import React from 'react';
//import { render, screen } from '@testing-library/react';
//import App from './App';

//test('renders learn react link', () => {
//  render(<App />);
//  const linkElement = screen.getByText(/learn react/i);
//  expect(linkElement).toBeInTheDocument();
//});

