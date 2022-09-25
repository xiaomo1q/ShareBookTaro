import { POSTRequest, GETRequest, PUTRequest } from "../utils/net-requests";
import { InterfacePath } from "./interfacePath";

/**
 * 获取 token
 */
 export const _loginCode = (data) => POSTRequest(InterfacePath.login_code,{data});
 export const _loginUserInfo = (data) => POSTRequest(InterfacePath.login_user,{data});
 export const Get_userInfo = (data) => POSTRequest(InterfacePath.get_userInfo,{data});
/**
 * 图书
 * @param data 
 * @returns 
 */
export const Get_book_type = () => GETRequest(InterfacePath.get_book_type);
export const Add_book_list = (data) => GETRequest(InterfacePath.add_book_list, { data });
export const Get_book_list = (data) => GETRequest(InterfacePath.get_book_list, { data });
export const Get_only_book_detail = (data) => GETRequest(InterfacePath.get_only_book_detail, { data });