import { MouseEventHandler } from 'react';
export type ContextItem = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
};

export interface AddressInterface {
  id?: number;
  city: string;
  isDefault?: boolean;
  landmark: string;
  locationTypeTag?: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  address: string;
}

export interface ButtonPropsInterface {
  text: string;
  onChange: (e: MouseEventHandler<HTMLButtonElement>, id: string) => void;
  id: number;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  disabled?: boolean;
  customClass?: string;
}

interface Media {
  type: string;
  url: string;
}

interface RatingValue {
  type: string;
  average: number;
  base: number;
  count: number;
  roundOffCount: string;
}

interface Titles {
  subtitle: string;
  title: string;
}

interface DeliveryDetails {
  eta: string;
  deliveryCharge: string;
  isdeliveryChargeWaived: boolean;
  isFasterDeliveryAvailable: boolean;
  time: number;
}

interface SellerDetails {
  name: string;
}

interface ItemPrice {
  originalPrice: number;
  discountedPrice: number;
  percentageOff: number;
  offersAvailable: {
    count: number;
  };
}
export interface ProductDataInterface {
  id: number;
  media: Media;
  quantity: number;
  ratingValue: RatingValue;
  titles: Titles;
  deliveryDetails: DeliveryDetails;
  sellerDetails: SellerDetails;
  itemPrice: ItemPrice;
}
export interface SuccessResponseInterface {
  msg: string;
}

export interface GlobalAppContextPropsInterface {
  productDetails: {
    productData: ProductDataInterface[];
  };
  adressDetails: {
    addressList: AddressInterface[];
  };
  checkedState: boolean[];
  changeCheckedState: (index: number) => void;
  currentStep: number;
  changeCurrentStep: (step: number) => void;
  currentAddress: number;
  changeCurrentAdress: (index: number, isChecked: boolean) => void;
  addNewAdress: (address: AddressInterface) => void;
  addOrDeleteItem: (
    id: number,
    type: 'delete' | 'alter',
    sign: '+' | '-',
    index: number
  ) => void;
  successLoader: boolean;
  purchaseItem: () => void;
}

export interface RatingPropsInterface {
  average: number;
  count: number;
}

export interface ProductQuantityProps {
  index: number;
  onChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    action: string
  ) => void;
}

export interface ProductProps {
  id: number;
  index: number;
  media: {
    type: string;
    url: string;
  };
  titles: {
    title: string;
    subtitle: string;
  };
  sellerDetails: {
    name: string;
  };
  itemPrice: {
    originalPrice: number;
    discountedPrice: number;
    percentageOff: number;
    offersAvailable: {
      count: number;
    };
  };
  deliveryDetails: {
    eta: string;
    deliveryCharge: string;
    isdeliveryChargeWaived: boolean;
    isFasterDeliveryAvailable: boolean;
  };
  ratingValue: {
    type: string;
    average: number;
    base: number;
    count: number;
    roundOffCount: string;
  };
  quantity: number;
}
export interface AddressProps {
  isSelected: boolean;
  index: number;
  name: string;
  address: string;
  isDefault: boolean;
  landmark: string;
  state: string;
  pincode: string;
  city: string;
  phone: string;
  onChange: (index: number) => void;
}
