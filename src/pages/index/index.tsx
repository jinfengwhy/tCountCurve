import { View } from '@tarojs/components'
import MyDate from '../../components/MyDate/index';
import MyCounter from '../../components/MyCounter/index'

import './index.less'

function Index () {
  return (
    <View className='pages-index'>
      {/* 日期 */}
      <MyDate />

      {/* 计数器 */}
      <MyCounter />
    </View>
  )
}

export default Index;
