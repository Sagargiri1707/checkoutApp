import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { GlobalAppContext } from './Context/Context'
import { ToastContainer } from "react-toastify";

import addressVal from './ApiResponses/AddressListResponse.json'
import "react-toastify/dist/ReactToastify.min.css";
import { getProductList, getAddressList, completePurchase } from './Utils'
import { toast } from "react-toastify";

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
  useEffect(() => {
    setProductDetails({...productDetails,loading:true})
    getProductList().then((res) => {
      setProductDetails({...res,loading:false})
      setCheckedState(Array(res.productData.length).fill(false))
    }).catch(_ => {
      toast.error("Failed in fetching api product list")
    })
    getAddressList().then((res) => {
      setAdressDetails(res)
      setCurrentAddress(res.addressList.map(adress => adress.isDefault))
    }).catch(err => {

    })
  }, [])



  const [productDetails, setProductDetails] = useState<{
    loading: boolean,
    productData: ProductData[];
  }>({ productData: [],loading: false })
  const [checkedState, setCheckedState] = useState<boolean[]>(Array(productDetails.productData.length).fill(false))
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [adressDetails, setAdressDetails] = useState<{ addressList: Address[] }>(addressVal)

  const [currentAddress, setCurrentAddress] = useState<boolean[]>(adressDetails.addressList.map(adress => adress.isDefault))
  function changeCheckedState(index: number) {
    setCheckedState(checkedState.map((state, id) => {
      if (id === index) return !state
      else return state
    }))
  }
  function changeCurrentStep(step: number) {
    setCurrentStep(step)
  }
  function changeCurrentAdress(index: number) {
    setCurrentAddress(currentAddress.map((adress, id) => {
      if (id === index) return !adress
      else return false
    }))
  }
  function addNewAdress(address: Address) {
    setAdressDetails(prevState => {
      return { ...prevState, addressList: [...prevState.addressList, address] }
    })
    setCurrentAddress([...adressDetails.addressList, address].map(adress => adress.isDefault))
  }
  function addOrDeleteItem(id: number, type: 'delete' | 'alter', sign: '+' | '-') {
    if (type === "delete") {
      setProductDetails(prevState => {
        return { ...prevState, productData: prevState.productData.filter(productData => productData.id !== id) }
      })
    }
    if (type === "alter") {
      setProductDetails(prevState => {
        return {
          ...prevState,
          productData: prevState.productData.map(productData => {
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
      changeCurrentStep(0)
      setProductDetails({ productData: [] })
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
      <GlobalAppContext.Provider value={{ productDetails, addressVal: adressDetails, checkedState, changeCheckedState, currentStep, changeCurrentStep, currentAddress, changeCurrentAdress, addNewAdress, addOrDeleteItem, purchaseItem }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </GlobalAppContext.Provider>


    </BrowserRouter>
  );
};

export default App;
