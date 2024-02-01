import React, { lazy, useContext, useCallback, Suspense } from 'react';
import { purchaseItem } from '../../reducers/Actions';
import { GlobalAppContext } from '../../Context/Context';
import { LoaderSVG } from '../../Constants';

const Button = lazy(() => import('../../Components/Button'));
const ProductList = lazy(() => import('../../Components/ProductList'));
const Address = lazy(() => import('../../Components/AddressList'));
const FinalConfirmation = lazy(
  () => import('../../Components/FinalConfirmation')
);
import { changeCurrentStep } from '../../reducers/Actions';
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';

type currentStepProps = {
  currentStep: number;
};
function DataContainer(props: currentStepProps) {
  const {
    dispatch,
    checkedState,
    currentAddress,
    productDetails,
    successLoader,
  } = useContext(GlobalAppContext);
  const { currentStep } = props;
  const continueToNextStep = useCallback(() => {
    dispatch(changeCurrentStep(currentStep + 1));
  }, [changeCurrentStep, currentStep]);

  let text = 'Continue';
  let isBtnDisabled = false;
  switch (currentStep) {
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
      {currentStep === 0 && (
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
      {currentStep === 1 && (
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
      {currentStep === 2 && (
        <React.Fragment>
          <Suspense fallback={<LoaderSVG />}>
            <FinalConfirmation />
          </Suspense>
          <Suspense fallback={<LoaderSVG />}>
            <Button
              text={successLoader ? 'Loading' : text}
              disabled={false}
              onChange={() => purchaseItem(dispatch)}
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

export default withErrorBoundary('DataContainer',DataContainer);
