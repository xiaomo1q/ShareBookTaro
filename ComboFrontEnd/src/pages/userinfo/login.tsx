import { Button } from '@antmjs/vantui';
import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtButton, AtForm, AtInput } from 'taro-ui';
// import WXBizDataCrypt from '@/utils/WXBizDataCrypt'
import { _loginCode, _loginH5, _loginUserInfo, _registered } from '@/service/index';
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
    if (process.env.TARO_ENV === 'weapp') Taro.hideHomeButton();
    Taro.setNavigationBarTitle({ title: '登录' })
  }, [])
  const loginClickedHandler = (e) => {
    Taro.login({
      success(res) {
        if (res.errMsg === 'login:ok') {
          _loginCode({ code: res.code }).then((result) => {
            Taro.getUserInfo({
              success: (req) => {
                try {
                  _loginUserInfo({
                    encryptedData: e.detail.encryptedData, iv: e.detail.iv,
                    openid: result.openid,
                    session_key: result.session_key,
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
                } catch (error) {
                  Taro.showToast({
                    title: '登录失败，请稍后重试',
                    icon: 'error',
                    mask: true,
                    duration: 2000
                  })
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
    await _loginH5(formValue).then(res => {
      if (res.msg) {
        Taro.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
      if (res.code === 0) {
        // 保存用户信息微信登录
        localStorage.setItem('TOKEN', res.token)
        Taro.switchTab({
          url: '/pages/home/index',
        })
        setFormValue({ name: '', passward: '', re_pas: "" })
      }
    })
  }
  /** 注册 */
  const registerClickedHandler = async () => {
    if (formValue.re_pas === formValue.passward) {
      await _registered(formValue).then(res => {
        if (res.msg) {
          Taro.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
        if (res.code === 0) {
          // 保存用户信息微信登录
          localStorage.setItem('TOKEN', res.token)
          Taro.switchTab({
            url: '/pages/home/index',
          })
          setFormValue({ name: '', passward: '', re_pas: "" })
        }
      })
    } else {
      Taro.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
    }
  }
  return (<View className={`flex-col ${styles['login-page']}`}>
    <View className={`${styles['head-title']}`}>
      <View className={`${styles['text']}`}>
        <Image src={process.env.URL + 'book-logo.png'} className={`${styles['image']}`} />
      </View>
      <Text className={`${styles['text_1']}`}>共享图书，共享知识</Text>
    </View>
    <AtForm >
      <AtInput required name='name' title='账号' type='text' value={formValue.name} placeholder='请输入账号' onChange={() => { }} onBlur={(value) => handleChange('name', value)} />
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
      {
        process.env.TARO_ENV === 'weapp' ? <Button
          className={`${styles['button']}`}
          openType='getPhoneNumber'
          onGetPhoneNumber={loginClickedHandler}
          id='phoneNumber'
        >微信一键登录</Button> : null
      }

    </View>

  </View >);
}

export default LoginUser;