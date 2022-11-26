import NavCustomBar from '@/components/navCustomBar';
import { Add_only_square_fav, Add_only_square_review } from '@/service/index';
import { View, Image, Text } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AtInput, AtSearchBar } from 'taro-ui';
import styles from './index.module.less'

const OnlyDetailView: React.FC = () => {
  const { params } = useRouter()
  const dispatch = useDispatch()
  const [commentVal, setCommentVal] = useState('')
  const { only_detail } = useSelector((state: any) => state.square_modal)
  useEffect(() => {
    dispatch({ type: "square_modal/get_exchange_square_detail", payload: { _id: params._id } })
  }, []);
  const commentSearchHandler = async () => {
    await Add_only_square_review({ _id: params._id, num: only_detail.comment_num, text: commentVal }).then(res => {
      if (res.code === 0) {
        setCommentVal('')
        dispatch({ type: "square_modal/get_exchange_square_detail", payload: { _id: params._id } })
      }
    })
  }
  const onlyFavClickedHandler = async (item) => {
    await Add_only_square_fav({ _id: item.id, num: item.like_num })
    dispatch({ type: "square_modal/get_exchange_square_detail", payload: { _id: params._id } })
  }
  return (
    <View className={`flex-col ${styles['only-detail']}`}>
      <NavCustomBar needBackIcon title='正文' url='/pages/subtract/index/index' />
      <View className={styles['only-box']}>
        {/* <View className={`flex-row ${styles['o-title']}`}>
          <View className={`${styles['section_1']}`}></View>
          <Text className={`${styles['text_3']}`}>作者</Text>
        </View> */}
        <View className={`flex-row ${styles['o-section']}`}>
          <Image src={only_detail?.avatar} className={`${styles['image']}`} />
          <View className={`flex-col items-start ${styles['space-y-5']} ${styles['group_3']}`}>
            <Text className={`${styles['text_4']}`}>{only_detail?.user_name}</Text>
            <Text className={`${styles['text_5']}`}>{moment(only_detail?.update_time || '2000.00.00').format('YYYY-MM-DD HH:mm')}</Text>
          </View>
        </View>
        {/* <View className={`flex-row ${styles['o-title']}`}>
          <View className={`${styles['section_1']}`}></View>
          <Text className={`${styles['text_3']}`}>正文</Text>
        </View> */}
        <View className={`flex-col ${styles['o-head']}`}>
          <View className={styles['bdm-txt']}>{only_detail?.book_title}</View>
          <View className={styles['bdm-content']}>{only_detail?.book_des}</View>
        </View>


        <View className={`flex-row ${styles['o-title']}`}>
          <View className={`${styles['section_1']}`}></View>
          <Text className={`${styles['text_3']}`}>评论</Text>
        </View>
        {
          only_detail?.comment_list && only_detail.comment_list.length > 0 ? only_detail.comment_list.map((itm, inx) => {
            return <View className={`flex-row ${styles['o-section']}`} key={inx}>
              <Image src={only_detail?.avatar} className={`${styles['image']}`} />
              <View className={`flex-col items-start ${styles['space-y-5']} ${styles['group_3']}`}>
                <Text className={`${styles['text_4']}`}>{itm?.user_name}</Text>
                <Text className={`${styles['text_5']}`}>{itm?.text}</Text>
                <Text className={`${styles['text_6']}`}>{moment(itm?.update_time || '2000.00.00').format('YYYY-MM-DD HH:mm')}</Text>
              </View>
            </View>
          }) : null
        }

      </View>

      <View className={`flex-row justify-between ${styles['only-footer']}`}>
        <View className={`flex-col items-center ${styles['button']}`}>
          <AtSearchBar
            value={commentVal}
            placeholder='写下评论~'
            actionName='发送'
            onActionClick={commentSearchHandler}
            onChange={(value) => setCommentVal(value)}
          />
        </View>
        <View className={`flex-row ${styles['space-x-9']} ${styles['group_7']}`}>
          <View className={`flex-row ${styles['space-x-9']} ${styles['group_7']}`}>
            <Image src={process.env.URL + 'icon/pinglun.svg'} className={`${styles['image_1']}`} />
            <Text className={`${styles['text_13']}`}>{only_detail?.comment_list?.length}</Text>
          </View>
          <View className={`flex-row ${styles['space-x-9']} ${styles['group_7']}`}  onClick={() => onlyFavClickedHandler(only_detail)}>
            <Image src={process.env.URL + 'icon/dianzan.svg'} className={`${styles['image_1']}`} />
            <Text className={`${styles['text_12']}`}>{only_detail?.like_num}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnlyDetailView;

{/* <View className={`flex-col ${styles['section_3']}`}>
<View className={`flex-row justify-between ${styles['group_5']}`}>
  <View className={`flex-row ${styles['space-x-9']}`}>
    <View className={`${styles['section_4']}`}></View>
    <Text className={`${styles['text_7']}`}>标题</Text>
  </View>
  <Text className={`${styles['text_8']}`}>文本</Text>
</View>
<View className={`flex-col ${styles['section_5']}`}>
  <Text className={`${styles['text_9']}`}>文本内容文本内容文本内容文本内容文本内容文本内容文本内容</Text>
  <Text className={`${styles['text_10']}`}>辅助说明辅助说明</Text>
</View>
</View> */}