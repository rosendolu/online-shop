const log = console.log;
Page({
  data: {
    inputVal: ''
  },
  submit(e) {
    log(e);
  },
  blur(e) {
    // this.data.inputVal = e.detail.value;
  },
  input(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {},

  onShow: function () {}
});
