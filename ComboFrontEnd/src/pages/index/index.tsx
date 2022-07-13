
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components'
import { Rate } from '@antmjs/vantui'
import './index.less'

const Index = () => {
  const [value, setValue] = useState(3)
  return (
    <View className='index'>
      <Rate value={value} onChange={(e) => setValue(e.detail)} />
      <Text>Hello world!</Text>
    </View>
  );
};

export default Index;
