import { View, Image, Text } from '@tarojs/components';
import React from 'react';
import styles from './index.module.less'

const BookDetailView: React.FC = () => {
  return (
    <View className={`flex-col ${styles['book-detail']}`}>
      <View className={styles['bd-box']}>
        <View className={`flex-row justify-center ${styles['bd-header']}`}>
          <Image
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651386719125788.png'
            className={`${styles['image']}`}
          />
          <View className={`flex-col ${styles['group_1']}`}>
            <Text className={`${styles['text_1']}`}>人性的弱点</Text>
            <View className={`flex-col ${styles['group_2']}`}>
              <View className={`${styles['group_3']}`}>
                <Text className={`${styles['text_2']}`}>作者：</Text>
                <Text className={`${styles['text_3']}`}>【美】xxx*xxx</Text>
              </View>
            </View>
            <View className={`flex-col items-start ${styles['group_4']}`}>
              <View className={`${styles['group_5']}`}>
                <Text className={`${styles['text_4']}`}>出版社：</Text>
                <Text className={`${styles['text_5']}`}>人民出版社</Text>
              </View>
              <View className={`${styles['divider']}`}>{/**/}</View>
            </View>
            <View className={`flex-col items-start ${styles['group_4']}`}>
              <View className={`${styles['group_5']}`}>
                <Text className={`${styles['text_4']}`}>所属类别：</Text>
                <Text className={`${styles['text_5']}`}>语言类</Text>
              </View>
              <View className={`${styles['divider']}`}>{/**/}</View>
            </View>
          </View>
        </View>
        <View className={styles['bd-group']}>
          <Text className={`${styles['text_6']}`}>拥有书主：</Text>
          <View className={`flex-row ${styles['group_6']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651387176227763.png'
              className={`${styles['image_1']}`}
            />
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16612651387603832824.png'
              className={`${styles['image_2']}`}
            />
          </View>
        </View>
        <View className={`flex-col ${styles['bd-main']}`}>
          <View className={styles['bdm-txt']}>内容简介</View>
          <View className={styles['bdm-content']}>卡耐基在《人性的弱点》中告诉了人们这样几条处世规则：一、对别人表现出诚挚的关切；二、微笑；三、记住他人的名字，一个人的名字对他本人来说，是任何语言中最甜蜜、最重要的声音；四、做一个好的倾听者，鼓励他人谈论他们自己；五、谈论别人感兴趣的事物，使对方觉得重要——以一种诚恳的方式进行。卡耐基作为人类的心灵导师，他深刻地洞察到，世上之所以有那么多的人不成功，是因为他们内心的忧虑、自卑和人际沟通障碍所致。他提出了“相信你能成功，你就能成功”的论断。《人性的弱点》以人性具有的一般弱点为切入点，内容涉及人际交往、心态调节、维系家庭、安排工作和合理用钱等诸多方面。在书中，卡耐基为读者提供了如何与他人相处、如何得到他人的认同、如何回避人性的弱点、如何战胜人性的弱点的种种方法，并提出了应对各类弱点的有效策略。
            卡耐基在书中总结出：“一个人在事业上的成功，有15％归结于他的专业知识，另外85％归结于他表达思想、领导他人和唤起他人热情的能力”。</View>
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