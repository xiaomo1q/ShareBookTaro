
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components'
import { Rate } from '@antmjs/vantui'
import './index.less'

const Index = () => {
  const [value, setValue] = useState(3)
  return (
    <View className='index'>
      <Text>个人中心</Text>
    </View>
  );
};

export default Index;
