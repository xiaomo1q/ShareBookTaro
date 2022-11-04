/**
 * 作为整个系统的网络请求库
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import settings from '@/config/settings';
import { getToken, removeToken } from '@/utils/localToken';

/**
 * 网络连接超时时间(ms)
 */
const NET_CONNECTION_TIME_OUT = 120 * 1000;

const customCodeMessage: any = {
  10002: '当前用户登入信息已失效，请重新登入再操作', // 未登陆
};

const serverCodeMessage: any = {
  200: '服务器成功返回请求的数据',
  400: 'Bad Request',
  401: '身份已过期,请重新登录',
  403: 'Forbidden',
  404: 'Not Found',
  500: '服务器发生错误，请检查服务器(Internal Server Error)',
  502: '网关错误(Bad Gateway)',
  503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
  504: '网关超时(Gateway Timeout)',
};
/**
 * 异常处理程序
 */
const errorHandler = (error: {
  response: Response;
  message: string;
  data: any;
}): Response => {
  const { response } = error;
  if (response && response.status) {
    // 1、确定错误信息
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, url } = response;
    // 2、提示错误信息
    notification.error({
      message: ``,
      description: errorText,
    });

    if (response.status === 401) {
      removeToken();
      history.replace('/user');
    }
    // 3、抛出错误异常
    throw errorText;
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  // return error; // 如果return. 正常返回,走try正常流程.
  throw error; // 如果throw. 错误将继续抛出,走catch流程.
  // return response;
};

const _commonNetRequestConfigs: any = {
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie   same-origin
  timeout: NET_CONNECTION_TIME_OUT, // 请求超时
  charset: 'utf8', //编码
  crossDomain: true,
  getResponse: false,
  /** 'useCache' 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params 组合 **/
  useCache: false, // default
  // prefix: API_HOST,
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  ..._commonNetRequestConfigs,
});

/**
 * 请求拦截 request
 */
request.use(async (ctx, next) => {
  // 请求前
  const { req } = ctx;
  const { options } = req;

  const headers: any = {};
  const headerToken = await getToken();
  if (headerToken) {
    headers[settings.siteTokenKey] = 'Bearer ' + headerToken;
  }

  ctx.req.options = {
    ...options,
    headers,
  };

  await next();

  // // 请求后
  const { res } = ctx;

  // const { code, token } = res;

  // /**
  //  * 统一 ajax 验证
  //  * 如果自定义代码不是 0，则判断为错误。
  //  */
  // if (code !== 0) {
  //   return Promise.reject({
  //     data: ctx,
  //     message: 'CustomError',
  //   });
  // }

  // // 重置刷新token
  // if (token) {
  //   await setToken(token);
  // }
});

//普通 get 请求
export const GETRequest = (url: string, params?: object) => {
  return request.get(url, { params });
};

/**
 * 普通 post 请求
 */
export const POSTRequest = (url: string, data?: object) => {
  return request.post(url, { data });
};
/**
 * 普通 del 请求
 */
export const DELETERequest = (url: string, params?: object) => {
  return request.delete(url, { params });
  // request.delete(url[, options])
};
/**
 * 普通 put 请求
 */
export const PUTRequest = (url: string, data?: object) => {
  return request.put(url, { data });
};
/**
 * 普通 put 请求
 */
export const POSTFormRequest = (url: string, data?: object) => {
  return request.post(url, { data });
};
