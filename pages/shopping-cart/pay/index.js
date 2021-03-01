/* eslint-disable no-unused-vars */
import $orderApi from '../../../api/order';
import $commonApi from '../../../api/common';
// import $userApi from '../../../api/user';
import $store from '../../../store/index';
import $util from '../../../utils/util';
const log = console.log;
Page({
  data: {
    barList: [],
    index: Number(wx.getStorageSync('barNameIndex')) || -1,
    phone: '',
    seat: '', // 卡座
    fanCode: '',
    list: [],
    loading: false,
    sum: 0,
    validate: '',
    msg: '', // 留言信息
  },

  onLoad(options) {
    this.getAddr();
  },
  async getAddr() {
    const list = await $commonApi.addrList();

    this.setData({
      barList: list.data.map(el => el.name),
    });
  },
  onReady: function () {},

  async onShow() {
    try {
      // await $userApi.loginState();
      const { userInfo, fanCode, order } = $store.state;
      this.setData({
        phone: userInfo.phone,
        fanCode: fanCode,
        list: order,
        sum:
          order.reduce((acc, item) => {
            acc += item.count * item.goods.price;
            return acc;
          }, 0) * 100,
      });
    } catch (error) {}
  },

  onHide: function () {},
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value - 0,
    });
    $util.promisefy(wx.setStorage)({ key: 'barNameIndex', data: e.detail.value - 0 });
  },
  pickerCancel(e) {
    log(e);
  },
  async payOrder() {
    try {
      const {
        result_code,
        package: pkg,
        return_code,
        appId,
        timeStamp,
        nonceStr,
        return_msg,
        paySign,
        orderInfo,
      } = this.data.pay;
      const payState = await $util.promisefy(wx.requestPayment)({
        timeStamp,
        nonceStr,
        package: pkg,
        paySign,
        signType: 'MD5',
      });

      if (!payState) {
        return $util.toast('支付失败！');
      } else {
        const { orderId } = orderInfo;
        const validPay = await $orderApi.paycheck({ orderId });

        if (!validPay) {
          return $util.toast('支付验证失败！');
        }
        const clicked = await $util.modalToast('支付成功！');
        if (clicked) {
          $store.commit('setSuccessList', orderInfo);
          wx.redirectTo({ url: '/pages/shopping-cart/paySuccess/index' });
        }
      }
      // this.setData({ loading: false });
    } catch (error) {
    } finally {
      this.setData({ loading: false });
    }
  },
  async onSubmit(e) {
    // 下过单了，直接支付
    if (this.data.pay) {
      this.payOrder();
      return;
    }
    // 创建订单后支付
    if (this.data.loading) return;
    const success = this.checkParams();
    if (!success) return;
    this.setData({ loading: true });
    const { code } = await $util.promisefy(wx.login)();
    if (!code) {
      $util.toast('微信code 获取失败！');
      this.setData({ loading: false });
      return;
    }
    const { index, barList, phone, seat, fanCode, list, msg } = this.data;
    const params = {
      code,
      msg,
      fanCode: fanCode || '',
      address: {
        barName: barList[index],
        phone: Number(phone),
        seat,
      },
      goods: list.map(el => {
        return {
          goodsHash: el.goodsHash,
          buyHash: el.buyHash,
          title: el.goods.title,
          poster: el.goods.poster,
          skuname: el.goods.skuname,
          price: el.goodsHash.price,
          count: el.count,
          total: el.goods.total,
        };
      }),
    };
    // 创建订单
    let res = await $orderApi.create(params);
    res = res.data;
    this.data.pay = res; // 保存支付信息取消支付之后不用创建新订单，可再次支付
    this.payOrder();
  },
  tip(key = '') {
    this.setData({
      validate: key,
    });
    setTimeout(() => {
      this.setData({
        validate: '',
      });
    }, 3000);
  },
  checkParams() {
    const { index, phone, seat } = this.data;
    if (index === -1) {
      this.tip('barName');
      $util.toast('收货地址不能为空，点击收货地址选择所在酒吧');
      return false;
    }

    if (!/^[1]([3-9])[0-9]{9}$/.test(phone)) {
      this.tip('phone');
      $util.toast('收货人联系电话验证失败');
      return false;
    }
    if (!seat) {
      this.tip('seat');
      $util.toast('收货人卡座不能为空');
      return false;
    }
    return true;
  },
  syncInput(e) {
    const { key } = e.currentTarget.dataset;
    if (!key) return;
    this.data[key] = e.detail.value;

    this.setData({
      phone: this.data.phone,
      seat: this.data.seat,
    });
  },
});
