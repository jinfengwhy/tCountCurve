import { memo } from "react";
import Taro from "@tarojs/taro";

import { Text } from "@tarojs/components";

import './index.less';

const Index = memo(() => {

  function toHistory () {
    Taro.navigateTo({
      url: '/pages/history/index'
    })
  }

  return (
    <Text className='components-history-txt' onClick={toHistory}>历史</Text>
  );
});

export default Index;
