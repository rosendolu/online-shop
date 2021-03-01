import $orderApi from '../../../api/order';
import $util from '../../../utils/util';
// const log = console.log;
Page({
  data: {
    info: {},
    active: '1',
    limit: 10,
    list: [],
    takeoutlist: [],
    offset: [0, 0],
    nomore: [false, false],
  },
  widthDraw(e) {
    wx.navigateTo({
      url: '/pages/my/widthdraw/index',
    });
  },
  tabChange(e) {
    this.setData({
      active: e.detail.name,
    });
    const { active, offset } = this.data;
    if (!offset[active - 1]) {
      this.getList();
    }
  },

  onLoad(options) {
    this.getList();
    this.getDetail();
  },
  async getDetail() {
    let res = await $orderApi.cash();
    res = res.data;
    Object.keys(res).forEach(key => {
      res[key] = $util.formatCash(res[key]);
    });
    this.setData({
      info: res,
    });
  },
  async getList(loadmore = false) {
    let { limit, offset, nomore, active, list, takeoutlist } = this.data;
    active = Number(active);
    nomore = nomore[active - 1];
    offset = offset[active - 1];
    let newlist = active === 1 ? list : takeoutlist;
    if (nomore) return;
    let res = await $orderApi.cashList({
      limit,
      offset,
      // state: 1,
      type: active === 1 ? 'rebate' : 'takeout',
    });
    res = res.data;

    if (loadmore) {
      newlist.push(...res.list);
    } else {
      newlist = res.list;
    }
    if (res.list.length < limit) {
      this.data.nomore[active - 1] = true;
    }
    this.setData(
      active === 1
        ? {
            list: newlist,
          }
        : { takeoutlist: newlist }
    );
    this.data.offset[active - 1] += res.list.length;
  },
  onReachBottom() {
    this.getList(true);
  },
  onReady: function () {},

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onShareAppMessage: function () {},
});
