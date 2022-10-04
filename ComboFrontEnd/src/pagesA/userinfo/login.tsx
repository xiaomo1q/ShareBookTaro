import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { Button } from '@antmjs/vantui'
import WXBizDataCrypt from '@/utils/WXBizDataCrypt'
import { _loginCode, _loginUserInfo } from '@/service/index'
import styles from './index.module.less';

/**
 * 登录
 * @returns 
 */
const LoginUser = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [formValue, setFormValue] = useState({
    name: '', passward: '', re_pas: ""
  });
  useEffect(() => {
    Taro.hideHomeButton()
    Taro.setNavigationBarTitle({ title: '登录' })
  }, [])
  const loginClickedHandler = (e) => {
    Taro.login({
      success(res) {
        if (res.errMsg === 'login:ok') {
          _loginCode({ code: res.code }).then((result) => {
            Taro.getUserInfo({
              success: (req) => {
                const pc = new WXBizDataCrypt(result.appid, result.session_key)
                const data: any = pc.decryptData(e.detail.encryptedData, e.detail.iv)
                try {
                  if (data) {
                    _loginUserInfo({
                      openid: result.openid,
                      session_key: result.session_key,
                      countryCode: data.countryCode,
                      phoneNumber: data.phoneNumber,
                      purePhoneNumber: data.purePhoneNumber,
                      ...req.userInfo
                    }).then(_res => {
                      if (_res.code === 0) {
                        // 保存用户信息微信登录
                        Taro.setStorageSync('userInfo', req.userInfo)
                        Taro.setStorageSync('TOKEN', _res.token)
                        Taro.switchTab({
                          url: '/pages/home/index',
                        })
                      }
                    })
                  } else {
                    Taro.showToast({
                      title: '登录失败，请稍后重试',
                      icon: 'error',
                      mask: true,
                      duration: 2000
                    })
                  }
                } catch (error) {

                }


              }
            })

            // 用户已经进入新的版本，可以更新本地数据
            // wx.setStorageSync('versions', '1');
            // wx.navigateTo({
            //   url: '/pages/index/index',
            // })
          })
        }
      }
    })

  }

  const handleChange = (name, value) => {
    formValue[name] = value
    setFormValue({ ...formValue })
  }
  const onSubmit = async () => {
    // await Add_only_book(formValue).then(res => {
    //   Taro.showToast({
    //     title: res.msg,
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   setFormValue({ isbn: '', book_name: '', book_type: '', book_desc: '', book_author: '' })
    // })
  }
  /** 注册 */
  const registerClickedHandler = ()=>{

  }
  return (<View className={`flex-col ${styles['login-page']}`}>
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
    <Text className={`${styles['text']}`}>校图</Text>
    <Text className={`${styles['text_1']}`}>共享图书，共享知识</Text>
    <AtForm >
      <AtInput required name='name' title='账号' type='text' value={formValue.name} placeholder='请输入账号' onChange={() => { }} onBlur={(value) => handleChange('isbn', value)} />
      <AtInput required name='passward' title='密码' type='password' value={formValue.passward} placeholder='请输入密码' onChange={() => { }} onBlur={(value) => handleChange('passward', value)} />
      {
        register ? <>
         <AtInput required name='re_pas' title='确认密码' type='password' value={formValue.re_pas} placeholder='请输入密码' onChange={() => { }} onBlur={(value) => handleChange('re_pas', value)} />
         <View className={`flex-row ${styles['re-footer']}`}>
          <AtButton onClick={registerClickedHandler}>注册并登录</AtButton>
        </View>
        </> : <View className={`flex-row ${styles['re-footer']}`}>
          <AtButton onClick={onSubmit}>登录</AtButton>
          <AtButton onClick={() => setRegister(true)}>注册</AtButton>
        </View>
      }


    </AtForm>

    <View className='flex-col items-center'>
      {/* <Button className={`${styles['button']}`} openType='getUserInfo' onGetUserInfo={getUserInfoClickedHandler} >微信一键登录  </Button> */}
      <Button
        className={`${styles['button']}`}
        openType='getPhoneNumber'
        onGetPhoneNumber={loginClickedHandler}
        id='phoneNumber'
      >微信一键登录</Button>
    </View>

  </View>);
}

export default LoginUser;