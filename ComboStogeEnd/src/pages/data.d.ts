/**
 * 
 */

/** 登录 */
export interface LoginParamsType {
  username?: string;
  password?: string;
}
/** 请求数据 */
export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
  token?: string;
  role?: string;
  username?: string;
}
