import NavCustomBar from '@/components/navCustomBar';
import { Del_fans_followers } from '@/service/index';
import { Empty } from '@antmjs/vantui';
import { View, Text, Image } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AtList, AtListItem, AtSwipeAction } from 'taro-ui';
import styles from './index.module.less'
/**
 * 粉丝 关注者
 * @returns 
 */
const FansFollowersIndex = () => {
  const [listItem, setListItem] = useState([])
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { bookuserInfo, userInfo } = useSelector((state: any) => state.global_user)
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.hideHomeButton();
      Taro.setNavigationBarTitle({ title: decodeURI(params?.title || '') })
    }
    if (params.id) { dispatch({ type: 'global_user/GetBookuserInfo', payload: { id: params.id } }) } else {
      dispatch({ type: "global_user/getUserInfo" })
    }
  }, [params])

  useEffect(() => {
    if (params.id) {
      if (decodeURI(params?.title || '').indexOf('粉丝') !== -1) {
        setListItem(bookuserInfo.fans)
      } else if (decodeURI(params?.title || '').indexOf('关注') !== -1) {
        setListItem(bookuserInfo.follower)
      }
    } else {
      if (decodeURI(params?.title || '').indexOf('粉丝') !== -1) {
        setListItem(userInfo.fans)
      } else if (decodeURI(params?.title || '').indexOf('关注') !== -1) {
        setListItem(userInfo.follower)
      }
    }
  }, [bookuserInfo, userInfo])
  const DelFansFollowersasync = async (it) => {
    await Del_fans_followers({
      toUser_id: it.toUser_id,
      formUser_id: it.formUser_id
    }).then(res => {
      Taro.showToast({
        title: res.msg,
        mask: true,
        duration: 2000
      })
      if (params.id) { dispatch({ type: 'global_user/GetBookuserInfo', payload: { id: params.id } }) } else {
        dispatch({ type: "global_user/getUserInfo" })
      }
    })
  }

  return (
    <View className={styles['fan-follower']}>
      <NavCustomBar needBackIcon title={decodeURI(params?.title || '')}
        url={!!params.id ? '/pagesA/bookuserinfo/index?id='+params.id : '/pages/userinfo/index'}
      />
      <View className={styles['list']}>
        {
          !!listItem && listItem.length > 0 ?
            listItem.map((it: any, ix) =>
              <View className={`flex-row justify-between ${styles['list-item']}`} key={ix}>
                <View className={`flex-row ${styles['space-x-26']}`}>
                  <View className={`flex-col items-center ${styles['group_2']}`}>
                    <Image
                      className={`${styles['image']}`}
                      src={!!it.avatarUrl ? it.avatarUrl : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'}
                    />
                  </View>
                  <View className={`flex-col items-start ${styles['space-y-19']}`}>
                    <Text className={`${styles['text']}`}>{it.nickName}</Text>
                    <Text className={`${styles['text_2']}`}>{it.nameDesc}</Text>
                  </View>
                </View>
                {
                  decodeURI(params?.title || '').indexOf('关注') !== -1 ? <View className={`flex-col ${styles['text-wrapper']}`} onClick={() => DelFansFollowersasync(it)}>
                    <Text className={`${styles['text_3']}`}>取消关注</Text>
                  </View> : null
                }
              </View>)
            : <Empty />
        }

      </View>

      {/* <AtList>
            {
              listItem.map((it: any, ix) =>
                <AtListItem
                  key={ix}
                  title={it.nickName}
                  note={it.nameDesc}
                  thumb={!!it.avatarUrl ? it.avatarUrl : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'}
                  extraText={<Text onClick={() => DelFansFollowersasync(it)}>取消关注</Text>}
                />
              )
            }
          </AtList> */}
    </View>
  );
};

export default FansFollowersIndex;