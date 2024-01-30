
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Home from '../index'
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
        currentStep:1,
        dispatch:jest.fn(),
        checkedState:[true,false],
        currentAddress:0,
        productDetails:{productList:[{
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
            }]},
        successLoader:false,
    }),
  };
});
test('renders Home component without crashing', async () => {
  const container = render(
      <Home />
  );
  expect(container).toMatchSnapshot()
});

