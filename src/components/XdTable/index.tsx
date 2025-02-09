import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { putXdCacheAction } from "@/actions/xdCache";
import { formatDateTime } from '@/utils/time';
import { Button, View } from '@tarojs/components';
import './index.less';

interface IReduxFormData {
  stockName: string;
  dividendPerShareT: string;
  minDividendYield: string;
  maxDividendYield: string;
  safetyMargin: string;
  dividendPerShareT1: string;
  dividendPerShareT2: string;
  dividendPerShareT3: string;
}

interface IProps {
  form: IReduxFormData;
  putXdCache: (key: string, value: any) => void;
}

interface IRowData {
  year: string;
  lowStockPrice: string;
  highStockPrice: string;
  dividendPerShare: string;
  lowDividendYield: string;
  highDividendYield: string;
}

const columns = [
  { label: '年限', key: 'year' },
  { label: '股价（低）', key: 'lowStockPrice' },
  { label: '股价（高）', key: 'highStockPrice' },
  { label: '每股分红', key: 'dividendPerShare' },
  { label: '股息率（低）', key: 'lowDividendYield' },
  { label: '股息率（高）', key: 'highDividendYield' },
];


const calculateRows = (form: IReduxFormData): IRowData[] => {
  const results: IRowData[] = [];
  const minDividendYield = parseFloat(form.minDividendYield);
  const maxDividendYield = parseFloat(form.maxDividendYield);

  const calculateRow = (year: string, dividendPerShare: string): IRowData => {
    const dividend = parseFloat(dividendPerShare);
    return {
      year,
      lowStockPrice: (dividend / maxDividendYield * 100).toFixed(3),
      highStockPrice: (dividend / minDividendYield * 100).toFixed(3),
      dividendPerShare,
      lowDividendYield: `${form.minDividendYield}%`,
      highDividendYield: `${form.maxDividendYield}%`,
    };
  };

  results.push(calculateRow('T年', form.dividendPerShareT));
  results.push(calculateRow('T+1年', form.dividendPerShareT1));
  results.push(calculateRow('T+2年', form.dividendPerShareT2));
  results.push(calculateRow('T+3年', form.dividendPerShareT3));

  results.push({
    year: '求平均',
    lowStockPrice: (
      (parseFloat(results[0].lowStockPrice) + parseFloat(results[1].lowStockPrice) + parseFloat(results[2].lowStockPrice) + parseFloat(results[3].lowStockPrice)) / 4
    ).toFixed(3),
    highStockPrice: (
      (parseFloat(results[0].highStockPrice) + parseFloat(results[1].highStockPrice) + parseFloat(results[2].highStockPrice) + parseFloat(results[3].highStockPrice)) / 4
    ).toFixed(3),
    dividendPerShare: '',
    lowDividendYield: '',
    highDividendYield: '',
  });

  results.push({
    year: `安全边际/${form.safetyMargin}`,
    lowStockPrice: (parseFloat(results[4].lowStockPrice) * parseFloat(form.safetyMargin)).toFixed(3),
    highStockPrice: (parseFloat(results[4].highStockPrice) * parseFloat(form.safetyMargin)).toFixed(3),
    dividendPerShare: '',
    lowDividendYield: '',
    highDividendYield: '',
  });

  return results;
};



function FinancialTable({ form, putXdCache }: IProps) {
  const rows = calculateRows(form);

  const handleSave = () => {
    const key = formatDateTime(new Date());
    const value = {
      stockName: form.stockName,
      type: '股息率法估值',
      average: `求平均：${rows[rows.length - 2].lowStockPrice} ~ ${rows[rows.length - 2].highStockPrice}`,
      saftyMargin: `安全边际/${form.safetyMargin}：${rows[rows.length - 1].lowStockPrice} ~ ${rows[rows.length - 1].highStockPrice}`
    };
    putXdCache(key, value);

    Taro.showToast({
      title: '保存成功，可点击估值记录查看',
      icon: 'none',
      duration: 1500,
    });
  };

  return (
    <View className="components-xd-table">
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

const mapStateToProps = (state: { xdForm: IReduxFormData }) => ({
  form: state.xdForm,
});

const mapDispatchToProps = (dispatch: any) => ({
  putXdCache: (key: string, value: any) => dispatch(putXdCacheAction(key, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FinancialTable);
