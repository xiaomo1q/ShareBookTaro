import React, { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { Empty, } from '@antmjs/vantui'
import { AtTabs, AtTabsPane } from 'taro-ui'
import book_detail from '@/assets/detail.json'
import { GETRequest } from "../../utils/net-requests";
import styles from './courses.module.less';

const book_type = [
  { title: '热门图书' }, { title: '电子信息' }, { title: '专业数学' },
  { title: '计算机' }, { title: '科普' }, { title: '经营管理' },
  { title: '前端' },
]
const RenderTabPanel = ({ data }) => {
  console.log(data, '.............data');

  return (<View className={`flex-col ${styles['home-tab-panel']}`} onClick={() => { Taro.redirectTo({ url: "/pages/book-detail/index" }) }}>
    {
      data && data.length > 0 ? data.map((item, index) =>
        <View className={`flex-col  ${styles['section_5']} ${styles['view']}`} key={index}>
          <Image src={`	https://file.ituring.com.cn/SmallCover/${item.coverKey}`} className={`${styles['image_20']}`} />
          <View className={`flex-col ${styles['group_9']}`}>
            <Text className={`${styles['text_10']}`}>{item.name}</Text>
          </View>
        </View>
      ) : <Empty />
    }
  </View>);
}


const HomeView = () => {
  const [tabActive, setTabActive] = useState<any>(0);
  const [bookData, setBookData] = useState<any>([]);
  const [bookType, setBookType] = useState<any>([]);
  useEffect(() => {
    fun()
  }, []);

  const fun = async () => {
    // 图灵社区 https://m.ituring.com.cn/book?tab=all&sort=vote
    // https://api.ituring.com.cn/api/Book?tag=36515&page=1&sort=new
    setBookType(book_type)
    setBookData(book_detail)
  }
  console.log(bookType, '...................');

  return (
    <View className={`flex-col ${styles['home-index']}`}>

      <View className={`flex-col ${styles['hi-header']}`}>
        <View className={`justify-between ${styles['hi-header-title']}`}>
          <Text className={`${styles['text']}`}>校图</Text>
          <View className={`${styles['section_1']}`}>{/***/}</View>
        </View>
        <View className={`justify-between ${styles['search']}`}>
          <View className={`flex-row ${styles['group_4']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140330271204.png'
              className={`${styles['image_4']}`}
            />
            <Text className={`${styles['text_1']}`}>请输入查找的书名</Text>
          </View>
          <Image
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140334201847.png'
            className={`${styles['image_5']}`}
          />
        </View>
      </View>
      <View className={`flex-row ${styles['equal-division']}`}>
        <Swiper autoplay>
          <SwiperItem>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/1501981b9ff3e784530e2bbb3c8ab8e3.png'
              className={`${styles['image_6']}`}
            />
          </SwiperItem>
          <SwiperItem>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/1501981b9ff3e784530e2bbb3c8ab8e3.png'
              className={`${styles['image_6']}`}
            />
          </SwiperItem>
        </Swiper>
      </View>
      <View className={`flex-col ${styles['home-tab-list']}`}>
        <AtTabs scroll current={tabActive} tabList={bookType} onClick={(value) => setTabActive(value)}>
          {
            bookType && bookType.length > 0 && bookType.map((it, ix) =>
              <AtTabsPane current={ix} key={ix} index={ix}  >
                {tabActive === ix && <RenderTabPanel data={bookData} />}
              </AtTabsPane>
            )
          }
        </AtTabs>
      </View>
    </View>
  );
}
export default HomeView;