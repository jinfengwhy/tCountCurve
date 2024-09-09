import { connect } from 'react-redux'

import { View, Button, Text } from '@tarojs/components'
import MyDate from '../../components/MyDate/index';

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type IProps = PageStateProps & PageDispatchProps

interface Index {
  props: IProps;
}

function Index (props: IProps) {
  const { counter, add, dec, asyncAdd } = props;

  return (
    <View className='pages-index'>
      <MyDate />
      <Button className='add_btn' onClick={add}>+</Button>
      <Button className='dec_btn' onClick={dec}>-</Button>
      <Button className='dec_btn' onClick={asyncAdd}>async</Button>
      <View><Text>{counter.num}</Text></View>
      <View><Text>Hello, World</Text></View>
    </View>
  )
}

const mapStateToProps = (state: PageStateProps) => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch: any) => ({
  add: () => dispatch(add()),
  dec: () => dispatch(minus()),
  asyncAdd: () => dispatch(asyncAdd()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
