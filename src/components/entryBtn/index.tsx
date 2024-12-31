import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Taro from "@tarojs/taro";

import { chooseImage, imageToBase64 } from "@/utils/img";
import { getScanResultAction } from "@/actions/photo";

import { View, Button } from "@tarojs/components";

import './index.less';

const Index = memo(() => {
  const [imgUrl, setImgUrl] = useState("");
  const [imgBase64, setImgBase64] = useState("")
  const [isIdentifying, setIsIdentifying] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!imgUrl ||!imgBase64) return;
    setIsIdentifying(true);
    // @ts-ignore
    dispatch(getScanResultAction({ imgUrl, imgBase64 })).finally(() => {
      setIsIdentifying(false);
      Taro.navigateTo({
        url: '/pages/result/index'
      });
    });
  }, [dispatch, imgUrl])

  useEffect(() => {
    if (isIdentifying) {
      Taro.showLoading({
        title: '识别中...',
      })
    } else {
      Taro.hideLoading();
    }
  }, [isIdentifying])

  const handleClick = useCallback(async () => {
    try {
      const imgUrl = await chooseImage() as string;
      const imgBase64 = await imageToBase64(imgUrl) as string;
      setImgUrl(imgUrl);
      setImgBase64(imgBase64);
    } catch (err) {
      console.error('---why handleClick error: ', err);
    }
  }, []);

  return (
    <View className="components-entry-btn">
      <Button className="btn" onClick={handleClick}>拍照识车</Button>
    </View>
  );
});

export default Index;
