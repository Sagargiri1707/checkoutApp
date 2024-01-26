import React from 'react';
import { render, waitFor, fireEvent,act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import {GlobalAppContext} from '../Context/Context'
import App from '../App'
jest.mock('../Utils', () => ({
  getProductList: jest.fn(() => Promise.resolve({ data: { RESPONSE: { productData: [] } } })),
  getAddressList: jest.fn(() => Promise.resolve({ data: { addressList: [] } })),
  completePurchase: jest.fn(() => Promise.resolve({ msg: 'successfully purchased item' })),
}));

test('renders App component without crashing', async () => {
  const { getByTestId } = render(
    <Router>
      <App />
    </Router>
  );
  expect(screen).toMatchSnapshot()
});
    it('should call changeCheckedState function when invoked', () => {
        const container = render(
            <App />
        );
      });

