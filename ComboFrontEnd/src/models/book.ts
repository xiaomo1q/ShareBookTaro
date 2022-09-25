import Taro from "@tarojs/taro";
import { Get_book_list,Get_only_book_detail } from "../service/index";

const BookStatus = {
 // 这是模块名
 namespace: "book_model",
 // 初始化数据
 state: {
   book_list: [],
   only_book_detail:{}
 },
 // 这里主要调用异步方法
 effects: {
   *getBookList({payload:{type}}, { call, put }) {
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
   *getOnlyBookDetail({payload}, { call, put }) {
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
 },
 // 同步方法， 修改state值
 reducers: {
   getBookListUpdate(state, { payload: { book_list } }) {
     return { ...state, book_list };
   },
   getOnlyBookDetailUpdate(state, { payload: { only_book_detail } }) {
     return { ...state, only_book_detail };
   },
 },
};

export default BookStatus;
