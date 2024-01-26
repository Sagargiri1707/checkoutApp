import React, { useContext, lazy, Suspense, useCallback } from 'react';
import ProductList from '../../Components/ProductList';
import { GlobalAppContext } from '../../Context/Context';
import { LoaderSVG } from '../../Constants';
const Button = lazy(() => import('../../Components/Button'));
const Address = lazy(() => import('../../Components/AddressList'));
const FinalConfirmation = lazy(
  () => import('../../Components/FinalConfirmation')
);
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

  const continueToNextStep = useCallback(() => {
    changeCurrentStep(currentStep + 1);
  }, [changeCurrentStep, currentStep]);

  function renderItemBasedOnStep(step: number) {
    let text = 'Continue';
    let isBtnDisabled = false;
    switch(step){
      case 0:
        isBtnDisabled = checkedState.filter(Boolean).length <= 0;
        break;
      case 1:
        isBtnDisabled = currentAddress !== -1;
        break;
      case 2:
        text = 'Place order';
        break;
    }
    return (
      <React.Fragment>
        {(!step || step === 0) && (
          <React.Fragment>
            <Suspense fallback={<LoaderSVG/>}>
              <ProductList />
            </Suspense>
            {productDetails?.productData?.length !== 0 && (
              <Button
                text={text}
                disabled={isBtnDisabled}
                onChange={continueToNextStep}
                id={0}
                color={'rose'}
                customClass={'mt-6'}
              />
            )}
          </React.Fragment>
        )}
        {step === 1 && (
          <React.Fragment>
            <Suspense fallback={<LoaderSVG/>}>
              <Address />
            </Suspense>

            <Button
              text={text}
              disabled={!isBtnDisabled}
              onChange={continueToNextStep}
              id={0}
              color={'rose'}
            />
          </React.Fragment>
        )}
        {step === 2 && (
          <React.Fragment>
            <Suspense fallback={<LoaderSVG/>}>
              <FinalConfirmation />
            </Suspense>
            <Button
              text={successLoader ? 'Loading' : text}
              disabled={false}
              onChange={purchaseItem}
              id={0}
              type="button"
              color={'rose'}
              customClass={''}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );

  }
  return (
    <div className="max-w-44 lg:max-w-96 flex items-center justify-center">
      <div className="relative lg:container md:mx-auto lg:p-4 m-0 lg:m-4  mt-2 md:mt-12   flex-col items-center justify-center flex">
        {currentStep !== 0 && (
          <button
            className="absolute left-0 top-0 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transform scale-x-[-1]"
            onClick={() => {
              changeCurrentStep(currentStep - 1);
            }}
          >
            <LoaderSVG/>
          </button>
        )}
        {renderItemBasedOnStep(currentStep)}
      </div>
    </div>
  );
}

export default Home;
