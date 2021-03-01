import $store from '../../../store/index';
import $api from '../../../api/shopping-cart';
const log = console.log;
Page({
  data: {
    list: [],
    selectedAll: false,
    slideButtons: [
      {
        type: 'warn',
        text: '删除',
        extClass: 'delete',
      },
    ],
    totalMoney: 0,
    loading: false,
    showTips: false,
  },

  onLoad(options) {
    // 购物车数据 每次都从新初始化
  },

  onShow() {
    // 选中tabbar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
    this.getList();
  },
  async getList() {
    try {
      let res = await $api.list();
      res = res.data;
      let sum = 0;
      res.forEach(el => {
        el.selected = true;
        sum += (el.goods.price - 0) * el.count;
      });
      $store.commit('setCartNum', res.length);
      this.setData({
        list: res,
        selectedAll: true,
        totalMoney: sum * 100,
      });
    } catch (error) {}
  },
  onSubmit(e) {
    const list = this.data.list.filter(el => el.selected);
    if (list.length === 0) {
      this.setData({
        showTips: true,
      });
      return;
    }
    log(list);
    $store.commit('updateOrder', list);
    wx.navigateTo({
      url: '/pages/shopping-cart/pay/index',
    });
  },

  selectAll(e) {
    // log(e);
    const { selectedAll } = this.data;
    let sum = 0;
    if (selectedAll) {
      this.data.list.forEach(el => {
        el.selected = false;
      });
    } else {
      this.data.list.forEach(el => {
        sum += (el.goods.price - 0) * el.count;
        el.selected = true;
      });
    }
    this.setData({
      showTips: false,
      list: this.data.list,
      selectedAll: !selectedAll,
      totalMoney: sum * 100,
    });
  },
  selectItem(e) {
    const { index = -1 } = e.target.dataset;
    if (index < 0) return;
    log(index);

    const list = this.data.list;
    const selected = list[index].selected;

    if (selected) {
      list[index].selected = false;
    } else {
      list[index].selected = true;
    }

    this.setData({
      list: list,
      showTips: false,
      selectedAll: list.filter(el => !el.selected).length === 0,
      totalMoney:
        list.reduce((acc, el) => {
          if (el.selected) {
            acc += (el.goods.price - 0) * el.count;
          }
          return acc;
        }, 0) * 100,
    });
  },
  slideButtonTap(e) {
    const { index = -1 } = e.target.dataset;
    if (index < 0) return;
    const list = this.data.list;
    try {
      $store.dispatch('delCart', { hash: list[index].buyHash });
    } catch (error) {}
    list.splice(index, 1);
    this.setData({
      list: list,
      totalMoney:
        list.reduce((acc, el) => {
          if (el.selected) {
            acc += (el.goods.price - 0) * el.count;
          }
          return acc;
        }, 0) * 100,
    });
  },
  toast(msg = '') {
    wx.showToast({ icon: 'none', title: msg });
  },
  numchange(e) {
    // log(e);
    const { index } = e.target.dataset;
    const { goods } = this.data.list[index];
    if (e.detail < goods.total) {
      this.data.list[index].count = e.detail;
      this.setData({
        list: this.data.list,
        totalMoney:
          this.data.list.reduce((acc, el) => {
            if (el.selected) {
              acc += (el.goods.price - 0) * el.count;
            }
            return acc;
          }, 0) * 100,
      });
    }
  },
});
