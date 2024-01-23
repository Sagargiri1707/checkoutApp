import Button from '../Button';
import Rating from '../Rating'
import ProductQuantity from '../../ProductQuantity/ProductQuantity';
import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context'

function Product(props) {
    const { checkedState, changeCheckedState } = useContext(GlobalAppContext);

    function changeCartVolume(item,a){
        console.log(item,a)
    }
    return (
        <div className="border-2 m-2 mt-6 w-2/3 p-6 relative">
            <input
                type="checkbox"
                checked={checkedState[props.id]}
                onChange={(e) => changeCheckedState(props.id)}
                className="rounded mr-2 absolute left-4 top-4 h-4 w-4"
            />
            <div className="flex justify-between">
                <div className="h-48 ">
                    {
                    props.media.type === "image" ? <img className=" h-full w-auto" src={props.media.url} /> : <video src={props.media.url}></video>
                }

                </div>
                <div className="w-5/12">
                    <div className="font-semibold text-lg">{props.titles.title}</div>
                    <div className="font-light	text-slate-400 text-sm">{props.titles.subtitle}</div>
                    <div className="font-light	text-slate-400 text-sm">{props.sellerDetails.name}</div>
                    <div>
                        <span className="font-light	text-neutral-500 text-sm line-through">{props.itemPrice.originalPrice}</span>
                        <span className="font-bold	text-green-500 text-lg">{props.itemPrice.discountedPrice} {props.itemPrice.percentageOff}% off</span>
                        {props.itemPrice.offersAvailable > 0 ? <span>{props.itemPrice.offersAvailable.count
                        } offers available</span> : null}
                    </div>
                </div>
                <div className="w-3/12 align-between">
                    <div className='mb-4'>
                        <span>
                            Delivery by {props.deliveryDetails.eta}

                        </span>
                        <div className={props.deliveryDetails.isdeliveryChargeWaived ? "text-green-500 font-semibold line-through" : ""}>
                            {props.deliveryDetails.deliveryCharge} Delivery charge
                        </div>
                        {props.deliveryDetails.isFasterDeliveryAvailable && <span>
                            If ordered within timer component
                        </span>}
                    </div>
                    
                    

                    {props.ratingValue && <Rating {...props.ratingValue} />}

                    {/* <DropDown ctatext={props.quantity} options={[1, 2, 3, 4, 5]} onChange={changeCartVolume}/> */}
                    <div className='flex justify-between mt-8'>

                        <ProductQuantity index={props.quantity} onChange={changeCartVolume} />
                        <Button text={"Delete"} id={props.id} onChange={changeCartVolume} color="rose" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
