
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Taro, { useRouter } from '@tarojs/taro';
import { View, Picker, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea } from 'taro-ui'
import { Get_book_type, Update_only_book, File_img_delete } from '@/service/index';
import styles from './index.module.less'
import NavCustomBar from '@/components/navCustomBar';

const initVal = { isbn: '', book_name: '', book_type: '', book_desc: '', book_author: '', imgUrl: '' }
// const initVal = {
//   book_author: "马伯庸",
//   book_desc: "大唐天宝十四年，长安城的小吏李善德突然接到一个任务：要在贵妃诞日之前，从岭南运来新鲜荔枝。荔枝“一日色变，两日香变，三日味变”，而岭南距长安五千余里，山水迢迢，这是个不可能完成的任务，可为了家人，李善德决心放手一搏：“就算失败，我也想知道，自己倒在距离终点多远的地方。”",
//   book_name: "长安的荔枝",
//   book_type: "小说",
//   imgUrl: "/public/img/1668925452506435.jpeg",
//   isbn: "9787572608582"
// }
/**
 * 修改图书
 * @returns 
 */
const Index = () => {
  const [bookType, setBookType] = useState<any>([]);
  const [formValue, setFormValue] = useState({ ...initVal });
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { only_book_detail } = useSelector((state: any) => state.book_model)

  useEffect(() => { fetchBookType() }, []);
  useEffect(() => {
    !!params.isbn && dispatch({ type: "book_model/getOnlyBookDetail", payload: { isbn: params.isbn } })
  }, [params])

  useEffect(() => {
    if (!!only_book_detail && only_book_detail.isbn) {
      for (const key in initVal) {
        initVal[key] = only_book_detail[key]
        if (key === 'imgUrl' && initVal[key].indexOf(':3030/') !== -1) {
          initVal[key] = initVal[key].split('3030')[1]
        }
      }
      setFormValue({ ...initVal })
    }
  }, [only_book_detail])
  const handleChange = (name, value) => {
    formValue[name] = value
    setFormValue({ ...formValue })
  }
  const onSubmit = async () => {
    const obj = { ...formValue }
    obj.imgUrl = `${process.env.baseUrl}${formValue.imgUrl}`
    await Update_only_book(obj).then(res => {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
      setFormValue({ ...initVal })
      !!params.isbn && dispatch({ type: "book_model/getOnlyBookDetail", payload: { isbn: params.isbn } })
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
        <NavCustomBar needBackIcon title='编辑图书' url='/pages/search/index?title=我的图书'/>
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
        <AtButton onClick={onSubmit}>修改并保存</AtButton>
      </View>
    </View>
  );
};

export default Index;
