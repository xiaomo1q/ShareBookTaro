/**
 * Api接口地址
 */

/**
 * 服务器地址(开发)
 */

const BASE_HOST_URL = "";

/**
 * 服务器路径
 */
const API_PATH = '/api/admin';

/**
 * 登录
 */
export const LOGIN = BASE_HOST_URL + API_PATH + '/login';
export const CAPTCHA = BASE_HOST_URL + API_PATH + '/captcha';
/**
 * 注册 registered
 */
export const REGISTERED = BASE_HOST_URL + API_PATH + '/registered';
/**
 * 登出 logout
 */
export const LOGOUT = BASE_HOST_URL + API_PATH + '/logout';
/**
 * 用户列表
 */
export const USERLIST = BASE_HOST_URL + API_PATH + '/userList';
export const USERROLE = BASE_HOST_URL + API_PATH + '/userRole';
export const USERDEL = BASE_HOST_URL + API_PATH + '/userDel';
/**
 * 班级列表
 */
export const ClassList = BASE_HOST_URL + API_PATH + '/list';
export const EXCELIMPORT = BASE_HOST_URL + API_PATH + '/excel/import';
/** 文件流 */
export const UPLOADIMG = BASE_HOST_URL + API_PATH + '/uploadImg';
/** 导出 */
export const DOWNLOAD = BASE_HOST_URL + API_PATH + '/download';
// export const DOWNLOAD = BASE_HOST_URL + API_PATH + '/downExcel';

/** 路由 */
export const ROUTE = BASE_HOST_URL + API_PATH + '/route';