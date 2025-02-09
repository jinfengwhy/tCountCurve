import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import PeTable from '@/components/PeTable'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  return (
    <View className='pages-pe-result'>

      <PeTable />

    </View>
  )
}

export default Index;
