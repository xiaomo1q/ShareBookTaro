import { View, Image, Text } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.less'

const BookDetailView: React.FC = () => {
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { only_book_detail } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    params.isbn && dispatch({ type: "book_model/getOnlyBookDetail", payload: { isbn: params.isbn } })
  }, [])
  return (
    <View className={`flex-col ${styles['book-detail']}`}>
      <View className={styles['bd-box']}>
        <View className={`flex-row ${styles['bd-header']}`}>
          <Image src={`https://file.ituring.com.cn/SmallCover/${only_book_detail?.coverKey}`} className={`${styles['image']}`} />
          <View className={`flex-col ${styles['group_1']}`}>
            <Text className={`${styles['text_1']}`}>{only_book_detail?.name}</Text>
            <View className={`flex-col items-start ${styles['group_4']}`}>
              <View className={`${styles['group_3']}`}>
                {/* <Text className={`${styles['text_4']}`}>作者：</Text> */}
                <Text className={`${styles['text_5']}`}>{only_book_detail?.authorNameString}</Text>
              </View>
              <View className={`${styles['group_3']}`}>
                {/* <Text className={`${styles['text_4']}`}>作者：</Text> */}
                <Text className={`${styles['text_5']}`}>{only_book_detail?.isbn}</Text>
              </View>
              <View className={`${styles['group_3']}`}>
                {/* <Text className={`${styles['text_4']}`}>出版社：</Text> */}
                <Text className={`${styles['text_5']}`}>人民出版社</Text>
              </View>
              <View className={`${styles['group_3']}`}>
                {/* <Text className={`${styles['text_4']}`}>所属类别：</Text> */}
                <Text className={`${styles['text_5']}`}>{only_book_detail?.book_type}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className={`flex-col ${styles['bd-main']}`}>
          <View className={styles['bdm-txt']}>「内容简介」</View>
          <View className={styles['bdm-content']}>{only_book_detail?.abstract}</View>
        </View>
        <View className={styles['bd-group']}>
          {/* <Text className={`${styles['text_6']}`}>拥有书主：</Text> */}
          <View className={`flex-row ${styles['group_6']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651387176227763.png'
              className={`${styles['image_1']}`}
            />
          </View>
        </View>
      </View>

      <View className={`flex-row justify-between ${styles['bd-footer']}`}>
        <View className={`flex-row ${styles['equal-division']}`}>
          <View className={`flex-row ${styles['equal-division-item']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651383759091719.png'
              className={`${styles['image_3']}`}
            />
            <Text className={`${styles['text_10']}`}>发消息</Text>
          </View>
          <View className={`flex-row ${styles['equal-division-item']} ${styles['group_10']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651388207123771.png'
              className={`${styles['image_3']}`}
            />
            <Text className={`${styles['text_10']}`}>收藏</Text>
          </View>
        </View>
        <View className={`flex-col items-center ${styles['text-wrapper']}`}>
          <Text className={`${styles['text_13']}`}>借书</Text>
        </View>
      </View>
    </View>
  );
};

export default BookDetailView;