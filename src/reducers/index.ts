import * as Actions from './Actions';
interface InitState {
  productDetails: { productData: [], loading: boolean },
  adressDetails: { addressList: [] },
  currentAddress: number,
  currentStep: number,
  checkedState: [],
  successLoader: boolean,
}
export const initState:InitState = {
  productDetails: { productData: [], loading: false },
  adressDetails: { addressList: [] },
  currentAddress: -1,
  currentStep: 0,
  checkedState: [],
  successLoader: false,
};

export const eventsReducer = (state: InitState, { type, payload }:any): any => {
  switch (type) {
    case Actions.FETCH_PRODUCT_DATA_START: {
      return {
        ...state,
        productDetails: { ...state.productDetails, loading: true },
      };
    }
    case Actions.FETCH_PRODUCT_DATA_SUCCESS: {
      return {
        ...state,
        productDetails: { ...state.productDetails, ...payload },
      };
    }
    case Actions.FETCH_PRODUCT_DATA_FAIL: {
      return {
        ...state,
        productDetails: { ...state.productDetails, loading: false },
      };
    }
    case Actions.SET_PRODUCT_DATA: {
      return {
        ...state,
        productDetails: { ...state.productDetails, ...payload },
      };
    }

    case Actions.SET_ADDRESS_DATA: {
      return {
        ...state,
        adressDetails: { ...state.adressDetails, ...payload },
      };
    }
    case Actions.SET_CURRENT_ADDRESS: {
      return {
        ...state,
        currentAddress: payload,
      };
    }
    case Actions.SET_CURRENT_STEP: {
      return {
        ...state,
        currentStep: payload,
      };
    }
    case Actions.SET_CHECKED_STATE: {
      return {
        ...state,
        checkedState: payload,
      };
    }
    case Actions.START_SUCCESS_LOADER: {
      return {
        ...state,
        successLoader: true,
      };
    }
    case Actions.END_SUCCESS_LOADER: {
      return {
        ...state,
        successLoader: false,
      };
    }
    default:
      return state;
  }
};
