import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { GlobalAppContext } from './Context/Context'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { getProductList, getAddressList, completePurchase } from './Utils'
import { toast } from "react-toastify";
import { eventsReducer, initState } from './reducers/index'
import * as Actions from './reducers/Actions'
interface Media {
  type: string;
  url: string;
}

interface RatingValue {
  type: string;
  average: number;
  base: number;
  count: number;
  roundOffCount: string;
}

interface Titles {
  subtitle: string;
  title: string;
}

interface DeliveryDetails {
  eta: string;
  deliveryCharge: string;
  isdeliveryChargeWaived: boolean;
  isFasterDeliveryAvailable: boolean;
  time: number;
}

interface SellerDetails {
  name: string;
}

interface ItemPrice {
  originalPrice: number;
  discountedPrice: number;
  percentageOff: number;
  offersAvailable: {
    count: number;
  };
}

interface ProductData {
  id: number;
  media: Media;
  quantity: number;
  ratingValue: RatingValue;
  titles: Titles;
  deliveryDetails: DeliveryDetails;
  sellerDetails: SellerDetails;
  itemPrice: ItemPrice;
}

interface Address {
  id: number;
  city: string;
  isDefault: boolean;
  landmark: string;
  locationTypeTag: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  address: string;
}
const App: React.FC = () => {

  const [state, dispatch] = useReducer(eventsReducer, initState);


  useEffect(() => {
    dispatch({
      type: Actions.FETCH_PRODUCT_DATA_START,
      payload: {}
    })
    getProductList().then((res) => {
      dispatch({
        type: Actions.FETCH_PRODUCT_DATA_SUCCESS,
        payload: { ...res, loading: false }
      })
      dispatch({
        type: Actions.SET_CHECKED_STATE,
        payload: Array(res.productData.length).fill(false)
      })
    }).catch(_ => {
      toast.error("Failed in fetching api product list")
    })
    getAddressList().then((res) => {
      dispatch({
        type: Actions.SET_ADDRESS_DATA,
        payload: res
      })
      dispatch({
        type: Actions.SET_CURRENT_ADDRESS,
        payload: res.addressList.map(adress => adress.isDefault)
      })
    }).catch(err => {

    })
  }, [])


  function changeCheckedState(index: number) {
    dispatch({
      type: Actions.SET_CHECKED_STATE,
      payload: state.checkedState.map((state, id) => {
        if (id === index) return !state
        else return state
      })
    })
  }
  function changeCurrentStep(step: number) {
    dispatch({
      type: Actions.SET_CURRENT_STEP,
      payload: step
    })
  }
  function changeCurrentAdress(index: number) {

    dispatch({
      type: Actions.SET_CURRENT_ADDRESS,
      payload: state.currentAddress.map((adress, id) => {
        if (id === index) return !adress
        else return false
      })
    })
  }
  function addNewAdress(address: Address) {
    dispatch({
      type: Actions.SET_ADDRESS_DATA,
      payload: { addressList: [...state.adressDetails.addressList, address] }

    })
  }
  function addOrDeleteItem(id: number, type: 'delete' | 'alter', sign: '+' | '-') {
    if (type === "delete") {
      dispatch({
        type: Actions.SET_PRODUCT_DATA,
        payload: { productData: state.productDetails.productData.filter(productData => productData.id !== id) }
      })
    }
    if (type === "alter") {
      dispatch({
        type: Actions.SET_PRODUCT_DATA,
        payload: {
          productData: state.productDetails.productData.map(productData => {
            if (productData.id === id) {
              return { ...productData, quantity: sign === "+" ? productData.quantity + 1 : productData.quantity - 1 }
            } else return productData
          })
        }
      })
    }
  }
  function purchaseItem() {
    completePurchase().then(res => {
      toast.success(res.msg)
      dispatch({
        type: Actions.SET_CURRENT_STEP,
        payload: 0
      })
      dispatch({
        type: Actions.SET_PRODUCT_DATA,
        payload: { productData: [] }
      })
    })
      .catch(err => {
        toast.error(err.msg)
      })
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
      <GlobalAppContext.Provider value={{ productDetails: state.productDetails, addressVal: state.adressDetails, checkedState: state.checkedState, changeCheckedState, currentStep: state.currentStep, changeCurrentStep, currentAddress: state.currentAddress, changeCurrentAdress, addNewAdress, addOrDeleteItem, purchaseItem }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </GlobalAppContext.Provider>


    </BrowserRouter>
  );
};

export default App;
