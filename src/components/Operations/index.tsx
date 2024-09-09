import { memo } from "react";

import { View } from "@tarojs/components";
import Reset from './components/Reset/index';

import './index.less';

const Index = memo(() => {
  return (
    <View className="components-operations">
      <Reset />

      测试
    </View>
  );
});

export default Index;
