import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
function FinalConfirmation() {
  const { productDetails, checkedState } = useContext(GlobalAppContext);
  const itemBreakUp = productDetails.productData.reduce(
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
    <div className="mx-auto w-96 mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="border-t border-b py-2">
        <div className="flex justify-between">
          <span>Product Price:</span>
          <span>₹{itemBreakUp.totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discounts</span>
          <span>₹{itemBreakUp.discount.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <span className="text-xl font-bold">Total Amount:</span>
          <span className="text-xl font-bold">
            ₹{itemBreakUp.finalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FinalConfirmation;
