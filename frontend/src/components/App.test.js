import React from 'react';
import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders learn react link', () => {
  render( 
    <BrowserRouter> 
      <App /> 
    </BrowserRouter> 
  );
  const buttonElement = screen.getByRole('button', { name: /inicia sesión/i });
  expect(buttonElement).toBeInTheDocument();
});
