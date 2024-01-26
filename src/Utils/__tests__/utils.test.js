
import axios from 'axios';
import {
  getProductList,
  getAddressList,
  completePurchase,
} from '../index'; 
import {GET_ADDRESS_DATA,GET_CART_DATA} from '../../Constants/index'
jest.mock('axios');

describe('API Functions', () => {
  test('getProductList should fetch product list correctly', async () => {
    const mockProductData = [{ id: 1, name: 'Product 1' }];
    const mockedResponse = { data: { RESPONSE: { productData: mockProductData } } };

    axios.get.mockResolvedValue(mockedResponse);

    const result = await getProductList();

    expect(result.data.RESPONSE.productData).toEqual(mockProductData);
    expect(axios.get).toHaveBeenCalledWith(GET_CART_DATA);
  });

  test('getAddressList should fetch address list correctly', async () => {
    const mockAddressData = [{ id: 1, city: 'City 1' }];
    const mockedResponse = { data: { addressList: mockAddressData } };

    axios.get.mockResolvedValue(mockedResponse);

    const result = await getAddressList();

    expect(result.data.addressList).toEqual(mockAddressData);
    expect(axios.get).toHaveBeenCalledWith(GET_ADDRESS_DATA);
  });

  test('completePurchase should resolve with success message on successful purchase', async () => {
    Math.random = jest.fn(() => 0.1);

    const result = await completePurchase();

    expect(result.msg).toBe('successfully purchased item');
  });

  test('completePurchase should reject with error message on purchase failure', async () => {
    Math.random = jest.fn(() => 0.85);

    await expect(completePurchase()).rejects.toEqual({ msg: 'Oops something went wrong' });
  });
});
