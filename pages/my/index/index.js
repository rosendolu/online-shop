import $store from '../../../store/index';
// const log = console.log;
Page({
  data: {
    userInfo: $store.state.userInfo,
    signedIn: Object.keys($store.state.userInfo).length, // 是否登录了
  },
  checkLogin(e) {
    if (this.data.signedIn) {
      return true;
    } else {
      wx.navigateTo({
        url: '/pages/home/login/index',
      });
      return false;
    }
  },
  tapCell(e) {
    if (!this.checkLogin()) return;
    const { url } = e.target.dataset;
    url &&
      wx.navigateTo({
        url,
      });
  },
  userCenter(e) {
    if (!this.checkLogin()) return;
    console.log(e);
    // wx.navigateTo({
    //   url: '/pages/my/userCenter/index',
    // });
  },
  logout(e) {
    // const _this = this;
    wx.showModal({
      title: '提示',
      content: '退出登录后部分功能将不能正常使用！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          $store.dispatch('clearLoginState');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  },
  onLoad(options) {
    $store.subScribe('userInfo', val => {
      this.setData({
        userInfo: val,
        signedIn: JSON.stringify(val) !== '{}',
      });
    });
  },

  onReady: function () {},

  onShow() {
    // 选中tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
      });
    }
    this.setData({
      userInfo: $store.state.userInfo,
      signedIn: Object.keys($store.state.userInfo || {}).length,
    });
  },

  onHide: function () {},
  getUserInfo(e) {
    // if (!this.checkLogin()) return;
    // this.data.userInfo = e.detail.userInfo;
    // todo
    $store.commit('setLoginState', e.detail.userInfo);
  },
});
