import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { Image, View } from "@tarojs/components";

import "./index.less";

const Index = memo(() => {
  // @ts-ignore
  const res = useSelector(({ photo: { imgUrl } }) => ({ imgUrl }), shallowEqual);

  return (
    <View className="components-res-image">
      {/* aspectFit 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。
          也就是说，可以完整地将图片显示出来。 */}
      {/* aspectFill 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。
          也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 */}
      { res.imgUrl && <Image className="img" src={res.imgUrl} mode="aspectFit" /> }
    </View>
  );
});

export default Index;
