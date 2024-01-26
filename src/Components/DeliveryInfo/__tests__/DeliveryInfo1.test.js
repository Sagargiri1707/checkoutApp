import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import DeliveryInfo from '../index';

describe('DeliveryInfo Component', () => {
    it('should render delivery message with correct time when seconds is greater than 0', () => {
        render(<DeliveryInfo seconds={120} />);
        const deliveryMessage = screen.getByText(/If ordered within 2 minutes/i);
        expect(deliveryMessage).toBeInTheDocument();
      })
      it('should render nothing when seconds is 0', () => {
        render(<DeliveryInfo seconds={0} />);
        const deliveryMessage = screen.queryByText(/If ordered within/i);
        expect(deliveryMessage).not.toBeInTheDocument();
      });
});
