import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AdressList from '../index';
const props = {
  isSelected: false,
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
};
const mockAddNewAdress = jest.fn();
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      changeCurrentAdress: mockAddNewAdress,
      adressDetails: {
        addressList: [
          {
            isSelected: false,
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
      currentAddress: 1,
    }),
  };
});
describe('AddressList Component', () => {
  it('render component correctly', () => {
    render(<AdressList />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
  });
});
