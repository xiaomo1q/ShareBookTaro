import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Tab, Tabs } from '@antmjs/vantui'
import styles from './courses.module.less';
import { GETRequest } from "../../utils/net-requests";

function RenderTabPanel() {
  return (<View className={`flex-col ${styles['home-tab-panel']}`}>
    <View className={`flex-row ${styles['section_5']} ${styles['view']}`}>
      <Image src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149097650860.png' className={`${styles['image_20']}`} />
      <View className={`flex-col ${styles['group_9']}`}>
        <Text className={`${styles['text_10']}`}>从入门到放弃</Text>
        <View className={`flex-row ${styles['group_10']}`}>
          <Image src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149988976615.png' className={`${styles['image_22']}`} />
          <Text className={`${styles['text_12']}`}>人民出版</Text>
        </View>
        <Text className={`${styles['text_14']}`}>600次借阅</Text>
      </View>
      <View className={`flex-col items-center ${styles['text-wrapper_5']}`}>
        <Text className={`${styles['text_16']}`}>可借</Text>
      </View>
    </View>
    <View className={`flex-row ${styles['section_5']} ${styles['view_3']}`}>
      <Image src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149097650860.png' className={`${styles['image_20']}`} />
      <View className={`flex-col ${styles['group_9']}`}>
        <Text className={`${styles['text_10']}`}>从入门到放弃</Text>
        <View className={`flex-row ${styles['group_10']}`}>
          <Image src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149988976615.png' className={`${styles['image_22']}`} />
          <Text className={`${styles['text_12']}`}>人民出版</Text>
        </View>
        <Text className={`${styles['text_14']}`}>600次借阅</Text>
      </View>
      <View className={`flex-col items-center ${styles['text-wrapper_6']}`}>
        <Text className={`${styles['text_20']}`}>可买</Text>
      </View>
    </View>
  </View>);
}


const HomeView = () => {
  const data = {};

  useEffect(() => {
    fun()
  }, []);

  const fun = async () => {
    // 图灵社区 https://m.ituring.com.cn/book?tab=all&sort=vote
    // https://api.ituring.com.cn/api/Book?tag=36515&page=1&sort=new
  }

  return (
    <View className={`flex-col ${styles['home-index']}`}>
      <View className={`flex-col ${styles['hi-header']}`}>
        <View className={`justify-between ${styles['hi-header-title']}`}>
          <Text className={`${styles['text']}`}>书城</Text>
          <View className={`${styles['section_1']}`}>{/***/}</View>
        </View>
        <View className={`justify-between ${styles['search']}`}>
          <View className={`flex-row ${styles['group_4']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140330271204.png'
              className={`${styles['image_4']}`}
            />
            <Text className={`${styles['text_1']}`}>Find Cousre</Text>
          </View>
          <Image
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140334201847.png'
            className={`${styles['image_5']}`}
          />
        </View>
      </View>
      <View className={`flex-row ${styles['equal-division']}`}>
        <Image
          src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/1501981b9ff3e784530e2bbb3c8ab8e3.png'
          className={`${styles['image_6']}`}
        />
        <View className={`flex-col ${styles['group_5']}`}>
          <View className={`flex-col items-center ${styles['group_5']}`}>
            <Image
              src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/31e3a6e475f07fe4c04462b95bdb9707.png'
              className={`${styles['image_6']}`}
            />
          </View>
        </View>
      </View>
      <View className={`flex-col ${styles['home-tab-list']}`}>
        <Tabs active={0}>
          <Tab title='热门图书'><RenderTabPanel /></Tab>
          <Tab title='电子信息'>内容 2</Tab>
          <Tab title='标签 3'>内容 3</Tab>
          <Tab title='标签 4'>内容 4</Tab>
          <Tab title='标签 5'>内容 5</Tab>
          <Tab title='标签 6'>内容 6</Tab>
        </Tabs>
      </View>
    </View>
  );
}
export default HomeView;