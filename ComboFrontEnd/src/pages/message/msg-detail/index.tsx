
import React, { useEffect, useState } from 'react';
import Taro, { useRouter } from '@tarojs/taro';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from '@tarojs/components'
import wsio from 'socket.io-client'
import { AtAvatar, AtButton, AtFloatLayout, AtForm, AtSearchBar } from "taro-ui"
import NavCustomBar from '@/components/navCustomBar';
import moment from 'moment'
import styles from './index.module.less'

/**
 * 群聊信息
 * @returns 
 */
// let socket;
const MSGDetailIndex = () => {
  const [floatOpen, setFloatOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.global_user)
  const [data, setData] = useState<any>([]);

  //  ws://127.0.0.1:8000
  // process.env.TARO_ENV = localStorage.getItem("TOKEN")
  const socket = wsio('ws://81.68.169.67:3030', {
    query: { m_id: params.id },
    reconnection: false, //关闭自动重连
    transports: ['websocket']
  })
  useEffect(() => {
    getWebSocket()
    dispatch({ type: "global_user/getUserInfo" })
  }, []);
  const getWebSocket = () => {

    socket.on("connect", () => {
      socket.emit('chat')
      socket.on("chat", (res: any) => {
        console.log(res);
        setData(res)
      });
    });
  }
  // 回到底部
  const scrollBottom = () => {
    const s: any = document.getElementById('box')
    s.scrollTop = s.scrollHeight
  }
  // 发送
  const onSearch = (value: any) => {
    socket.emit('chat', {
      openid: userInfo.openid,
      gm_id: params.id,
      m_postMessage: searchVal,
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    socket.on("chat", (res: any) => {
      setData(res)
      setSearchVal('')
    });
  };
  console.log(data, '.nickName');

  return (
    <View className={styles['MSG-Detail']}>
      <NavCustomBar needBackIcon title='消息' url='/pages/message/index' />
      <View className={styles['MSGD-Head']}>
        <AtButton onClick={() => setFloatOpen(true)}>填写生成订单</AtButton>
      </View>
      <View className={styles['MSGD-main']} id='box'>
        {
          data && data[0] && data.map((item, index) => {
            return <View key={index} className={styles[item.openid === userInfo.openid ? 'msg-box-right' : 'msg-box-left']}>
              <AtAvatar image={item.avatarUrl} circle />
              <View className={styles['_des']}>{item.m_postMessage}</View>
            </View>
          })
        }
      </View>
      <View className={styles['MSGD-footer']}>
        <AtSearchBar
          showActionButton
          placeholder='请输入聊天内容'
          actionName='发送'
          value={searchVal}
          onChange={(value) => setSearchVal(value)}
          onActionClick={onSearch}
        />
      </View>
      <AtFloatLayout isOpened={floatOpen} title='订单填写' onClose={() => setFloatOpen(false)}>
        <AtForm>

        </AtForm>
      </AtFloatLayout>
    </View>
  );
};

export default MSGDetailIndex;
