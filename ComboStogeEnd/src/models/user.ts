import { Effect, Reducer } from 'umi';
import { setToken } from '@/utils/localToken';
import { ResponseData } from '@/pages/data';
import { accountLogin, accountRegistered } from '@/services/user';

/**
 * 用户state状态
 */
export interface CurrentUser {
  _id: number;
  username: string;
  roles: string[];
}

export interface UserModelState {
  currentUser: CurrentUser;
  message: number;
  loginStatus: string;
}

export interface ModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    login: Effect;
    register: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<string>;
  };
}

const initState: UserModelState = {
  currentUser: {
    _id: 0,
    username: '',
    roles: [],
  },
  message: 0,
  loginStatus: 'ok',
};

const Model: ModelType = {
  namespace: 'user',
  state: initState,
  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      let status = undefined;
      try {
        // 获取token
        const response: ResponseData = yield call(accountLogin, payload);
        const { token, role, username } = response;
        // 存储本地Token
        yield call(setToken, token || '');
        localStorage.setItem('role', JSON.stringify(role));
        localStorage.setItem('name', JSON.stringify(username));
        status = 'ok';
      } catch (error) {
        if (error.message && error.message === 'CustomError') {
          status = 'error';
        }
      }
      yield put({ type: 'changeLoginStatus', payload: status });
      if (status === 'ok') {
        return true;
      } else if (status === 'error') {
        return false;
      }
      return undefined;
    },

    // 注册
    *register({ payload }, { call, put }) {
      let status = undefined;
      try {
        const msg = yield call(accountRegistered, payload);
        status = msg;
      } catch (error) {
        status = 'error';
      }
      if (status === 'error') {
        return false;
      }
      return status;
    },
  },
  reducers: {
    changeLoginStatus(state: any, { payload }) {
      return {
        ...initState,
        ...state,
        loginStatus: payload,
      };
    },
  },
};

export default Model;
