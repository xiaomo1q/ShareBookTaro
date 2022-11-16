import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { AtIcon, AtSwipeAction } from 'taro-ui'
import { View, Text, Image } from '@tarojs/components';
import { Empty, } from '@antmjs/vantui'
import styles from './index.module.less'

/**
 * 渲染列表
 * @param param0 
 * @returns 
 */
export const RenderBookList = ({ data }) => {
  return (<View className={`flex-row ${styles['home-tab-panel']}`}>
    {
      data && data.length > 0 ? data.map((item, index) =>
        <View className={`flex-col  ${styles['section_5']} ${styles['view']}`}
          key={index}
          onClick={() => { Taro.redirectTo({ url: "/pages/home/book-detail/index?isbn=" + item.isbn }) }}
        >
          {/* <Image src={`https://file.ituring.com.cn/SmallCover/${item.coverKey}`} className={`${styles['image_20']}`} />  */}
          <Image src={!!item.imgUrl ? item.imgUrl : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'} className={`${styles['image_20']}`} />
          <View className={`flex-col ${styles['group_9']}`}>
            <Text className={`${styles['text_10']}`}>{item.book_name}</Text>
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
    if (process.env.TARO_ENV === 'weapp') Taro.hideHomeButton()
  }, [data]);
  useEffect(() => {
    const fil = c_book.filter((el: { active: boolean }) => el.active)
    onChange(fil)
  }, [c_book]);
  return (<View className={`flex-col ${styles['home-tab-connect']}`}>
    {
      c_book && c_book.length > 0 ? c_book.map((item: any, index: any) =>
        <View key={index} className={`flex-row ${styles['section_5']} ${styles['view']}`}
          onClick={() => {
            c_book.forEach((el: { active: boolean }, ix) => { if (ix === index) { el.active = !item.active } })
            setC_book([...c_book])
          }}
        >
          <View className='flex-row'>
            <Image src={!!item.imgUrl ? item.imgUrl : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'} className={`${styles['image_20']}`} />
            <View className={`flex-col ${styles['group_9']}`}> <Text className={`${styles['text_10']}`}>{item.book_name}</Text>   </View>
          </View>
          <AtIcon value='check-circle' size='30' color={item.active ? '#3D5CFF' : '#ccc'}></AtIcon>
        </View>
      ) : <Empty />
    }
  </View>);
}

/**
 * 滑动删除
 * @param param0 
 * @returns 
 */
export const RenderDelBookList = ({ data, onChange, type }) => {

  return (<View className={`flex-col ${styles['home-tab-connect']}`}>
    {
      data && data.length > 0 ? data.map((item: any, index: any) =>
        <AtSwipeAction key={index} autoClose options={[
          { text: '删除', style: { backgroundColor: '#FF4949' } },
        ]}
          // onClosed={() => { console.log('close',item.book_name, index) }}
          // onOpened={() => { console.log('open',item.book_name, index) }}
          onClick={() => onChange(item.isbn)}
        >
          <View className={`flex-row ${styles['section_5']} ${styles['view']}`}>
            <View className='flex-row'>
              <Image src={!!item.imgUrl ? item.imgUrl : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'} className={`${styles['image_20']}`} />
              <View className={`flex-col ${styles['group_9']}`}>
                <Text className={`${styles['text_10']}`}>{item.book_name}</Text>
              </View>
            </View>
            {/* <View className={styles['add-pay']}>捐赠</View> */}
          </View>
        </AtSwipeAction>
      ) : <Empty />
    }
  </View>);
}