import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Product from '../index';
const props={
    "id":151,
          "media": {
            "type":"image",
            "url": "http://rukmini1.flixcart.com/image/224/224/xif0q/stuffed-toy/r/v/u/extra-large-unicorn-stuffed-toy-animal-unicorn-soft-toys-for-original-imagv4bgwc5jhphr.jpeg?q=90"
                  
          },
          "quantity": 1,
          "ratingValue": {
              "type": "RatingValue",
              "average": 4.1,
              "base": 5,
              "count": 506,
              "roundOffCount": "506"
          },
          "titles": {
              "subtitle": "Purple & Pink",
              "title": "Macros Extra Large Unicorn Stuffed toy Animal Unicorn Soft Toys for Girls, Teddy Bear  - 100 cm"
          },
          "deliveryDetails":{
              "eta":"29 Jan 2024",
              "deliveryCharge":"Rs 40",
              "isdeliveryChargeWaived":true,
              "isFasterDeliveryAvailable": true,
              "time": 6300
          },
          "sellerDetails":{
              "name":"Muskaan seller"
          },
          "itemPrice":{
              "originalPrice":999.00,
              "discountedPrice":199.00,
              "percentageOff": 80,
              "offersAvailable":{
                  "count":3
              }
          }
      }
const props2={
    "id":151,
          "media": {
            "type":"video",
            "url": "http://rukmini1.flixcart.com/image/224/224/xif0q/stuffed-toy/r/v/u/extra-large-unicorn-stuffed-toy-animal-unicorn-soft-toys-for-original-imagv4bgwc5jhphr.jpeg?q=90"
                  
          },
          "quantity": 1,
          "ratingValue": {
              "type": "RatingValue",
              "average": 4.1,
              "base": 5,
              "count": 506,
              "roundOffCount": "506"
          },
          "titles": {
              "subtitle": "Purple & Pink",
              "title": "Macros Extra Large Unicorn Stuffed toy Animal Unicorn Soft Toys for Girls, Teddy Bear  - 100 cm"
          },
          "deliveryDetails":{
              "eta":"29 Jan 2024",
              "deliveryCharge":"Rs 40",
              "isdeliveryChargeWaived":false,
              "isFasterDeliveryAvailable": true,
              "time": 6300
          },
          "sellerDetails":{
              "name":"Muskaan seller"
          },
          "itemPrice":{
              "originalPrice":999.00,
              "discountedPrice":199.00,
              "percentageOff": 80,
              "offersAvailable":{
                  "count":0
              }
          }
      }
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
        checkedState:[true], 
        changeCheckedState:jest.fn() ,
         addOrDeleteItem :jest.fn(),
         dispatch:jest.fn()
    }),
  };
});
describe('product Component', () => {
    it('render component correctly', () => {
      render(<Product {...props}/>);
      expect(screen.getByText('Purple & Pink')).toBeInTheDocument();
      expect(screen.getByText('Muskaan seller')).toBeInTheDocument();
      expect(screen.getByText('₹999')).toBeInTheDocument();
      expect(screen.getByText('₹199.00')).toBeInTheDocument();
      expect(screen.getByText('80% off')).toBeInTheDocument();
      expect(screen.getByText('Delivery by 29 Jan 2024')).toBeInTheDocument();
      expect(screen.getByText('4.1')).toBeInTheDocument();
      expect(screen.getByText('3 offers available')).toBeInTheDocument();

      expect(screen.getByText('506 reviews')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); 
        (screen.getByText("Delete")).click()
    });
    it('render component correctly', () => {
        render(<Product {...props2}/>);
        expect(screen.getByText('Purple & Pink')).toBeInTheDocument();
        expect(screen.getByText('Muskaan seller')).toBeInTheDocument();
        expect(screen.getByText('₹999')).toBeInTheDocument();
        expect(screen.getByText('₹199.00')).toBeInTheDocument();
        expect(screen.getByText('80% off')).toBeInTheDocument();
        expect(screen.getByText('Delivery by 29 Jan 2024')).toBeInTheDocument();
        expect(screen.getByText('4.1')).toBeInTheDocument();
        expect(screen.getByText('506 reviews')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();  
        screen.getByRole("checkbox").click()
      });
  });