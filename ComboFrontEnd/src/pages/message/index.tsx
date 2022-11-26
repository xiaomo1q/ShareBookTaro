
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import { Get_notice_list, MSG_list } from "@/service/index";
import moment from 'moment'
import './index.less'

/**
 * 群聊列表
 * @returns 
 */
const MSGListIndex = () => {
  const [data_list, setDataList] = useState([])
  const [notice_last, setNoticeLast] = useState({ desc: '', create_time: "2000-01-01" })
  const { userInfo } = useSelector((state: any) => state.global_user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: "global_user/getUserInfo" })
    fetch()
  }, []);
  const fetch = async () => {
    await Get_notice_list({}).then(res => {
      if (!!res && res.length > 0) {
        setNoticeLast(res[res.length - 1])
      }
    })
    await MSG_list().then(res => setDataList(res))
  }

  return (
    <View className='MSG-List'>
      <AtList>
        <AtListItem title='通知消息' note={notice_last.desc}
          extraText={moment(notice_last.create_time).format('YYYY-MM-DD')}
          onClick={() => { Taro.redirectTo({ url: '/pagesA/message/notice-detail/index' }) }}
        />
        {
          data_list && data_list[0] && data_list.map((itm: any, inx) =>
            <AtListItem title={userInfo?.openid === itm.gm_toUserid ? itm.gm_fromUserName : itm.gm_toUserName}
              note=''
              extraText={moment(itm.create_time).format('MM-DD HH:mm')}
              key={inx}
              onClick={() => Taro.redirectTo({ url: '/pagesA/message/msg-detail/index?id=' + itm.userGroupID })}
            />)
        }
      </AtList>
    </View>
  );
};

export default MSGListIndex;
