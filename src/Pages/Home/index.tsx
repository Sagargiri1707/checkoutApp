import ProductList from '../../Components/ProductList';
import React, { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import Button from '../../Components/Button';
import Address from '../../Components/AddressList';
import FinalConfirmation from '../../Components/FinalConfirmation';
function Home() {
  const {
    currentStep,
    changeCurrentStep,
    checkedState,
    currentAddress,
    productDetails,
    purchaseItem,
    successLoader,
  } = useContext(GlobalAppContext);

  function continueToNextStep() {
    changeCurrentStep(currentStep + 1);
  }
  function renderItemBasedOnStep(step: number) {
    let text = 'Continue';
    let isBtnDisabled = false;
    if (step === 0) {
      text = 'Continue';
      isBtnDisabled = checkedState.filter(Boolean).length <= 0;
    }
    if (step === 1) {
      text = 'Continue';
      isBtnDisabled = currentAddress !== -1;
    } else if (step === 2) {
      text = 'Place order';
    }

    if (!step || step === 0) {
      return (
        <React.Fragment>
          <ProductList />
          {productDetails.productData.length !== 0 && (
            <Button
              text={text}
              disabled={isBtnDisabled}
              onChange={continueToNextStep}
              id={0}
              color={'rose'}
            />
          )}
        </React.Fragment>
      );
    } else if (step === 1) {
      return (
        <React.Fragment>
          <Address />
          <Button
            text={text}
            disabled={!isBtnDisabled}
            onChange={continueToNextStep}
            id={0}
            color={'rose'}
          />
        </React.Fragment>
      );
    } else if (step === 2) {
      return (
        <React.Fragment>
          <FinalConfirmation />
          <Button
            text={successLoader ? 'Loading' : text}
            disabled={false}
            onChange={purchaseItem}
            id={0}
            color={'rose'}
          />
        </React.Fragment>
      );
    }

    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="max-w-44">
      <div className="relative lg:container md:mx-auto p-4 m-4  mt-2 md:mt-12   flex-col items-center justify-center flex">
        {currentStep !== 0 && (
          <button
            className="absolute left-0 top-0 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transform scale-x-[-1]"
            onClick={() => {
              changeCurrentStep(currentStep - 1);
            }}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        )}
        {renderItemBasedOnStep(currentStep)}
      </div>
    </div>
  );
}

export default Home;
