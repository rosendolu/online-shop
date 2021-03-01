Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/,
    multipleSlots: true
  },
  properties: {
    tabClass: { type: String, value: '' },
    activeClass: { type: String, value: '' },
    activeTabLine: { type: String, value: '' },
    tabs: { type: Array, value: [] },
    swiperClass: { type: String, value: '' },
    activeTab: { type: Number, value: 0 },
    duration: { type: Number, value: 500 }
  },
  data: {
    currentView: 0
  },
  observers: {
    activeTab: function activeTab(_activeTab) {
      var len = this.data.tabs.length;
      if (len === 0) return;
      var currentView = _activeTab - 1;
      if (currentView < 0) currentView = 0;
      if (currentView > len - 1) currentView = len - 1;
      this.setData({ currentView: currentView });
    }
  },
  lifetimes: {
    created: function created() {}
  },
  methods: {
    handleTabClick: function handleTabClick(e) {
      var index = e.currentTarget.dataset.index;
      if (index === this.data.activeTab) return;
      this.triggerEvent('tabclick', { index: index });
      this.setData({ activeTab: index });
    },
    handleSwiperChange: function handleSwiperChange(e) {
      var index = e.detail.current;
      this.triggerEvent('change', { index: index });
      this.setData({ activeTab: index });
    }
  }
});
