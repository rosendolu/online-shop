import { post } from './request';
export default {
  list(params) {
    return post('/banner/list', params, false);
  },
};
