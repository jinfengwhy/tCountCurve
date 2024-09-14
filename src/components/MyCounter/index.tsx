import { connect } from 'react-redux'

import { add } from '@/actions/counter'
import useAudioPlayer from '@/hooks/useAudioPlayer';

import dingAudio from '@/assets/audio/wooden-fish.mp3';

import { View, Button, Text } from '@tarojs/components'

import './index.less'

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
}

type IProps = PageStateProps & PageDispatchProps & {
  children?: any
}

interface Index {
  props: IProps;
}

function Index (props: IProps) {
  const { counter, add } = props;
  const { playAudio } = useAudioPlayer(dingAudio);

  function handleClick() {
    add()
    playAudio();
  }

  return (
    <View className='components-my-counter'>
      <View className="counter">
        <Text className="num">计数：{counter.num}</Text>
        { props.children }
      </View>
      <Button className='add_btn' onClick={handleClick}>+1</Button>
    </View>
  )
}

const mapStateToProps = (state: PageStateProps) => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch: any) => ({
  add: () => dispatch(add()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);
