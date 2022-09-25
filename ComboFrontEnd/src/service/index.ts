import { POSTRequest, GETRequest, PUTRequest } from "../utils/net-requests";
import { InterfacePath } from "./interfacePath";

/**
 * 获取 token
 */
 export const _login = (data) => POSTRequest(InterfacePath.login,{data});
/**
 * 图书
 * @param data 
 * @returns 
 */
export const Get_book_type = () => GETRequest(InterfacePath.get_book_type);
export const Add_book_list = (data) => GETRequest(InterfacePath.add_book_list, { data });
export const Get_book_list = (data) => GETRequest(InterfacePath.get_book_list, { data });
export const Get_only_book_detail = (data) => GETRequest(InterfacePath.get_only_book_detail, { data });