import Taro from "@tarojs/taro";
import { Get_userInfo,Get_bookuser_userInfo } from "../service/index";

const UserInfoStatus = {
  // 这是模块名
  namespace: "global_user",
  // 初始化数据
  state: {
    userInfo: {},
    bookuserInfo:{}
  },
  // 这里主要调用异步方法
  effects: {
    /** 用户本人信息 */
    *getUserInfo({}, { call, put }) {
      const res = yield call(Get_userInfo);
      try {
         yield put({ type: "getUserInfoUpdate", payload: { userInfo: res } })
      } catch (error) {
         Taro.atMessage({
             'message': error,
             'type': 'error',
         })
      }
    
    },

    /** 书主信息 */
    *GetBookuserInfo({payload}, { call, put }) {
      const res = yield call(Get_bookuser_userInfo,payload);
      try {
         yield put({ type: "getUserInfoUpdate", payload: { bookuserInfo: res } })
      } catch (error) {
         Taro.atMessage({
             'message': error,
             'type': 'error',
         })
      }
    },
  },
  // 同步方法， 修改state值
  reducers: {
    getUserInfoUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default UserInfoStatus;
