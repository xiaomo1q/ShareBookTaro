import { GETRequest } from "../utils/net-requests";

// const API_PATH = "/api/api";
const API_PATH = process.env.NODE_ENV === 'development' ? "/api" : "/api/api";
/**
 * 获取 token
 */
export const _registered = (data) => GETRequest(API_PATH + '/', { data });

