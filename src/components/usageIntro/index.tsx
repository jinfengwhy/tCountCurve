import { memo } from "react";

import { Text, View } from "@tarojs/components";

import "./index.less";

const Index = memo(() => {
  return (
    <View className="components-usage-intro">
      <Text className="title-b">
        欢迎使用“拍照识车”小程序！只需简单几步，即可轻松识别车辆信息：
      </Text>
      <Text className="step">
        <Text className="num">1.</Text> 打开小程序，点击“拍照识车”按钮。
      </Text>
      <Text className="step">
        <Text className="num">2.</Text>{" "}
        对准车辆，确保车牌和标识清晰可见，拍摄或上传图片（<Text className="bold">拍摄汽车正面/背面识别率更高哟</Text>）。
      </Text>
      <Text className="step">
        <Text className="num">3.</Text>{" "}
        系统将自动分析并显示车辆品牌、型号等信息。
      </Text>
      <Text className="title-t">
        请确保图片质量良好，以便获得准确结果。感谢使用，期待您的反馈！
      </Text>
    </View>
  );
});

export default Index;
