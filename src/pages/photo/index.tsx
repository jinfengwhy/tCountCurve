import useShare from '@/hooks/useShare';
import useAuth from '@/hooks/useAutho';

import { View } from '@tarojs/components'
import UsageIntro from '@/components/usageIntro';
import EntryBtn from '@/components/entryBtn';

import './index.less'

function Index () {
  useShare();

  useAuth();

  return (
    <View className='pages-index'>
      {/* 介绍 */}
      <UsageIntro />

      {/* 入口 */}
      <EntryBtn />
    </View>
  )
}

export default Index;
