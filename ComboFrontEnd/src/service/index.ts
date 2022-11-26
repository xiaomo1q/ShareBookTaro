import { POSTRequest, GETRequest, DELETERequest } from "../utils/net-requests";
import { InterfacePath } from "./interfacePath";

// const API_PATH = "/api/api";
const API_PATH = process.env.NODE_ENV === 'development' ? "/api" : "/api/api";
console.log(process.env.NODE_ENV, 'process.env');
/**
 * 获取 token
 */
export const _registered = (data) => GETRequest(InterfacePath.registered, { data });
export const _loginH5 = (data) => GETRequest(InterfacePath.loginH5, { data });

export const _loginCode = (data) => POSTRequest(InterfacePath.login_code, { data });
export const _loginUserInfo = (data) => POSTRequest(InterfacePath.login_user, { data });
export const Get_userInfo = (data) => POSTRequest(InterfacePath.get_userInfo, { data });
export const Update_userInfo = (data) => POSTRequest(API_PATH + '/update_userInfo', { data });
/**
 * 图书
 * @param data 
 * @returns 
 */
export const Get_book_type = () => GETRequest(InterfacePath.get_book_type);
export const Get_book_list = (data) => GETRequest(InterfacePath.get_book_list, { data });
export const Search_book_list = (data) => GETRequest(InterfacePath.search_book_list, { data });
export const Get_only_book_detail = (data) => GETRequest(InterfacePath.get_only_book_detail, { data });
// 添加图书
export const Add_only_book = (data) => POSTRequest(InterfacePath.add_only_book, { data });
export const Update_only_book = (data) => POSTRequest(API_PATH + '/update_only_book', { data });
export const Get_connect_book_list = (data) => GETRequest(InterfacePath.get_connect_book_list, { data });
export const Del_connect_book_list = (data) => DELETERequest(InterfacePath.del_connect_book_list, { data });
export const Add_connect_book = (data) => POSTRequest(API_PATH + '/add_connect_book', { data });
// 收藏
export const Get_favorite_book_list = () => GETRequest(InterfacePath.get_favorite_book_list);
export const Del_favorite_book_list = (data) => DELETERequest(InterfacePath.del_favorite_book_list, { data });
export const Add_favorite_book = (data) => GETRequest(InterfacePath.add_favorite_book, { data });

/** fans */
export const Add_fans_followers = (data) => GETRequest(API_PATH + '/add_fans_followers', { data });
export const Del_fans_followers = (data) => DELETERequest(API_PATH + '/del_fans_followers', { data });

/** 书评 */
export const Get_exchange_square_list = () => GETRequest(InterfacePath.get_exchange_square_list);
export const Get_exchange_square_detail = (data) => GETRequest(API_PATH + '/get_exchange_square_detail', { data });
export const Add_exchange_square_detail = (data) => POSTRequest(API_PATH + '/add_exchange_square_detail', { data });
export const Add_only_square_review = (data) => POSTRequest(API_PATH + '/add_only_square_review', { data });
export const Add_only_square_fav = (data) => POSTRequest(API_PATH + '/add_only_square_fav', { data });
export const File_img_upload = (data) => POSTRequest(API_PATH + '/file/img/upload/', { data });
export const File_img_delete = (data) => POSTRequest(API_PATH + '/file/img/delete/', { data });

/** 书主个人信息 */
export const Get_bookuser_userInfo = (data) => GETRequest(InterfacePath.get_bookuser_userInfo, { data });

// 聊天
export const Add_messages = (data) => POSTRequest(InterfacePath.add_messages, { data });
export const MSG_list = () => GETRequest(InterfacePath.msg_list);
export const Get_toUser_book_list = (data) => GETRequest(API_PATH + '/get_toUser_book_list', { data });
export const Add_order_information = (data) => POSTRequest(API_PATH + '/add_order_information', { data });
export const Get_order_information = (data) => POSTRequest(API_PATH + '/get_order_information', { data });
export const Get_notice_list = (data) => GETRequest(API_PATH + '/get_notice_list', { data });

