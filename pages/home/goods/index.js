import $util from '../../../utils/util';
import $goods from '../../../api/goods';
import $store from '../../../store/index';
// const log = console.log;
Page({
  data: {
    count: 1, // 购买数量
    showDot: false,
    skuIndex: -1,
    selected: null, // 选择的
    sku: null, // 组合显示
    bannerList: [],
    goods: {},
    id: '',
  },

  onLoad(options) {
    const { id } = options;
    this.data.id = id;
    this.getDetail(id);
  },
  async getDetail(id) {
    const res = await $goods.detail({ id });
    this.setData({
      goods: res.data,
      bannerList: res.data.imgs.map((el, i) => {
        return { id: i, src: el };
      }),
    });
  },
  tapCell(e) {
    const { fn = '' } = e.target.dataset;
    fn && this[fn]();
  },
  selectSku() {
    if (!this.data.goods.sku.length) {
      $util.toast('当前商品暂无其他规格！');
      return;
    }
    this.selector &&
      this.selector.setData({
        show: true,
      });
  },
  slectNum() {
    //
  },
  clickBanner(e) {
    // $util.bannerNavigation(e);
    const { index = 0 } = e.target.dataset;
    wx.previewMedia({
      sources: this.data.bannerList.map(el => {
        return {
          type: 'image',
          url: el.src,
        };
      }),
      current: index,
    });
  },
  onClickIcon() {
    wx.switchTab({
      url: '/pages/shopping-cart/index/index',
    });
  },

  onReady() {
    this.selector = this.selectComponent('.goods');
  },
  addToShoppingCart() {
    let { selected, goods, count } = this.data;
    const goodsHash = goods.hash;
    if (selected) {
      goods = selected;
    }
    const { total, hash } = goods;
    if (total < count) {
      $util.toast('当前商品库存不足！');
      if (goods.sku.length) {
        setTimeout(() => {
          this.selectSku();
        }, 2000);
      }
      return;
    }
    const params = { goodsHash, count: count, buyHash: hash };
    try {
      $store.dispatch('addCart', params);
      this.setData({
        showDot: true,
      });
    } catch (error) {}
  },
  buyNow() {
    let { selected, goods, count } = this.data;
    if (selected) {
      goods = selected;
    }
    const { total } = goods;
    if (total < count) {
      $util.toast('当前商品库存不足！');
      if (goods.sku.length) {
        setTimeout(() => {
          this.selectSku();
        }, 2000);
      }
    } else {
      const item = this.format();
      $store.commit('updateOrder', [item]);
      wx.navigateTo({
        url: '/pages/shopping-cart/pay/index',
      });
    }
  },
  format() {
    const { selected, goods, count } = this.data;
    let { id, hash, total, price, title, imgs } = goods;
    let buyHash = hash;
    let poster = imgs[0];
    let skuname = '';
    if (selected) {
      buyHash = selected.hash;
      total = selected.total;
      price = selected.price;
      poster = selected.img;
      skuname = selected.name;
    }
    return {
      id,
      count,
      buyHash,
      goodsHash: hash,
      goods: {
        total,
        price,
        title,
        poster,
        skuname,
      },
    };
  },
  skuChange(e) {
    const { index, count, showDot } = e.detail;
    const sku = this.data.goods.sku[index];
    this.setData({
      skuIndex: index,
      selected: sku,
      count,
      showDot,
      sku: `${sku.name}  ${count}件`,
    });
  },
  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {},
});
