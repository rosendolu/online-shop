import $store from '../../store/index';
// import $util from '../../utils/util';
// const log = console.log;
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
  },

  data: {},

  methods: {
    toast(msg = '') {
      wx.showToast({ icon: 'none', title: msg });
    },

    tap(e) {
      // this.triggerEvent('click',e)
      const { event = '' } = e.target.dataset;
      // if (!event) return;
      const { total, id, hash } = this.data.item;
      let params = null;
      // log(this.data.item);
      switch (event) {
        case 'add':
          if (total <= 0) {
            return this.toast('商品库存不足，添加失败！');
          }
          params = { goodsHash: hash, count: 1, buyHash: hash };
          $store.dispatch('addCart', params);
          break;
        case 'detail':
          wx.navigateTo({
            url: `/pages/home/goods/index?id=${id}`,
          });
          break;
      }
    },
  },
});
