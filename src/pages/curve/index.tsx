import { connect } from 'react-redux'

import { formatNumber } from '@/utils/format'

import { Text, View } from '@tarojs/components'
import LineChart from '@/components/LineChart/index'

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
  const values: number[] = [];
  const categories: string[] = [];
  const series = [{ name: '计数曲线', data: values }];
  let total = 0;

  Array.from(cache.keys()).forEach(item => {
    categories.push(item.date.slice(5));
    values.push(item.sum);
    total += item.sum;
  });
  const data = { categories, series };
  // const data = {
  //   categories: ["09-01", "09-02", "09-03", "09-04", "09-05", "09-06", "09-07", "09-08", "09-09"],
  //   series: [
  //     {
  //       name: "计数曲线",
  //       data: [70, 40, 65, 100, 44, 68, 100, 200, 300]
  //     },
  //   ]
  // }
  return (
    <View className='pages-curve'>
      <View className='title'>
        <Text className='title-text'>
          全部累计：{ formatNumber(total) }（{ total }）
        </Text>
      </View>
      <LineChart data={data} />
    </View>
  )
}

const mapStateToProps = (state: PageStateProps) => ({
  remark: state.remark,
})

export default connect(mapStateToProps, null)(Index);
