import $util from '../utils/util';
export default async function handleErrCode(err = {}) {
  const { code, message = '服务器异常错误' } = err;
  let tmp = null;
  switch (code) {
    case 3332:
      tmp = await modalToast('用户尚未登陆');
      if (tmp && tmp.confirm) {
        Login();
      }
      break;
    default:
      toast(message);
      break;
  }
}

function toast(msg) {
  wx.showToast({
    icon: 'none',
    title: msg,
  });
}
async function modalToast(content, cfg = {}) {
  const res = await $util.promisefy(wx.showModal)({
    title: '提示',
    content,
    showCancel: false,
    // cancelColor: '#F8F8F8',
    confirmColor: '#1AAD19',
    ...cfg,
  });
  return res;
}
export function Login(params) {
  wx.navigateTo({
    url: '/pages/home/login/index',
  });
}
