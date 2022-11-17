import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
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
        <Text className={`${styles['text_1']}`}>{userInfo?.desc || ''}</Text>
        <View className={`flex-row ${styles['equal-division']}`}>
          <View className={`flex-col items-center ${styles['equal-division-item']}`}>
            <Text className={`${styles['text_2']}`}>{userInfo?.follower.length || 0}</Text>
            <Text className={`${styles['text_4']}`}>我的关注</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item']}`}>
            <Text className={`${styles['text_2']}`}>{userInfo?.fans.length || 0}</Text>
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
        <Text className={`${styles['text_8']}`} onClick={() => { Taro.navigateTo({ url: "/pages/search/index?title=我的图书" }) }}>我的图书</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'tubiaozhi.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`} onClick={() => { Taro.navigateTo({ url: "/pages/search/index?title=收藏" }) }}>我的收藏</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'wenjian.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`}>我的捐赠</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image src={process.env.URL + 'wenjianjia.png'} className={`${styles['image']}`} />
        <Text className={`${styles['text_8']}`}>交换记录</Text>
      </View>
    </View>
  </View>);
}

// export default connect(({ loading }: { loading: { effects: Record<string, boolean> } }) => ({ loading }))(UserInfoIndex);
export default UserInfoIndex;