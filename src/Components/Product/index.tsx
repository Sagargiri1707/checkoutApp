import Button from '../Button';
import Rating from '../Rating';
import ProductQuantity from '../ProductQuantity/ProductQuantity';
import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import { ProductProps } from '../../Types';

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
    event: React.MouseEvent<HTMLButtonElement>,
    a: '+' | '-'
  ) {
    const type = a === '-' || a === '+' ? 'alter' : 'delete';
    addOrDeleteItem(id, type, a, index);
  }
  return (
    <div className="border-2 m-2 mt-6 w-2/3 p-6 relative">
      <input
        type="checkbox"
        checked={checkedState[index]}
        onChange={e => changeCheckedState(index)}
        className="rounded mr-2 absolute left-4 top-4 h-4 w-4"
      />
      <div className="flex justify-between">
        <div className="h-48 ">
          {media.type === 'image' ? (
            <img className=" h-full w-auto" src={media.url} />
          ) : (
            <video src={media.url}></video>
          )}
        </div>
        <div className="w-5/12">
          <div className="font-semibold text-lg">{titles.title}</div>
          <div className="font-light	text-slate-400 text-sm">
            {titles.subtitle}
          </div>
          <div className="font-light	text-slate-400 text-sm">
            {sellerDetails.name}
          </div>
          <div>
            <span className="font-light	text-neutral-500 text-sm line-through">
              ₹{itemPrice.originalPrice}
            </span>
            <span className="font-bold	text-green-500 text-lg">
              ₹{itemPrice.discountedPrice}
            </span>
            <span className="font-bold	text-green-500 text-lg ml-4">
              {itemPrice.percentageOff}% off
            </span>
            {itemPrice.offersAvailable.count > 0 ? (
              <span>{itemPrice.offersAvailable.count} offers available</span>
            ) : null}
          </div>
        </div>
        <div className="w-3/12 align-between">
          <div className="mb-4">
            <span>Delivery by {deliveryDetails.eta}</span>
            <div
              className={
                deliveryDetails.isdeliveryChargeWaived
                  ? 'text-green-500 font-semibold line-through'
                  : ''
              }
            >
              {deliveryDetails.deliveryCharge} Delivery charge
            </div>
          </div>
          {ratingValue && <Rating {...ratingValue} />}
          <div className="flex justify-between mt-8">
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

export default Product;
