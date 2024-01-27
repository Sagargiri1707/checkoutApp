import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddNewAdress from '../index';
import { toast } from 'react-toastify';
const mockAddNewAdress = jest.fn();
let mockJestFn = jest.fn();

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      addNewAdress: mockAddNewAdress,
      dispatch: mockJestFn,
      adressDetails: { addressList: [] },
    }),
  };
});

describe('AddNewAdress Component', () => {
  it('renders correctly', () => {
    render(<AddNewAdress />);
    expect(screen.getByText('Instead Add a new Address')).toBeInTheDocument();
  });

  it('allows user to add a new address', () => {
    render(<AddNewAdress />);

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText('Name (reqd)'), {
      target: { value: 'sagar' },
    });
    fireEvent.change(screen.getByLabelText('Adress (reqd)'), {
      target: { value: 'bangalore' },
    });
    fireEvent.change(screen.getByLabelText('Phone number (reqd)'), {
      target: { value: '+918900922442' },
    });
    fireEvent.change(screen.getByLabelText('City (reqd)'), {
      target: { value: 'bangalore' },
    });
    fireEvent.change(screen.getByLabelText('State (reqd)'), {
      target: { value: 'karnatka' },
    });
    fireEvent.change(screen.getByLabelText('Pincode (reqd)'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText('Add New Address'));
    expect(mockJestFn).toHaveBeenCalledWith({
      payload: {
        addressList: [
          {
            isDefault: false,
            landmark: '',
            locationTypeTag: 'Others',
            name: 'sagar',
            address: 'bangalore',
            phone: '+918900922442',
            state: 'karnatka',
            city: 'bangalore',
            pincode: '123456',
          },
        ],
      },
      type: 'SET_ADDRESS_DATA',

    });
  });

  it('displays an error message for invalid phone number', async () => {
    const toastErrorMock = jest.spyOn(toast, 'error');
    render(<AddNewAdress />);

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText('Name (reqd)'), {
      target: { value: 'sagar' },
    });
    fireEvent.change(screen.getByLabelText('Adress (reqd)'), {
      target: { value: 'bangalore' },
    });
    fireEvent.change(screen.getByLabelText('City (reqd)'), {
      target: { value: 'bangalore' },
    });
    fireEvent.change(screen.getByLabelText('State (reqd)'), {
      target: { value: 'karnatka' },
    });
    fireEvent.change(screen.getByLabelText('Pincode (reqd)'), {
      target: { value: '126' },
    });
    fireEvent.change(screen.getByLabelText(/Phone number/i), {
      target: { value: '1231231231' },
    });
    fireEvent.click(screen.getByText('Add New Address'));
    expect(toastErrorMock).toHaveBeenCalledWith('Invalid Phone number given');
  });
  it('displays an error message for invalid pincode ', async () => {
    const toastErrorMock = jest.spyOn(toast, 'error');
    render(<AddNewAdress />);

    fireEvent.click(screen.getByText('+'));
    fireEvent.change(screen.getByLabelText('Name (reqd)'), {
      target: { value: 'sagar' },
    });
    fireEvent.change(screen.getByLabelText('Adress (reqd)'), {
      target: { value: 'bangalore' },
    });
    fireEvent.change(screen.getByLabelText('City (reqd)'), {
      target: { value: 'bangalore' },
    });
    fireEvent.change(screen.getByLabelText('State (reqd)'), {
      target: { value: 'karnatka' },
    });
    fireEvent.change(screen.getByLabelText('Pincode (reqd)'), {
      target: { value: 'asdfasd' },
    });
    fireEvent.change(screen.getByLabelText(/Phone number/i), {
      target: { value: '9876988690' },
    });
    fireEvent.click(screen.getByText('Add New Address'));
    expect(toastErrorMock).toHaveBeenCalledWith('Invalid pin code given');
  });
});
