import { post } from './request';
const pre = '/order';
export default {
  list(params) {
    return post(`${pre}/user/list`, params);
  },
  create(params) {
    return post(`${pre}/create`, params);
  },
  adminList(params) {
    return post(`${pre}/super/list`, params, false);
  },
  update(params) {
    return post(`${pre}/update`, params);
  },
  paycheck(params) {
    return post('/wxpay/state', params, false);
  },
  cash(params) {
    return post('/cash/balance', params, false);
  },
  cashList(params) {
    return post('/cash/list', params, false);
  },
};
