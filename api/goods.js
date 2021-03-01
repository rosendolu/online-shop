import { post } from './request';
const pre = '/goods';
export default {
  list(params) {
    return post(`${pre}/list/client`, params, false);
  },
  sortList(params) {
    return post(`${pre}/list/sort`, params, false);
  },
  detail(params) {
    return post(`${pre}/detail`, params, false);
  },
};
