
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components'
import { AtForm, AtTextarea, AtButton, AtImagePicker, AtListItem, AtFloatLayout, AtSearchBar, AtIcon, AtDivider } from 'taro-ui'
import { RenderConnectBookList } from '@/components/bookList';
import { fileToBase64 } from '@/utils/calculate'
import styles from './index.module.less'
import { File_img_delete } from '@/service/index';


const RenderFloatCon = () => {
  const dispatch = useDispatch()
  const [searchValue, setValue] = useState('');
  const { search_book_list, book_list } = useSelector((state: any) => state.book_model)
  const searchChangedHandler = (value) => {
    setValue(value)
    dispatch({ type: "book_model/searchBookList", payload: { title: value } })
  }
  return <>
    <AtSearchBar
      placeholder='请输入查询的书名'
      value={searchValue}
      onChange={searchChangedHandler}
    />
    <RenderConnectBookList
      data={search_book_list.length > 0 ? search_book_list : book_list}
      onChange={(val) => dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: val } })}
    />
  </>
}

/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const [formValue, setFormValue] = useState<any>({
    book_content: "", book_url: [], book_name: [],
  });
  const [upload_img, setUpload_img] = useState([]);
  const [isOpenedFloat, setIsOpenedFloat] = useState(false);
  const dispatch = useDispatch()
  const { connect_book_list } = useSelector((state: any) => state.public_storage)
  useEffect(() => {
    if (connect_book_list && connect_book_list.length > 0) {
      const text: any = []
      const bookURL: any = []
      connect_book_list.forEach(el => {
        text.push(el.book_name)
        bookURL.push({ type: 0, url: el.imgUrl })
      });
      formValue.book_name = [...formValue.book_name, ...text]
      formValue.book_url = [...formValue.book_url, ...bookURL]
      setFormValue({ ...formValue})
    } else {
      setFormValue({ ...formValue, book_url: [], book_name: [] })
    }
  }, [connect_book_list]);
  useEffect(() => {
    dispatch({ type: "book_model/getBookList", payload: { type: { title: 'ALL' } } })
  }, [])


  const handleChange = (value) => {
    setFormValue({ ...formValue, book_content: value })
  }
  const onSubmit = (event) => {
    console.log(formValue);
    // const params = {
    //   avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    //   user_name: '小米',
    //   user_id: 'oHfOA6l93trN6YkpCEhAkKnPGmKo',
    //   book_title: '《哈利波特》书评',
    //   book_des: 'xxxxxxxxxxxxxxxxxxxxx',
    //   book_url: null,
    //   connect_list: '哈利波特Ⅰ[;]哈利波特Ⅱ',
    //   like_num: 0,
    //   update_time: null,
    //   comment_num: 0,
    // };
    // dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: [] } })
  }

  const ImagePickerChangedHandler = (files) => {
    try {
      Taro.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: function (res) {
          console.log(res, '............');
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
                formValue.book_url.push({ type: 1, url: urk.url })
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
  const delImageClickedHandler = async (el, ix) => {
    formValue.book_url.splice(ix, 1)
    formValue.book_name.splice(ix, 1)
    setFormValue({ ...formValue })
    if (el.type === 1) { await File_img_delete({ ids: el.url }) }

  }
  console.log(formValue, '..formValue');

  return (
    <View className={`flex-col ${styles['release-index']}`}>
      <View className={`flex-row ${styles['re-header']}`}>
        {/* <Text className={styles['re-h-text']} onClick={() => {
            Taro.redirectTo({ url: '/pages/subtract/index/index' });
            dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: [] } })
          }}
          >取消</Text> */}
        <AtIcon value='close' size='24' color='#333' onClick={() => {
          Taro.redirectTo({ url: '/pages/subtract/index/index' });
          dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: [] } })
        }}
        />
        <AtButton onClick={onSubmit} >发布</AtButton>
      </View>
      <View className='at-article__info'>  {formValue?.book_name.join(' ; ')}  </View>
      <AtTextarea value={`${formValue.book_content}`}
        count={false}
        // height={400}
        maxLength={100000}
        placeholder='说说你对某本书的观点吧～'
        onChange={handleChange}
      />
      {/* <AtImagePicker files={formValue.book_url}
        onChange={()=>{}}
        onFail={ImagePickerFailHandler}
        onImageClick={ImagePickerChangedHandler}
      /> */}
      <View className={`${styles['re-flex']}`}>
        {
          formValue.book_url.length > 0 && formValue.book_url.map((el, ix) => <View key={ix} className={`${styles['re-image-box']}`}>
            <Image src={el.type === 0 ? el.url : `${process.env.baseUrl}${el.url}`} className={`${styles['re-image']}`} />
            <Image src={require('../../../assets/image/delete.svg')} className={`${styles['re-del']}`}
              onClick={() => delImageClickedHandler(el, ix)}
            />
          </View>)
        }
        {
          formValue.book_url.length >= 6 ? null : <Image src={require('../../../assets/image/upload.svg')} className={`${styles['re-image']}`}
            onClick={ImagePickerChangedHandler}
          />
        }
      </View>
      <AtDivider content='' />
      {/* 弹窗  onClick={() => Taro.navigateTo({ url: "/pages/search/index?title=关联图书" })}*/}
      <AtListItem title='关联图书' note='' arrow='right' onClick={() => setIsOpenedFloat(true)} />
      <AtFloatLayout isOpened={isOpenedFloat} title='关联图书' onClose={() => setIsOpenedFloat(false)}>
        <RenderFloatCon />
      </AtFloatLayout>
    </View>
  );
};

export default Index;
