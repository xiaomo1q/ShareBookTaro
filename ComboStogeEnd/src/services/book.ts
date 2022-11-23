import {
  GETRequest,
  POSTRequest,
  DELETERequest,
  PUTRequest,
  POSTFormRequest,
} from '@/utils/net-requests';
/**
 * 服务器路径
 */
const API_PATH = '/api/admin';

/** GET */
export const Get_book_type = (data?: any) => POSTRequest(API_PATH + '/get_book_type', data);
export const Get_book_list = (data: any) => POSTRequest(API_PATH + '/get_book_list', data);
export const Add_only_book = (data: any) => POSTRequest(API_PATH + '/add_only_book', data);
export const Update_only_book = (data: any) => POSTRequest(API_PATH + '/update_only_book', data);
export const Del_only_book = (data: any) => DELETERequest(API_PATH + '/del_only_book', data);
