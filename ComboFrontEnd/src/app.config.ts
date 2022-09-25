export default defineAppConfig({
  pages: [
    'pages/userinfo/index',
    'pages/home/index',
    'pages/home/book-detail/index',
    'pages/subtract/index',
    'pages/subtract/only-detail/index',
    'pages/release/index',
    'pages/message/index',
  ],
  // subpackages: [
  //   {
  //     root: "3dPackages",
  //     pages: ["riskDetails/index"],
  //   },
  // ],
  "tabBar": {
    "custom": false,
    "color": "#000000",
    "selectedColor": "#FECB58",
    "backgroundColor": "#f8f8f8",
    "list": [{
      "pagePath": "pages/home/index",
      "text": "",
      iconPath: './assets/icon/home_fill.png',
      selectedIconPath: './assets/icon/home_fill_active.png',
    }, {
      "pagePath": "pages/subtract/index",
      text: '',
      iconPath: './assets/icon/subtract_fill.png',
      selectedIconPath: './assets/icon/subtract_fill_active.png',
    }, {
      "pagePath": "pages/release/index",
      text: '',
      iconPath: './assets/icon/release_fill.png',
      selectedIconPath: './assets/icon/release_fill_active.png',
    }, {
      "pagePath": "pages/message/index",
      text: '',
      iconPath: './assets/icon/message_fill.png',
      selectedIconPath: './assets/icon/message_fill_active.png',
    }, {
      "pagePath": "pages/userinfo/index",
      text: '',
      iconPath: './assets/icon/user_fill.png',
      selectedIconPath: './assets/icon/user_fill_active.png',
    },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  }
})
