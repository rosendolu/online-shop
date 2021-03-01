const log = console.log;
function show(tit, msg, q, succ, fail) {
  wx.showModal({
    title: tit,
    content: msg,
    showCancel: q,
    success: function (res) {
      if (res.confirm) {
        if (succ) {
          succ();
        }
      } else if (res.cancel) {
        if (fail) {
          fail();
        }
      }
    }
  });
}
Page({
  data: {
    active: '0',
    isfingerPrint: false, // 可否使用指纹识别  默认false
    isfacial: false, // 可否使用人脸识别  默认false
    tempFilePath: ''
  },
  tabChange(e) {
    log(e.detail.name);
    this.setData({
      active: e.detail.name
    });
  },
  editVideo(e) {
    wx.chooseMedia({
      count: 9,
      // mediaType: ['image','video'],
      mediaType: ['video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        log('chooseMedia', res);
        const filePath = res.tempFiles[0].tempFilePath;
        wx.openVideoEditor({
          filePath: filePath,
          success(res) {
            log(res);
          },
          fail(e) {
            //
          }
        });
      },
      fail(e) {
        log('chooseMedia error', e);
      }
    });
  },
  onLoad: function (options) {
    var that = this;
    log('checkIsSupportSoterAuthentication');
    // 查看支持的生物认证   比如ios的指纹识别   安卓部分机器是不能用指纹识别的
    if (wx.canIUse('checkIsSupportSoterAuthentication')) {
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          log('checkIsSupportSoterAuthentication', res);
          for (var i in res.supportMode) {
            if (res.supportMode[i] === 'fingerPrint') {
              console.log('支持指纹识别', res.supportMode[i]);
              that.setData({
                isfingerPrint: true
              });
            } else if (res.supportMode[i] === 'facial') {
              console.log('支持人脸识别', res.supportMode[i]);
            }
          }
        }
      });
    } else {
      log('不支持生物识别');
    }
  },
  // 是否可以指纹识别
  checkIsFingerPrint: function () {
    var boole = this.data.isfingerPrint;
    var txt = '不可以使用指纹识别';
    if (boole) {
      txt = '可以使用指纹识别';
    }
    show('提示', txt, false);
  },
  // 是否可以人脸识别
  checkIsFacial: function () {
    var boole = this.data.isfacial;
    var txt = '不可以使用人脸识别';
    if (boole) {
      txt = '可以使用人脸识别';
    }
    function SUCC() {
      console.log('用户点击确定');
    }

    function FAIL() {
      console.log('用户点击取消');
    }

    show('提示', txt, true, SUCC, FAIL);
  },
  facilPrint() {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹',
      success(res) {
        console.log('识别成功', res);
        show('提示', '识别成功', false);
      },
      fail(res) {
        console.log('识别失败', res);
        show('提示', '识别失败', false);
      }
    });
  },
  // 进行指纹识别
  FingerPrint: function () {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹',
      success(res) {
        console.log('识别成功', res);
        show('提示', '识别成功', false);
      },
      fail(res) {
        console.log('识别失败', res);
        show('提示', '识别失败', false);
      }
    });
  },
  // 是否有指纹
  HaveFingerPrint: function () {
    wx.checkIsSoterEnrolledInDevice({
      checkAuthMode: 'fingerPrint',
      success(res) {
        if (res.isEnrolled === 1) {
          show('提示', '有指纹', false);
        } else if (res.isEnrolled === 0) {
          show('提示', '无指纹', false);
        }
      },
      fail(res) {
        show('提示', '异常', res);
      }
    });
  },
  /**
   * 显示提示信息
   * tit 提示的标题
   * msg 提示的内容
   * q   是否有取消按钮（布尔值）
   * succ 用户点击确定的回调（非必须）
   * fail 用户点击取消的回调（非必须）
   *
   */

  onShow: function () {},

  onHide: function () {},

  onUnload: function () {},

  onPullDownRefresh: function () {},

  onReachBottom: function () {},

  onShareAppMessage: function () {}
});
