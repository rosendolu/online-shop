import { post } from './request';
export default {
  login(params) {
    return post('/user/login', params);
  },
  logout(params) {
    return post('/user/logout', params, false);
  },
  update(params) {
    return post('/user/update', params);
  },
  detail(params) {
    return post('/user/detail', params, false);
  },
  loginState() {
    return post('/user/login/state', {}, false);
  },
  validate(params) {
    return post('/user/fancode/validate', params, false);
  },
};
