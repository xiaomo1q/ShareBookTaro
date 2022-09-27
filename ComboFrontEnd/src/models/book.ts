import Taro from "@tarojs/taro";
import { Get_book_list, Get_only_book_detail, Search_book_list ,Get_favorite_book_list} from "../service/index";

const BookStatus = {
  // 这是模块名
  namespace: "book_model",
  // 初始化数据
  state: {
    book_list: [],
    only_book_detail: {},
    favorite_book_list:[],
    search_book_list:[]
  },
  // 这里主要调用异步方法
  effects: {
    *getBookList({ payload: { type } }, { call, put }) {
      const res = yield call(Get_book_list, type);
      try {
        yield put({ type: "getBookListUpdate", payload: { book_list: res.data } })
      } catch (error) {
        Taro.atMessage({
          'message': error,
          'type': 'error',
        })
      }
    },
    /** 图书详情 */
    *getOnlyBookDetail({ payload }, { call, put }) {
      const res = yield call(Get_only_book_detail, payload);
      try {
        yield put({ type: "getOnlyBookDetailUpdate", payload: { only_book_detail: res.data } })
      } catch (error) {
        Taro.atMessage({
          'message': error,
          'type': 'error',
        })
      }

    },

    /** 搜索 */
    *searchBookList({ payload }, { call, put }) {
      const res = yield call(Search_book_list, payload);
      try {
        yield put({ type: "saveUpdate", payload: { search_book_list: res } })
      } catch (error) {
        Taro.atMessage({
          'message': error,
          'type': 'error',
        })
      }
    },
    *getFavoriteBookList({ payload }, { call, put }) {
      const res = yield call(Get_favorite_book_list, payload);
      try {
        yield put({ type: "saveUpdate", payload: { favorite_book_list: res } })
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
    saveUpdate(state, { payload }) {
      return { ...state, ...payload };
    },
    getBookListUpdate(state, { payload: { book_list } }) {
      return { ...state, book_list };
    },
    getOnlyBookDetailUpdate(state, { payload: { only_book_detail } }) {
      return { ...state, only_book_detail };
    },
  },
};

export default BookStatus;
