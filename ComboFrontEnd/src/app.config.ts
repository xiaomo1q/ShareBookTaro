export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/subtract/index',
    'pages/release/index',
    'pages/message/index',
    'pages/userinfo/index',
  ],
  // subpackages: [
  //   {
  //     root: "3dPackages",
  //     pages: ["riskDetails/index"],
  //   },
  // ],
  "tabBar": {
    "custom": true,
    "color": "#000000",
    "selectedColor": "#FECB58",
    "backgroundColor": "#fff",
    "list": [{
      "pagePath": "pages/home/index",
      "text": "",
      iconPath: './assets/icon/home_fill.svg',
      selectedIconPath: './assets/icon/home_fill_active.svg',
    }, {
      "pagePath": "pages/subtract/index",
      text: '',
      iconPath: './assets/icon/subtract_fill.svg',
      selectedIconPath: './assets/icon/subtract_fill_active.svg',
    }, {
      "pagePath": "pages/release/index",
      text: '',
      iconPath: './assets/icon/release_fill.svg',
      selectedIconPath: './assets/icon/release_fill_active.svg',
    }, {
      "pagePath": "pages/message/index",
      text: '',
      iconPath: './assets/icon/message_fill.svg',
      selectedIconPath: './assets/icon/message_fill_active.svg',
    }, {
      "pagePath": "pages/userinfo/index",
      text: '',
      iconPath: './assets/icon/user_fill.svg',
      selectedIconPath: './assets/icon/user_fill_active.svg',
    },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
