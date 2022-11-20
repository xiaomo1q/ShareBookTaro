
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image } from '@tarojs/components'
import NavCustomBar from '@/components/navCustomBar';
import { Get_order_information } from '@/service/index';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { Empty } from '@antmjs/vantui';
import moment from 'moment';
import styles from './index.module.less'

/**
 * 交易记录
 * @returns 
 */
const OrderDetailIndex = () => {
  const [connectBook, setConnectBook] = useState({ outData: [], inData: [] })
  const [current, setCurrent] = useState(0)
  const { userInfo } = useSelector((state: any) => state.global_user)
  const fetchConnectBookList = async () => {
    const res = await Get_order_information({})
    console.log(res, '......');
    setConnectBook(res || [])
  }

  useEffect(() => {
    fetchConnectBookList()
  }, []);
  const tabList = [{ title: '加入' }, { title: '离开' }]

  const RenderListItem = ({ item, type }) => {
    return <View className={`flex-col ${styles['item']}`}>
      <View className={`flex-col items-start ${styles['group']}`}>
        <View className={`${styles['group_2']}`}>
          <Text className={`${styles['font_1']}`}>订单编号:</Text>
          <Text className={`${styles['font_2']}`}>{item?.oid || ''}</Text>
        </View>
      </View>
      <View className={`flex-row ${styles['group_3']}`}>
        <Image src={!!item.book_url ? item.book_url : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'} className={`${styles['section_2']}`} />
        <View className={`flex-col items-start ${styles['group_4']}`}>
          <View className={`${styles['group_font']}`}>
            <Text className={`${styles['font_1']}`}>isbn:</Text>
            <Text className={`${styles['font_2']}`}>{item?.isbn || ''}</Text>
          </View>
          <View className={`${styles['group_font']}`}>
            <Text className={`${styles['font_1']}`}>书籍名称:</Text>
            <Text className={`${styles['font_2']}`}>{item?.book_name || ''}</Text>
          </View>
          <View className={`${styles['group_font']}`}>
            <Text className={`${styles['font_1']}`}>{type}书籍主人:</Text>
            {
              item.formUser_id === userInfo.openid ? <Text className={`${styles['font_2']}`}>{item?.toUser_name || ''}</Text> : <Text className={`${styles['font_2']}`}>{item?.formUser_name || ''}</Text>
            }
          </View>
          <View className={`${styles['group_font']}`}>
            <Text className={`${styles['font_1']}`}>创建时间:</Text>
            <Text className={`${styles['font_2']}`}>{moment(item?.create_time || '2020').format('YYYY-MM-DD HH:mm')}</Text>
          </View>
        </View>
      </View>
    </View>
  }
  return (
    <View className={styles['order-Detail']}>
      <NavCustomBar needBackIcon title='交易记录' url='/pages/userinfo/index' />
      <AtTabs current={current} tabList={tabList} onClick={(val) => setCurrent(val)}>
        <AtTabsPane current={current} index={0} >
          {
            !!connectBook.inData && connectBook.inData.length > 0 ?
              connectBook.inData.map((el, ix) => <RenderListItem key={ix} item={el} type='原' />) : <Empty />
          }
        </AtTabsPane>
        <AtTabsPane current={current} index={1} >
          {
            !!connectBook.outData && connectBook.outData.length > 0 ?
              connectBook.outData.map((el, ix) => <RenderListItem key={ix} item={el} type='现' />) : <Empty />
          }
        </AtTabsPane>
      </AtTabs>
    </View >
  );
};

export default OrderDetailIndex;
