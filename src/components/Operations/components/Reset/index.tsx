import { connect } from 'react-redux'

import { View, Button } from '@tarojs/components'

import { reset } from '@/actions/counter'

import './index.less'

type PageDispatchProps = {
  reset: () => void
}

type IProps = PageDispatchProps

interface Index {
  props: IProps;
}

function Index (props: IProps) {
  const { reset } = props;

  return (
    <View className='operations-reset'>
      <Button className='reset_btn' onClick={reset}>清零</Button>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch(reset()),
})

export default connect(null, mapDispatchToProps)(Index);
