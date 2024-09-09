import { View } from '@tarojs/components'
import MyDate from '@/components/MyDate/index';
import MyCounter from '@/components/MyCounter/index'
import Operations from '@/components/Operations/index'

import './index.less'

function Index () {
  return (
    <View className='pages-index'>
      {/* 日期 */}
      <MyDate />

      {/* 计数器 */}
      <MyCounter />

      {/* 操作按钮 */}
      <Operations />
    </View>
  )
}

export default Index;
