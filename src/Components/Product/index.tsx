import Button from '../Button';
import Rating from '../Rating';
import ProductQuantity from '../ProductQuantity/ProductQuantity';
import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import { ProductProps } from '../../Types';
import { MouseEventHandler } from 'react';
import DeliveryMessage from '../DeliveryInfo';
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';

function Product({
  id,
  index,
  media,
  titles,
  sellerDetails,
  itemPrice,
  deliveryDetails,
  ratingValue,
  quantity,
}: ProductProps) {
  const { checkedState, changeCheckedState, addOrDeleteItem } =
    useContext(GlobalAppContext);

  function changeCartVolume(
    event: MouseEventHandler<HTMLButtonElement>,
    a: '+' | '-'
  ) {
    const type = a === '-' || a === '+' ? 'alter' : 'delete';
    addOrDeleteItem(id, type, a, index);
  }
  return (
    <div className="border-2 m-2 mt-6 p-6 relative max-w-3xl mx-auto">
      <input
        role="checkbox"
        type="checkbox"
        checked={checkedState[index]}
        onChange={e => changeCheckedState(index)}
        className="rounded mr-2 absolute left-4 top-4 h-4 w-4"
      />
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch	">
        <div className="lg:w-1/3 h-48 mb-4 lg:mb-0">
          {media?.type === 'image' ? (
            <img className=" h-full w-auto" src={media?.url} />
          ) : (
            <video src={media?.url}></video>
          )}
        </div>
        <div className="lg:w-1/2 lg:ml-4 p-1">
          <div className="font-semibold text-lg ">
            {titles?.title.length > 65
              ? titles?.title.slice(0, 65) + ' ...'
              : titles.title}
          </div>
          <div className="font-light hidden lg:block mt-1	text-slate-400 text-sm">
            {titles?.subtitle}
          </div>
          <div className="font-light  hidden lg:block mt-1	text-slate-500 text-sm">
            {sellerDetails?.name}
          </div>
          <div>
            <span className="font-light mt-1	text-neutral-500 text-sm line-through">
              ₹{itemPrice?.originalPrice}
            </span>
            <span className="font-bold	text-green-500 text-lg">
              ₹{itemPrice?.discountedPrice?.toFixed(2)}
            </span>
            <span className="font-bold	text-green-500 text-md ml-4">
              {itemPrice?.percentageOff}% off
            </span>
            {itemPrice?.offersAvailable?.count > 0 ? (
              <span className="pl-2 text-xs text-gray-400	">
                {itemPrice?.offersAvailable?.count} offers available
              </span>
            ) : null}
          </div>
        </div>
        <div className="w-full lg:w-3/12 flex lg:block align-between lg:justify-evenly p-2 lg:items-baseline flex-wrap	justify-center">
          <div className="mb-4 w-44">
            <span>Delivery by {deliveryDetails?.eta}</span>
            {deliveryDetails?.isFasterDeliveryAvailable &&
            deliveryDetails.time ? (
              <DeliveryMessage seconds={deliveryDetails?.time} />
            ) : null}

            <div
              className={
                deliveryDetails?.isdeliveryChargeWaived
                  ? 'text-green-500 font-semibold line-through mt-2 hidden lg:block text-sm'
                  : ' hidden lg:block'
              }
            >
              {deliveryDetails?.deliveryCharge} Delivery charge
            </div>
          </div>
          {ratingValue && <Rating {...ratingValue} />}
          <div className="flex justify-between items-center w-44 mt-8">
            <ProductQuantity index={quantity} onChange={changeCartVolume} />
            <div>
              <Button
                text={'Delete'}
                id={id}
                onChange={changeCartVolume}
                color="rose"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary('Product',Product);
