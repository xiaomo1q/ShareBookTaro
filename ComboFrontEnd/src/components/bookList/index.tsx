import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui'
import { View, Text, Image } from '@tarojs/components';
import { Empty, } from '@antmjs/vantui'
import styles from './index.module.less'

/**
 * 渲染列表
 * @param param0 
 * @returns 
 */
export const RenderBookList = ({ data }) => {
  return (<View className={`flex-col ${styles['home-tab-panel']}`}>
    {
      data && data.length > 0 ? data.map((item, index) =>
        <View className={`flex-col  ${styles['section_5']} ${styles['view']}`}
          key={index}
          onClick={() => { Taro.redirectTo({ url: "/pages/home/book-detail/index?isbn=" + item.isbn }) }}
        >
          <Image src={`https://file.ituring.com.cn/SmallCover/${item.coverKey}`} className={`${styles['image_20']}`} />
          <View className={`flex-col ${styles['group_9']}`}>
            <Text className={`${styles['text_10']}`}>{item.name}</Text>
          </View>
        </View>
      ) : <Empty />
    }
  </View>);
}

/**
 * 多选
 * @param param0 
 * @returns 
 */
export const RenderConnectBookList = ({ data, onChange }) => {
  const [c_book, setC_book] = useState([]);
  useEffect(() => {
    data.forEach(el => el.active = false)
    setC_book(data)
    Taro.hideHomeButton()
  }, [data]);
  useEffect(() => {
    const fil = c_book.filter(el => el.active)
    onChange(fil)
  }, [c_book]);
  return (<View className={`flex-col ${styles['home-tab-connect']}`}>
    {
      c_book && c_book.length > 0 ? c_book.map((item: any, index: any) =>
        <View className={`flex-row ${styles['section_5']} ${styles['view']}`}
          key={index} onClick={() => {
            c_book.forEach((el, ix) => { if (ix === index) { el.active = !item.active } })
            setC_book([...c_book])
          }}
        >
          <View className='flex-row'>
            <Image src={`https://file.ituring.com.cn/SmallCover/${item.coverKey}`} className={`${styles['image_20']}`} />
            <View className={`flex-col ${styles['group_9']}`}> <Text className={`${styles['text_10']}`}>{item.name}</Text>   </View>
          </View>
          <AtIcon value='check-circle' size='30' color={item.active ? '#3D5CFF' : '#ccc'}></AtIcon>
        </View>
      ) : <Empty />
    }
  </View>);
}