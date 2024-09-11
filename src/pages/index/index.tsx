import { View } from '@tarojs/components'
import MyDate from '@/components/MyDate/index';
import MyCounter from '@/components/MyCounter/index'
import Operations from '@/components/Operations/index'
import HistoryTxt from '@/components/HistoryTxt/index'

import './index.less'

function Index () {
  return (
    <View className='pages-index'>
      {/* 日期 */}
      <MyDate>

        {/* 历史记录 */}
        <HistoryTxt />
      </MyDate>

      {/* 计数器 */}
      <MyCounter>

        {/* 操作按钮 */}
        <Operations />
      </MyCounter>

    </View>
  )
}

export default Index;
