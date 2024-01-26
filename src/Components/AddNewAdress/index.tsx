import { useState } from 'react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import { AddressInterface } from '../../Types';
import Button from '../Button';
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';
const PHONE_REGEX = /^([0]|\+91)?([6-9][0-9]{9})$/;
const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

function AddNewAdress() {
  const { addNewAdress } = useContext(GlobalAppContext);
  const [addANewAdress, setAddANewAddress] = useState(false);

  const [formState, setFormState] = useState<AddressInterface>({
    name: '',
    address: '',
    phone: '',
    state: '',
    city: '',
    pincode: '',
    landmark: '',
  });
  function submitForm(e: any) {
    e.preventDefault();
    if (!PHONE_REGEX.test(formState?.phone)) {
      return toast.error('Invalid Phone number given');
    }
    if (!PINCODE_REGEX.test(formState?.pincode)) {
      return toast.error('Invalid pin code given');
    } else
      addNewAdress({
        ...formState,
        isDefault: false,
        locationTypeTag: 'Others',
      });
      setAddANewAddress(false)
    setFormState({
      name: '',
      address: '',
      phone: '',
      state: '',
      city: '',
      pincode: '',
      landmark: '',
    });
  }
  function handleFormChange(data: any) {
    setFormState(prevState => ({
      ...prevState,
      [data.target.id]: data.target.value,
    }));
  }
  return (
    <div className="flex flex-col h-auto w-auto lg:w-96 m-4">
      <div className="flex-grow flex flex-col px-2 py-2 bg-white shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Instead Add a new Address
        </h2>
        {addANewAdress ? (
          <form onSubmit={submitForm}>
            <div className="flex flex-col mb-1">
              <label htmlFor="name" className="text-base text-gray-700 mb-2">
                Name (reqd)
              </label>
              <input
                value={formState?.name}
                onChange={handleFormChange}
                type="text"
                id="name"
                placeholder='Please enter your name'
                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={true}
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="address" className="text-base text-gray-700 mb-2">
                Adress (reqd)
              </label>
              <input
                value={formState?.address}
                onChange={handleFormChange}
                type="text"
                id="address"
                placeholder='Please enter Address'

                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={true}
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="phone" className="text-base text-gray-700 mb-2">
                Phone number (reqd)
              </label>
              <input
                value={formState?.phone}
                onChange={handleFormChange}
                minLength={10}
                maxLength={13}
                type="text"
                id="phone"
                placeholder='+91XXXXXXXXXX'

                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={true}
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="city" className="text-base text-gray-700 mb-2">
                City (reqd)
              </label>
              <input
                value={formState?.city}
                onChange={handleFormChange}
                type="text"
                id="city"
                placeholder='Please enter city'

                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={true}
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="state" className="text-base text-gray-700 mb-2">
                State (reqd)
              </label>
              <input
                value={formState?.state}
                onChange={handleFormChange}
                type="text"
                placeholder='Please enter state'

                id="state"
                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={true}
              />
            </div>
            <div className="flex flex-col mb-1">
              <label
                htmlFor="landmark"
                className="text-base text-gray-700 mb-2"
              >
                Landmark (Optional)
              </label>
              <input
                value={formState?.landmark}
                onChange={handleFormChange}
                type="text"
                id="landmark"
                placeholder='Please enter any landmark'
                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={false}
              />
            </div>
            <div className="flex flex-col mb-1">
              <label htmlFor="pincode" className="text-base text-gray-700 mb-2">
                Pincode (reqd)
              </label>
              <input
                value={formState?.pincode}
                onChange={handleFormChange}
                type="text"
                minLength={6}
                maxLength={6}
                id="pincode"
                placeholder='Please enter pincode'

                className="rounded border border-gray-300 px-4 py-2 focus:ring focus:ring-blue-200"
                required={true}
              />
            </div>
            <button
              className="inline-flex items-center px-4 py-1 text-white font-bold rounded shadow-sm mt-2  bg-rose-400 hover:bg-rose-600"
              type="submit"
            >
              Add New Address
            </button>
          </form>
        ) : (
          <div className='flex items-center justify-center'>

          <Button
            color='rose'
            type="button"
            onChange={() => setAddANewAddress(true)}
            text='+'
          />
          </div>
        )}
      </div>
    </div>
  );
}

export default withErrorBoundary('AddNewAdres',AddNewAdress);
