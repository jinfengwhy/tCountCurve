import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import PeForm from '@/components/PeForm'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/peRecord/index'
    })
  }

  return (
    <View className='pages-pe-home'>

      <PeForm />

      <View className='bottom-fixed-panel'>
        <View className='valuation-formula'>估值原理：市盈率 * 净利润 = 市值 = 股本 * 股价</View>
        <View className='valuation-history-link' onClick={handleClick}>查看估值记录</View>
      </View>
    </View>
  )
}

export default Index;
