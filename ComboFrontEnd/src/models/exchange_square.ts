import Taro from "@tarojs/taro";
import { Get_exchange_square_list} from "../service/index";

/**
 * 书圈
 */
const publicStatus = {
  // 这是模块名
  namespace: "square_modal",
  // 初始化数据
  state: {
    get_list: [], // 书评列表
  },
  // 这里主要调用异步方法
  effects: { 
    *Get_exchange_square_list({ payload: { type } }, { call, put }) {
      const res = yield call(Get_exchange_square_list, type);
      try {
        yield put({ type: "getListUpdate", payload: { get_list: res.data } })
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
    getListUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default publicStatus;
