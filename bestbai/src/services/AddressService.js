import { ADDRESSES_URL } from '../resources/API_URL';
import { getData } from '../utils/API';

export const getUserAdresses = (userId) =>{ 
  const url = ADDRESSES_URL + '?userId=' + userId;
  return getData(url);
};