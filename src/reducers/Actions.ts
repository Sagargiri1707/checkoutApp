import { AddressInterface, CheckedState, ProductDataInterface, ProductDetails } from '../Types';
import * as Constants from './ActionConstants'
import { toast } from 'react-toastify';
import { completePurchase } from '../Utils';

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

  export function purchaseItem(dispatch:Function){
    dispatch({
      type: Constants.START_SUCCESS_LOADER,
      payload: '',
    });
    completePurchase()
      .then(res => {
        dispatch({
          type: Constants.END_SUCCESS_LOADER,
          payload: '',
        });
        toast.success(res.msg);
        dispatch({
          type: Constants.SET_CURRENT_STEP,
          payload: 0,
        });
        dispatch({
          type: Constants.SET_PRODUCT_DATA,
          payload: { productData: [] },
        });
      })
      .catch(err => {
        toast.error(err.msg);
        dispatch({
          type: Constants.END_SUCCESS_LOADER,
          payload: '',
        });
      });
  }

  export function  addOrDeleteItem(dispatch:Function,
    state: {productDetails:ProductDetails,checkedState: CheckedState} ,
    id: number,
    type: 'delete' | 'alter',
    sign: '+' | '-',
    index: number
  ) {
    if (type === 'delete') {
      const updatedState = state?.productDetails?.productData?.filter(
        (productData: { id: number }) => productData.id !== id
      );
      dispatch({
        type: Constants.SET_PRODUCT_DATA,
        payload: {
          productData: updatedState,
        },
      });
      dispatch({
        type: Constants.SET_CHECKED_STATE,
        payload: state.checkedState.filter(
          (_: boolean, id: number) => id !== index
        ),
      });
    }
    if (type === 'alter') {
      dispatch({
        type: Constants.SET_PRODUCT_DATA,
        payload: {
          productData: state.productDetails.productData.map(
            (productData: ProductDataInterface) => {
              if (productData.id === id) {
                return {
                  ...productData,
                  quantity:
                    sign === '+'
                      ? productData.quantity + 1
                      : productData.quantity - 1,
                };
              } else return productData;
            }
          ),
        },
      });
    }
  }