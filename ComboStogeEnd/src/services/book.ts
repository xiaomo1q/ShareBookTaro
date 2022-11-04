import { GETRequest, POSTRequest, DELETERequest, PUTRequest, POSTFormRequest } from '@/utils/net-requests';
/**
 * 服务器路径
 */
const API_PATH = '/api/admin';

/** GET */
export const get_book_type = (data: { pageCount: number, pageIndex: number }) => POSTRequest(API_PATH + '/get_book_type', data);
export const get_book_list = (data: { pageCount: number, pageIndex: number }) => POSTRequest(API_PATH + '/get_book_list', data);