import { useContext, useEffect } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import Address from '../Address';
import AddNewAdress from '../AddNewAdress';
function AddressList() {
  const { addressVal, currentAddress, changeCurrentAdress } =
    useContext(GlobalAppContext);
  return (
    <div className="w-auto flex align-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h4>Select an address to proceed</h4>
        {addressVal.addressList.map((address, id) => {
          return (
            <Address
              key={address.id}
              index={id}
              isSelected={currentAddress[id]}
              onChange={changeCurrentAdress}
              {...address}
            />
          );
        })}
      </div>
      <AddNewAdress />
    </div>
  );
}

export default AddressList;
