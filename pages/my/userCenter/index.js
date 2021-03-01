// import $api from '../../../api/user';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: '1998-08-08',
    name: '',
    phone: '',
    code: ''
  },
  async submitForm() {
    const { date, name, phone } = this.data;
    // let info = await $api.update({name,birthday:new Date(date),phone})
    wx.setStorage({
      key: 'userCenter',
      data: { date, name, phone }
    });
    wx.showModal({
      title: '提示',
      content: '更新成功，即将返回上一页',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
  },
  formInputChange(e) {
    const { key } = e.currentTarget.dataset;
    this.data[key] = e.detail.value;
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'userCenter',
      success(res) {
        const { date, name, phone } = this.data;
        this.setData({
          date,
          name,
          phone
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
