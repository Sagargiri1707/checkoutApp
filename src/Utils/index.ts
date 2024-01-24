import productList from '../ApiResponses/CheckoutApiResponse.json';
import addressList from '../ApiResponses/AddressListResponse.json';
import Axios from 'axios';
import { GET_CART_DATA } from '../Constants';
interface SuccessResponse {
  msg: string;
}
export const getProductList = async () => {
  const productList = await Axios.get(GET_CART_DATA);
  return productList;
};
new Promise((res, rej) => {
  setTimeout(() => res(productList), 1000);
});

export const getAddressList = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(addressList), 1000);
  });

export const completePurchase = (): Promise<SuccessResponse> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() >= 0.84) {
        rej({ msg: 'Oops something went wrong' });
      }
      res({ msg: 'successfully purchased item' });
    }, 1000);
  });
