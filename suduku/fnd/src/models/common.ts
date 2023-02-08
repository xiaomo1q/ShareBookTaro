import Taro from "@tarojs/taro";

/**
 * 公共状态存储
 */
const publicStatus = {
  // 这是模块名
  namespace: "public_storage",
  // 初始化数据
  state: {
    connect_book_list: [], // 关联图书
  },
  // 这里主要调用异步方法
  effects: { 
  },
  // 同步方法， 修改state值
  reducers: {
    connect_book_listUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default publicStatus;
