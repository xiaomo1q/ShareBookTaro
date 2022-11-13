import { View, Image, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add_favorite_book } from '@/service/index'
import { AtIcon, AtAvatar } from 'taro-ui'
import styles from './index.module.less'
import NavCustomBar from '@/components/navCustomBar';

const BookDetailView: React.FC = () => {
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { only_book_detail } = useSelector((state: any) => state.book_model)
  useEffect(() => {
    params.isbn && dispatch({ type: "book_model/getOnlyBookDetail", payload: { isbn: params.isbn } })
  }, [])
  /** 收藏 */
  const favoriteClickedHandler = async () => {
    await Add_favorite_book({ isbn: params.isbn, state: only_book_detail.favorite_state }).then(() => {
      dispatch({ type: "book_model/getOnlyBookDetail", payload: { isbn: params.isbn } })
    })
  }
  return (
    <View className={`flex-col ${styles['book-detail']}`}>
      <NavCustomBar needBackIcon title='图书详情' url='/pages/home/index' />
      <View className={styles['bd-box']}>
        <View className={`flex-row ${styles['bd-header']}`}>
          {/* <Image src={`https://file.ituring.com.cn/SmallCover/${only_book_detail?.coverKey}`} className={`${styles['image']}`} /> */}
          <Image src={only_book_detail?.imgUrl} className={`${styles['image']}`} />
          <View className={`flex-col ${styles['group_1']}`}>
            <Text className={`${styles['text_1']}`}>{only_book_detail?.book_name}</Text>
            <View className={`flex-col items-start ${styles['group_4']}`}>
              <View className={`${styles['group_3']}`}>
                {/* <Text className={`${styles['text_4']}`}>作者：</Text> */}
                <Text className={`${styles['text_5']}`}>{only_book_detail?.book_author}</Text>
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
            <View className={`flex-row ${styles['equal-division-item']} ${styles['group_10']}`}
              onClick={favoriteClickedHandler}
            >
              {
                only_book_detail?.favorite_state ? <AtIcon value='heart-2' size='15' color='#ff0000'></AtIcon> : <AtIcon value='heart' size='15' color='#000'></AtIcon>
              }
              <Text className={`${styles['text_10']}`}>{only_book_detail?.favorite_num}</Text>
            </View>
          </View>
        </View>
        <View className={`flex-col ${styles['bd-main']}`}>
          <View className={styles['bdm-txt']}>「内容简介」</View>
          <View className={styles['bdm-content']}>{only_book_detail?.book_desc}</View>
        </View>

        <View className={styles['bd-group']}>
          <Text className={`${styles['text_6']}`}>「拥有书主」</Text>
          {
            only_book_detail.ucb_list && only_book_detail.ucb_list[0] ? only_book_detail.ucb_list.map((itm, inx) => {
              return <View className={`at-row ${styles['group_6']}`} key={inx}
                onClick={() => Taro.navigateTo({ url: '/pagesA/bookuserinfo/index?id=' + itm.openid })}
              >
                <View className='at-col at-col-2'><AtAvatar image={itm.avatarUrl} circle />  </View>
                <View className='at-col at-col-7'>
                  <Image src={process.env.URL + { '0': 'icon/boy.png', '1': 'icon/girl.png', }[itm.gender]} className={styles['img-sex']} />
                </View>
                <View className='at-col at-col-3 at-article__p'>{itm.nickName}</View>
              </View>
            }) : <View className='at-article__p'>暂无</View>
          }
        </View>
      </View>
    </View>
  );
};

export default BookDetailView;