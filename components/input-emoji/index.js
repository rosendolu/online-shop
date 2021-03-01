Component({
  options: {
    styleIsolation: 'shared',
    addGlobalClass: true,
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  data: {
    lineHeight: 24,
    functionShow: false,
    emojiShow: false,
    comment: '',
    focus: false,
    cursor: 0,
    _keyboardShow: false,
    emojiSource: '',
    parsedComment: []
  },
  lifetimes: {
    attached() {
      const emojiInstance = this.selectComponent('.mp-emoji');
      this.emojiNames = emojiInstance.getEmojiNames();
      this.parseEmoji = emojiInstance.parseEmoji;
    }
  },
  methods: {
    onkeyboardHeightChange(e) {
      // this.hideAllPanel();
      let { height } = e.detail;
      height = Math.max(height - 1, 0);

      if (this.data._keyboardShow && height === 0) {
        this.setData({
          keyboardHeight: height
        });
      } else {
        this.setData({
          emojiShow: false,
          keyboardHeight: height
        });
      }
    },

    hideAllPanel() {
      this.setData({
        functionShow: false,
        emojiShow: false
      });
    },
    showEmoji() {
      this.setData({
        emojiShow: this.data._keyboardShow || !this.data.emojiShow
      });
    },
    showFunction() {
      this.setData({
        functionShow: this.data._keyboardShow || !this.data.functionShow,
        emojiShow: false
      });
    },
    chooseImage() {},
    onFocus() {
      // this.hideAllPanel();
      this.data._keyboardShow = true;
    },
    onBlur(e) {
      this.data._keyboardShow = false;
      this.data.cursor = e.detail.cursor || 0;
      this.data.keyboardHeight > 0 &&
        this.setData({
          keyboardHeight: 0
        });
    },
    onInput(e) {
      const value = e.detail.value;
      this.data.comment = value;
    },
    onConfirm() {
      this.onsend();
    },
    insertEmoji(evt) {
      const emotionName = evt.detail.emotionName;
      const { cursor, comment } = this.data;
      const newComment = comment.slice(0, cursor) + emotionName + comment.slice(cursor);
      this.setData({
        comment: newComment,
        cursor: cursor + emotionName.length
      });
    },
    onsend() {
      const parsedComment = this.parseEmoji(this.data.comment);
      this.setData({
        parsedComment,
        comment: ''
      });
    },
    deleteEmoji: function () {
      const pos = this.data.cursor;
      const comment = this.data.comment;
      let result = '';
      let cursor = 0;

      let emojiLen = 6;
      let startPos = pos - emojiLen;
      if (startPos < 0) {
        startPos = 0;
        emojiLen = pos;
      }
      const str = comment.slice(startPos, pos);
      const matchs = str.match(/\[([\u4e00-\u9fa5\w]+)\]$/g);
      // 删除表情
      if (matchs) {
        const rawName = matchs[0];
        const left = emojiLen - rawName.length;
        if (this.emojiNames.indexOf(rawName) >= 0) {
          const replace = str.replace(rawName, '');
          result = comment.slice(0, startPos) + replace + comment.slice(pos);
          cursor = startPos + left;
        }
        // 删除字符
      } else {
        let endPos = pos - 1;
        if (endPos < 0) endPos = 0;
        const prefix = comment.slice(0, endPos);
        const suffix = comment.slice(pos);
        result = prefix + suffix;
        cursor = endPos;
      }
      this.setData({
        comment: result,
        cursor: cursor
      });
    }
  }
});
