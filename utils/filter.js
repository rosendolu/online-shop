/**
 * 隐藏中间四位手机号
 * @param {*} str 手机号
 */
export const hidePhone = (str) => {
  if (str.length === 11) {
    return str.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
  }
  return str;
};

/**
 * 生成随机字符串
 * @param {*} len 长度
 */
export const randomStr = (len) => {
  var result = '';
  var chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  var min = 0;
  var max = chars.length - 1;
  for (var i = 0; i < len; ++i) {
    result += chars[Math.floor(Math.random() * (max - min + 1)) + min];
  }
  return result;
};
// 节流
export const throttle = function (func, delay) {
  var prev = Date.now();
  return function (...args) {
    var now = Date.now();
    if (now - prev >= delay) {
      var context = this;
      func.apply(context, args);
      prev = Date.now();
    }
  };
};

/**
 * 格式化数字
 * @param {*} num 超多1000显示为k，依次类推
 */
export const beautifulNumber = (num) => {
  if (Number.isNaN(num)) {
    return num + '';
  } else if (num < 1000) {
    return num + '';
  } else if (num < 10000) {
    return `${(num / 1000).toFixed(1)}k`;
  } else if (num <= 100000) {
    return `${(num / 10000).toFixed(1)}w`;
  } else {
    return '10w+';
  }
};

/**
 * 格式化数字
 * @param {*} num 131 1234 0010
 */
export const formatPhone = (num) => {
  const str = `${num}`.split(' ').join('');
  if (str.length > 3) {
    if (str.length > 7) {
      return str.slice(0, 3) + ' ' + str.slice(3, 7) + ' ' + str.slice(7);
    }
    return str.slice(0, 3) + ' ' + str.slice(3, 7);
  }
  return str;
};

export default {
  hidePhone,
  formatPhone,
  beautifulNumber,
  randomStr
};
