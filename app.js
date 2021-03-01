// app.js
import $store from './store/index';
// import $util from './utils/util';
const log = console.log;
App({
  async onLaunch(options) {
    // const res = await $util.promisefy(wx.login)();
    // log(res); // res.code
    // log('onLaunch options', options);
    // 获取用户信息
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: (res) => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           // this.globalData.userInfo = res.userInfo;
    //           $store.commit('setLoginState', res.userInfo);
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res);
    //           }
    //         }
    //       });
    //     }
    //   }
    // });
    // 展示本地存储能力
    // const userInfo = wx.getStorageSync('userInfo') || {};
    // wx.setStorageSync('logs', logs);
    // if ($store.state.userInfo.nickName) {
    //   wx.switchTab({
    //     url: '/pages/home/index/index'
    //   });
    // }
    // else {
    //   // 登录
    //   wx.redirectTo({
    //     url: '/pages/home/auth/index'
    //   });
    // }
  },
  onHide(options) {
    log('App onHide options', options);
    $store.dispatch('cache');
  },
  onShow(options) {
    log('App onshow options', options);
    $store.dispatch('updateUserInfo');
    $store.dispatch('validateFanCode');
  },
  globalData: {},
});
