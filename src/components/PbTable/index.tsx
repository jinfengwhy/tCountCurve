import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { putPbCacheAction } from "@/actions/pbCache";
import { formatDateTime } from '@/utils/time';
import { Button, View } from '@tarojs/components';
import './index.less';

interface IReduxFormData {
  stockName: string;
  totalShares: string;
  netProfitForT: string;
  minEarningsRate: string;
  maxEarningsRate: string;
  safetyMargin: string;
  growthRateT1: string;
  growthRateT2: string;
  growthRateT3: string;
}

interface IProps {
  form: IReduxFormData;
  putPbCache: (key: string, value: any) => void;
}

interface IRowData {
  year: string;
  stockLow: string;
  stockHigh: string;
  stockValue: string;
  netValueLow: string;
  netValueHigh: string;
  pbRatioLow: string;
  pbRatioHigh: string;
  netProfit: string;
  netProfitGrowth: string;
}

const columns = [
  { label: '年限', key: 'year' },
  { label: '股价（低）', key: 'stockLow' },
  { label: '股价（高）', key: 'stockHigh' },
  { label: '股本（亿）', key: 'stockValue' },
  { label: '市值（亿）（低）', key: 'netValueLow' },
  { label: '市值（亿）（高）', key: 'netValueHigh' },
  { label: '市净率（低）', key: 'pbRatioLow' },
  { label: '市净率（高）', key: 'pbRatioHigh' },
  { label: '净资产（亿）', key: 'netProfit' },
  { label: '净资产增长率', key: 'netProfitGrowth' },
];

const calculateFinancialMetrics = (
  minEarningsRate: number,
  maxEarningsRate: number,
  netProfitForT: number,
  totalShares: number,
  netProfitGrowthRate: number
) => {
  const netProfit = (netProfitForT * (1 + netProfitGrowthRate)).toFixed(2);  // 转为字符串
  const stockLow = (minEarningsRate * parseFloat(netProfit) / totalShares).toFixed(2);
  const stockHigh = (maxEarningsRate * parseFloat(netProfit) / totalShares).toFixed(2);
  const netValueLow = (minEarningsRate * parseFloat(netProfit)).toFixed(2);
  const netValueHigh = (maxEarningsRate * parseFloat(netProfit)).toFixed(2);

  return { stockLow, stockHigh, netValueLow, netValueHigh, netProfit };
};


const calculateRows = (form: IReduxFormData): IRowData[] => {
  const totalShares = parseFloat(form.totalShares);
  const minEarningsRate = parseFloat(form.minEarningsRate);
  const maxEarningsRate = parseFloat(form.maxEarningsRate);
  const netProfitForT = parseFloat(form.netProfitForT);

  const calculateT = (growthRate: number, previousNetProfit: number) => {
    return {
      stockValue: form.totalShares,
      pbRatioLow: form.minEarningsRate,
      pbRatioHigh: form.maxEarningsRate,
      netProfitGrowth: `${growthRate * 100}%`, // 转为百分比形式
      ...calculateFinancialMetrics(
        minEarningsRate,
        maxEarningsRate,
        previousNetProfit,
        totalShares,
        growthRate,
      )
    };
  };

  // T年
  const t = {
    year: 'T年',
    stockValue: form.totalShares,
    pbRatioLow: form.minEarningsRate,
    pbRatioHigh: form.maxEarningsRate,
    netProfitGrowth: '',
    ...calculateFinancialMetrics(
      minEarningsRate,
      maxEarningsRate,
      netProfitForT,
      totalShares,
      0,
    ),
  };

  const results = [t];
  const growthRates = [
    parseFloat(form.growthRateT1) / 100,
    parseFloat(form.growthRateT2) / 100,
    parseFloat(form.growthRateT3) / 100
  ];

  let previousNetProfit = parseFloat(t.netProfit);

  // 生成 T+1, T+2, T+3
  for (let i = 0; i < growthRates.length; i++) {
    const yearLabel = `T+${i + 1}年`;
    const newT = calculateT(growthRates[i], previousNetProfit);
    results.push({ year: yearLabel, ...newT });
    previousNetProfit = parseFloat(newT.netProfit);
  }

  // 计算平均值
  const average = {
    year: '求平均',
    stockLow: ((parseFloat(t.stockLow) + parseFloat(results[1].stockLow) + parseFloat(results[2].stockLow) + parseFloat(results[3].stockLow)) / 4).toFixed(2),
    stockHigh: ((parseFloat(t.stockHigh) + parseFloat(results[1].stockHigh) + parseFloat(results[2].stockHigh) + parseFloat(results[3].stockHigh))  / 4).toFixed(2),
    stockValue: '',
    pbRatioLow: '',
    pbRatioHigh: '',
    netProfitGrowth: '',
    netValueLow: '',
    netValueHigh: '',
    netProfit: '',
  };
  results.push(average);

  // 最后行安全边际
  results.push({
    year: `安全边际/${form.safetyMargin}`,
    stockLow: (parseFloat(average.stockLow) * parseFloat(form.safetyMargin)).toFixed(2),
    stockHigh: (parseFloat(average.stockHigh) * parseFloat(form.safetyMargin)).toFixed(2),
    stockValue: '',
    pbRatioLow: '',
    pbRatioHigh: '',
    netProfitGrowth: '',
    netValueLow: '',
    netValueHigh: '',
    netProfit: '',
  });

  return results;
};


function FinancialTable({ form, putPbCache }: IProps) {
  const rows = calculateRows(form);

  const handleSave = () => {
    const key = formatDateTime(new Date());
    const value = {
      stockName: form.stockName,
      type: '市净率法估值',
      average: `求平均：${rows[rows.length - 2].stockLow} ~ ${rows[rows.length - 2].stockHigh}`,
      saftyMargin: `安全边际/${form.safetyMargin}：${rows[rows.length - 1].stockLow} ~ ${rows[rows.length - 1].stockHigh}`
    };
    putPbCache(key, value);

    Taro.showToast({
      title: '保存成功，可点击估值记录查看',
      icon: 'none',
      duration: 1500,
    });
  };

  return (
    <View className="components-pb-table">
      <View className="valuation-table-wrapper">
        <View className="valuation-table">
          <View className="table-header">
            {columns.map((column, index) => (
              <View key={index} className="table-cell bold">
                {index === 0 ? `${form.stockName}` : column.label}
              </View>
            ))}
          </View>
          {rows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              className={`table-row ${rowIndex >= rows.length - 2 ? 'bold green' : ''}`} // 为最后两行添加加粗样式
            >
              {columns.map((column, colIndex) => (
                <View
                  key={colIndex}
                  className={`table-cell ${rowIndex >= rows.length - 2 && colIndex === 0 ? 'red' : ''}`} // 只有第一列加红
                >
                  {row[column.key]}
                </View>
              ))}
            </View>
          ))}
        </View>

      </View>
      <Button className='save-btn' type='primary' onClick={handleSave}>
        保存
      </Button>
    </View>
  );
}

const mapStateToProps = (state: { pbForm: IReduxFormData }) => ({
  form: state.pbForm,
});

const mapDispatchToProps = (dispatch: any) => ({
  putPbCache: (key: string, value: any) => dispatch(putPbCacheAction(key, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialTable);
