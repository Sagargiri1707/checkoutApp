import ProductList from "../../Components/ProductList";
import React, { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context'
import Button from "../../Components/Button";
import Address from "../../Components/AddressList";

function Home() {
  const { currentStep, changeCurrentStep, checkedState, productDetails } = useContext(GlobalAppContext);


  function continueToNextStep(){
    changeCurrentStep(currentStep+1)
  }
  function renderItemBasedOnStep(step){

    let text = "Continue"
    if (step === 0) {
      text = "Continue"
    }
    const isBtnDisabled = checkedState.filter(Boolean).length <= 0

    
    if(!step || step === 0){
      return <React.Fragment>
        <ProductList />
        {
          productDetails.productData.length !== 0 && <Button text={text} disabled={isBtnDisabled} onChange={continueToNextStep} id={0} color={"rose"} />

        }
      </React.Fragment>
    }
    else if(step===1){
      return <React.Fragment>
        <Address/>
      </React.Fragment>
    }
  }
  return <div className="max-w-44">
    <div className="md:container md:mx-auto p-4 m-16 mt-12 border flex-col items-center justify-center flex">
      {
        renderItemBasedOnStep(currentStep)
      }
      
    </div>
  </div>;
}

export default Home;
