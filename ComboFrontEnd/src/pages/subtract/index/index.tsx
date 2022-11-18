
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import styles from './index.module.less'
import moment from 'moment';

/**
 * 书圈交流广场
 * @returns 
 */
const SubtractIndex = () => {
  const dispatch = useDispatch()
  const { get_list } = useSelector((state: any) => state.square_modal)
  useEffect(() => {
    dispatch({ type: "square_modal/get_exchange_square_list", payload: { type: {} } })
  }, []);

  return (
    <View className={`${styles['subtract-index']}`}>
      <View className={`flex-col ${styles['si-list']}`}>
        {get_list && get_list.length > 0 && get_list.map((item, i) => (
          <View className={`flex-col ${styles['space-y-9']} ${styles['list-item']}`} key={i}
            onClick={() => { Taro.redirectTo({ url: '/pagesA/subtract/only-detail/index?_id='+ item.id}) }}
          >
            <View className={`flex-row ${styles['space-x-14']}`}>
              <Image src={item?.avatar} className={`${styles['image']}`} />
              <View className={`flex-col items-start ${styles['space-y-10']}`}>
                <View className={`${styles['text']}`}>{item?.user_name}  </View>
                <Text className='at-article__info'>{moment(item?.update_time || '2000.00.00').format('YYYY-MM-DD HH:mm')}</Text>
                {/* <View className={`${styles['text_3']}`}>{item?.book_title}</View> */}
              </View>
            </View>
            <Text className={`${styles['text_4']}`}>{item?.book_title}</Text>
            <Text className={`${styles['text_6']}`}>{item?.book_des}</Text>
            <View className={`flex-row ${styles['space-x-4']}`}>
              <View className={`flex-row ${styles['space-x-4-image']}`}>
                {
                  item?.book_url ? item.book_url.split(';').map((el, ix) =>
                    <Image key={ix} src={el} className={`${styles['image_2']}`} />) : <></>
                }
              </View>
            </View>
            <View className={`flex-row ${styles['space-x-59-reverse']}`}>
              <View className={`flex-row ${styles['space-x-num']}`}>
                <Image  src={process.env.URL + 'icon/pinglun.svg'}  className={`${styles['image_4']}`}  />
                <Text className={`${styles['text_8']}`}>{item?.comment_num}</Text>
              </View>
              <View className={`flex-row ${styles['space-x-num']}`}>
                <Image src={process.env.URL + 'icon/dianzan.svg'} className={`${styles['image_4']}`} />
                <Text className={`${styles['text_8']}`}>{item?.like_num}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View className={`${styles['fixed-saqure']}`} onClick={() => { Taro.redirectTo({ url: '/pagesA/subtract/form-index/index' }) }}>
        <AtAvatar circle image={process.env.URL + 'icon/neirongxiezuo.svg'}></AtAvatar>
      </View>
    </View>
  );
};

export default SubtractIndex;
