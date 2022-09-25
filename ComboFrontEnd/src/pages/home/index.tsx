import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { connect, useDispatch, useSelector } from 'react-redux';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { Empty, } from '@antmjs/vantui'
import { AtTabs, AtTabsPane, AtActivityIndicator } from 'taro-ui'
import book_detail from '@/assets/detail.json'
import { Get_book_list, Get_book_type } from "@/service/index";
import styles from './courses.module.less';


const RenderTabPanel = ({ data }) => {
  return (<View className={`flex-col ${styles['home-tab-panel']}`}>
    {
      data && data.length > 0 ? data.map((item, index) =>
        <View className={`flex-col  ${styles['section_5']} ${styles['view']}`}
          key={index}
          onClick={() => { Taro.redirectTo({ url: "/pages/home/book-detail/index?isbn=" + item.isbn }) }}
        >
          <Image src={`https://file.ituring.com.cn/SmallCover/${item.coverKey}`} className={`${styles['image_20']}`} />
          <View className={`flex-col ${styles['group_9']}`}>
            <Text className={`${styles['text_10']}`}>{item.name}</Text>
          </View>
        </View>
      ) : <Empty />
    }
  </View>);
}


const HomeView: React.FC<any> = ({ loading }) => {
  const [tabActive, setTabActive] = useState<any>(0);
  const [bookType, setBookType] = useState<any>([]);
  const dispatch = useDispatch()
  const { book_list } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    fun()
  }, []);

  const fun = async () => {
    // 图灵社区 https://m.ituring.com.cn/book?tab=all&sort=vote
    // https://api.ituring.com.cn/api/Book?tag=36515&page=1&sort=new
    await Get_book_type().then(res => {
      setBookType(res)
      dispatch({ type: "book_model/getBookList", payload: { type: res[tabActive] } })
    })
  }
  return (
    <View className={`flex-col ${styles['home-index']}`}>

      <View className={`flex-col ${styles['hi-header']}`}>
        {/* <View className={`justify-between ${styles['hi-header-title']}`}>
          <Text className={`${styles['text']}`}>校图</Text>
          <View className={`${styles['section_1']}`}></View>
        </View> */}
        <View className={`justify-between ${styles['search']}`}>
          <View className={`flex-row ${styles['group_4']}`}>
            <Image
              src={process.env.URL + 'icon/search.png'}
              className={`${styles['image_4']}`}
            />
            <Text className={`${styles['text_1']}`}>请输入查找的书名</Text>
          </View>
        </View>
      </View>
      <View className={`flex-row ${styles['equal-division']}`}>
        <Swiper autoplay>
          <SwiperItem>  <Image src={process.env.URL + 'banner.png'} className={`${styles['image_6']}`} /> </SwiperItem>
          <SwiperItem>  <Image src={process.env.URL + 'banner.png'} className={`${styles['image_6']}`} /> </SwiperItem>
        </Swiper>
      </View>
      <View className={`flex-col ${styles['home-tab-list']}`}>
        <AtTabs scroll current={tabActive} tabList={bookType} onClick={(value) => {
          setTabActive(value)
          dispatch({ type: "book_model/getBookList", payload: { type: bookType[value] } })
        }}
        >
          {
            bookType && bookType.length > 0 && bookType.map((it, ix) =>
              <AtTabsPane current={ix} key={ix} index={ix}  >
                {tabActive === ix &&
                  // <AtActivityIndicator isOpened={loading.effects['book_model/getBookList']} mode='center'>
                  <RenderTabPanel data={book_list} />
                  // </AtActivityIndicator>
                }
              </AtTabsPane>
            )
          }
        </AtTabs>
      </View>
    </View>
  );
}

export default connect(({ loading }: { loading: { effects: Record<string, boolean> } }) => ({ loading }))(HomeView);