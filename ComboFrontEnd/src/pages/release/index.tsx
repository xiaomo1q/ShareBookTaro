
import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Picker, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea } from 'taro-ui'
import { Get_book_type, Add_only_book, File_img_delete } from '@/service/index';
import styles from './index.module.less'

const initVal = { isbn: '', book_name: '', book_type: '', book_desc: '', book_author: '', imgUrl: '' }
/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const [bookType, setBookType] = useState<any>([]);
  const [formValue, setFormValue] = useState({ ...initVal });
  useEffect(() => { fetchBookType() }, []);
  const handleChange = (name, value) => {
    formValue[name] = value
    setFormValue({ ...formValue })
  }
  const onSubmit = async () => {
    const obj = { ...formValue }
    obj.imgUrl = `${process.env.baseUrl}${formValue.imgUrl}`
    await Add_only_book(obj).then(res => {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
      setFormValue({ ...initVal })
    })
  }
  const fetchBookType = async () => {
    await Get_book_type().then(res => {
      const list = Array.from(res, (i: { title: string }) => i.title)
      list.push('其他')
      setBookType(list)
      setFormValue({ ...formValue, book_type: list && list[0] })
    })
  }

  const ImagePickerChangedHandler = (files) => {
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
            console.log(tempFilePaths[0], '.tempFilePaths');

            Taro.uploadFile({
              url: "/api/file/img/upload/",
              filePath: tempFilePaths[0],
              name: "file",
              header: {
                Authorization: token, //将token添加到头部
              },
              formData: {
                // file: res.tempFiles[0].originalFileObj
              },
              success: (re) => {
                console.log(re);
                const urk: any = JSON.parse(re.data)
                formValue.imgUrl = urk.url
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
  const delImageClickedHandler = async (el) => {
    if (el.type === 1) { await File_img_delete({ ids: el }) }
    formValue.imgUrl = ''
    setFormValue({ ...formValue })
  }

  return (
    <View className={`flex-col ${styles['release-index']}`}>
      {/* <View className={styles['release-tip']}>上传发布图书信息</View> */}
      <AtForm>

        <AtInput required name='isbn' title='ISBN' type='text' value={formValue.isbn} placeholder='请输入ISBN' onChange={() => { }} onBlur={(value) => handleChange('isbn', value)} />
        <AtInput required name='name' title='书籍名称' type='text' value={formValue.book_name} placeholder='请输入图书名称' onChange={() => { }} onBlur={(value) => handleChange('book_name', value)} />
        <AtInput name='author' title='书籍作者' type='text' value={formValue.book_author} placeholder='请输入图书作者' onChange={(value) => handleChange('book_author', value)} />
        <Picker mode='selector' range={bookType} onChange={(e) => handleChange('book_type', e.detail.value)}>
          <AtList> <AtListItem title='图书分类' extraText={bookType && bookType[0] || ''} />  </AtList>
        </Picker>
        <AtTextarea
          value={formValue.book_desc}
          onChange={() => { }}
          count={false}
          maxLength={100000}
          onBlur={(e) => handleChange('book_desc', e.detail.value)}
          placeholder='书籍简介'
        />
        <View className={`${styles['re-flex']}`}>
          {
            !!formValue.imgUrl ? <View className={`${styles['re-image-box']}`}>
              <Image src={`${process.env.baseUrl}${formValue.imgUrl}`} className={`${styles['re-image']}`} />
              <Image src={require('../../assets/image/delete.svg')} className={`${styles['re-del']}`}
                onClick={() => delImageClickedHandler(formValue.imgUrl)}
              />
            </View> : <Image src={require('../../assets/image/upload.svg')} className={`${styles['re-image']}`}
              onClick={ImagePickerChangedHandler}
            />
          }
        </View>
      </AtForm>
      <View className={`flex-row ${styles['re-footer']}`}>
        <AtButton onClick={onSubmit}>确认发布</AtButton>
        <AtButton onClick={() => setFormValue({ ...initVal })}>重置</AtButton>
      </View>
    </View>
  );
};

export default Index;
