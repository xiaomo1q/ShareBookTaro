
import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro'
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
  const router: any = useRouter().params
  const dispatch = useDispatch()
  const { favorite_book_list, search_book_list } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.title || '' })
    fetchBookList()
  }, []);

  const fetchBookList = () => {
    // dispatch({ type: "book_model/getBookList", payload: { type: { title: 'ALL' } } })
    dispatch({ type: "book_model/getFavoriteBookList", payload: {} })

  }
  const searchChangedHandler = (value) => {
    setValue(value)
    console.log(value,'calue');
    
    switch (router.title) {
      case '搜索':
        dispatch({ type: "book_model/searchBookList", payload: { title: value } })
        break;
      case '收藏':
        if(value){
          const searchFav:any =  favorite_book_list.filter(el => {
            if (el.name.toLowerCase().indexOf(value) !== -1) {
              return el
            }
          });
          dispatch({type: "book_model/saveUpdate", payload: { favorite_book_list: searchFav }})
        }else{
          dispatch({ type: "book_model/getFavoriteBookList", payload: {} })
        }
        break;

      default:
        break;
    }

  }
  return (
    <View className={styles['search-index']}>
      <AtSearchBar
        placeholder='请输入查询的书名'
        value={searchValue}
        onChange={searchChangedHandler}
      />
      {
        {
          '搜索': <RenderBookList data={search_book_list} />,
          '收藏': <RenderBookList data={favorite_book_list} />
        }[router.title]
      }

    </View>
  );
};

export default SearchIndex;
