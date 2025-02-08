import Taro from '@tarojs/taro';
import useShare from '@/hooks/useShare';
import { View } from '@tarojs/components'
import PeForm from '@/components/PeForm'

import './index.less'

function Index () {
  // 页面分享
  useShare();

  const handleClick = () => {
    console.log('history')
  }

  return (
    <View className='pages-pe-home'>

      <PeForm />

      <View className='history' onClick={handleClick}>
        查看估值记录
      </View>
    </View>
  )
}

export default Index;
