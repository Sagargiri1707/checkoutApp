import Axios, { AxiosResponse } from 'axios';
import { GET_CART_DATA, GET_ADDRESS_DATA } from '../Constants';
import {
  AddressInterface,
  ProductDataInterface,
  SuccessResponseInterface,
} from '../Types';

export const getProductList = async (): Promise<
  AxiosResponse<{ RESPONSE: { productData: ProductDataInterface[] } }>
> => {
  const productList = await Axios.get(GET_CART_DATA);
  return productList;
};
export const getAddressList = async (): Promise<
  AxiosResponse<{ RESPONSE: { addressList: AddressInterface[] } }>
> => {
  const addressList = await Axios.get(GET_ADDRESS_DATA);
  return addressList;
};

export const completePurchase = (): Promise<SuccessResponseInterface> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() >= 0.84) {
        rej({ msg: 'Oops something went wrong' });
      }
      res({ msg: 'successfully purchased item' });
    }, 1000);
  });
