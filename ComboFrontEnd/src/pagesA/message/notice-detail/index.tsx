import NavCustomBar from "@/components/navCustomBar";
import { Get_notice_list } from "@/service/index";
import { View } from "@tarojs/components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AtCard } from "taro-ui";
import './index.less'
/**
 * 通知消息
 * @returns 
 */
const NoticeDetailIndex = () => {
  const [notice_list, setNoticeList] = useState([])
  useEffect(() => {
    fetch()
    scrollBottom()
  }, []);
  const fetch = async () => {
    await Get_notice_list({}).then(res => setNoticeList(res))
  }

  // 回到底部
  const scrollBottom = () => {
    const s: any = document.getElementById('box')
    s.scrollTop = s.scrollHeight
  }
  return <View className='notice-detail'>
    <NavCustomBar needBackIcon title='消息通知' url='/pages/message/index' />
    <View id='box'>
      {
        !!notice_list && notice_list.map((el:any, ix) => <AtCard
          key={ix}
          note=''
          extra={moment(el.create_time || '2020').format('YYYY-MM-DD')}
          title='官方通知'
        >{el.desc}
        </AtCard>)
      }
    </View>
  </View>
}
export default NoticeDetailIndex;