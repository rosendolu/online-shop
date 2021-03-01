const { parser_1, emoji_data_1, emoji_panel_data_1 } = require('./config');
var EMOTION_SIZE = 40;
var emotionMap = {};
var emotionNames = [];
emoji_data_1.default.forEach(function (item) {
  emotionMap[item.id] = item;
  emotionNames.push(item.cn);
});
var emotions = [];
emoji_panel_data_1.default.forEach(function (id) {
  return emotions.push(emotionMap[id]);
});
Component({
  options: {
    styleIsolation: 'page-shared',
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  properties: {
    padding: {
      type: Number,
      value: 15
    },
    backgroundColor: {
      type: String,
      value: '#EDEDED'
    },
    showSend: {
      type: Boolean,
      value: true
    },
    showDel: {
      type: Boolean,
      value: true
    },
    showHistory: {
      type: Boolean,
      value: true
    },
    height: {
      type: Number,
      value: 300
    },
    source: {
      type: String,
      value: ''
    }
  },
  data: {
    history: [],
    emotions: emotions,
    extraPadding: 0,
    perLine: 0
  },
  lifetimes: {
    attached: function attached() {
      var padding = this.data.padding;
      var systemInfo = wx.getSystemInfoSync();
      var areaWidth = systemInfo.windowWidth;
      var perLine = Math.floor((areaWidth - padding * 2) / 45);
      var extraPadding = Math.floor(
        (areaWidth - padding * 2 - perLine * EMOTION_SIZE) / (perLine - 1)
      );
      this.setData({
        perLine: perLine,
        extraPadding: extraPadding,
        hasSafeBottom: systemInfo.model.indexOf('iPhone X') >= 0
      });
    }
  },
  methods: {
    getEmojiNames: function getEmojiNames() {
      return emotionNames;
    },

    parseEmoji: parser_1.parseEmoji,
    insertEmoji: function insertEmoji(evt) {
      var data = this.data;
      var idx = evt.currentTarget.dataset.idx;
      var emotionName = data.emotions[idx].cn;
      this.LRUCache(data.history, data.perLine, idx);
      this.setData({ history: data.history });
      this.triggerEvent('insertemoji', { emotionName: emotionName });
    },
    deleteEmoji: function deleteEmoji() {
      this.triggerEvent('delemoji');
    },
    send: function send() {
      this.triggerEvent('send');
    },
    LRUCache: function LRUCache(arr, limit, data) {
      var idx = arr.indexOf(data);
      if (idx >= 0) {
        arr.splice(idx, 1);
        arr.unshift(data);
      } else if (arr.length < limit) {
        arr.push(data);
      } else if (arr.length === limit) {
        arr[limit - 1] = data;
      }
    }
  }
});
