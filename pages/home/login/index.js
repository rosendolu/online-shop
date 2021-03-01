import $store from '../../../store/index';
import $util from '../../../utils/util';
import $api from '../../../api/user';
// const log = console.log;
Page({
  data: {
    seconds: 0,
    loading: false,
    phone: '',
    verifyCode: '',

    fanCode: '', // 推荐手机号
  },

  onLoad(options) {},
  runTimer(seconds) {
    if (seconds < 0) {
      return;
    }
    setTimeout(() => {
      this.setData({
        seconds: seconds - 1,
      });
      this.runTimer(this.data.seconds);
    }, 1000);
  },
  sendCode() {
    if (this.data.seconds > 0) return;
    this.setData({
      seconds: 60,
    });
    this.runTimer(60);
  },
  inputCode(e) {
    const val = e.detail.value.trim();
    this.data.verifyCode = val;
    if (val.length === 6) {
      wx.hideKeyboard();
    }
  },
  onFocus(e) {
    // const { key } = e.currentTarget.dataset;
    // this.data[key] = e.detail.value;
    // this.setData({
    // })
  },
  bindHideKeyboard(e) {
    // log(e);
    const val = e.detail.value.trim();
    this.data.phone = val;
    if (val.length === 11) {
      // 收起键盘
      wx.hideKeyboard();
    }
  },
  skip(e) {
    wx.navigateBack();
  },
  openContact() {},
  async getUserInfo(e) {
    this.setData({ loading: true });
    console.log(e.detail.userInfo);
    const { nickName, gender, avatarUrl } = e.detail.userInfo;
    const wxCode = await $util.promisefy(wx.login)();

    let res = await $api.login({
      type: 'wxapp',
      params: {
        newUser: {
          nickname: nickName,
          avatar: avatarUrl,
          gender,
        },
        code: wxCode.code,
      },
    });
    res = res.data;
    $store.commit('setLoginState', res);
    $store.dispatch('cache');
    if (!res.phone) {
      // 弹出绑定手机号窗口
      this.selectComponent('.popup').setData({
        show: true,
      });
      // return;
    } else {
      this.setData({ loading: false });
      wx.navigateBack();
    }
    // this.setData({ loading: false });

    // wx.switchTab({
    //   url: '/pages/sort/index/index'
    // });
    // const { fanCode } = this.data;
    // fanCode && $store.commit('setfanCode', fanCode);
    // wx.switchTab({
    //   url: '/pages/home/index/index'
    // });
  },
  onReady() {},

  onShow() {},

  onHide() {},
});
