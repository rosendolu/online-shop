const Base64 = require('./base64.js');
const iconData = require('./icondata.js');

const getFixedIconType = function (type) {
  // 兼容旧版本 typo
  return type === 'field' ? 'filled' : type;
};

Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    angle: {
      type: Number,
      value: 0
    },
    type: {
      type: String,
      value: 'outline',
      observer: '_genSrcByType'
    },
    icon: {
      type: String,
      value: '',
      observer: '_genSrcByIcon'
    },
    size: {
      type: Number,
      value: 20
    },
    color: {
      type: String,
      value: '#000000'
    }
  },
  data: {
    src: '',
    height: 20,
    width: 20
  },
  methods: {
    _genSrcByIcon(v) {
      this._genSrc(iconData[v][getFixedIconType(this.data.type)]);
    },
    _genSrcByType(v) {
      this._genSrc(iconData[this.data.icon][getFixedIconType(v)]);
    },
    _genSrc(rawData) {
      if (!rawData) return; // type 不存在
      const base64 = Base64.encode(rawData);
      this.setData({
        src: 'data:image/svg+xml;base64,' + base64
      });
    }
  }
});