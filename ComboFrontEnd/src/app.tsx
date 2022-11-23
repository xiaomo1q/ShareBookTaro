/* eslint-disable import/first */
import React, { Component, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';
import dva from "@/utils/dva";
import models from "./models";
// eslint-disable-next-line import/first

import './app.less'
// 需要通过less变量/var()更改主题，引用它
import 'taro-ui/dist/style/index.scss'
import '@antmjs/vantui/lib/index.less'
import Taro from "@tarojs/taro";


const dvaApp = dva.createApp({
  models: models,
});

const store = dvaApp.getStore();

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }  const token = localStorage.getItem('token');

/* "appid": "wx36fabba98a5d8b62", */
const App = (props) => {
  useEffect(() => {
    const ENV = process.env.TARO_ENV;
    let token;
    // const { method, data, url } = requestParams
    if (ENV === "h5") {
      token = localStorage.getItem("TOKEN"); //拿到本地缓存中存的token
      if (token) { } else {
        localStorage.clear()
        Taro.redirectTo({
          url: "/pages/userinfo/login"
        })
      }
    } else {
      Taro.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
          console.log('session_key 未过期，并且在本生命周期一直有效');
        },
        fail() {
          Taro.clearStorageSync() 
          console.log('session_key 已经失效，需要重新执行登录流程')
          Taro.redirectTo({
            url: "/pages/userinfo/login"
          })
        }
      })
    }

  }, [])
  return <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
    {props.children}
    {/* </PersistGate> */}
  </Provider>;
}
export default App;