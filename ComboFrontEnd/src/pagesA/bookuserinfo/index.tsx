import React, { useEffect, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { RenderBookList } from '@/components/bookList'
import { Add_messages } from '@/service/index';
import styles from './index.module.less';

/**
 * 登录
 * @returns 
 */
const LoginUser = () => {
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { bookuserInfo } = useSelector((state: any) => state.global_user)
  useEffect(() => {
    Taro.hideHomeButton()
    Taro.setNavigationBarTitle({ title: '' })
    params.id && dispatch({ type: 'global_user/GetBookuserInfo', payload: { id: params.id } })
  }, [])

  const addMessagesClickedHandler = async () => {
    await Add_messages({ id: bookuserInfo.openid, name: bookuserInfo.nickName, avatarUrl: bookuserInfo?.avatarUrl }).then(res=>{
      console.log(res);
      
    })
  }

  return (
    <View className={styles['user-page']}>
      <View className={`flex-col ${styles['group']}`}>
        <View className={`flex-col ${styles['section_2']}`}>
          <Image className={`${styles['image_2']}`} src={process.env.URL + 'buc-bg.png'} />
          <View className={`flex-col ${styles['space-y-36']} ${styles['section_4']}`}>
            <View className={`flex-row ${styles['space-x-12']} ${styles['group_2']}`}>
              <View className={`flex-col items-center ${styles['section_3']}`}>
                <Image className={`${styles['image_3']}`} src={bookuserInfo?.avatarUrl} />
              </View>
              <View className={`flex-col ${styles['space-y-8']} ${styles['group_4']}`}>
                <View className='flex-row'>
                  <Text className={`${styles['text']}`}>{bookuserInfo?.nickName}</Text>
                  <Image src={process.env.URL + { '0': 'icon/boy.png', '1': 'icon/gril.png', }[bookuserInfo?.gender]} className={`${styles['image_12']}`} />
                </View>
                <Text className={`${styles['font_1']} ${styles['text_2']}`}>暂无简介～</Text>
              </View>
            </View>
            <View className={`flex-row justify-between ${styles['he-btn']}`}>
              <View className={`flex-row ${styles['group_5']}`}>
                <View className={`${styles['group_6']}`}>
                  <Text className={`${styles['font_2']}`}>0</Text>
                  <View>
                    <Text className={`${styles['font_3']}`}>粉丝</Text>
                  </View>
                </View>
                <View className={`${styles['group_6']}`}>
                  <Text className={`${styles['font_2']}`}>100</Text>
                  <View> <Text className={`${styles['font_3']}`}>关注</Text></View>
                </View>
              </View>
              <View className={`flex-row ${styles['space-x-11']} ${styles['group_7']}`}>
                <View className={`flex-row ${styles['section_5']}`}>
                  <Image className={`${styles['image_15']}`} src={process.env.URL + 'icon/xinxi.png'} />
                  <Text className={`${styles['font_1']} ${styles['text_3']}`} onClick={addMessagesClickedHandler}>私信</Text>
                </View>
                <View className={`flex-row ${styles['section_5']}`}>
                  <Image className={`${styles['image_15']}`} src={process.env.URL + 'icon/add-user.png'} />
                  <Text className={`${styles['font_1']} ${styles['text_3']}`}>关注</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className={`${styles['section_7']}`}>
          <RenderBookList data={bookuserInfo.book_list} />
        </View>
      </View>
    </View>
  );
}

export default LoginUser;