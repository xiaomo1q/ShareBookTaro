
import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import { RenderBookList, RenderConnectBookList } from '@/components/bookList';
import styles from './index.less'

/**
 * 搜索
 * 收藏
 * 关联
 * @returns 
 */
const SearchIndex = () => {
  const [searchValue, setValue] = useState('');
  const router: any = useRouter().params
  const dispatch = useDispatch()
  const { favorite_book_list, search_book_list, book_list } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.title || '' })
    fetchBookList()
  }, []);

  const fetchBookList = () => {
    switch (router.title) {
      case '搜索':
        break;
      case '关联图书':
        dispatch({ type: "book_model/getBookList", payload: { type: { title: 'ALL' } } })
        break;
      case '收藏':
        dispatch({ type: "book_model/getFavoriteBookList", payload: {} })
        break;
      default:
        break;
    }
  }
  const searchChangedHandler = (value) => {
    setValue(value)
    switch (router.title) {
      case '搜索':
        dispatch({ type: "book_model/searchBookList", payload: { title: value } })
        break;
      case '关联图书':
        dispatch({ type: "book_model/searchBookList", payload: { title: value } })
        break;
      case '收藏':
        if (value) {
          const searchFav: any = favorite_book_list.filter(el => {
            if (el.name.toLowerCase().indexOf(value) !== -1) {
              return el
            }
          });
          dispatch({ type: "book_model/saveUpdate", payload: { favorite_book_list: searchFav } })
        } else {
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
          '关联图书': <RenderConnectBookList
            data={search_book_list.length > 0 ? search_book_list : book_list}
            onChange={(val) => dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: val } })}
          />,
          '收藏': <RenderBookList data={favorite_book_list} />
        }[router.title]
      }

    </View>
  );
};

export default SearchIndex;
