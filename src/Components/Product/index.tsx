import Button from '../Button';
import Rating from '../Rating';
import React from 'react';
import ProductQuantity from '../ProductQuantity/ProductQuantity';
import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import { ProductProps } from '../../Types';
import { MouseEventHandler } from 'react';
import DeliveryMessage from '../DeliveryInfo';
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';
import {changeCheckedState,addOrDeleteItem} from '../../reducers/Actions'

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
  const { checkedState,productDetails, dispatch } =
    useContext(GlobalAppContext);

  function changeCartVolume(
    _: MouseEventHandler<HTMLButtonElement>,
    a: '+' | '-'
  ) {
    const type = a === '-' || a === '+' ?((quantity ===1 && a==="-") ?"delete" :'alter') : 'delete';
    addOrDeleteItem( dispatch,{productDetails,checkedState},id, type, a, index);
  }
  return (
    <div className="border-2 m-2 mt-6 p-6 relative max-w-3xl mx-auto rounded-md">
      <input
      id={`checkbox_product_${index}`}
        role="checkbox"
        type="checkbox"
        checked={checkedState[index]}
        onChange={_ => dispatch(changeCheckedState(index,checkedState))}
        className="rounded mr-2 absolute left-4 top-4 h-4 w-4"
      />
            <label htmlFor={`checkbox_product_${index}`} className="hidden">Select Product</label>

      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-stretch	">
        <div className="lg:w-1/3 h-48 mb-4 lg:mb-0 flex items-center justify-center text-center">
          {media?.type === 'image' ? (
            <img className=" h-48 w-36 bg-gray-200" src={media?.url?.replace(/q=70/, 'q=60').replace(/http(?![s:])/,'https')} alt={titles?.title} loading={index>3 ? 'lazy' :'eager'}/>
          ) : (
            <video src={media?.url}></video>
          )}
        </div>
        <div className="lg:w-1/2 lg:ml-4 p-1 text-center lg:text-left	">
          <div className="font-semibold text-lg">
            {titles?.title.length > 65
              ? titles?.title.slice(0, 65) + ' ...'
              : titles.title}
          </div>
          <div className="font-light hidden lg:block mt-1	text-gray-400 text-sm">
            {titles?.subtitle}
          </div>
          <div className="font-light  hidden lg:block mt-1	text-gray-500 text-sm">
            {sellerDetails?.name}
          </div>
          <React.Fragment>
            <span className="font-light mt-1	text-neutral-500 text-sm line-through">
              ₹{itemPrice?.originalPrice}
            </span>
            <span className="font-bold	text-green-600 ml-1 text-lg">
              ₹{itemPrice?.discountedPrice?.toFixed(2)}
            </span>
            <span className="font-bold	text-green-600 text-md ml-4">
              {itemPrice?.percentageOff}% off
            </span>
            {itemPrice?.offersAvailable?.count > 0 ? (
              <span className="pl-2 text-xs text-gray-400	">
                {itemPrice?.offersAvailable?.count} {itemPrice?.offersAvailable?.count ===1 ?"offer":"offers"} available
              </span>
            ) : null}
          </React.Fragment>
        </div>
        <div className="w-full lg:w-3/12 flex lg:block align-between lg:justify-evenly p-2 lg:items-baseline flex-wrap	justify-center lg:text-left	">
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
          <div className="flex justify-between items-center w-44 mt-0 lg:mt-8">
            <ProductQuantity index={quantity} onChange={changeCartVolume} />
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
  );
}

export default withErrorBoundary('Product',Product);
