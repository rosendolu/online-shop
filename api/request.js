import config from './config';
import httpCode from './httpCode';
import $store from '../store/index';
/**
 *
 * @param {Object} params
 */
export function post(url = '', params = {}, usePost = true) {
  const { customeErr = false } = params;
  delete params.customeErr;
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.hostname + url,
      data: params,
      header: {
        'x-token': $store.state.token,
        platform: 'wxmini',
      },
      method: usePost ? 'POST' : 'GET',
      complete(res) {
        // console.log(res);
        /** 每次 app onHide 的时候 storage 存一遍 */
        const token = (res.header && res.header['x-token']) || '';
        token && $store.commit('updateToken', token);
        const err = (res && res.data && res.data.error) || null;
        if (err && !customeErr) {
          httpCode(err);
          return reject(err);
        }
        return resolve((res && res.data) || null);
      },
    });
  });
}

export default {
  post,
};
