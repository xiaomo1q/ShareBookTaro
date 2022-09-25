import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { connect, useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { AtAvatar } from 'taro-ui'
import { _loginCode, _loginUserInfo } from '@/service/index'
import styles from './index.module.less';

/**  个人中心 */

const UserInfoIndex: React.FC<any> = ({ loading }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.global_user)
  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = () => {
    dispatch({ type: "global_user/getUserInfo" })
  }

  return (<View className={`flex-col ${styles['user-page']}`}>
    <View className={`flex-col ${styles['group']}`}>
      <View className={`flex-col ${styles['section_1']}`}>
        <Text className={`${styles['text']}`}>{userInfo?.nickName}</Text>
        <Text className={`${styles['text_1']}`}>{userInfo?.desc||''}</Text>
        <View className={`flex-row ${styles['equal-division']}`}>
          <View className={`flex-col items-center ${styles['equal-division-item']}`}>
            <Text className={`${styles['text_2']}`}>{userInfo?.upp_num|| 0}</Text>
            <Text className={`${styles['text_4']}`}>我的关注</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item']}`}>
            <Text className={`${styles['text_2']}`}>{userInfo?.fans_num || 0}</Text>
            <Text className={`${styles['text_4']}`}>我的粉丝</Text>
          </View>
        </View>
      </View>
      <View className={`${styles['section_2']}`} >
        <AtAvatar circle image={userInfo?.avatarUrl}></AtAvatar>
      </View>
    </View>
    <View className={`${styles['grid']}`}>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'shujia.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`}>拥有的书</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'tubiaozhi.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`}>想换的书</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'wenjian.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`}>成功匹配</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'wenjianjia.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`}>交换记录</Text>
      </View>
    </View>
  </View>);
}

export default connect(({ loading }: { loading: { effects: Record<string, boolean> } }) => ({ loading }))(UserInfoIndex);