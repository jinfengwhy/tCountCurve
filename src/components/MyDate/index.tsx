import { memo, useEffect, useState } from "react";

import { View, Text } from "@tarojs/components";

import './index.less';

const Index = memo(() => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // 添加空依赖数组以确保 useEffect 只在组件挂载和卸载时运行

  return (
    <View className="components-my-date">
      <Text className="date">{ date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
      <Text>{ date.toLocaleTimeString() }</Text>
    </View>
  );
});

export default Index;
