import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import styles from './courses.module.less';

export default function Courses() {
  const data = {};

  return (
    <View className={`flex-col ${styles['page']}`}>
      <View className={`flex-col ${styles['group_2']}`}>
        <View className={`justify-between ${styles['group_3']}`}>
          <Text className={`${styles['text']}`}>书城</Text>
          <View className={`${styles['section_1']}`}>{/***/}</View>
        </View>
        <View className={`justify-between ${styles['search']}`}>
          <View className={`flex-row ${styles['group_4']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140330271204.png"
              className={`${styles['image_4']}`}
            />
            <Text className={`${styles['text_1']}`}>Find Cousre</Text>
          </View>
          <Image
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140334201847.png"
            className={`${styles['image_5']}`}
          />
        </View>
      </View>
      <View className={`flex-row ${styles['equal-division']}`}>
        <Image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/1501981b9ff3e784530e2bbb3c8ab8e3.png"
          className={`${styles['image_6']}`}
        />
        <View className={`flex-col ${styles['group_5']}`}>
          <View className={`flex-col items-center ${styles['group_5']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/31e3a6e475f07fe4c04462b95bdb9707.png"
              className={`${styles['image_6']}`}
            />
          </View>
        </View>
      </View>
      <Text className={`${styles['text_4']}`}>Choice your course</Text>
      <View className={`flex-col ${styles['group_7']}`}>
        <View className={`flex-row`}>
          <View className={`flex-col items-center ${styles['equal-division-item_1']}`}>
            <Text className={`${styles['text_5']}`}>全部</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item_2']}`}>
            <Text className={`${styles['text_6']}`}>电子期刊</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item_2']}`}>
            <Text className={`${styles['text_6']}`}>电子资源</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item_2']}`}>
            <Text className={`${styles['text_6']}`}>C语言</Text>
          </View>
        </View>
        <View className={`flex-col ${styles['group_8']}`}>
          <View className={`flex-row ${styles['section_5']} ${styles['view']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149097650860.png"
              className={`${styles['image_20']}`}
            />
            <View className={`flex-col ${styles['group_9']}`}>
              <Text className={`${styles['text_10']}`}>从入门到放弃</Text>
              <View className={`flex-row ${styles['group_10']}`}>
                <Image
                  src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149988976615.png"
                  className={`${styles['image_22']}`}
                />
                <Text className={`${styles['text_12']}`}>人民出版</Text>
              </View>
              <Text className={`${styles['text_14']}`}>600次借阅</Text>
            </View>
            <View className={`flex-col items-center ${styles['text-wrapper_5']}`}>
              <Text className={`${styles['text_16']}`}>可借</Text>
            </View>
          </View>
          <View className={`flex-row ${styles['section_5']} ${styles['view_3']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149097650860.png"
              className={`${styles['image_20']}`}
            />
            <View className={`flex-col ${styles['group_9']}`}>
              <Text className={`${styles['text_10']}`}>从入门到放弃</Text>
              <View className={`flex-row ${styles['group_10']}`}>
                <Image
                  src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360149988976615.png"
                  className={`${styles['image_22']}`}
                />
                <Text className={`${styles['text_12']}`}>人民出版</Text>
              </View>
              <Text className={`${styles['text_14']}`}>600次借阅</Text>
            </View>
            <View className={`flex-col items-center ${styles['text-wrapper_6']}`}>
              <Text className={`${styles['text_20']}`}>可买</Text>
            </View>
          </View>
        </View>
      </View>
      <View className={`flex-col ${styles['section_6']}`}>
        <View className={`flex-row ${styles['equal-division_2']}`}>
          <View className={`flex-col items-center ${styles['equal-division-item_3']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3/48ad3745455454a65e4868051ba28715.png"
              className={`${styles['image_26']}`}
            />
            <Text className={`${styles['text_27']} ${styles['text_22']}`}>首页</Text>
          </View>
          <View className={`flex-col ${styles['equal-division-item_4']}`}>
            <View className={`${styles['section_7']}`}>{/***/}</View>
            <View className={`flex-col items-start ${styles['group_12']}`}>
              <Image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140346149836.png"
                className={`${styles['image_26']}`}
              />
              <Text className={`${styles['text_23']}`}>书城</Text>
            </View>
          </View>
          <View className={`flex-col ${styles['equal-division-item_5']}`}>
            <View className={`flex-col ${styles['group_13']}`}>
              <View className={`flex-col items-center ${styles['image-wrapper_1']}`}>
                <Image
                  src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600372810643901853.png"
                  className={`${styles['image_29']}`}
                />
              </View>
              <Image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600372810670903472.png"
                className={`${styles['image_30']}`}
              />
            </View>
            <Text className={`${styles['text_24']}`}>搜索</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item_6']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140358498788.png"
              className={`${styles['image_26']}`}
            />
            <Text className={`${styles['text_25']}`}>消息</Text>
          </View>
          <View className={`flex-col items-center ${styles['equal-division-item_3']} ${styles['group_14']}`}>
            <Image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/6205f5225a7e3f0310991140/62f22336fb1d5f00118595e3//16600360140355019422.png"
              className={`${styles['image_26']}`}
            />
            <Text className={`${styles['text_27']} ${styles['text_26']}`}>账号</Text>
          </View>
        </View>
      </View>
    </View>
  );
}