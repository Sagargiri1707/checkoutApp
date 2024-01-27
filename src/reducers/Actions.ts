import { AddressInterface } from '../Types';
import * as Constants from './ActionConstants'

export function changeCheckedState(index: number,checkedState: boolean[]) {
    return ({
      type: Constants.SET_CHECKED_STATE,
      payload: checkedState.map((state: boolean, id: number) => {
        if (id === index) return !state;
        else return state;
      }),
    });
  }

  export   function changeCurrentStep(step: number) {
    return {
      type: Constants.SET_CURRENT_STEP,
      payload: step,
    };
  }
  export   function changeCurrentAdress(index: number, isChecked: boolean) {
    console.log(index,isChecked)
    return ({
      type: Constants.SET_CURRENT_ADDRESS,
      payload: isChecked ? index : -1,
    });
  }

export  function addNewAdress(address: AddressInterface,adressDetails:{addressList:AddressInterface[]}) {
    const newAddress = [...adressDetails.addressList, address];
    return ({
      type: Constants.SET_ADDRESS_DATA,
      payload: { addressList: newAddress },
    });
  }