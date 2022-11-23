import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { ConnectProps, Loading, history } from 'umi';
import { UserModelState, CurrentUser } from '@/models/user';
import { getToken } from '@/utils/localToken';
export interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}
/**
 * 全局布局 此页 登录检验
 */
const SecurityLayout: React.FC<SecurityLayoutProps> = (props) => {
  const { loading, currentUser, dispatch, location, children } = props;
  const { pathname, search } = location;
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    fetchToken();
  });

  const fetchToken = async () => {
    const headerToken = await getToken();
    if (headerToken) {
      // history.replace('/');
    } else {
      history.replace('/user');
    }
    console.warn = function () {};
  };

  return <>{children}</>;
};

// user models 命名
export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    // currentUser: user.currentUser,
    loading: loading.effects['user/fetchCurrent'],
  }),
)(SecurityLayout);
