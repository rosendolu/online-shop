import { post } from './request';
export default {
  list(params) {
    return post('/cart/list', params, false);
  },
  del(params) {
    return post('/cart/del', params, false);
  },
  add(params) {
    return post('/cart/add', params, false);
  },
};
