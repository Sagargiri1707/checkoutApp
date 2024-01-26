import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Reports from '../index';

describe('navbar component', () => {
  it('should render a header ', () => {
   const container= render(<Reports />);
    expect(container).toMatchSnapshot();
  });
});
