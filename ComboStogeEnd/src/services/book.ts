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
export const Get_book_list = (data: { pageCount: number; pageIndex: number }) => POSTRequest(API_PATH + '/get_book_list', data);
export const Add_book_list = (data: { pageCount: number; pageIndex: number }) => POSTRequest(API_PATH + '/add_book_list', data);
export const Update_book_list = (data: { pageCount: number; pageIndex: number }) => POSTRequest(API_PATH + '/update_book_list', data);
