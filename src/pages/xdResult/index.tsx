import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import XdTable from '@/components/XdTable'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  return (
    <View className='pages-xd-result'>

      <XdTable />

    </View>
  )
}

export default Index;
