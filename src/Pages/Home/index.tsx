import { useContext, Suspense, } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import { LoaderSVG, ArrowSvg } from '../../Constants';
import DataContainer from './DataContainer';
import {changeCurrentStep} from '../../reducers/Actions'
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';
function Home() {
  const {
    currentStep,
    dispatch,
  } = useContext(GlobalAppContext);

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
        {<DataContainer currentStep={currentStep}/>}
      </div>
    </div>
  );
}

export default withErrorBoundary('Home',Home);
