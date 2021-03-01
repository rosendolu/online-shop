Page({
  data: {
    nodes: '',
    src: '',
  },
  async onLoad(options) {
    console.dir(options);
    const { src = '' } = options;

    this.setData({
      src: decodeURIComponent(src),
    });

    // this.setData({
    //   nodes: info.content
    //     .replace(
    //       /<img/gi,
    //       '<img style="max-width:100%;height:auto;display:block" '
    //     )
    //     .replace(/<section/g, '<div')
    //     .replace(/\/section>/g, 'div>')
    // });
  },
});
