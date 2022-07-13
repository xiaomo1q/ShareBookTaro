/* eslint-disable import/first */
import React, { Component, useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import dva from "@/utils/dva";
import models from "./models";
// eslint-disable-next-line import/first

import './app.less'
// 需要通过less变量/var()更改主题，引用它
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


const App = (props) => {
  useEffect(() => {
  }, [])
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      {props.children}
    </PersistGate>
  </Provider>;
}
export default App;