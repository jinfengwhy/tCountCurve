import { connect } from 'react-redux'

import { compareDate } from '@/utils/time'
import useShare from '@/hooks/useShare'

import { View, Text } from '@tarojs/components'
import HistoryEmpty from '@/components/HistoryEmpty'

import './index.less'

type PageStateProps = {
  pbCache: {
    cache: Map<string, any>,
  }
}

type PageDispatchProps = {
}

type IProps = PageStateProps & PageDispatchProps

function Index (props: IProps) {
  // 页面分享
  useShare();

  const { cache } = props.pbCache;

  return (
    <View className='pages-pb-record'>
      {
        cache.size === 0 && <HistoryEmpty />
      }
      {
        Array.from(cache.entries())
          .sort((a, b) => compareDate(a[0], b[0], false))
          .map(([key, value]) => (
            <>
              <View className='record-item' key={key}>
                <View className='record-summary'>
                  <Text className='record-summary__date'>{key}</Text>
                  <View className='record-summary__info-container'>
                    <Text className='record-summary__info-left'>{value.stockName}</Text>
                    <Text className='record-summary__info-right'>{value.type}</Text>
                  </View>
                  <View className='record-summary__values-container'>
                    <Text className='record-summary__value'>{value.average}</Text>
                    <Text className='record-summary__value'>{value.saftyMargin}</Text>
                  </View>
                </View>
              </View>
              <View className='record-separator'></View>
            </>
        ))
      }
    </View>
  )
}

const mapStateToProps = (state: PageStateProps) => ({
  pbCache: state.pbCache,
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
