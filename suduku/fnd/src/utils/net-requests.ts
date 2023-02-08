import Taro from "@tarojs/taro";

declare type Methods =
  | "GET"
  | "OPTIONS"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";
declare type Headers = { [key: string]: string };
declare type Datas = { method: Methods; [key: string]: any };

interface Options {
  url: string;
  host?: string;
  method?: Methods;
  data?: Datas;
  header?: Headers;
  isShowLoading?: boolean;
  success(res: { statusCode: any }): void;
  error(e: any): void;
}

const codeMessage: any = {
  "400": "请求的地址不存在或者包含不支持的参数",
  "401": "未授权",
  "403": "被禁止访问",
  "404": "您访问的资源不存在",
  "500": "服务器发生错误，请检查服务器",
  "502": "网络拥堵",
};
/**
 * 页面提示及操作防抖节流
 * str为提示语
 */
let timer: any;
const throttle = (str, opeFun) => {
  if (!timer) {
    timer = setTimeout(() => {
      if (opeFun) opeFun();
      else {
        Taro.showToast({ title: str, icon: "none" });
      }
      timer = null;
    }, 1000);
  }
};

//网络请求拦截器
const interceptor = (chain: {
  requestParams: any;
  proceed: (arg0: any) => Promise<any>;
}) => {
  //获取环境
  const ENV = process.env.TARO_ENV;
  let token;
  const requestParams = chain.requestParams;
  // const { method, data, url } = requestParams
  if (ENV === "h5") {
    token = localStorage.getItem("TOKEN"); //拿到本地缓存中存的token
  } else {
    token = Taro.getStorageSync("TOKEN"); //拿到本地缓存中存的token
  }

  requestParams.header = {
    ...requestParams.header,
    Authorization: token, //将token添加到头部
  };

  return chain
    .proceed(requestParams)
    .then((res: any) => {
      if (res.statusCode === 200) {
        return res.data ? res.data : res;
      }
    })
    .catch((res) => {
      // 根据不同返回状态值3进行操作
      switch (res?.status) {
        case 401:
          throttle("", () => {
            // 跳转登录页
            Taro.redirectTo({ url: "/pages/userinfo/login" }).then(() => {
              setTimeout(() => {
                Taro.showToast({
                  title: "认证失效，请重新登录",
                  icon: "error",
                });
              }, 200);
            });
          });

          break;
        case 404:
          throttle("网页走丢了，请稍后重试！", () => {});
          break;
        default:
          Promise.reject(codeMessage[res.statusCode]);
          break;
      }
    });
};

Taro.addInterceptor(interceptor);

const request = async (
  method: any,
  url: string,
  params?: { data: any; headers: { contentType: string }; params: any }
): Promise<any> => {
  //taro只有data参数，
  // let contentType = params?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  let contentType = "application/json";
  if (params) contentType = params?.headers?.contentType || contentType;
  const option: Options = {
    method,
    isShowLoading: false,
    url: process.env.TARO_ENV === "h5" ? url : process.env.baseUrl + url,
    data: params && (params?.data || params?.params),
    header: {
      "content-type": contentType,
    },
    success(res: { statusCode: any }) {},
    error(e: any) {
      console.log("api", "请求接口出现问题", e);
    },
  };
  const resp = await Taro.request(option);
  return resp; //根据个人需要返回
};

//普通 get 请求
export const GETRequest = (url: string, config?: any) => {
  return request("GET", url, config);
};

/**
 * 普通 post 请求
 */
export const POSTRequest = (url: string, config?: any) => {
  return request("POST", url, config);
};
/**
 * 普通 PUT 请求
 */
export const PUTRequest = (url: string, config: any) => { 
  return request("PUT", url, config);
};
/**
 * 普通 DELETE 请求
 */
export const DELETERequest = (url: string, config: any) => {
  return request("DELETE", url, config);
};
/**
 * 普通 PATCH 请求
 */
export const PATCHRequest = (url: string, config: any) => {
  return request('PATCH', url, config);
}

/**
 * 普通的post请求
 */

// 通用post请求
export const POSTFromRequest = (url: string, config: any) => {
  return request('POST', url, config);
}
