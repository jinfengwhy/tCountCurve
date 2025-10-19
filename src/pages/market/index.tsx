import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import useUpdate from '@/hooks/useUpdate';
import useShare from '@/hooks/useShare';
import { View, Text } from '@tarojs/components'
import request from "@/services/request";

import './index.less'

function Index () {
  // 检查更新
  useUpdate();

  // 页面分享
  useShare();

  // COS上JSON文件的公开URL
  const cosJsonUrl = '';
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    fetchCosJson();
  }, []);

  async function fetchCosJson() {
    Taro.showLoading({
      title: '数据获取中...',
    })

    try {
      setJsonData(null);

      const jsonData = await request.get(cosJsonUrl)
      setJsonData(jsonData as any);

      Taro.hideLoading();
      Taro.showToast({ title: '数据获取成功', icon: 'success' });
    } catch (err) {
      Taro.hideLoading();
      Taro.showToast({ title: '数据获取失败', icon: 'none' });
    }
  }

  return (
    <View className="pages-market">
      <Text className="tips">市场定位的核心指标</Text>
      <Text className="tips">该数据变动不频繁，为月度更新</Text>
      <Text className="tips">数据来源：理杏仁</Text>

      {!jsonData && (
        <View className="empty-wrapper">
          <Text className="empty-text">数据获取中...或暂无有效数据</Text>
        </View>
      )}

      {jsonData && Object.entries(jsonData).map(([key, value]) => (
        <View className="item-wrapper">
          <Text className="item-key">
            {key}
          </Text>
          <Text>
            {value as any}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default Index;
