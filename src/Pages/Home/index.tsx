import React, { useContext, lazy, Suspense, useCallback } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import { LoaderSVG, ArrowSvg } from '../../Constants';
import {purchaseItem} from '../../reducers/Actions'
const Button = lazy(() => import('../../Components/Button'));
const ProductList = lazy(() => import('../../Components/ProductList'));
const Address = lazy(() => import('../../Components/AddressList'));
const FinalConfirmation = lazy(
  () => import('../../Components/FinalConfirmation')
);
import {changeCurrentStep} from '../../reducers/Actions'
function Home() {
  const {
    currentStep,
    dispatch,
    checkedState,
    currentAddress,
    productDetails,
    successLoader,
  } = useContext(GlobalAppContext);

  const continueToNextStep = useCallback(() => {
    dispatch(changeCurrentStep(currentStep + 1));
  }, [changeCurrentStep, currentStep]);

  function renderItemBasedOnStep(step: number) {
    let text = 'Continue';
    let isBtnDisabled = false;
    switch (step) {
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
        {(step === 0) && (
          <React.Fragment>
            <Suspense fallback={<LoaderSVG />}>
              <ProductList />
            </Suspense>

            {productDetails?.productData?.length !== 0 && (
              <Suspense fallback={<LoaderSVG />}>
                <Button
                  text={text}
                  disabled={isBtnDisabled}
                  onChange={continueToNextStep}
                  id={0}
                  color={'rose'}
                  customClass={'mt-6 lg:mt-0'}
                />
              </Suspense>
            )}
          </React.Fragment>
        )}
        {step === 1 && (
          <React.Fragment>
            <Suspense fallback={<LoaderSVG />}>
              <Address />
            </Suspense>
            <Suspense fallback={<LoaderSVG />}>
              <Button
                text={text}
                disabled={!isBtnDisabled}
                onChange={continueToNextStep}
                id={0}
                color={'rose'}
              />
            </Suspense>
          </React.Fragment>
        )}
        {step === 2 && (
          <React.Fragment>
            <Suspense fallback={<LoaderSVG />}>
              <FinalConfirmation />
            </Suspense>
            <Suspense fallback={<LoaderSVG />}>
              <Button
                text={successLoader ? 'Loading' : text}
                disabled={false}
                onChange={()=>purchaseItem(dispatch)}
                id={0}
                type="button"
                color={'rose'}
                customClass={''}
              />
            </Suspense>
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
              dispatch(changeCurrentStep(currentStep - 1))
            }}
          >
            <Suspense fallback={<LoaderSVG />}>
              <ArrowSvg />
            </Suspense>
          </button>
        )}
        {renderItemBasedOnStep(currentStep)}
      </div>
    </div>
  );
}

export default Home;
