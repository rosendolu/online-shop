/* eslint-disable no-unused-vars */
// import $orderApi from '../../../api/order';
// import $commonApi from '../../../api/common';
import $store from '../../../store/index';
import $util from '../../../utils/util';
const log = console.log;
Page({
  data: {
    paidGoods: {},
    list: [],
  },

  onLoad(options) {
    const { goods } = $store.state.paidGoods;

    this.setData({
      paidGoods: $store.state.paidGoods,
      list: goods,
      userInfo: $store.state.userInfo,
    });
  },
  call(e) {
    const { phone = '' } = e.currentTarget.dataset;
    log(e);
    phone &&
      wx.makePhoneCall({
        phoneNumber: `${phone}`,
      });
  },
  copyId() {
    wx.setClipboardData({
      data: this.data.paidGoods.orderId,
      success(res) {
        $util.toast('已复制到剪切板');
        // wx.getClipboardData({
        //   success (res) {
        //     console.log(res.data) // data
        //   }
        // })
      },
    });
  },
});
