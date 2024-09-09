import { memo } from "react";

import { View } from "@tarojs/components";
import Reset from './components/Reset/index';
import Edit from './components/Edit/index'
import Remark from './components/Remark/index';

import './index.less';

const Index = memo(() => {
  return (
    <View className="components-operations">
      {/* 清零 */}
      <Reset />

      {/* 编辑 */}
      <Edit />

       {/* 备注 */}
      <Remark />
    </View>
  );
});

export default Index;
