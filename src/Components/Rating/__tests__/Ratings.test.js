import '@testing-library/jest-dom';
import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import Rating from '../index';
describe('ProductQuantity Component', () => {
    it('should render the component with the correct props', () => {
        render(<Rating average={4.5} count={5} />);
        expect(screen.getByText('4.5')).toBeInTheDocument();
      });
})