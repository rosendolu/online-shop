import $store from '../store/index';
// const app = getApp()

Component({
  data: {
    show: true,
    selected: 0,
    badge: 0,
    list: [
      {
        pagePath: 'pages/home/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/sort/index/index',
        text: '分类',
      },
      {
        pagePath: 'pages/shopping-cart/index/index',
        text: '购物车',
        badge: true,
      },
      {
        pagePath: 'pages/my/index/index',
        text: '我的',
      },
    ],
  },
  lifetimes: {
    attached() {
      $store.subScribe('cartNum', val => {
        this.setData({
          badge: val,
        });
      });
    },
  },

  methods: {
    switchTab(e) {
      // 如需实现 tab 选中态，要在当前页面下，通过 getTabBar 接口获取组件实例，并调用 setData 更新选中态。可参考底部的代码示例
      const { index } = e.currentTarget.dataset;
      wx.switchTab({
        url: `/${this.data.list[index].pagePath}`,
      });
    },
  },
});
