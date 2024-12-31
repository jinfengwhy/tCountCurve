import useShare from '@/hooks/useShare';
import useAuth from '@/hooks/useAutho';

import { View } from '@tarojs/components'
import ResImage from '@/components/resImage';
import ResCar from '@/components/resCar';

import './index.less'

function Index () {
  useShare();

  // useAuth();

  return (
    <View className='pages-result'>
      {/* 图片本身 */}
      <ResImage />

      {/* 车辆信息 */}
      <ResCar />
    </View>
  )
}

export default Index;
