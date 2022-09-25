
import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtImagePicker } from 'taro-ui'
import { fileToBase64 } from '@/utils/calculate'
import styles from './index.module.less'

/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const [formValue, setFormValue] = useState({
    book_content: "", book_url: "", book_id: []
  });
  const [upload_img, setUpload_img] = useState([{
    url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
  }]);

  useEffect(() => { }, []);
  const handleChange = (value) => {
    console.log(value);
  }
  const onSubmit = (event) => {
  }
  const onReset = (event) => {

  }

  const UploadImg = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: async (res) => {
        let file = await fileToBase64(res.tempFilePaths[0])
        if (file) {
          console.log(file, '...');

          // 更换图像
          // let uploadRes: any = await profileStore.uptdate_profile_avatar({data: file})
          // if (uploadRes) {
          //       // TODO
          //   }
        }
      }
    })
  }
  const onChange = (files) => {
console.log(files);

    // setUpload_img(files)
  }
  const onFail = (mes) => {
    console.log(mes)
  }
  const onImageClick = (index, file) => {
    console.log(index, file)
  }
  return (
    <View className={`flex-col ${styles['release-index']}`}>
      <AtForm
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <View className={`flex-row ${styles['re-footer']}`}>
          <AtButton formType='submit'>确认发布</AtButton>
        </View>
        <AtInput name='book_content' title='' type='text' placeholder='说说你对某本书的观点吧～' onChange={handleChange} />
        <AtImagePicker
          files={upload_img}
          onChange={onChange}
        />
      </AtForm>

    </View>
  );
};

export default Index;
