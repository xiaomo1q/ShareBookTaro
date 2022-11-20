
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components'
import NavCustomBar from '@/components/navCustomBar';
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtAvatar } from 'taro-ui'
import { Update_userInfo } from '@/service/index';
import moment from 'moment';
import styles from './index.module.less'

const initVal = {
  "nickName": "",
  "nameDesc": "",
  "phoneNumber": "",
  // "city": "",
  // "country": "",
  "gender": "",
  "avatarUrl": "",
  "create_time": ''
}
/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const sexList = ['男', '女']
  const [formValue, setFormValue] = useState({ ...initVal });
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.global_user)
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') { Taro.hideHomeButton(); Taro.setNavigationBarTitle({ title: '编辑个人信息' }) }
    dispatch({ type: "global_user/getUserInfo" })
  }, [])
  useEffect(() => {
    if (!!userInfo && userInfo.openid) {
      for (const key in initVal) {
        initVal[key] = userInfo[key]
        if (key === 'gender') {
          initVal[key] = { '0': '男', '1': "女" }[userInfo[key]]
        }
      }
      setFormValue({ ...initVal })
    }
  }, [userInfo])
  const handleChange = (name, value) => {
    formValue[name] = value
    setFormValue({ ...formValue })
  }
  const onSubmit = async () => {
    const obj: any = { ...formValue }
    obj.gender = { '男': '0', '女': "1" }[obj.gender]
    delete obj.create_time;
    await Update_userInfo({ ...obj }).then(res => {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
      setFormValue({ ...initVal })
      Taro.redirectTo({ url: '/pages/userinfo/index' })
    })

  }
  const ImagePickerChangedHandler = () => {
    try {
      Taro.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          if (res.errMsg === "chooseImage:ok") {
            //获取环境
            let token;
            if (process.env.TARO_ENV === "h5") {
              token = localStorage.getItem("TOKEN"); //拿到本地缓存中存的token
            } else {
              token = Taro.getStorageSync("TOKEN"); //拿到本地缓存中存的token
            }
            const tempFilePaths = res.tempFilePaths;
            Taro.uploadFile({
              url: "/api/file/img/upload/",
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                Authorization: token, //将token添加到头部
              },
              formData: { file: res.tempFiles[0].originalFileObj },
              success: (re) => {
                const urk: any = JSON.parse(re.data)
                formValue.avatarUrl = (`${process.env.baseUrl}${urk.url}`)
                setFormValue({ ...formValue })
              },
            });
          }
        }
      })
    } catch (error) {
      console.log("error :", error);
    }
  }
  return (
    <View className={`flex-col ${styles['update-index']}`}>
      <NavCustomBar needBackIcon title='编辑个人信息' url='/pages/userinfo/index' />
      <AtForm>
        <View className={`${styles['avatar']}`} onClick={ImagePickerChangedHandler} >
          <AtAvatar circle image={formValue.avatarUrl} size='large' />
        </View>
        <AtInput name='' title='昵称' type='text' value={formValue.nickName} placeholder='请输入'
          onChange={() => { }} onBlur={(value) => handleChange('nickName', value)}
        />
        <AtInput name='' title='简介' type='text' value={formValue.nameDesc} placeholder='请输入'
          onChange={() => { }} onBlur={(value) => handleChange('nameDesc', value)}
        />
        <AtInput name='' title='手机号码' type='phone' value={formValue.phoneNumber} placeholder='手机号码'
          onChange={() => { }} onBlur={(value) => handleChange('phoneNumber', value)}
        />
        <View className='page-section'>
          <Picker mode='selector' range={sexList} onChange={e => { handleChange('gender', sexList[e.detail.value]) }}>
            <AtList>
              <AtListItem title='性别' extraText={formValue.gender} />
            </AtList>
          </Picker>
        </View>
        <AtList>
          <AtListItem title='创建时间' extraText={moment(formValue?.create_time || '2002').format('YYYY-MM-DD')} />
        </AtList>
        {/* <AtInput name='' title='城市' type='text' value={formValue.city} placeholder='手机号码'
          onChange={() => { }} onBlur={(value) => handleChange('city', value)}
        />
        <AtInput name='' title='国家' type='text' value={formValue.country} placeholder='手机号码'
          onChange={() => { }} onBlur={(value) => handleChange('country', value)}
        /> */}

      </AtForm>
      <View className={`${styles['re-footer']}`}>
        <AtButton onClick={onSubmit}>修改并保存</AtButton>
        <AtButton onClick={() => {
          if (process.env.TARO_ENV === "h5") {
            localStorage.clear()
            Taro.redirectTo({
              url: "/pages/userinfo/login"
            })
          } else {
            Taro.clearStorageSync()
          }
        }}
        >退出登录</AtButton>
      </View>
    </View>
  );
};

export default Index;
