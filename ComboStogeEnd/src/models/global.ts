import { Reducer /* , Effect */ } from 'umi';
/**
 * 同步 全局布局 状态
 */
export interface GlobalModelState {
  // 左侧展开收起
  collapsed: boolean;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
  };
}

const initState: GlobalModelState = {
  collapsed: false,
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initState,

  effects: {},

  reducers: {
    changeLayoutCollapsed(state, { payload }): GlobalModelState {
      return {
        ...initState,
        ...state,
        collapsed: payload,
      };
    },
  },
};

export default GlobalModel;
