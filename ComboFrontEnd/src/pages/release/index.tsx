
import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import styles from './index.module.less'

/**
 * 发布图书
 * @returns 
 */
const Index = () => {
  const [formValue, setFormValue] = useState({
    isbn: '', name: '', type: ''
  });
  useEffect(() => { }, []);
  const handleChange = (value) => {
    console.log(value);
  }
  const onSubmit = (event) => {
  }
  const onReset = (event) => {

  }
  return (
    <View className={`flex-col ${styles['release-index']}`}>
      <View className={styles['release-tip']}>上传发布图书信息</View>
      <AtForm
        onSubmit={onSubmit}
        onReset={onReset}
      >
        <AtInput name='isbn' title='ISBN' type='text' placeholder='请输入Isbn' onChange={handleChange} />
        <AtInput name='name' title='图书名称' type='text' placeholder='请输入图书名称' onChange={handleChange} />
        <AtInput name='type' title='图书类型' type='text' placeholder='请输入图书类型' onChange={handleChange} />
        <View className={`flex-row ${styles['re-footer']}`}>
          <AtButton formType='submit'>确认发布</AtButton>
          <AtButton formType='reset'>重置</AtButton>
        </View>
      </AtForm>
    </View>
  );
};

export default Index;
