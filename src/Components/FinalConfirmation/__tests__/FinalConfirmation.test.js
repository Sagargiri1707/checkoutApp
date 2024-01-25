import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import FinalConfirmation from '../index';
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
      productDetails: {
        productData: [
          {
            itemPrice: {
              originalPrice: 10,
              discountedPrice: 8,
            },
            quantity: 1,
          },
        ],
      },
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
      checkedState: [true],
      currentAddress: 0,
    }),
  };
});
describe('final conformation Component', () => {
  it('render component correctly', () => {
    render(<FinalConfirmation />);
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Product Price:')).toBeInTheDocument();
    expect(screen.getByText('₹10.00')).toBeInTheDocument();
    expect(screen.getByText('₹2.00')).toBeInTheDocument();
    expect(screen.getByText('₹8.00')).toBeInTheDocument();
  });
});
