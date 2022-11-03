import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import styles from '../index.less';
import { UserOutlined, } from '@ant-design/icons';
import ALink from '@/components/ALink'
/**
 * 左侧导航栏
 */
export interface LeftProps {
    sidlerMenu: any,
    selectedKey: string,
    roles?: string,
}

const Left: React.FC<LeftProps> = ({
    sidlerMenu = [],
    selectedKey = '',
    roles = '',
}) => {
    return (
        <>
            <div className={styles['logo']} />
            {/* 侧边栏 */}
            <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} >
                {/* {
                    sidlerMenu.map((t: any, ix: React.Key | null | undefined) => 
                    t.roles.indexOf(JSON.parse(roles)) !== -1 ? <Menu.Item key={t.path} icon={<UserOutlined />}>
                        <ALink to={t.path}> {t.title}</ALink>
                    </Menu.Item> : null)
                } */}
                {
                    sidlerMenu.map((t: any, ix: React.Key | null | undefined) => <Menu.Item key={t.path} icon={<UserOutlined />}>
                        <ALink to={t.path}> {t.title}</ALink>
                    </Menu.Item>)
                }
            </Menu>
        </>
    );
};

export default Left;
