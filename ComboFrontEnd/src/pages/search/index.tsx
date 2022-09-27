
import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import RenderBookList from '@/components/bookList';
import styles from './index.less'

/**
 * 
 * @returns 
 */
const SearchIndex = () => {
  const [searchValue, setValue] = useState('');
  const dispatch = useDispatch()
  const { book_list } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: "我的收藏" })
    fetchBookList()
  }, []);

  const fetchBookList = () => {
    dispatch({ type: "book_model/getBookList", payload: { type: { title: 'ALL' } } })
  }
  const searchChangedHandler = (value) => {
    setValue(value)
    dispatch({ type: "book_model/searchBookList", payload:  { title: value }  })
  }
  return (
    <View className={styles['search-index']}>
      <AtSearchBar
        placeholder='请输入查询的书名'
        value={searchValue}
        onChange={searchChangedHandler}
      />
      <RenderBookList data={book_list} />
    </View>
  );
};

export default SearchIndex;
