import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../index';
import { Link } from 'react-router-dom';
jest.mock('react-router-dom', () => {
  const ActualReact = jest.requireActual('react-router-dom');
  return {
    ...ActualReact,
    Link: jest.fn(),
  };
});
describe('navbar component', () => {
  it('should render a header ', () => {
    const container = render(<Navbar />);
    expect(container).toMatchSnapshot();
  });
});
