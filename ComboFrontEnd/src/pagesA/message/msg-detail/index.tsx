
import NavCustomBar from '@/components/navCustomBar';
import { Add_order_information, Get_toUser_book_list } from '@/service/index';
import { Empty } from '@antmjs/vantui';
import { Image, Text, View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AtAvatar, AtFloatLayout, AtIcon, AtSearchBar } from "taro-ui";
import styles from './index.module.less';

const wsio = process.env.TARO_ENV === 'h5' ? require('socket.io-client') : require('wxapp-socket-io');


/**
 * 群聊信息
 * @returns 
 */
let socket;
const MSGDetailIndex = () => {
  const [floatOpen, setFloatOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [connectBook, setConnectBook] = useState([])
  const [searchBookVal, setSearchBookVal] = useState('')
  const { params } = useRouter()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: any) => state.global_user)
  const [data, setData] = useState<any>([]);

  const [mesgView, setMesgView] = useState<string>('');
  const fetchConnectBookList = async () => {
    const res = await Get_toUser_book_list({ id: params.id })
    setConnectBook(res || [])
  }

  useEffect(() => {
    process.env.TARO_ENV === 'weapp' && Taro.hideHomeButton()
    getWebSocket()
    fetchConnectBookList()
    dispatch({ type: "global_user/getUserInfo" })
  }, []);
  // 回到底部
  const scrollBottom = () => {
    const s: any = document.getElementById('box')
    s.scrollTop = s.scrollHeight
  }
  // 发送
  const onSearch = (value: any) => {
    socket.emit('chat', { m_id: params.id }, {
      openid: userInfo.openid,
      gm_id: params.id,
      m_postMessage: searchVal,
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    orderSendClickedHandler()
  };
  const orderSendClickedHandler = () => {
    scrollBottom()
    socket.on("chat", (res: any) => {
      setData(res)
      setSearchVal('')
    });
  }
  const getWebSocket = () => {
    const url = 'ws://81.68.169.67:3030'
    // const url = 'ws://192.168.1.4:3030'
    socket = wsio(url, {
      // query: { m_id: id, n: 0 },
      reconnection: true, //关闭自动重连
      transports: ['websocket']
    });
    socket.on("connect", () => {
      socket.emit('chat', { m_id: params.id })
      orderSendClickedHandler()
    });
  }
  const SearchBookClickedHandler = (item) => {
    item['乙方'] = userInfo
    socket.emit('chat', { m_id: params.id }, {
      openid: userInfo.openid,
      gm_id: params.id,
      isSend: JSON.stringify(item),
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    orderSendClickedHandler()
    setFloatOpen(false)
  }

  const isAgreeClickedHandler = async (item, status) => {
    item.isSend['甲方'] = userInfo
    item.isSend['status'] = status
    socket.emit('chat', { m_id: params.id }, {
      openid: userInfo.openid,
      gm_id: params.id,
      isSend: JSON.stringify(item.isSend),
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    orderSendClickedHandler()
    if (status === '1') {
      // to 乙 from 甲
      const obj = {
        "isbn": item.isSend.isbn,
        "book_name": item.isSend.book_name,
        "book_url": item.isSend.imgUrl,
        "toUser_id": item.isSend['甲方'].openid,
        "toUser_name": item.isSend['甲方'].nickName,
        "formUser_id": item.isSend['乙方'].openid,
        "formUser_name": item.isSend['乙方'].nickName
      }
      await Add_order_information(obj)
    }

  }
  return (
    <View className={styles['MSG-Detail']}>
      <NavCustomBar needBackIcon title='消息' url='/pages/message/index' />
      {/* <View className={styles['MSGD-Head']}>
        <AtButton onClick={() => setFloatOpen(true)}>填写生成订单</AtButton>
      </View> */}
      <View dangerouslySetInnerHTML={{ __html: mesgView }} ></View>
      <View className={styles['MSGD-main']} id='box'>
        {
          data && data[0] && data.map((item, index) => {
            return <View key={index} className={styles[item.openid === userInfo.openid ? 'msg-box-right' : 'msg-box-left']}>
              <AtAvatar image={item.avatarUrl} circle />
              {
                !!item.isSend ? <View className={styles['send-box']}>
                  <View className={styles['_des']}>
                    是否同意将 “{item.isSend.book_name}” 交给 “{item.isSend['乙方'].nickName}” ?
                  </View>
                  {
                    item.isSend['乙方'].openid === userInfo.openid ? <View className={styles['send-box-deb-btn']} >
                      {
                        !!item.isSend.status ? item.isSend.status === '1' ?
                          <View className={styles['sb-btn-a']}>对方同意</View> :
                          <View className={styles['sb-btn-r']} >对方拒绝</View> : <>
                          <View className={styles['sb-btn-r']} >已发送</View>
                          {/* <View className={styles['sb-btn-r']} >拒绝</View>
                          <View className={styles['sb-btn-a']}>同意</View> */}
                        </>
                      }
                    </View> : <View className={styles['send-box-btn']} >
                      {
                        !!item.isSend.status ? item.isSend.status === '1' ?
                          <View className={styles['sb-btn-a']}>您已同意</View> :
                          <View className={styles['sb-btn-r']} >您已拒绝</View> : <>
                          <View className={styles['sb-btn-r']} onClick={() => isAgreeClickedHandler(item, '0')} >拒绝</View>
                          <View className={styles['sb-btn-a']} onClick={() => isAgreeClickedHandler(item, '1')}>同意</View>
                        </>
                      }
                    </View>
                  }

                </View>
                  : <View className={styles['_des']}>{item.m_postMessage}</View>
              }

            </View>
          })
        }
      </View >
      <View className={styles['MSGD-footer']}>
        <AtSearchBar
          showActionButton
          placeholder='请输入聊天内容'
          actionName='发送'
          value={searchVal}
          onChange={(value) => setSearchVal(value)}
          onActionClick={onSearch}
        />
        <AtIcon value='add' size='30' color='#333' onClick={() => setFloatOpen(true)} />
      </View>
      <AtFloatLayout isOpened={floatOpen} title='选择想要的书' onClose={() => setFloatOpen(false)}>
        <View className={`flex-col ${styles['home-tab-connect']}`}>
          {
            connectBook && connectBook.length > 0 ? connectBook.map((item: any, index: any) =>
              <View key={index} className={`flex-row ${styles['section_5']} ${styles['view']}`}>
                <View className={`flex-row ${styles['left']}`}>
                  <Image src={!!item.imgUrl ? item.imgUrl : 'https://images-1300238189.cos.ap-shanghai.myqcloud.com/noImg.png'} className={`${styles['image_20']}`} />
                  <View className={`flex-col ${styles['group_9']}`}> <Text className={`${styles['text_10']}`}>{item.book_name}</Text>   </View>
                </View>
                <View className={styles['betn']} onClick={() => SearchBookClickedHandler(item)}> 发送 </View>
              </View>
            ) : <Empty />
          }
        </View>
      </AtFloatLayout>
    </View >
  );
};

export default MSGDetailIndex;
