import Store from './store';
import $util from '../utils/util';
import $cartApi from '../api/shopping-cart';
import $userApi from '../api/user';
// eslint-disable-next-line no-unused-vars
const get = $util.promisefy(wx.getStorage);
const set = $util.promisefy(wx.setStorage);
const clear = $util.promisefy(wx.clearStorage);
const userInfo = wx.getStorageSync('userInfo') || {};
const token = wx.getStorageSync('token') || '';
const fanCode = wx.getStorageSync('fanCode') || '';
export default new Store({
  state: {
    token: token, // 登录token
    fanCode: fanCode, // 推荐人范码
    userInfo: userInfo, // {} 登录状态缓存信息
    shoppingCart: {}, // 购物车
    cartNum: 0, // 购物车红点提示
    order: [], // 确认订单列表
    paidGoods: {}, // 支付完成列表
  },
  mutations: {
    updateOrder(state, data) {
      state.order = data;
    },
    updateToken(state, token) {
      state.token = token;
    },
    setfanCode(state, data) {
      state.fanCode = data;
    },
    setLoginState(state, data) {
      state.userInfo = data;
      // 异步更新缓存
      set({
        key: 'userInfo',
        data: data,
      });
    },
    setCartNum(state, num) {
      state.cartNum = num;
    },
    setSuccessList(state, arr = {}) {
      state.paidGoods = arr;
    },
  },
  actions: {
    async cache(ctx) {
      console.log(ctx.state);
      await Promise.all([
        set({
          key: 'userInfo',
          data: ctx.state.userInfo,
        }),
        set({
          key: 'token',
          data: ctx.state.token,
        }),
        set({
          key: 'fanCode',
          data: ctx.state.fanCode,
        }),
        set({
          key: 'lastLoginDate',
          data: Date.now(),
        }),
      ]);
    },

    async clearLoginState(ctx) {
      await $userApi.logout();
      await clear({ key: 'userInfo' });
      ctx.commit('setLoginState', {});
    },
    async addCart(ctx, payload) {
      await $cartApi.add(payload);
      ctx.state.cartNum += 1;
      $util.toast('添加成功');
    },
    async delCart(ctx, payload) {
      try {
        await $cartApi.del(payload);
        ctx.state.cartNum -= 1;
      } catch (error) {}
    },
    async updateUserInfo(ctx, payload) {
      if (!token) return;
      try {
        const res = await $userApi.detail({ customeErr: true });
        ctx.commit('setLoginState', res.data);
      } catch (error) {}
    },
    async validateFanCode(ctx, payload) {
      try {
        // const res = await $userApi.detail({ customeErr: true });
        // ctx.commit('setLoginState', res.data);
        let date = await get({ key: 'lastLoginDate' });
        if (!date) return;

        date = date.data;
        if (Date.now() > date + 30 * 60 * 1000) {
          const pages = getCurrentPages();
          if (pages[pages.length - 1].route !== 'pages/home/auth/index') {
            wx.navigateTo({
              url: '/pages/home/auth/index',
            });
          }
        }
      } catch (error) {}
    },
  },
});

/**
 * API
 *
 * store.commit
 * store.subScribe
 * store.dispath
 */
