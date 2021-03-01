import { post } from './request';
export default {
  addrList() {
    return post('/address/list', {}, false);
  },
  feedback(params) {
    return post('/feedback/create', params);
  },
};
