import ProductList from "../../Components/ProductList";
import React, { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context'
import Button from "../../Components/Button";
import Address from "../../Components/AddressList";
import FinalConfirmation from '../../Components/FinalConfirmation'
function Home() {
  const { currentStep, changeCurrentStep, checkedState, currentAddress, productDetails, purchaseItem } = useContext(GlobalAppContext);


  function continueToNextStep() {
    changeCurrentStep(currentStep + 1)
  }
  function renderItemBasedOnStep(step: number) {

    let text = "Continue"
    let isBtnDisabled = false
    if (step === 0) {
      text = "Continue"
      isBtnDisabled = checkedState.filter(Boolean).length <= 0
    }
    if (step === 1) {
      text = "Continue"
      isBtnDisabled = currentAddress.filter(Boolean).length > 0
    }
    else if (step === 2) {
      text = "Place order"
    }

    if (!step || step === 0) {
      return <React.Fragment>
        <ProductList />
        {
          productDetails.productData.length !== 0 && <Button text={text} disabled={isBtnDisabled} onChange={continueToNextStep} id={0} color={"rose"} />
        }
      </React.Fragment>
    }
    else if (step === 1) {
      return <React.Fragment>
        <Address />
        <Button text={text} disabled={!isBtnDisabled} onChange={continueToNextStep} id={0} color={"rose"} />
      </React.Fragment>
    }
    else if (step === 2) {
      return <React.Fragment>
        <FinalConfirmation />
        <Button text={text} disabled={false} onChange={purchaseItem} id={0} color={"rose"} />

      </React.Fragment>
    }

    return <React.Fragment ></React.Fragment>
  }
  return <div className="max-w-44">
    <div className="relative md:container md:mx-auto p-4 m-16 mt-12 border flex-col items-center justify-center flex">
      {currentStep !== 0 && <button className="absolute left-0 top-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
        changeCurrentStep(currentStep - 1)
      }}>Back</button>}
      {
        renderItemBasedOnStep(currentStep)
      }
    </div>
  </div>;
}

export default Home;