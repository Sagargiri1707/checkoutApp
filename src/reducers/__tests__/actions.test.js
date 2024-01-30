import {
  changeCheckedState,
  changeCurrentStep,
  changeCurrentAdress,
  addNewAdress,
  purchaseItem,
  addOrDeleteItem,
} from '../Actions';
import * as Constants from '../ActionConstants';
jest.mock('../../Utils', () => ({
  completePurchase: () =>
    Promise.resolve({ msg: 'successfully purchased item' }),
}));
import { act } from 'react-dom/test-utils';
const props={ productData: [
  {
    id: 151,
    media: {
      type: 'image',
      url: 'http://rukmini1.flixcart.com/image/224/224/xif0q/stuffed-toy/r/v/u/extra-large-unicorn-stuffed-toy-animal-unicorn-soft-toys-for-original-imagv4bgwc5jhphr.jpeg?q=90',
    },
    quantity: 1,
    ratingValue: {
      type: 'RatingValue',
      average: 4.1,
      base: 5,
      count: 506,
      roundOffCount: '506',
    },
    titles: {
      subtitle: 'Purple & Pink',
      title:
        'Macros Extra Large Unicorn Stuffed toy Animal Unicorn Soft Toys for Girls, Teddy Bear  - 100 cm',
    },
    deliveryDetails: {
      eta: '29 Jan 2024',
      deliveryCharge: 'Rs 40',
      isdeliveryChargeWaived: true,
      isFasterDeliveryAvailable: true,
      time: 6300,
    },
    sellerDetails: {
      name: 'Muskaan seller',
    },
    itemPrice: {
      originalPrice: 999.0,
      discountedPrice: 199.0,
      percentageOff: 80,
      offersAvailable: {
        count: 3,
      },
    },
  },
]}
describe('Actions', () => {
  test('changeCheckedState should create an action to change the checked state', () => {
    const index = 2;
    const checkedState = [false, true, false];
    const expectedAction = {
      type: Constants.SET_CHECKED_STATE,
      payload: [false, true, true],
    };
    expect(changeCheckedState(index, checkedState)).toEqual(expectedAction);
  });

  test('changeCurrentStep should create an action to change the current step', () => {
    const step = 3;
    const expectedAction = {
      type: Constants.SET_CURRENT_STEP,
      payload: 3,
    };
    expect(changeCurrentStep(step)).toEqual(expectedAction);
  });

  test('changeCurrentAdress should create an action to change the current address', () => {
    const index = 1;
    const isChecked = true;
    const expectedAction = {
      type: Constants.SET_CURRENT_ADDRESS,
      payload: 1,
    };
    expect(changeCurrentAdress(index, isChecked)).toEqual(expectedAction);
  });

  test('addNewAdress should create an action to add a new address', () => {
    const address = { city: 'blr', state: 'kar' };
    const adressDetails = { addressList: [{ city: 'ban', state: 'ka' }] };
    const expectedAction = {
      type: Constants.SET_ADDRESS_DATA,
      payload: {
        addressList: [
          { city: 'ban', state: 'ka' },
          { city: 'blr', state: 'kar' },
        ],
      },
    };
    expect(addNewAdress(address, adressDetails)).toEqual(expectedAction);
  });

  test('should dispatch actions  purchase', () => {
    const dispatch = jest.fn();
    act(() => {
      purchaseItem(dispatch);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: Constants.START_SUCCESS_LOADER,
      payload: '',
    });
  });
  test('should dispatch addOrDeleteItem delete method', () => {
    const dispatch = jest.fn();
    act(() => {
      addOrDeleteItem(
        dispatch,
        {
          productDetails: {
           ...props,
          },
          checkedState: [true],
        },
        0,
        'delete',
        '-',
        0
      );
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: Constants.SET_PRODUCT_DATA,
      payload: props,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: Constants.SET_CHECKED_STATE,
      payload: [],
    });
  });
  test('should dispatch addOrDeleteItem alter method ', () => {
    const dispatch = jest.fn();
    act(() => {
      addOrDeleteItem(
        dispatch,
        {
          productDetails: {
           ...props,
          },
          checkedState: [true],
        },
        151,
        'alter',
        '+',
        0
      );
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: Constants.SET_PRODUCT_DATA,
      payload: {...props,productData:[{...props.productData[0],quantity:2}]},
    });
  });
});
