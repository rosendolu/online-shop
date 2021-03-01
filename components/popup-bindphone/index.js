import $api from '../../api/user';
import $util from '../../utils/util';
import $store from '../../store/index';
Component({
  properties: {
    closeAble: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    show: false,
  },
  methods: {
    close(e) {
      if (this.data.closeAble) {
        this.setData({ show: false });
      }
    },
    async getphonenumber(e) {
      const { code } = await $util.promisefy(wx.login)();
      if (!code) return;
      const { errMsg, encryptedData, iv } = e.detail;
      if (errMsg === 'getPhoneNumber:ok') {
        try {
          const res = await $api.update({ encryptedData, iv, code });
          $store.commit('setLoginState', res.data);
        } catch (error) {
          //
        }
      }
      this.setData({ show: false });
      wx.navigateBack({
        fail(e) {
          wx.switchTab({
            url: '/pages/home/index/index',
          });
        },
      });
    },
  },
});
