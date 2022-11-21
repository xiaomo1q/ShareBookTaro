import { RoutesDataItem } from '@/utils/routes';

/**
 * Index Layout 路由页面
 */
const IndexLayoutRoutes: RoutesDataItem[] = [
  {
    icon: 'home',
    title: '首页',
    path: '/home',
    redirect: '/home/bookList',
    routes: [
      // {
      //   icon: 'control',
      //   title: '工作台',
      //   path: '/home/workplace',
      //   roles: ['admin', 'user', 'test'],
      //   component: '@/pages/home',
      // },
      {
        icon: 'control',
        title: '图书管理',
        path: '/home/bookList',
        roles: ['admin', 'user', 'test'],
        component: '@/pages/bookList',
      },
      {
        icon: 'control',
        title: '用户管理',
        roles: ['admin'],
        path: '/home/userList',
        component: '@/pages/userList',
      },
      // {
      //   icon: 'control',
      //   title: 'word导出',
      //   roles: ['admin', 'user', 'test'],
      //   path: '/home/word',
      //   component: '@/pages/word',
      // },
    ],
  },
  // {
  //   icon: 'permissions',
  //   title: '权限验证',
  //   path: '/roles',
  //   redirect: '/roles/all',
  //   // roles: ['admin', 'user', 'test'],
  //   routes: [
  //     {
  //       icon: 'detail',
  //       title: '用户都有权限',
  //       roles: ['admin', 'user', 'test'],
  //       path: '/roles/all',
  //       component: '@/pages/user/detail/index',
  //     },
  //     {
  //       icon: 'detail',
  //       roles: ['admin', 'user'],
  //       title: 'Users有权限',
  //       path: '/roles/user',
  //       // component: '@/pages/roles/user',
  //     },
  //     {
  //       icon: 'detail',
  //       roles: ['admin', 'test'],
  //       title: 'Tests有权限',
  //       path: '/roles/test',
  //       // component: '@/pages/roles/test',
  //     },
  //   ],
  // },
];

export default IndexLayoutRoutes;
