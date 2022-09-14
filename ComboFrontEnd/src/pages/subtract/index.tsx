
import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.less'

/**
 * 书圈交流广场
 * @returns 
 */
const SubtractIndex = () => {
  const data = {
    list: [
      {
        avatar: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16631237461667604688.png',
        user_name: 'pisces',
        update_time: "2022年8月10日",
        book_title: '科学的画廊：图片里的科学史',
        book_des: '本书汇集了200余幅科学史上的经典图片，这些图片代表着科学发展史中一个又一个里程碑。从简单的图表到第一张世界地图，从手绘图、照片到计算机成像，本书回顾了天文学、数学、物理学、化学、生物学等领域的历史转折点，以图片讲解知识，展现人类科学思想发展史中的高光时刻。这不仅是一本简单的科学图册，知名科普作家约翰·D. 巴罗凭借自己深厚的科学底蕴，以散文般优美而简洁的笔触，为一幅幅科学图片做了精彩的诠释与注解，展现了它们的深远意义和对科学发展的影响，讲述了一个个极具启发性的科学故事，为喜爱科学、历史、艺术和哲学的大众读者打开一幅别开生面的科学画卷。',
        book_url: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16631237461694717331.png',
        like_num: 100,
        comment: 50,
      },
      {
        avatar: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16631237461667604688.png',
        user_name: 'pisces',
        update_time: "2022年8月10日",
        book_title: '科学的画廊：图片里的科学史',
        book_des: '本书汇集了200余幅科学史上的经典图片，这些图片代表着科学发展史中一个又一个里程碑。从简单的图表到第一张世界地图，从手绘图、照片到计算机成像，本书回顾了天文学、数学、物理学、化学、生物学等领域的历史转折点，以图片讲解知识，展现人类科学思想发展史中的高光时刻。这不仅是一本简单的科学图册，知名科普作家约翰·D. 巴罗凭借自己深厚的科学底蕴，以散文般优美而简洁的笔触，为一幅幅科学图片做了精彩的诠释与注解，展现了它们的深远意义和对科学发展的影响，讲述了一个个极具启发性的科学故事，为喜爱科学、历史、艺术和哲学的大众读者打开一幅别开生面的科学画卷。',
        book_url: 'https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16631237461694717331.png',
        like_num: 100,
        comment_num: 50,
      },
    ]
  };
  return (
    <View className={`${styles['subtract-index']}`}>
      <Text className={styles['si-head']}>交流广场</Text>
      <View className={`flex-col ${styles['si-list']}`}>
        {data.list.map((item, i) => (
          <View className={`flex-col ${styles['space-y-9']} ${styles['list-item']}`} key={i}
            onClick={() => { Taro.redirectTo({ url: 'pages/subtract/only-detail/index' }) }}
          >
            <View className={`flex-row ${styles['space-x-14']}`}>
              <Image src={item.avatar} className={`${styles['image']}`} />
              <View className={`flex-col items-start ${styles['space-y-10']} ${styles['group_1']}`}>
                <Text className={`${styles['text']}`}>{item.user_name} </Text>
                <Text className={`${styles['text_2']}`}>{item.update_time} 更新</Text>
              </View>
            </View>
            <Text className={`${styles['text_4']}`}>{item.book_title}</Text>
            <View className={`flex-row ${styles['space-x-4']}`}>
              <Text className={`${styles['text_6']}`}>{item.book_des}</Text>
              <Image src={item.book_url} className={`${styles['image_2']}`} />
            </View>
            <View className={`flex-row justify-end ${styles['space-x-59-reverse']}`}>
              <View className='flex-row'>
                <Image
                  src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16608075422674831817.png'
                  className={`${styles['image_4']}`}
                />
                <Text className={`${styles['text_8']}`}>{item.like_num}</Text>
              </View>
              <View className='flex-row'>
                <Image
                  src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16608075422682518044.png'
                  className={`${styles['image_4']}`}
                />
                <Text className={`${styles['text_8']}`}>{item.comment_num}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SubtractIndex;
