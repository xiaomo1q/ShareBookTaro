import { UserModelState } from '@/models/user';
import {
  formatRoutePathTheParents, getBreadcrumbRoutes, getPermissionMenuData, getRouteItem, recursionFun, RoutesDataItem
} from '@/utils/routes';
import { Layout } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import BreadCrumbs from '../../components/BreadCrumbs';
import IndexLayoutRoutes from '../../config/index-router';
import Left from './common/left';
import RightTop from './common/rightTop';
import styles from './index.less';

const { Header, Sider, Content } = Layout;
const IndexLayout: React.FC<any> = (props) => {
  const { children, location, route } = props;
  const { pathname } = location;
  const { routes } = route;
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [sidlerMenu, setSidlerMenu] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<string>('/');
  const [sidlerSelectedKeys, setSidlerSelectedKeys] =
    useState<string>(pathname);
  const [breadcrumb, setBreadcrumbRoutes] = useState<any>([]);

  const readRouteItem = getRouteItem(pathname, routes as RoutesDataItem[]);
  const routeParentPaths = formatRoutePathTheParents(pathname);
  const breadcrumbRoutes = getBreadcrumbRoutes(
    readRouteItem,
    routeParentPaths,
    routes as RoutesDataItem[],
  );
  const roles: any = localStorage.getItem('role');
  const newArr = pathname.split('/').filter((i: string) => i && i.trim());

  useEffect(() => {
    if (!!newArr[0]) {
      setSelectedKeys('/' + newArr[0]);
      setSidlerSelectedKeys(pathname);
      fetchRoute('/' + newArr[0], pathname);
      const obj = recursionFun(IndexLayoutRoutes, pathname); // 返回根据 id 查找到的数据对象
      obj ? null : history.push('*');
    } else {
      setSelectedKeys('/' + 'home');
      setSidlerSelectedKeys('/home/workplace');
      fetchRoute('/' + 'home', '/home/workplace');
      const obj = recursionFun(IndexLayoutRoutes, '/home/workplace'); // 返回根据 id 查找到的数据对象
      obj ? null : history.push('*');
    }
    if (!roles) {
      history.replace('/user');
    }

  }, []);

  const fetchRoute = async (newArr: string, paName: any[string]) => {
    let role: any = localStorage.getItem('role');
    let itemFilter1 = getPermissionMenuData(
      [JSON.parse(role)],
      IndexLayoutRoutes,
    );
    let itemFilter = itemFilter1.filter(
      (a: { path: string }) => a.path === newArr,
    );
    if (itemFilter[0]) {
      setSidlerMenu(itemFilter[0].routes);
    }
  };

  // 收缩
  const toggle = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  /** 上菜单 */
  const menuClickHandler = (item: any) => {
    setSelectedKeys(item.key);
    setSidlerSelectedKeys(item.key);
    fetchRoute(item.key, item.key);
  };

  return (
    <Layout id={styles['indexLayout']}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <Left sidlerMenu={sidlerMenu} selectedKey={sidlerSelectedKeys} roles={roles} /> */}
        <Left
          sidlerMenu={sidlerMenu}
          selectedKey={props.location.pathname}
          roles={roles}
        />
      </Sider>
      <Layout className={styles['site-layout']}>
        <Header className={styles['site-layout-top']}>
          <RightTop
            collapsed={collapsed}
            onToggleHandler={toggle}
            selectedKey={selectedKeys}
            onMenuClickHandler={menuClickHandler}
          />
          <div className={styles['bread-crumb']}>
            <BreadCrumbs list={breadcrumbRoutes} />
          </div>
        </Header>
        <Content className={styles['site-layout-background-content']}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(
  ({
    user,
    loading,
  }: {
    user: UserModelState;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userLogin: user,
    submitLoading: loading.effects['userLogin/login'],
  }),
)(IndexLayout);
