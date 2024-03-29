import Taro from "@tarojs/taro";
import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.less'


type Navigate = {
  url?: '/pages/index' | string,
  color?: string;
  needBackIcon: boolean;
  title: string;
  location?: "start" | "center";
}
// 色相反转
const colorReverse = (oldColor: string): string | never => {
  if (oldColor.length < 6) throw new Error("请输入正确的16进制颜色");
  else {
    const oldNumber: any = '0x' + oldColor.replace(/#/g, '');
    let str = '000000' + (0xFFFFFF - oldNumber).toString(16);
    return '#' + str.substring(str.length - 6, str.length);
  }
}
/**
 * 顶部状态栏组件
 * @param props 
 * @returns 
 */
const NavCustomBar: React.FC<Navigate> = (props) => {
  const [navBarHeight, setNavBarHeight] = useState('0px');
  const { needBackIcon, title, color } = props;

  /**@function 导航 */
  function guide() {
    if (props.url === undefined) {
      Taro.navigateBack({ delta: 1 })
      return;
    }
    Taro.redirectTo({ url: props.url })
  }

  /** 获取顶部状态栏高度、胶囊按钮高度、以及胶囊到顶部的高度 */
  const getNavHeight = () => {
    let menuButtonObject = Taro.getMenuButtonBoundingClientRect();
    const sysInfo = Taro.getSystemInfoSync();
    let statusBarHeight: any = sysInfo.statusBarHeight;
    let menuBtnHeight = menuButtonObject.height;
    let menuBtnTop = menuButtonObject.top;
    let navBarHig = statusBarHeight + menuBtnHeight + (menuBtnTop - statusBarHeight) * 2;
    setNavBarHeight(`${navBarHig}px`)
  }

  const env = process.env.TARO_ENV;

  useEffect(() => {
    if (env === 'h5') {
      setNavBarHeight('2rem')
    } else {
      getNavHeight()
    }

  }, [])

  return (
    <View className='nav_custom_bar' style={{ height: navBarHeight }}>
      <View className='nav-container'>
        <AtIcon className={`nav_custom_bar_back ${needBackIcon ? '' : 'hidden'}`} value='chevron-left' size={22} color={color} onClick={guide} />
        <View className='title' style={{ justifyContent: props.location ? props.location : 'center' }}>
          <Text style={{ color }} className='nav_custom_bar_title'>{title}</Text>
        </View>
      </View>


    </View>
  )
}
export default NavCustomBar;