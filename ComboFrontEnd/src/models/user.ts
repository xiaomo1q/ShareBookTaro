import Taro from "@tarojs/taro";
import { Get_Data } from "../service/index";

const UserInfoStatus = {
  // 这是模块名
  namespace: "global_user",
  // 初始化数据
  state: {
    name: "小米",
    UserInfo: {},
    UpDateUserInfo: {}, // 修改用户信息
    HPI: {}, // 获取现病史
  },
  // 这里主要调用异步方法
  effects: {
    *getTest(payload, { call, put }) {
      const res = yield call(Get_Data);
    },
  },
  // 同步方法， 修改state值
  reducers: {
    getTestUpdate(state, { payload: { name } }) {
      return { ...state, name };
    },
  },
};

export default UserInfoStatus;
