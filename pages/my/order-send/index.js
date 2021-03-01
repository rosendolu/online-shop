import $orderApi from '../../../api/order';
import $store from '../../../store/index';
const log = console.log;
Page({
  data: {
    active: '2',
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
  handleButtonTap(e) {
    const { index = -1 } = e.currentTarget.dataset;
    if (index < 0) return;
    this.updateOrder(index);
  },
  async updateOrder(index) {
    const { orderId, state } = this.data.list[index];
    if (state === 4) return;
    await $orderApi.update({
      orderId,
      state: state + 1,
    });
    this.data.list.splice(index, 1);
    this.setData({
      list: this.data.list,
    });
  },
  checkDetail(e) {
    const { index = -1 } = e.currentTarget.dataset;
    if (index < 0) return;
    log(this.data.list[index]);
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
