import $util from '../../../utils/util';
// import $store from '../../../store/index';
import $banner from '../../../api/banner';
import $goods from '../../../api/goods';
let _this = null;
// const log = console.log;
Page({
  data: {
    bannerList: [],
    alpha: 0, // navigation 不透明度
    list: [],
    swiperIndex: 0,
    limit: 100,
    offset: 0,
  },
  jumpSort(e) {
    wx.switchTab({
      url: '/pages/sort/index/index',
    });
  },
  clickBanner(e) {
    const { index } = e.target.dataset;
    const href = this.data.bannerList[index].href;
    href && $util.bannerNavigation(href);
  },
  swiperChange(e) {
    this.setData({
      swiperIndex: e.detail.current,
    });
  },

  clickLeft() {
    //
  },
  onPageScroll: $util.throttle(e => {
    // navigation 渐变背景颜色
    let { scrollTop = '' } = e;
    scrollTop = Math.min(scrollTop / 255, 1);
    // log(scrollTop);
    _this.data.alpha - scrollTop !== 0 &&
      _this.setData({
        alpha: scrollTop,
      });
  }),
  onShow(e) {
    // 选中tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
  },
  async onLoad() {
    _this = this;
    this.bannerList();
    this.list();
  },
  async bannerList() {
    const banner = await $banner.list({
      category: 1,
    });
    this.setData({
      bannerList: banner.data,
    });
  },
  async list() {
    // const { limit, offset } = this.data;
    const list = await $goods.list({
      category: 0,
    });
    this.setData({
      list: list.data,
    });
  },
});
