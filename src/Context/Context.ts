import { createContext } from 'react';
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
interface ProductData {
  id: number;
  media: Media;
  quantity: number;
  ratingValue: RatingValue;
  titles: Titles;
  deliveryDetails: DeliveryDetails;
  sellerDetails: SellerDetails;
  itemPrice: ItemPrice;
}

interface Address {
  id: number;
  city: string;
  isDefault: boolean;
  landmark: string;
  locationTypeTag: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  address: string;
}
interface GlobalAppContextProps {
  productDetails: {
    productData: ProductData[];
    // Add other properties based on your actual data structure
  };
  addressVal: {
    addressList: Address[];
    // Add other properties based on your actual data structure
  };
  checkedState: boolean[];
  changeCheckedState: (index: number) => void;
  currentStep: number;
  changeCurrentStep: (step: number) => void;
  currentAddress: boolean[];
  changeCurrentAdress: (index: number) => void;
  addNewAdress: (address: Address) => void;
  addOrDeleteItem: (
    id: number,
    type: 'delete' | 'alter',
    sign: '+' | '-'
  ) => void;
  successLoader: boolean;
  purchaseItem: () => void;
}

export const GlobalAppContext = createContext<GlobalAppContextProps>('');
