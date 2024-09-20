import { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { View } from '@tarojs/components'
import MyDate from '@/components/MyDate/index';
import MyCounter from '@/components/MyCounter/index'
import Operations from '@/components/Operations/index'
import HistoryTxt from '@/components/HistoryTxt/index'

import './index.less'

function Index () {

  useShareAppMessage(() => ({
    title: '记忆计数器',
    path: '/pages/index/index'
  }));

  useShareTimeline(() => ({
    title: '记忆计数器'
  }));

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
