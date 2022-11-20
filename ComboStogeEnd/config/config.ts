import { defineConfig } from 'umi';
import { routes } from '../src/config/router';
const { API_HOST } = process.env;

export default defineConfig({
  define: {
    API_HOST: API_HOST,
  },
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  // 路由模式
  // history: {
  //   type: 'hash',
  // },
  title: '校图管理平台',
  cssLoader: {
    localsConvention: 'camelCase',
  },
  ignoreMomentLocale: true,
  dva: {
    immer: false,
    hmr: true,
    disableModelsReExport: true,
    lazyLoad: true,
  },
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  // 主題
  theme: {
    'primary-color': '#1890ff',
  },
  // 按需加载
  dynamicImport: {
    // loading: '@ant-design/pro-layout/es/PageLoading',
    loading: '@/components/PageLoading/index',
  },
  // @ant-design/pro-layout
  // layout: {
  //   ...defaultSettings,
  // },
  locale: {},
  antd: {},
  // hd:true,
  routes,
  targets: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 },
  fastRefresh: {},
  // 路由前缀
  // base: '/',
  publicPath: '/',
  // 开发服务器
  devServer: {
    proxy: {
      '/api': {
        // 'target': 'http://81.68.169.67:3000',
        target: 'http://127.0.0.1:3030',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
      },
    },
  },
});
