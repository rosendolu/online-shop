import $commonapi from '../../../api/common';
import $util from '../../../utils/util';
// const log = console.log;
Page({
  data: {
    inputVal: '',
  },
  async submit(e) {
    await $commonapi.feedback({
      content: this.data.inputVal,
    });
    await $util.modalToast('提交成功！');
    wx.navigateBack();
  },
  blur(e) {
    // this.data.inputVal = e.detail.value;
  },
  input(e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  onLoad: function (options) {},

  onShow: function () {},
});
