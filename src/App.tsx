import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import { GlobalAppContext } from './Context/Context'
import { ToastContainer } from "react-toastify";

import initVal from './ApiResponses/CheckoutApiResponse.json'
import addressVal from './ApiResponses/AddressListResponse.json'
import "react-toastify/dist/ReactToastify.min.css";

const App: React.FC = () => {
  const [checkedState, setCheckedState] = useState(Array(initVal.productData.length).fill(false))
  const [currentStep, setCurrentStep] = useState(0)
  const [currentAddress, setCurrentAddress] = useState(addressVal.addressList.map(adress => adress.isDefault))
  const [productDetails, setProductDetails] = useState(initVal)
  const [adressDetails, setAdressDetails] = useState(addressVal)
  function changeCheckedState(index) {
    setCheckedState(checkedState.map((state, id) => {
      if (id === index) return !state
      else return state
    }))
  }
  function changeCurrentStep(step) {
    setCurrentStep(step)
  }
  function changeCurrentAdress(index) {
    setCurrentAddress(currentAddress.map((adress, id) => {
      if (id === index) return !adress
      else return false
    }))
  }
  function addNewAdress(address) {
    setAdressDetails(prevState => {
      return { ...prevState, addressList: [...prevState.addressList, address] }
    })
  }
  function addOrDeleteItem(id, type,sign) {
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
      <GlobalAppContext.Provider value={{ productDetails, addressVal: adressDetails, checkedState, changeCheckedState, currentStep, changeCurrentStep, currentAddress, changeCurrentAdress, addNewAdress, addOrDeleteItem }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </GlobalAppContext.Provider>


    </BrowserRouter>
  );
};

export default App;
