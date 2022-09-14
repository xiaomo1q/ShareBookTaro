import { View, Image, Text } from '@tarojs/components';
import React from 'react';
import { AtInput } from 'taro-ui';
import styles from './index.module.less'

const OnlyDetailView: React.FC = () => {
  return (
    <View className={`flex-col ${styles['only-detail']}`}>
      <View className={styles['only-box']}>
        <View className={`flex-col ${styles['o-head']}`}>
          <View className={styles['bdm-txt']}>科学的画廊：图片里的科学史</View>
          <View className={styles['bdm-content']}>本书汇集了200余幅科学史上的经典图片，这些图片代表着科学发展史中一个又一个里程碑。从简单的图表到第一张世界地图，从手绘图、照片到计算机成像，本书回顾了天文学、数学、物理学、化学、生物学等领域的历史转折点，以图片讲解知识，展现人类科学思想发展史中的高光时刻。这不仅是一本简单的科学图册，知名科普作家约翰·D. 巴罗凭借自己深厚的科学底蕴，以散文般优美而简洁的笔触，为一幅幅科学图片做了精彩的诠释与注解，展现了它们的深远意义和对科学发展的影响，讲述了一个个极具启发性的科学故事，为喜爱科学、历史、艺术和哲学的大众读者打开一幅别开生面的科学画卷。</View>
        </View>


        <View className={`flex-row ${styles['o-title']}`}>
          <View className={`${styles['section_1']}`}></View>
          <Text className={`${styles['text_3']}`}>作者</Text>
        </View>
        <View className={`flex-row ${styles['o-section']}`}>
          <Image
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/4eb4de2fad844573766ecf958fa4fa24.png'
            className={`${styles['image']}`}
          />
          <View className={`flex-col items-start ${styles['space-y-5']} ${styles['group_3']}`}>
            <Text className={`${styles['text_4']}`}>pisces</Text>
            <Text className={`${styles['text_5']}`}>2020年12年8月12日</Text>
          </View>
        </View>


        <View className={`flex-row ${styles['o-title']}`}>
          <View className={`${styles['section_1']}`}></View>
          <Text className={`${styles['text_3']}`}>评论</Text>
        </View>
        <View className={`flex-col ${styles['section_3']}`}>
          <View className={`flex-row justify-between ${styles['group_5']}`}>
            <View className={`flex-row ${styles['space-x-9']}`}>
              <View className={`${styles['section_4']}`}>{/**/}</View>
              <Text className={`${styles['text_7']}`}>标题</Text>
            </View>
            <Text className={`${styles['text_8']}`}>文本</Text>
          </View>
          <View className={`flex-col ${styles['section_5']}`}>
            <Text className={`${styles['text_9']}`}>文本内容文本内容文本内容文本内容文本内容文本内容文本内容</Text>
            <Text className={`${styles['text_10']}`}>辅助说明辅助说明</Text>
          </View>
        </View>
      </View>

      <View className={`flex-row justify-between ${styles['only-footer']}`}>
        <View className={`flex-col items-center ${styles['button']}`}>
          <AtInput name='comment' placeholder='写下评论~' onChange={()=>{}} />
        </View>
        <View className={`flex-row ${styles['space-x-9']} ${styles['group_7']}`}>
          <Image
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651382916193396.png'
            className={`${styles['image_1']}`}
          />
          <Text className={`${styles['text_12']}`}>100</Text>
          <Image
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651383759091719.png'
            className={`${styles['image_1']}`}
          />
          <Text className={`${styles['text_13']}`}>100</Text>
        </View>
      </View>
    </View>
  );
};

export default OnlyDetailView;