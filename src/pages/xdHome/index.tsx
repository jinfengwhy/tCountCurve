import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import XdForm from '@/components/XdForm'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/xdRecord/index'
    })
  }

  return (
    <View className='pages-xd-home'>

      <XdForm />

      <View className='bottom-fixed-panel'>
        <View className='valuation-formula'>估值原理：股息率 = 每股分红 / 股价</View>
        <View className='valuation-history-link' onClick={handleClick}>查看估值记录</View>
      </View>
    </View>
  )
}

export default Index;
