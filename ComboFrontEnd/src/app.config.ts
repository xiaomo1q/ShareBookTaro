export default defineAppConfig({
  pages: [
    'pages/courses/index',
    'pages/index/index',
  ],
  // subpackages: [
  //   {
  //     root: "3dPackages",
  //     pages: ["riskDetails/index"],
  //   },
  // ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
