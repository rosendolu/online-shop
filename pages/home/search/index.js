const log = console.log;
Page({
  data: {
    showList: false,
    placeholder: 'last search',
    value: '',
    bannerList: [
      {
        hash: 1,
        src:
          'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      },
      {
        hash: 2,
        src:
          'https://images.pexels.com/photos/2437297/pexels-photo-2437297.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      },
      {
        hash: 3,
        src:
          'https://images.pexels.com/photos/2519392/pexels-photo-2519392.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      },
      {
        hash: 4,
        src:
          'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      },
      {
        hash: 5,
        src:
          'https://images.pexels.com/photos/2437297/pexels-photo-2437297.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      },
      {
        hash: 6,
        src:
          'https://images.pexels.com/photos/2519392/pexels-photo-2519392.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      }
    ]
  },
  handleTabClick(e) {
    log(e);
  },
  clear(e) {
    this.setData({
      showList: false
    });
  },
  input(e) {
    log('input,', e);
    if (e.detail.value === '') {
      //
    }
  },

  search: function (param) {
    if (param) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            { text: '搜索结果', value: 1 },
            { text: '搜索结果2', value: 2 }
          ]);
        }, 200);
      });
    } else {
      return [];
    }
  },
  clearSearchResult(show) {
    this.searchbar.setData({
      result: []
    });
    this.setData({
      showList: show
    });
  },
  selectResult: function (e) {
    // eslint-disable-next-line no-unused-vars
    const { index, item } = e;
    console.log('select result', e.detail);
    this.clearSearchResult(true);
  },
  onLoad(options) {
    this.setData({
      search: this.search.bind(this)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.searchbar = this.selectComponent('.searchbar');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});
