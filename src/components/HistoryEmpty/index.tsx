import { memo } from "react";

import { View, Text } from "@tarojs/components";

import './index.less';

const Index = memo(() => {

  return (
    <View className='history-empty'>
      <Text className='history-empty__txt'>暂无历史记录</Text>
    </View>
  );
});

export default Index;
