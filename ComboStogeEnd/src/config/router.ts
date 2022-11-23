import {
  RoutesDataItem,
  umiRoutes,
  getNotFoundRoute,
  getPermissionMenuData,
} from '../utils/routes';

/**
 * User Layout 路由页面
 */
import UserLayoutRoutes from './user-router';

/**
 * Index Layout 路由页面
 */
import IndexLayoutRoutes from './index-router';
// const a: any = localStorage.getItem('role')

/**
 * config routes 配置
 * docs: http://admin-antd-react.liqingsong.cc/guide/basis/router-and-menu.html
 */
export const routes: RoutesDataItem[] = [
  {
    title: '',
    path: '/user',
    component: '@/layouts/userLayout',
    routes: [
      ...umiRoutes(UserLayoutRoutes, '/user', '/user'),
      {
        title: '',
        path: '/user',
        redirect: '/user/login',
      },
      getNotFoundRoute(),
    ],
  },
  {
    title: '',
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        title: '',
        path: '/',
        component: '@/layouts/indexLayout',
        routes: [
          ...umiRoutes(IndexLayoutRoutes),
          // ...umiRoutes(getPermissionMenuData(['user'], IndexLayoutRoutes)),
          {
            title: '',
            path: '/',
            redirect: '/home',
          },
          getNotFoundRoute(),
        ],
      },
      getNotFoundRoute(),
    ],
  },
  getNotFoundRoute(),
];
