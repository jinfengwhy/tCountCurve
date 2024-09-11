import { connect } from 'react-redux'

import { View, Text } from '@tarojs/components'

import './index.less'

type MKey = { date: string, sum: number }
type MValue = { time: string, count: number, remark: string }
type MValueArr = MValue[]

type PageStateProps = {
  remark: {
    cache: Map<MKey, MValueArr>,
  }
}

type IProps = PageStateProps

function Index (props: IProps) {
  const { cache } = props.remark;

  return (
    <View className='pages-curve'>
      <Text>Curve Page</Text>
      我是可视化曲线
    </View>
  )
}

const mapStateToProps = (state: PageStateProps) => ({
  remark: state.remark,
})

export default connect(mapStateToProps, null)(Index);
