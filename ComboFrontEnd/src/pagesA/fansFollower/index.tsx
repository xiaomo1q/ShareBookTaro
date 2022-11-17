import NavCustomBar from '@/components/navCustomBar';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AtList, AtListItem } from 'taro-ui';
import './index.less'
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
    dispatch({ type: "global_user/getUserInfo" })
    params.id && dispatch({ type: 'global_user/GetBookuserInfo', payload: { id: params.id } })
  }, [params])

  useEffect(() => {
    if (params.id) {
      if (decodeURI(params?.title || '').indexOf('粉丝') !== -1) { 
        setListItem(bookuserInfo.fans)
      } else if (decodeURI(params?.title || '').indexOf('关注') !== -1) { 
        setListItem(bookuserInfo.follower)
      }
    }else{
      if (decodeURI(params?.title || '').indexOf('粉丝') !== -1) { 
        setListItem(userInfo.fans)
      } else if (decodeURI(params?.title || '').indexOf('关注') !== -1) { 
        setListItem(userInfo.follower)
      }
    }
  }, [bookuserInfo, userInfo])
  console.log(params, userInfo, bookuserInfo);

  return (
    <View className='fan-follower'>
      <NavCustomBar needBackIcon title={decodeURI(params?.title || '')}
        url={!!params.id ? '/pagesA/bookuserinfo/index' : '/pages/userinfo/index'}
      />
      <AtList>
        <AtListItem
          title='标题文字'
          arrow='right'
          thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
        />
      </AtList>

    </View>
  );
};

export default FansFollowersIndex;