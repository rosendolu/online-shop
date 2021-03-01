import $store from '../../store/index';
import $util from '../../utils/util';
Component({
  properties: {
    info: {
      type: Object,
      value: {},
    },
  },
  observers: {
    selectedSkuIndex: function (val) {
      val = parseInt(val);
      const { sku } = this.data.info;
      this.setData({
        skuInfo: sku[val],
      });
    },
    show: function (val) {
      if (val) {
        const { sku } = this.data.info;
        this.setData({
          skuInfo: sku[0],
          total: sku[0].total,
        });
      } else {
        const { hasAddedToCart, selectedSkuIndex, num } = this.data;
        this.triggerEvent('change', {
          index: selectedSkuIndex,
          count: num,
          showDot: hasAddedToCart,
        });
      }
    },
  },
  lifetimes: {
    attached: function () {},
  },
  data: {
    skuInfo: {},
    show: false,
    selectedSkuIndex: 0,
    selectedColorIndex: 0,
    total: 1,
    hasAddedToCart: false,
    num: 1, // 购买数量
  },
  methods: {
    tap(e) {
      const { act = '' } = e.target.dataset;
      switch (act) {
        case 'add':
          // const params = $util.addCart(this.data.info);
          this.addToShoppingCart();
          // this.close();
          break;
        case 'buy':
          this.buyNow();
          break;

        default:
          act && this[act]();
          break;
      }
    },
    buyNow() {
      const { skuInfo, num } = this.data;

      const { total } = skuInfo;
      if (total < num) {
        $util.toast('库存不足，请选择其他型号');
      } else {
        const item = this.format();
        $store.commit('updateOrder', [item]);
        wx.navigateTo({
          url: '/pages/shopping-cart/pay/index',
        });
      }
    },
    format() {
      const { skuInfo, info, num: count } = this.data;
      const { name: skuname, hash: buyHash, total, price, img: poster } = skuInfo;
      const { id, hash: goodsHash, title } = info;
      return {
        id,
        count,
        buyHash,
        goodsHash,
        goods: {
          total,
          price,
          title,
          poster,
          skuname,
        },
      };
    },
    addToShoppingCart() {
      const { skuInfo, info, num } = this.data;
      const goodsHash = info.hash;

      const { total, hash } = skuInfo;
      if (total < num) {
        $util.toast('库存不足，请选择其他型号');
        return;
      }
      const params = { goodsHash, count: num, buyHash: hash };
      try {
        $store.dispatch('addCart', params);
        this.data.hasAddedToCart = true;
        this.setData({ show: false });
        // this.setData({
        //   showDot: true,
        // });
      } catch (error) {}
    },
    selectSku(e) {
      const { index = -1 } = e.target.dataset;
      if (index < 0) return;
      this.setData({
        selectedSkuIndex: index,
      });
    },
    skuColor(e) {
      const { index = -1 } = e.target.dataset;
      if (index < 0) return;
      this.setData({
        selectedColorIndex: index,
      });
    },

    close(e) {
      this.setData({
        show: false,
      });
    },
    cancelMove(e) {},
    numchange(e) {
      // this.data.num = e.detail;
      this.setData({
        num: e.detail,
      });
    },
  },
});
