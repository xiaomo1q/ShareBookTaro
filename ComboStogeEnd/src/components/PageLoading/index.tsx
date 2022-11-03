import React from 'react';
import { Result, Spin } from 'antd';
/**
 * loading
 */
export default () => {
  return <Result icon={<Spin size="large" />} />;
};
