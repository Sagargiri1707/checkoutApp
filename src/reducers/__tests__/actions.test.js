import {
    changeCheckedState,
    changeCurrentStep,
    changeCurrentAdress,
    addNewAdress,
  } from '../Actions';
  import * as Constants from '../ActionConstants';
  
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
      const address = { city: 'New York', state: 'NY' };
      const adressDetails = { addressList: [{ city: 'Los Angeles', state: 'CA' }] };
      const expectedAction = {
        type: Constants.SET_ADDRESS_DATA,
        payload: {
          addressList: [{ city: 'Los Angeles', state: 'CA' }, { city: 'New York', state: 'NY' }],
        },
      };
      expect(addNewAdress(address, adressDetails)).toEqual(expectedAction);
    });
  });
  