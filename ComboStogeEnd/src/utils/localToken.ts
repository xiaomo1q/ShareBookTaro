/**
 * 类似于localStorage
 * 优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage。
 * 存储时间快, 容量大,可以存储非字符串类型
 */

import localforage from 'localforage';

import settings from '../config/settings';

/**
 * 获取本地Token
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await localforage.getItem(settings.siteTokenKey);
  } catch (error) {
    return error;
  }
};

/**
 * 设置存储本地Token
 */
export const setToken = async (token: string): Promise<boolean> => {
  try {
    await localforage.setItem(settings.siteTokenKey, token);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 移除本地Token
 */
export const removeToken = async (): Promise<boolean> => {
  try {
    await localforage.removeItem(settings.siteTokenKey);
    return true;
  } catch (error) {
    return false;
  }
};
