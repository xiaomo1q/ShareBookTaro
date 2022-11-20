import React, { useEffect, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { RenderBookList } from '@/components/bookList'
import NavCustomBar from '@/components/navCustomBar';
import { Add_fans_followers, Add_messages, Del_fans_followers } from '@/service/index';
import styles from './index.module.less';

/**
 * 书主详情
 * @returns 
 */
const LoginUser = () => {
  const [isFollower, setIsFollower] = useState(false)
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { bookuserInfo, userInfo } = useSelector((state: any) => state.global_user)
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') { Taro.hideHomeButton(); Taro.setNavigationBarTitle({ title: '' }) }
    params.id && dispatch({ type: 'global_user/GetBookuserInfo', payload: { id: params.id } })
    dispatch({ type: "global_user/getUserInfo" })
  }, [params])

  useEffect(() => {
    if (bookuserInfo && userInfo && userInfo.follower && userInfo.follower.length > 0) {
      const filter = userInfo.follower.filter(i => i.openid === params.id)
      setIsFollower(!!filter && filter.length > 0)
    }else{
      setIsFollower(false)
    }
  }, [bookuserInfo, userInfo])

  const addMessagesClickedHandler = async () => {
    const form = {
      form_avatarUrl: userInfo.avatarUrl,
      form_name: userInfo.nickName,
      form_id: userInfo.openid
    }
    const to = {
      id: bookuserInfo.openid, name: bookuserInfo.nickName, to_avatarUrl: bookuserInfo?.avatarUrl
    }
    await Add_messages({ ...to, ...form }).then(res => {
      Taro.redirectTo({ url: '/pagesA/message/msg-detail/index?id=' + res.m_id })
    })
  }
  const addFansClickedHandler = async () => {
    const form = {
      formUser_id: userInfo.openid,
      toUser_id: bookuserInfo.openid
    }
    if (isFollower) {
      await Del_fans_followers({ ...form })
    } else {
      await Add_fans_followers({ ...form })
    }
    params.id && dispatch({ type: 'global_user/GetBookuserInfo', payload: { id: params.id } })
    dispatch({ type: "global_user/getUserInfo" })
  }

  return (
    <View className={styles['user-page']}>
      <NavCustomBar needBackIcon title='' url='/pages/home/index' />
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
                <View className={`${styles['group_6']}`} onClick={() => { Taro.redirectTo({ url: '/pagesA/fansFollower/index?title=粉丝&id=' + bookuserInfo.openid }) }}>
                  <Text className={`${styles['font_2']}`}>{bookuserInfo?.fans?.length || 0}</Text>
                  <View>
                    <Text className={`${styles['font_3']}`}>粉丝</Text>
                  </View>
                </View>
                <View className={`${styles['group_6']}`} onClick={() => { Taro.redirectTo({ url: '/pagesA/fansFollower/index?title=关注&id=' + bookuserInfo.openid }) }}>
                  <Text className={`${styles['font_2']}`}>{bookuserInfo?.follower?.length || 0}</Text>
                  <View> <Text className={`${styles['font_3']}`}>关注</Text></View>
                </View>
              </View>
              {
                userInfo && bookuserInfo && userInfo.openid === bookuserInfo.openid ? <></> : <View className={`flex-row ${styles['space-x-11']} ${styles['group_7']}`}>
                  <View className={`flex-row ${styles['section_5']}`}>
                    <Image className={`${styles['image_15']}`} src={process.env.URL + 'icon/xinxi.png'} />
                    <Text className={`${styles['font_1']} ${styles['text_3']}`} onClick={addMessagesClickedHandler}>私信</Text>
                  </View>
                  <View className={`flex-row ${styles['section_5']}`} onClick={addFansClickedHandler} >
                    <Image className={`${styles['image_15']}`} src={process.env.URL + 'icon/add-user.png'} />
                    <Text className={`${styles['font_1']} ${styles['text_3']}`}>{isFollower ? '取消关注' : '关注'}</Text>
                  </View>
                </View>
              }

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