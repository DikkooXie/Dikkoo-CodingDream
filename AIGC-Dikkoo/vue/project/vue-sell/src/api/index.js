import { get } from './axios.js';

const getSeller = get('seller');
const getGoods = get('goods');

export {
  getSeller,
  getGoods
}