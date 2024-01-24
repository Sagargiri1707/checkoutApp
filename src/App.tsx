import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { GlobalAppContext } from './Context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getProductList, getAddressList, completePurchase } from './Utils';
import { toast } from 'react-toastify';
import { eventsReducer, initState } from './reducers/index';
import * as Actions from './reducers/Actions';
import { AddressInterface } from './Types';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(eventsReducer, initState);

  useEffect(() => {
    dispatch({
      type: Actions.FETCH_PRODUCT_DATA_START,
      payload: {},
    });
    getProductList()
      .then(res => {
        dispatch({
          type: Actions.FETCH_PRODUCT_DATA_SUCCESS,
          payload: { ...res.data.RESPONSE, loading: false },
        });
        dispatch({
          type: Actions.SET_CHECKED_STATE,
          payload: Array(res.data.RESPONSE.productData.length).fill(false),
        });
      })
      .catch(err => {
        toast.error('Failed in fetching api product list');
      });
    getAddressList()
      .then(res => {
        dispatch({
          type: Actions.SET_ADDRESS_DATA,
          payload: res,
        });
        dispatch({
          type: Actions.SET_CURRENT_ADDRESS,
          payload: res.addressList.map(adress => adress.isDefault),
        });
      })
      .catch(err => {});
  }, []);

  function changeCheckedState(index: number) {
    dispatch({
      type: Actions.SET_CHECKED_STATE,
      payload: state.checkedState.map((state, id) => {
        if (id === index) return !state;
        else return state;
      }),
    });
  }
  function changeCurrentStep(step: number) {
    dispatch({
      type: Actions.SET_CURRENT_STEP,
      payload: step,
    });
  }
  function changeCurrentAdress(index: number) {
    dispatch({
      type: Actions.SET_CURRENT_ADDRESS,
      payload: state.currentAddress.map((adress, id) => {
        if (id === index) return !adress;
        else return false;
      }),
    });
  }
  function addNewAdress(address: AddressInterface) {
    const newAddress = [...state.adressDetails.addressList, address];
    dispatch({
      type: Actions.SET_ADDRESS_DATA,
      payload: { addressList: newAddress },
    });
    dispatch({
      type: Actions.SET_CURRENT_ADDRESS,
      payload: state.currentAddress.concat(false),
    });
  }
  function addOrDeleteItem(
    id: number,
    type: 'delete' | 'alter',
    sign: '+' | '-',
    index: number
  ) {
    if (type === 'delete') {
      const updatedState = state.productDetails.productData.filter(
        (productData: { id: number }) => productData.id !== id
      );
      dispatch({
        type: Actions.SET_PRODUCT_DATA,
        payload: {
          productData: updatedState,
        },
      });
      dispatch({
        type: Actions.SET_CHECKED_STATE,
        payload: state.checkedState.filter((el, id: number) => id !== index),
      });
    }
    if (type === 'alter') {
      dispatch({
        type: Actions.SET_PRODUCT_DATA,
        payload: {
          productData: state.productDetails.productData.map(productData => {
            if (productData.id === id) {
              return {
                ...productData,
                quantity:
                  sign === '+'
                    ? productData.quantity + 1
                    : productData.quantity - 1,
              };
            } else return productData;
          }),
        },
      });
    }
  }
  function purchaseItem() {
    dispatch({
      type: Actions.START_SUCCESS_LOADER,
      payload: '',
    });
    completePurchase()
      .then(res => {
        dispatch({
          type: Actions.END_SUCCESS_LOADER,
          payload: '',
        });
        toast.success(res.msg);
        dispatch({
          type: Actions.SET_CURRENT_STEP,
          payload: 0,
        });
        dispatch({
          type: Actions.SET_PRODUCT_DATA,
          payload: { productData: [] },
        });
      })
      .catch(err => {
        toast.error(err.msg);
        dispatch({
          type: Actions.END_SUCCESS_LOADER,
          payload: '',
        });
      });
  }
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        role="alert"
        closeOnClick
      />
      <GlobalAppContext.Provider
        value={{
          productDetails: state.productDetails,
          addressVal: state.adressDetails,
          checkedState: state.checkedState,
          changeCheckedState,
          currentStep: state.currentStep,
          changeCurrentStep,
          currentAddress: state.currentAddress,
          changeCurrentAdress,
          addNewAdress,
          addOrDeleteItem,
          purchaseItem,
          successLoader: state.successLoader,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </GlobalAppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
