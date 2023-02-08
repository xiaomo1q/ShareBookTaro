import { create } from "dva-core";
import createLoading from "dva-loading";
import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/**
 * redux-persist配置
 */
const reduxPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  whitelist: ['recommend_project'],
};

/**
 * dva：基于 react 和 react-router
 * dva-core：仅封装了 redux 和 redux-saga
 * dva-loading ： 监听异步加载状态
 */
let app: any;
let store: { dispatch: any; };
let dispatch: any;
const createApp = (opt: { models: any[]; }) => {
  // redux 日志
  app = create(opt);
  app.use(createLoading({}));
  // 本地存储
  app.use({
    onReducer(reducer) {
      return persistReducer(reduxPersistConfig, reducer);
    },
  })
  // 注入model
  if (!global.registered) opt.models.forEach((model: any) => app.model(model));
  app.start();

  // 设置 store
  store = app._store;
  app.getStore = () => store;
  app.use({
    onError(err) {
      console.log(err);
    },
  })

  // 设置dispatch
  dispatch = store.dispatch;
  app.getDispatch = () => dispatch;

  return app;
}

export default { createApp };