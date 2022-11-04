import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined
} from '@ant-design/icons';
import ALink from '@/components/ALink';
import { Menu, Avatar, Dropdown } from 'antd';
import styles from '../index.less';
import IndexLayoutRoutes from '@/config/index-router'
import { removeToken } from '@/utils/localToken';
import { accountLogout } from '@/services/user';
import { history } from 'umi';
export interface RightTopProps {
    collapsed?: boolean;
    selectedKey?: string
    onToggleHandler?: (collapsed: boolean) => void;
    onMenuClickHandler?: (collapsed: boolean) => void;
}

const RightTop: React.FC<RightTopProps> = ({
    collapsed = false,
    onToggleHandler,
    onMenuClickHandler,
    selectedKey = '/',
}) => {
    const toggle = () => { onToggleHandler && onToggleHandler(!collapsed)  }
    const handleClick = (item: any) => { onMenuClickHandler && onMenuClickHandler(item) }
    // 登出
    const logoutClickedHandler = async () => {
        // accountLogout().then(res => {
        //     if (res === 'out') {
        //     }
        // })
        removeToken();
        history.replace('/');
    }
    /** 下拉菜单 */
    const menu = (
        <Menu>
            {/* <Menu.Item key="0">
                <ALink to="/roles/all">个人中心</ALink>
            </Menu.Item>
            <Menu.Divider /> */}
            <Menu.Item key="3" onClick={logoutClickedHandler}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <div className={styles['site-header-top']}>
            {/* 收缩 */}
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles['trigger'],
                onClick: toggle,
            })}
            {/* 菜单栏 */}
            <Menu mode="horizontal" onClick={handleClick} selectedKeys={[selectedKey]}>
                {
                    IndexLayoutRoutes.map((t, ix) => <Menu.Item key={t.path}>
                        <ALink to={t.path}> {t.title}</ALink>
                    </Menu.Item>)
                }
            </Menu>

            <div className={styles['right-logout']}> 
                <Dropdown overlay={menu} trigger={['click']}>
                    <Avatar src="https://images-1300238189.cos.ap-shanghai.myqcloud.com/icon/saqure.png" />
                </Dropdown>
            </div>
        </div>
    );

};

export default RightTop;
