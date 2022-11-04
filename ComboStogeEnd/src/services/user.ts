import { GETRequest, POSTRequest, DELETERequest } from '@/utils/net-requests';
import {
  LOGIN,
  REGISTERED,
  LOGOUT,
  USERLIST,
  USERROLE,
  USERDEL,
  CAPTCHA,
} from '@/constants/server-api';
import { LoginParamsType } from '@/pages/data';
/**
 * 用户 请求
 */
// const URL = 'http://192.168.31.164:3000'
//登录
export async function accountLogin(params: LoginParamsType): Promise<any> {
  return GETRequest(LOGIN, params);
}

/** 验证码 */
export async function accountCaptcha(): Promise<any> {
  return GETRequest(CAPTCHA);
}

/** 注册 */
export async function accountRegistered(params: LoginParamsType): Promise<any> {
  return POSTRequest(REGISTERED, params);
}

/** 登出 */
export async function accountLogout(): Promise<any> {
  return GETRequest(LOGOUT);
}
/**  */
export async function accountUserList(): Promise<any> {
  return GETRequest(USERLIST);
}
/**  */
export async function accountUserRole(params: any): Promise<any> {
  return POSTRequest(USERROLE, params);
}
/**  */
export async function accountUserDel(params: any): Promise<any> {
  return DELETERequest(USERDEL, params);
}
