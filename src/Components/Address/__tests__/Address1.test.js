import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Adress from '../index';

describe('Address Component', () => {
  it('should render address details correctly', () => {
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

    render(<Adress {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.phone)).toBeInTheDocument();
    expect(screen.getByText(props.address)).toBeInTheDocument();
    expect(screen.getByText(props.landmark)).toBeInTheDocument();
    expect(
      screen.getByText(`${props.city} ${props.state}`)
    ).toBeInTheDocument();
    expect(screen.getByText(props.pincode)).toBeInTheDocument();
    screen.getByRole('checkbox').click();
  });
});
