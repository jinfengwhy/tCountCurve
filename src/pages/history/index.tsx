import { connect } from 'react-redux'

import { compareDate } from '@/utils/time'
import useShare from '@/hooks/useShare'

import { View, Text } from '@tarojs/components'
import HistoryEmpty from '@/components/HistoryEmpty'
import HistoryFixed from '@/components/HistoryFixed'

import './index.less'

type MKey = { date: string, sum: number }
type MValue = { time: string, count: number, remark: string }
type MValueArr = MValue[]

type PageStateProps = {
  remark: {
    cache: Map<MKey, MValueArr>,
  }
}

type PageDispatchProps = {
}

type IProps = PageStateProps & PageDispatchProps

function Index (props: IProps) {
  // 页面分享
  useShare();

  const { cache } = props.remark;

  return (
    <View className='pages-history'>
      {
        cache.size === 0 && <HistoryEmpty />
      }
      {
        cache.size > 0 && <HistoryFixed />
      }
      {
        Array.from(cache.entries())
          .sort((a, b) => compareDate(a[0].date, b[0].date, false))
          .map(([key, valueArr]) => (
          <View className='history-item' key={key.date}>
            <View className='history-summary'>
              <Text className='history-summary__date'>日期：{key.date}</Text>
              <Text className='history-summary__sum'>当日累计：{key.sum}</Text>
            </View>
            <View className='history-list'>
              {
                valueArr.map(value => (
                  <View className='history-list__item' key={value.time}>
                    <View className='history-list__time-count'>
                      <Text className='history-list__time'>时间：{value.time}</Text>
                      <Text className='history-list__count'>数量：{value.count}</Text>
                    </View>
                    <View className='history-list__remarks'>
                      <Text className='history-list__txt'>备注：</Text>
                      <Text className='history-list__remark'>{value.remark}</Text>
                    </View>
                    <View className='history-list__separator'></View>
                  </View>
                ))
              }
            </View>
            <View className='history-separator'></View>
          </View>
        ))
      }
    </View>
  )
}

const mapStateToProps = (state: PageStateProps) => ({
  remark: state.remark,
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
