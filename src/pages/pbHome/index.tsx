import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import PbForm from '@/components/PbForm'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/pbRecord/index'
    })
  }

  return (
    <View className='pages-pb-home'>

      <PbForm />

      <View className='bottom-fixed-panel'>
        <View className='valuation-formula'>估值原理：市净率 * 净资产 = 市值 = 股本 * 股价</View>
        <View className='valuation-history-link' onClick={handleClick}>查看估值记录</View>
      </View>
    </View>
  )
}

export default Index;
