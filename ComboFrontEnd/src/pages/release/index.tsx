
import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Picker } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtList, AtListItem, AtTextarea } from 'taro-ui'
import { Get_book_type, Add_only_book } from '@/service/index';
import styles from './index.module.less'

/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const [bookType, setBookType] = useState<any>([]);
  const [formValue, setFormValue] = useState({
    isbn: '', book_name: '', book_type: '', book_desc: '', book_author: ''
  });
  useEffect(() => { fetchBookType() }, []);
  const handleChange = (name, value) => {
    formValue[name] = value
    setFormValue({ ...formValue })
  }
  const onSubmit = async () => {
    await Add_only_book(formValue).then(res => {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
        duration: 2000
      })
      setFormValue({ isbn: '', book_name: '', book_type: '', book_desc: '', book_author: '' })
    })
  }
  const fetchBookType = async () => {
    await Get_book_type().then(res => {
      const list = Array.from(res, (i: { title: string }) => i.title)
      list.push('其他')
      setBookType(list)
      setFormValue({...formValue,book_type:list&&list[0]})
    })
  }


  return (
    <View className={`flex-col ${styles['release-index']}`}>
      <View className={styles['release-tip']}>上传发布图书信息</View>
      <AtForm >
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
        <View className={`flex-row ${styles['re-footer']}`}>
          <AtButton onClick={onSubmit}>确认发布</AtButton>
          <AtButton onClick={() => setFormValue({ isbn: '', book_name: '', book_type: '', book_desc: '', book_author: '' })}>重置</AtButton>
        </View>
      </AtForm>
    </View>
  );
};

export default Index;
