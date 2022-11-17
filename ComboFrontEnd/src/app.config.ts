export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/home/book-detail/index',
    'pages/subtract/index/index',
    'pages/subtract/only-detail/index',
    'pages/subtract/form-index/index',
    'pages/release/index',
    'pages/message/index',
    'pages/message/msg-detail/index',
    'pages/search/index',
    'pages/userinfo/index',
    'pages/userinfo/login',
  ],
  subpackages: [
    // {
    //   root: "subtractPages",
    //   pages: [
    //     "index/index",
    //     'only-detail/index',
    //     'form-index/index'
    //   ],
    // },
    {
      root: "pagesA",
      pages: [
        'bookuserinfo/index',
        'fansFollower/index',
      ],
    },
  ],
  "tabBar": {
    "custom": false,
    "color": "#000000",
    "selectedColor": "#FECB58",
    "backgroundColor": "#FAFBFF",
    "borderStyle": "white",
    "list": [{
      "pagePath": "pages/home/index",
      "text": "",
      iconPath: './assets/icon/home_fill.png',
      selectedIconPath: './assets/icon/home_fill_active.png',
    }, {
      "pagePath": "pages/subtract/index/index",
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
