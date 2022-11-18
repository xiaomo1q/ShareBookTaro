
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { MSG_list } from "@/service/index";
import moment from 'moment'
import './index.less'

/**
 * 群聊列表
 * @returns 
 */
const MSGListIndex = () => {
  const [data_list, setDataList] = useState([])
  const { userInfo } = useSelector((state: any) => state.global_user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "global_user/getUserInfo" })
    fetch()
  }, []);
  const fetch = async () => {
    await MSG_list().then(res => setDataList(res))
  }

  return (
    <View className='MSG-List'>
      <AtList>
        <AtListItem title='通知消息' note='暂无新的' extraText='' />
        {
          data_list && data_list[0] && data_list.map((itm: any, inx) =>
            <AtListItem title={userInfo?.openid === itm.gm_toUserid ? itm.gm_fromUserName : itm.gm_toUserName}
              note=''
              extraText={moment(itm.create_time).format('MM-DD HH:mm')}
              key={inx}
              onClick={() => Taro.navigateTo({ url: '/pagesA/message/msg-detail/index?id=' + itm.userGroupID })}
            />)
        }
      </AtList>
    </View>
  );
};

export default MSGListIndex;
