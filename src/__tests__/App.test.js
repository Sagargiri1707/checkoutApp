import React from 'react';
import { render,screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter, Routes ,Route} from 'react-router-dom';
import Architecture from '../Pages/Architecture';
import TestReports from '../Pages/Reports';
import LoaderSVG from '../Constants';
import App from '../App'
import { act } from 'react-dom/test-utils';
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

