import $util from '../../../utils/util';
import $api from '../../../api/goods';
import $banner from '../../../api/banner';
Page({
  data: {
    statusBarHeight: 0,
    vtabs: [],
    activeTab: 0,
    bannerList: [],
  },

  onLoad() {
    this.bannerList();
    this.list();
    wx.getSystemInfo({
      success: res => {
        this.setData({
          statusBarHeight: res.statusBarHeight,
        });
      },
    });
  },
  async bannerList() {
    const banner = await $banner.list({
      category: 2,
    });
    this.setData({
      bannerList: banner.data,
    });
  },
  async list() {
    let list = await $api.sortList();
    list = list.data;
    list.forEach(el => {
      el.title = el.name;
      el.list.forEach((item, index) => {
        item.taglist = item.tag
          .replace(/;|；/g, '-')
          .split('-')
          .filter(el => el)
          .map((el, i) => {
            return { id: i, name: el };
          });
      });
    });
    this.setData({
      vtabs: list,
    });
  },
  clickBanner(e) {
    const { index } = e.target.dataset;
    const href = (this.data.bannerList[index] || {}).href;
    href && $util.bannerNavigation(href);
  },
  jumpSearch() {
    wx.navigateTo({
      url: '/pages/home/search/index',
    });
  },
  onTabCLick(e) {
    const index = e.detail.index;
    console.log('tabClick', index);
  },

  onChange(e) {
    const index = e.detail.index;
    console.log('change', index);
  },

  onShow() {
    // 选中tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },

  onShareAppMessage: function () {},
});
