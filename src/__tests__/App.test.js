import React from 'react';
import { act, screen, render } from '@testing-library/react';
import Arch from '../Pages/Architecture';
import App from '../App';
import { MemoryRouter, Routes } from 'react-router-dom';

jest.mock('../Utils', () => ({
  getProductList: () =>
    Promise.resolve({ data: { RESPONSE: { productData: [] } } }),
  getAddressList: () =>
    Promise.resolve({
      data: {
        addressList: [
          {
            isSelected: false,
            isDefault: true,
            index: 0,
            name: 'Sagar',
            city: 'bangalore',
            address: 'hoodi main road',
            isDefault: false,
            landmark: 'central',
            state: 'Bangalore',
            phone: '+911231231231',
            pincode: '12345',
            onChange: jest.fn(),
          },
        ],
      },
    }),
  completePurchase: () =>
    Promise.resolve({ msg: 'successfully purchased item' }),
}));

test('renders App component without crashing', async () => {
  const { getByTestId } = act(() => {
    render(<App />);
  });
  expect(screen).toMatchSnapshot();
});

it('renders Architecture component on /architecture route', async () => {
  const container = act(() => {
    render(
      <MemoryRouter initialEntries={['/architecture']}>
          <Arch />
      </MemoryRouter>
    );
  });
  expect(container).toMatchSnapshot()
});
