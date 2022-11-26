
import React, { useState, useEffect } from 'react';
import Taro, { useRouter } from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtSearchBar } from 'taro-ui'
import NavCustomBar from '@/components/navCustomBar';
import { RenderBookList, RenderConnectBookList, RenderDelBookList } from '@/components/bookList';
import { Add_connect_book, Del_connect_book_list, Del_favorite_book_list } from '@/service/index';
import styles from './index.module.less'

/**
 * 搜索
 * 收藏
 * 关联
 * @returns 
 */
const SearchIndex = () => {
  const [searchValue, setValue] = useState('');
  const [isOpenfloat, setIsOpenfloat] = useState(false);
  const [add_connect_book, setAdd_connect_book] = useState([]);
  const [lookAllBook, setLookAllBook] = useState([]);
  const router: any = useRouter().params
  const dispatch = useDispatch()
  const { favorite_book_list, search_book_list, book_list, connect_book_list } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') Taro.hideHomeButton()
    Taro.setNavigationBarTitle({ title: router.title || '' })
    fetchBookList()
  }, []);

  const fetchBookList = () => {
    switch (decodeURI(router.title)) {
      case '搜索':
        break;
      case '关联图书':
        dispatch({ type: "book_model/getBookList", payload: { type: { title: 'ALL' } } })
        break;
      case '收藏':
        dispatch({ type: "book_model/getFavoriteBookList", payload: {} })
        break;
      case '我的图书':
        dispatch({ type: "book_model/getConnectBookList", payload: {} })
        dispatch({ type: "book_model/getBookList", payload: { type: { title: 'ALL' } } })
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
      case '我的图书':
        if (value) {
          const searchFav: any = connect_book_list.filter(el => {
            if (el.name.toLowerCase().indexOf(value) !== -1) {
              return el
            }
          });
          dispatch({ type: "book_model/saveUpdate", payload: { connect_book_list: searchFav } })
        } else {
          dispatch({ type: "book_model/getConnectBookList", payload: {} })
        }
        break;

      default:
        break;
    }

  }


  const addConnectBookClicked = async () => {
    if (!!add_connect_book && add_connect_book.length > 0) {
      const arr: any = []
      add_connect_book.forEach((el: any) => {
        arr.push({ isbn: el.isbn })
      });
      await Add_connect_book(arr).then(res => {
        if (!!res && res.code === 0) {
          dispatch({ type: "book_model/getConnectBookList", payload: {} })
          setIsOpenfloat(false)
        }
      })
    } else {
      return
    }

  }
  return (
    <View className={styles['search-index']}>
      <NavCustomBar needBackIcon title={decodeURI(router.title)} url={decodeURI(router.title) === '搜索' ? '/pages/home/index' : '/pages/userinfo/index'} />
      <AtSearchBar
        placeholder='请输入查询的书名'
        value={searchValue}
        onChange={searchChangedHandler}
      />

      {
        {
          '搜索': <RenderBookList data={search_book_list} />,
          // '关联图书': <RenderConnectBookList
          //   data={search_book_list.length > 0 ? search_book_list : book_list}
          //   onChange={(val) => dispatch({ type: "public_storage/connect_book_listUpdate", payload: { connect_book_list: val } })}
          // />,
          '收藏': <RenderDelBookList data={favorite_book_list} type='0' onChange={async (isbn) => {
            await Del_favorite_book_list({ isbn }).then(res => {
              Taro.showToast({
                title: res.msg,
                mask: true,
                duration: 2000
              })
              fetchBookList()
            })
          }}
          />,
          '我的图书': <RenderDelBookList data={connect_book_list} type='1' onChange={async (isbn) => {
            await Del_connect_book_list({ isbn }).then(res => {
              Taro.showToast({
                title: res.msg,
                mask: true,
                duration: 2000
              })
              fetchBookList()
            })
          }}
          />,
        }[decodeURI(router.title)]
      }

      {
        decodeURI(router.title) === '我的图书' && <>
          <View className={styles['add-book']} onClick={() => {
            let arroy = book_list.filter((v) => connect_book_list.every((val) => val.isbn != v.isbn))
            setLookAllBook(arroy)
            setIsOpenfloat(true);

          }}
          >   添加图书  </View>
          <AtFloatLayout isOpened={isOpenfloat} title='添加图书' onClose={() => setIsOpenfloat(false)}>
            <View className='flex-row'>
              <View className={styles['add-sub']} onClick={addConnectBookClicked}>确认添加</View>
              <View className={styles['cancel']} onClick={() => { setIsOpenfloat(false); setAdd_connect_book([]) }}>取消</View>
            </View>
            <RenderConnectBookList data={lookAllBook} onChange={(val) => setAdd_connect_book(val)} />
          </AtFloatLayout>
        </>
      }

    </View>
  );
};

export default SearchIndex;
