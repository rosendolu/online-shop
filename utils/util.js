export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
};

export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
/**
 * 申请相册权限
 */

export async function writePhotoAlbum() {
  const res = await promisefy(wx.getSetting)();
  if (!res) return false;
  if (res.authSetting['scope.writePhotosAlbum']) return true;
  const auth = await promisefy(wx.authorize)({ scope: 'scope.writePhotosAlbum' });
  if (auth) return true;
  await promisefy(wx.showModal)({
    title: '提示',
    content: '授权保存图片到本地相册',
    showCancel: false,
  });
  const reAuth = await promisefy(wx.openSetting)();
  if (!reAuth) {
    wx.showToast({
      icon: 'none',
      title: '没有权限访问相册，将无法保存图片到本地，请先同意授权',
    });
    return false;
  }
  if (reAuth.authSetting['scope.writePhotosAlbum']) {
    return true;
  }
}

/**
 *
 * @param {fn}
 */
export function promisefy(fn) {
  return (payload = {}) => {
    return new Promise((resolve, reject) => {
      fn({
        ...payload,
        success: res => {
          resolve(res);
        },
        fail: err => {
          console.error(err);
          resolve(null);
        },
        complete: res => {},
      });
    });
  };
}
// 广告banner 跳转
export function bannerNavigation(url) {
  // web:url
  // page:pages/home/index?id=1
  const [prefix, path] = url.split(/:|：/);
  switch (prefix) {
    case 'web':
      wx.navigateTo({
        url: `/pages/webview/index?src=${encodeURIComponent(path)}`,
      });
      break;
    case 'page':
      path &&
        wx.navigateTo({
          url: path,
        });
      break;
  }
}

export const throttle = (fn, wait = 200) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
export function formatGoods(params = {}) {
  // params.buy = buy;
  // params.hash = params.sku.hash;
  return {
    title: params.title,
    buyHash: params.hash,
    hash: params.hash,
    price: params.price,
    count: 1,
    total: 1,
    poster: params.imgs[0],
  };
}
export function toast(msg = '') {
  wx.showToast({ icon: 'none', title: msg });
}
export async function modalToast(content, cfg = {}) {
  const res = await promisefy(wx.showModal)({
    title: '提示',
    content,
    showCancel: false,
    // cancelColor: '#F8F8F8',
    confirmColor: '#1AAD19',
    ...cfg,
  });
  return res;
}
// 单位为分
export function formatCash(fen = '0') {
  fen += '';
  if (fen.length < 2) {
    fen += '0';
  }
  const tail = fen.slice(-2);
  const yuan = fen.slice(0, fen.length - 2);
  // return `${yuan}`.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + `.${tail}`;
  return `${Number(yuan).toLocaleString()}.${tail}`;
}
export default {
  writePhotoAlbum,
  modalToast,
  formatTime,
  promisefy,
  formatNumber,
  bannerNavigation,
  throttle,
  formatGoods,
  formatCash,
  toast,
};
