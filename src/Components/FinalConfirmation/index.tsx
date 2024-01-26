import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
function FinalConfirmation() {
  const { productDetails, checkedState, adressDetails, currentAddress } =
    useContext(GlobalAppContext);

  const selectedAdress = adressDetails?.addressList?.[currentAddress];
  const itemBreakUp = productDetails?.productData?.reduce(
    (acc, i, index) => {
      if (checkedState[index]) {
        acc.totalPrice += i.itemPrice.originalPrice * i.quantity;
        acc.discount +=
          (i.itemPrice.originalPrice - i.itemPrice.discountedPrice) *
          i.quantity;
        acc.finalPrice += i.itemPrice.discountedPrice * i.quantity;
      }
      return acc;
    },
    {
      totalPrice: 0,
      discount: 0,
      finalPrice: 0,
    }
  );
  return (
    <div className="mx-auto lg:w-96 w-full h:w-96 mt-8 mb-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4 p-4 text-center">Checkout</h2>
      <div className="border-t border-b py-2 p-4">
        <div className="flex justify-between">
          <span>Product Price:</span>
          <span>₹{itemBreakUp?.totalPrice?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discounts</span>
          <span>₹{itemBreakUp?.discount?.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 p-4">
        <div className="flex justify-between">
          <span className="text-xl font-bold">Total Amount:</span>
          <span className="text-xl font-bold">
            ₹{itemBreakUp?.finalPrice?.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="bg-white mt-6 rounded w-full p-4">
        <p className="text-xl font-bold mb-2">Selected address:</p>
        <p className="text-gray-700">
          {selectedAdress?.name}
          <br />
          {selectedAdress?.phone}
          <br />
          {selectedAdress?.address}
          <br />
          {selectedAdress?.city}, {selectedAdress?.city} {selectedAdress?.pincode}
        </p>
      </div>
    </div>
  );
}

export default FinalConfirmation;
