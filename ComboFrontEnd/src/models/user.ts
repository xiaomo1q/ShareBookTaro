import Taro from "@tarojs/taro";
import { Get_userInfo } from "../service/index";

const UserInfoStatus = {
  // 这是模块名
  namespace: "global_user",
  // 初始化数据
  state: {
    userInfo: {},
  },
  // 这里主要调用异步方法
  effects: {
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
  },
  // 同步方法， 修改state值
  reducers: {
    getUserInfoUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default UserInfoStatus;
