import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Empty, } from '@antmjs/vantui'
import styles from './index.module.less'

const RenderBookList = ({ data }) => {
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

export default RenderBookList;