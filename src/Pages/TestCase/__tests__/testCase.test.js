import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TestCase from '../index';

describe('navbar component', () => {
  it('should render a header ', () => {
    render(<TestCase />);
    expect(screen).toMatchSnapshot();
  });
});
