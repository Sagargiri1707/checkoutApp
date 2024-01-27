import * as Actions from '../ActionConstants';
import { eventsReducer } from '../index';

describe('Index component', () => {
  it('should return the initial state when no action is passed', () => {
    const initialState = {
      productDetails: { productData: [], loading: false },
      adressDetails: { addressList: [] },
      currentAddress: 0,
      currentStep: 0,
      checkedState: [],
      successLoader: false,
    };

    const result = eventsReducer(initialState, { type: '', payload: null });

    expect(result).toEqual(initialState);
    const payload = { productData: [1, 2, 3], loading: false };

    eventsReducer(initialState, { type: Actions.END_SUCCESS_LOADER, payload });
    eventsReducer(initialState, { type: Actions.FETCH_PRODUCT_DATA_FAIL, payload });
    eventsReducer(initialState, { type: Actions.FETCH_PRODUCT_DATA_START, payload });
    eventsReducer(initialState, { type: Actions.FETCH_PRODUCT_DATA_SUCCESS, payload });
    eventsReducer(initialState, { type: Actions.SET_ADDRESS_DATA, payload });
    eventsReducer(initialState, { type: Actions.SET_CHECKED_STATE, payload });
    eventsReducer(initialState, { type: Actions.SET_CURRENT_ADDRESS, payload });
    eventsReducer(initialState, { type: Actions.SET_CURRENT_STEP, payload });
    eventsReducer(initialState, { type: Actions.SET_PRODUCT_DATA, payload });
    eventsReducer(initialState, { type: Actions.START_SUCCESS_LOADER, payload });

  });
});
