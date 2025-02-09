import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import PbTable from '@/components/PbTable'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  return (
    <View className='pages-pb-result'>

      <PbTable />

    </View>
  )
}

export default Index;
