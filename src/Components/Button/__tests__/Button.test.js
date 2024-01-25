import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../index';

describe('Button Component', () => {
  it('render component correctly', () => {
    const { getByText } = render(<Button text="Click me" />);
      const button = getByText('Click me');  
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled();
      expect(button).toHaveClass('bg-blue-400');
  });
});
