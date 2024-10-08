import { connect } from 'react-redux'
import Taro from '@tarojs/taro'

import { reset } from '@/actions/counter'

import { View, Button } from '@tarojs/components'

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

  function handleReset () {
    Taro.showToast({
      title: '清零成功',
      icon: 'none',
      duration: 2000,
      success: () => {
        reset()
      }
    })
  }

  return (
    <View className='operations-reset'>
      <Button className='reset_btn' onClick={handleReset}>清零</Button>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch(reset()),
})

export default connect(null, mapDispatchToProps)(Index);
