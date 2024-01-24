import productList from '../ApiResponses/CheckoutApiResponse.json';
import addressList from '../ApiResponses/AddressListResponse.json';
interface SuccessResponse {
  msg: string
}
export const getProductList = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(productList), 1000);
  });

export const getAddressList = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(addressList), 1000);
  });

export const completePurchase = ():Promise<SuccessResponse> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() >= 0.84) {
        rej({ msg: 'Oops something went wrong' });
      }
      res({msg:"successfully purchased item"});
    }, 1000);
  });
