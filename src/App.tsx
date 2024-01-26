import { useEffect, useReducer, lazy, Suspense } from 'react';
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
import { AddressInterface, ProductDataInterface } from './Types';
import './App.css';
import { withErrorBoundary } from './HOC/errorBoundaryHoc';
const Architecture = lazy(() => import('./Pages/Architecture'));
const TestReports = lazy(() => import('./Pages/TestCase'));

const App: React.FC = () => {
  const [state, dispatch] = useReducer(eventsReducer, initState);

  useEffect(() => {
    dispatch({
      type: Actions.FETCH_PRODUCT_DATA_START,
      payload: {},
    });
    getProductList()
      .then(res => {
        let response: { productData: ProductDataInterface[] } = {
          productData: [],
        };
        if (Array.isArray(res?.data?.RESPONSE?.productData)) {
          response = {
            ...res.data.RESPONSE,
          };
        }
        dispatch({
          type: Actions.FETCH_PRODUCT_DATA_SUCCESS,
          payload: { ...response, loading: false },
        });
        dispatch({
          type: Actions.SET_CHECKED_STATE,
          payload: Array(res?.data?.RESPONSE?.productData?.length).fill(false),
        });
        getAddressList()
          .then(res => {
            dispatch({
              type: Actions.SET_ADDRESS_DATA,
              payload: res.data,
            });
            let i = 0;
            for (let i = 0; i < res?.data?.addressList.length; i++) {
              if (res?.data?.addressList[i].isDefault) {
                break;
              }
            }
            dispatch({
              type: Actions.SET_CURRENT_ADDRESS,
              payload: i,
            });
          })
          .catch(() => {
            toast.error('Error in fetching Address api Response');
          });
      })
      .catch(() => {
        toast.error('Failed in fetching api product list');
      });
  }, []);

  function changeCheckedState(index: number) {
    dispatch({
      type: Actions.SET_CHECKED_STATE,
      payload: state.checkedState.map((state: number, id: number) => {
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
  function changeCurrentAdress(index: number, isChecked: boolean) {
    dispatch({
      type: Actions.SET_CURRENT_ADDRESS,
      payload: isChecked ? index : -1,
    });
  }
  function addNewAdress(address: AddressInterface) {
    const newAddress = [...state.adressDetails.addressList, address];
    dispatch({
      type: Actions.SET_ADDRESS_DATA,
      payload: { addressList: newAddress },
    });
  }
  function addOrDeleteItem(
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
        type: Actions.SET_PRODUCT_DATA,
        payload: {
          productData: updatedState,
        },
      });
      dispatch({
        type: Actions.SET_CHECKED_STATE,
        payload: state.checkedState.filter(
          (_: number, id: number) => id !== index
        ),
      });
    }
    if (type === 'alter') {
      dispatch({
        type: Actions.SET_PRODUCT_DATA,
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
          changeCheckedState,
          changeCurrentStep,
          changeCurrentAdress,
          addNewAdress,
          addOrDeleteItem,
          purchaseItem,
          ...state,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>loading</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/architecture"
            element={
              <Suspense fallback={<div>loading</div>}>
                <Architecture />
              </Suspense>
            }
          />
          <Route
            path="/testcase"
            element={
              <Suspense fallback={<div>loading</div>}>
                <TestReports />
              </Suspense>
            }
          />
        </Routes>
      </GlobalAppContext.Provider>
    </BrowserRouter>
  );
};

export default withErrorBoundary('app', App);
