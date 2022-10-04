
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import { AtForm, AtTextarea, AtButton, AtImagePicker, AtListItem } from 'taro-ui'
import { fileToBase64 } from '@/utils/calculate'
import styles from './index.module.less'

/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const [formValue, setFormValue] = useState({
    book_content: "", book_url: [], book_name: '', book_img: '',
  });
  const [upload_img, setUpload_img] = useState([]);
  const dispatch = useDispatch()
  const { connect_book_list } = useSelector((state: any) => state.public_storage)
  useEffect(() => {
    if (connect_book_list && connect_book_list.length > 0) {
      const imgUrl: any = []
      const text: any = []
      const bookURL: any = []
      connect_book_list.forEach(el => {
        imgUrl.push({ url: el.imgUrl })
        text.push(el.name)
        bookURL.push(el.coverKey)
      });
      setFormValue({ ...formValue, book_img: bookURL.join('[;]'), book_url: imgUrl, book_name: text.join(';') })
    }
  }, [connect_book_list]);
  const handleChange = (value) => {
    setFormValue({ ...formValue, book_content: value })
  }
  const onSubmit = (event) => {
    console.log(event, formValue);
    
    dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: [] } })
  }

  const ImagePickerChangedHandler = (files) => {
    /**book_url.join([;])   book_id.join([;])  */
    // Taro.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: async (res) => {
    //     let file = await fileToBase64(res.tempFilePaths[0])
    //     if (file) {
    //       console.log(file, '...');

    //       // 更换图像
    //       // let uploadRes: any = await profileStore.uptdate_profile_avatar({data: file})
    //       // if (uploadRes) {
    //       //       // TODO
    //       //   }
    //     }
    //   }
    // })
    // Taro.chooseImage({
    //   success (res) {
    //     const tempFilePaths = res.tempFilePaths
    //     Taro.uploadFile({
    //       url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData: {
    //         'user': 'test'
    //       },
    //       success (res){
    //         const data = res.data
    //         //do something
    //       }
    //     })
    //   }
    // })
  }
  const ImagePickerFailHandler = (mes) => {
    console.log(mes)
  }
  return (
    <View className={`flex-col ${styles['release-index']}`}>
      <AtForm >
        <View className={`flex-row ${styles['re-header']}`}>
          <Text className={styles['re-h-text']} onClick={() => {
            Taro.navigateBack({ delta: -1 });
            dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: [] } })
          }}
          >取消</Text>
          <AtButton  onClick={onSubmit} >发布</AtButton>
        </View>
        <AtTextarea value={`${formValue.book_content}`}
          count={false}
          // height={400}
          maxLength={100000}
          placeholder='说说你对某本书的观点吧～'
          onChange={handleChange}
        />
        <AtImagePicker files={formValue.book_url}
          onChange={ImagePickerChangedHandler}
          onFail={ImagePickerFailHandler}
        />
      </AtForm>
      <AtListItem title='关联图书' note='' arrow='right' onClick={() => Taro.navigateTo({ url: "/pages/search/index?title=关联图书" })} />
    </View>
  );
};

export default Index;
