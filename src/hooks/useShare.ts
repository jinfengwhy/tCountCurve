import { useShareAppMessage, useShareTimeline } from "@tarojs/taro";

// 定义一个自定义的分享钩子
const useShare = () => {
  const shareConfig = {
    title: '记忆计数器',
    path: '/pages/index/index',
  };

  useShareAppMessage(() => ({
    title: shareConfig.title,
    path: shareConfig.path,
  }));

  useShareTimeline(() => ({
    title: shareConfig.title,
  }));
};

export default useShare;
