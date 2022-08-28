import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import {
  Button,
  MiniLoginButton,
} from '@antmjs/vantui'
import WXBizDataCrypt from '@/utils/WXBizDataCrypt'
import styles from './index.module.less';

/**  个人中心 */
const RenderUserInfoView = () => {
  return <View className={`flex-col ${styles['user-page']}`}>
    <View className={`flex-col ${styles['group']}`}>
      <View className={`flex-col ${styles['section_1']}`}>
        <Text className={`${styles['text']}`}>Piscres</Text>
        <Text className={`${styles['text_1']}`}>desxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
        <View className={`flex-row ${styles['equal-division']}`}>
          <View className={`flex-col items-center ${styles['equal-division-item']}`}>
            <Text className={`${styles['text_2']}`}>100</Text>
            <Text className={`${styles['text_4']}`}>我的关注</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item']}`}>
            <Text className={`${styles['text_2']}`}>100</Text>
            <Text className={`${styles['text_4']}`}>我的粉丝</Text>
          </View>
        </View>
      </View>
      <View className={`${styles['section_2']}`}>{/***/}</View>
    </View>
    <View className={`${styles['grid']}`}>
      <View className={`flex-col items-center ${styles['grid-item']}`}>
        <Image
          src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612482264715012657.png'
          className={`${styles['image']}`}
        />
        <Text className={`${styles['text_8']}`}>拥有的书</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item_1']}`}>
        <Image
          src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612482264759926250.png'
          className={`${styles['image']}`}
        />
        <Text className={`${styles['text_9']}`}>想换的书</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item_2']}`}>
        <Image
          src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612482264782972460.png'
          className={`${styles['image']}`}
        />
        <Text className={`${styles['text_10']}`}>成功匹配</Text>
      </View>
      <View className={`flex-col items-center ${styles['grid-item_3']}`}>
        <Image
          src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612482264791444776.png'
          className={`${styles['image']}`}
        />
        <Text className={`${styles['text_11']}`}>交换记录</Text>
      </View>
    </View>
  </View>
}

const LoginUser = () => {
  const [isLogin, setIsLogin] = useState(false);


  const loginClickedHandler = (e) => {
    console.log(e, 'phone');
    Taro.login({
      success(res) {
        console.log('code: ', res,);
        // var userinfo = wx.getStorageSync('userInfo');
        if (res.errMsg === 'login:ok') {
          Taro.request({
            url: 'http://101.34.135.102:8080/account/wx/sessionKey/',
            method: 'GET',
            data: {
              code: res.code,
            },
            header: { 'content-type': 'application/json' },
            success: function (ress) {
              console.log(ress, '.....可以更新');
              if (ress.data.code === 2000) {
                const appId = 'wx7e774715f8b2f0c0'
                var pc = new WXBizDataCrypt(appId, ress.data.data.sessionKey)
                var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
                console.log('解密后 data: ', data)
                // 用户已经进入新的版本，可以更新本地数据
                // wx.setStorageSync('versions', '1');
                // wx.navigateTo({
                //   url: '/pages/index/index',
                // })
              }
            }
          });
        }

      }
    })

  }
  const getUserInfoClickedHandler = (res) => {
    if (res.detail.userInfo) { // 返回的信息中包含用户信息则证明用户允许获取信息授权
      console.log('授权成功')
      // 保存用户信息微信登录
      Taro.setStorageSync('userInfo', res.detail.userInfo)
      setIsLogin(true)
      // setLoading(!loading)
      Taro.login()
        .then(resLogin => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (resLogin.code) {
            Taro.getUserInfo({
              success: function (res) {
              }
            })
            // 登录
            // _login({ ...res.detail, code: resLogin.code }, (result) => {
            //   if (result.data.status === 200) {
            //     // 设置 token
            //     Taro.setStorageSync('token', result.data.data.token)
            //     // 登录成功返回首页并刷新首页数据
            //     Taro.switchTab({ url: '/pages/index/index' })
            //   } else {
            //     Taro.showToast({
            //       title: '登录失败，请稍后重试',
            //       icon: 'none',
            //       mask: true
            //     })
            //   }
            // }, () => {
            //   Taro.showToast({
            //     title: '登录失败，请稍后重试',
            //     icon: 'none',
            //     mask: true
            //   })
            // })
          }
          // setLoading(false)
        })
    }
  }

  return (isLogin ? <RenderUserInfoView /> :
    <View className={`flex-col ${styles['login-page']}`}>
      <Swiper
        className={styles['swipe']}
        indicatorColor='#999'
        indicatorActiveColor='#3D5CFF'
        vertical={false}
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View className={styles['swipe-image']}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612408255571266671.png'
              className={`${styles['image']}`}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View className={styles['swipe-image']}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612408255571266671.png'
              className={`${styles['image']}`}
            />
          </View>
        </SwiperItem>
      </Swiper>
      <Text className={`${styles['text']}`}>Campus Books</Text>
      <Text className={`${styles['text_1']}`}>Free Books to Get More Knowledgeg</Text>

      <View className='flex-col items-center'>
        <Button className={`${styles['button']}`} openType='getUserInfo' onGetUserInfo={getUserInfoClickedHandler} >微信一键登录  </Button>
        {/* <Button
          className={`${styles['button']}`}
          openType='getPhoneNumber'
          onGetPhoneNumber={loginClickedHandler}
          id='phoneNumber'
        >手机号登录</Button> */}
      </View>

    </View>);
}

export default LoginUser;