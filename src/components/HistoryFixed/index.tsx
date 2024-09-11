import { memo } from "react";
import Taro from "@tarojs/taro";

import { View, Text, Image } from "@tarojs/components";

import lineChart from '@/assets/images/line_chart.png'
import './index.less';

const Index = memo(() => {

  function handleClick() {
    Taro.navigateTo({
      url: '/pages/curve/index'
    });
  }

  return (
    <View className='history-fixed' onClick={handleClick}>
      <Text className='history-fixed__txt'>可视化</Text>
      <Image className='history-fixed__img' src={lineChart} />
    </View>
  );
});

export default Index;
