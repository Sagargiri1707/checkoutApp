import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import Address from '../Address';
import AddNewAdress from '../AddNewAdress';
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';
import { changeCurrentAdress } from '../../reducers/Actions';
function AddressList() {
  const { adressDetails, currentAddress, dispatch } =
    useContext(GlobalAppContext);
  return (
    <div className="w-96 lg:w-auto flex-col lg:flex lg:flex-row h-auto lg:h-144 items-baseline	 justify-center">
      <div className="flex flex-col items-center justify-center">
        <h4>Select an address to proceed</h4>
        <div className="h-96 lg:p-4 lg:p-0 lg:h-128 overflow-auto">
          {adressDetails?.addressList?.map((address, id) => {
            return (
              <Address
                key={id}
                index={id}
                isSelected={currentAddress === id}
                onChange={(index: number, isChecked: boolean) =>
                  dispatch(changeCurrentAdress(index, isChecked))}
                {...address}
              />
            );
          })}
        </div>
      </div>
      <AddNewAdress />
    </div>
  );
}

export default withErrorBoundary('AddressList', AddressList);
