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

      <View className='tips'>
        tips: 可参考净资产收益率以6%为基准，即6%的roe，市净率可给1倍，12%的roe，市净率可给2倍，以此类推;
      </View>

      <View className='bottom-fixed-panel'>
        <View className='valuation-formula'>估值原理：市净率 * 净资产 = 市值 = 股本 * 股价</View>
        <View className='valuation-history-link' onClick={handleClick}>查看估值记录</View>
      </View>
    </View>
  )
}

export default Index;
