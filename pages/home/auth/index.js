import $store from '../../../store/index';
import $userApi from '../../../api/user';
import $util from '../../../utils/util';
// const log = console.log;
Page({
  data: {
    placeHolder: '请输入尊享会员邀请范码',
    loading: false,
    focus: true,
    submitTimes: 0,
    fanCode: '',
    retryTimes: 0,
  },

  /**
   *
   * 微信登录 获取用户信息 userInfo
   *
   */
  async onLoad(options) {
    // if (Object.keys($store.state.userInfo).length) {
    //   wx.switchTab({
    //     url: '/pages/home/index/index'
    //   });
    //   return;
    // }
    // const res= await $util.promisefy(wx.login)();
    // log(res);
  },
  onFocus() {
    this.setData({
      focus: true,
    });
  },
  blur() {
    this.setData({
      focus: false,
    });
  },
  bindHideKeyboard(e) {
    // log(e);
    const val = e.detail.value.trim();
    this.data.fanCode = val;
    if (val.length === 6) {
      wx.hideKeyboard();
      this.start();
    }
  },
  start(e) {
    const { fanCode } = this.data;
    if (!fanCode) {
      this.onFocus();
    } else {
      this.validate(fanCode);
    }
  },
  runTimer() {
    setTimeout(() => {
      this.data.retryTimes = 0;
    }, 10 * 60 * 1000);
  },
  async validate(fanCode) {
    this.setData({ loading: true });
    if (this.data.retryTimes > 10) {
      $util.toast('验证失败次数过多，请稍后再试！');
      this.runTimer();
      this.setData({ loading: false });
      return;
    }
    if (fanCode.length !== 6) {
      $util.toast('无效邀请码！');
      this.setData({ loading: false });
      return;
    }
    try {
      await $userApi.validate({ fanCode });
      fanCode && $store.commit('setfanCode', fanCode);
      wx.navigateBack({
        fail() {
          wx.switchTab({
            url: '/pages/home/index/index',
          });
        },
      });
    } catch (error) {
      this.data.retryTimes += 1;
    }
    this.setData({ loading: false });
  },
  openContact() {},
  getUserInfo(e) {
    this.userInfo = e.detail.userInfo;
    if (this.data.fanCode) {
      // todo
      $store.commit('setLoginState', e.detail.userInfo);
      // wx.switchTab({
      //   url: '/pages/sort/index/index'
      // });
    } else {
      // this.onFocus();
      if (this.data.submitTimes >= 3) {
        // 打开客服
        // this.openContact();
      }
      this.data.submitTimes += 1;

      // this.shake();
    }
  },
  onReady() {},

  onShow() {},

  onHide() {},
});
