import Taro from "@tarojs/taro";
import useUpdate from '@/hooks/useUpdate';
import useShare from '@/hooks/useShare';
import { View, Button } from '@tarojs/components'

import './index.less'

function Index () {
  // 检查更新
  useUpdate();

  // 页面分享
  useShare();

  function handleClick(key) {
    const map = {
      counter: '/pages/counter/index',
      photo: '/pages/photo/index',
      peHome: '/pages/peHome/index',
      pbHome: '/pages/pbHome/index',
    }
    Taro.navigateTo({
      url: map[key]
    });
  }

  return (
    <View className='pages-index'>

      <Button className='item item-1' onClick={() => handleClick('counter')}>记忆计数器</Button>
      <Button className='item item-2' onClick={() => handleClick('photo')}>拍照识车王</Button>
      <Button className='item item-3' onClick={() => handleClick('peHome')}>盈利端 - 市盈率法估值</Button>
      <Button className='item item-4' onClick={() => handleClick('pbHome')}>资产端 - 市净率法估值</Button>
    </View>
  )
}

export default Index;
