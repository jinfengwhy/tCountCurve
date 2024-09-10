import { connect } from 'react-redux'

import { View, Button, Text } from '@tarojs/components'

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
  // add: () => void
}

type IProps = PageStateProps & PageDispatchProps

function Index (props: IProps) {
  const { cache } = props.remark;

  return (
    <View className='pages-history'>
      {
        Array.from(cache.entries()).map(([key, valueArr]) => (
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
  // add: () => dispatch(add()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
