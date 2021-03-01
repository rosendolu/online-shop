import $orderApi from '../../../api/order';
import $store from '../../../store/index';
const log = console.log;
Page({
  data: {
    active: '0',
    limit: 10,
    offset: 0,
    nomore: false,
    list: [],
  },
  tabChange(e) {
    this.setData({
      active: e.detail.name,
    });
    this.regetList();
  },
  regetList() {
    this.data.offset = 0;
    this.data.nomore = false;
    this.getList();
  },
  checkDetail(e) {
    const { index } = e.currentTarget.dataset;
    $store.commit('setSuccessList', this.data.list[index]);
    wx.navigateTo({ url: '/pages/shopping-cart/paySuccess/index' });
  },
  onLoad(options) {
    this.getList();
  },
  async getList(loadmore = false) {
    let { limit, offset, nomore, active, list } = this.data;
    if (nomore) return;

    let res = await $orderApi.adminList({
      limit,
      offset,
      // state: 1,
      state: active - 0,
    });
    res = res.data;
    if (loadmore) {
      list.push(...res.list);
    } else {
      list = res.list;
    }
    if (res.list.length < limit) {
      this.data.nomore = true;
    }
    this.setData({
      list: list,
    });
    this.data.offset += res.list.length;
  },
  onReady: function () {},

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom() {
    this.getList(true);
  },

  onShareAppMessage: function () {},
});
