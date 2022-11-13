import { POSTRequest, GETRequest, PUTRequest } from "../utils/net-requests";
import { InterfacePath } from "./interfacePath";

/**
 * 获取 token
 */
 export const _registered = (data) => GETRequest(InterfacePath.registered,{data});
 export const _loginH5 = (data) => GETRequest(InterfacePath.loginH5,{data});

 export const _loginCode = (data) => POSTRequest(InterfacePath.login_code,{data});
 export const _loginUserInfo = (data) => POSTRequest(InterfacePath.login_user,{data});
 export const Get_userInfo = (data) => POSTRequest(InterfacePath.get_userInfo,{data});
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
export const Get_connect_book_list = (data) => GETRequest(InterfacePath.get_connect_book_list, { data });
// 收藏
export const Get_favorite_book_list = () => GETRequest(InterfacePath.get_favorite_book_list);
export const Add_favorite_book = (data) => GETRequest(InterfacePath.add_favorite_book, { data });

/** 书评 */
export const Get_exchange_square_list = () => GETRequest(InterfacePath.get_exchange_square_list);
export const Get_exchange_square_detail = (data) => GETRequest('/api/get_exchange_square_detail', { data });
export const Add_exchange_square_detail = (data) => POSTRequest('/api/add_exchange_square_detail', { data });
export const Add_only_square_review = (data) => POSTRequest('/api/add_only_square_review', { data });
export const File_img_upload = (data) => POSTRequest('/api/file/img/upload/', { data });
export const File_img_delete = (data) => POSTRequest('/api/file/img/delete/', { data });

/** 书主个人信息 */
export const Get_bookuser_userInfo = (data) => GETRequest(InterfacePath.get_bookuser_userInfo,{data});

// 聊天
export const Add_messages = (data) => POSTRequest(InterfacePath.add_messages,{data});
export const MSG_list = () => GETRequest(InterfacePath.msg_list);

