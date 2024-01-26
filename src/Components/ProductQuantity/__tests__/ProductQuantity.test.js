import '@testing-library/jest-dom';
import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import ProductQuantity from '../ProductQuantity';
describe('ProductQuantity Component', () => {
    it(' disable the "-" button when the index = 0', () => {
      const index = 0;
      render(<ProductQuantity index={index} onChange={() => {}} />);
      const minusButton = screen.getByText('-');
      expect(minusButton).toBeDisabled();
    });
    it(' click the  buttons when the index != 0', () => {
      const index = 2;
      render(<ProductQuantity index={index} onChange={() => {}} />);
      const minusButton = screen.getByText('-');
      fireEvent.click(minusButton)
      const plusBtn = screen.getByText('+');
      fireEvent.click(plusBtn)
      
    });
});
