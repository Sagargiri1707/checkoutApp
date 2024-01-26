import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Architecture from '../Architecture';

describe('navbar component', () => {
  it('should render a header ', () => {
    render(<Architecture />);
    expect(screen).toMatchSnapshot();
  });
});
