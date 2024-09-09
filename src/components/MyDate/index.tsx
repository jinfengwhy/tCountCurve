import { memo, useEffect, useState } from "react";

import { View, Text } from "@tarojs/components";

import { formatHMS, formatYMD, getDayName } from "@/utils/time";

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
      <Text className="date">{ formatYMD(date) }</Text>
      <Text className="separator">|</Text>
      <Text className="weekday">{ getDayName(date) }</Text>
      <Text className="separator">|</Text>
      <Text className="time">{ formatHMS(date) }</Text>
    </View>
  );
});

export default Index;
