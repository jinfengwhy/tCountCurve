import React from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { setPeFormState, resetPeFormState } from '@/actions/peForm';
import { View, Button, Form } from '@tarojs/components';
import InputField from '@/components/InputField/index';
import './index.less';

interface FormState {
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

interface InputFieldConfig {
  label: string;
  name: keyof FormState;
  placeholder: string;
  type: 'text' | 'number';
  unit?: string;
  isPositiveInteger?: boolean;
  isSafetyMargin?: boolean;
}

const inputFieldsConfig: InputFieldConfig[] = [
  { label: '股票名称', name: 'stockName', placeholder: '请输入', type: 'text' },
  { label: '总股本数', name: 'totalShares', placeholder: '请输入', type: 'number', unit: '亿', isPositiveInteger: true },
  { label: 'T年净利润', name: 'netProfitForT', placeholder: '请输入', type: 'number', unit: '亿', isPositiveInteger: true },
  { label: '最低市盈率', name: 'minEarningsRate', placeholder: '请输入', type: 'number', unit: '倍', isPositiveInteger: true },
  { label: '最高市盈率', name: 'maxEarningsRate', placeholder: '请输入', type: 'number', unit: '倍', isPositiveInteger: true },
  { label: '安全边际(范围0~1之间)', name: 'safetyMargin', placeholder: '请输入', type: 'number', isSafetyMargin: true },
  { label: 'T+1年净利润增长率', name: 'growthRateT1', placeholder: '请输入', type: 'number', unit: '%' },
  { label: 'T+2年净利润增长率', name: 'growthRateT2', placeholder: '请输入', type: 'number', unit: '%' },
  { label: 'T+3年净利润增长率', name: 'growthRateT3', placeholder: '请输入', type: 'number', unit: '%' },
];

function Index ({ form, setFormState, resetFormState }) {

  const handleInputChange = (name: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ [name]: event.target.value });
  };

  const validateForm = () => {
    for (const fieldConfig of inputFieldsConfig) {
      const value = form[fieldConfig.name];
      if (!value) {
        Taro.showToast({ title: `${fieldConfig.label}不能为空`, icon: 'none' });
        return false;
      }
      if (fieldConfig.isPositiveInteger && (!/^\d+$/.test(value) || parseInt(value) <= 0)) {
        Taro.showToast({ title: `${fieldConfig.label}必须是正整数`, icon: 'none' });
        return false;
      }
      if (fieldConfig.isSafetyMargin) {
        const parsedValue = parseFloat(value);
        if (parsedValue <= 0 || parsedValue >= 1) {
          Taro.showToast({ title: `${fieldConfig.label}必须是0到1之间的小数（不包括0和1）`, icon: 'none' });
          return false;
        }
      }
    }
    return true;
  };

  const handleGenerateTable = () => {
    if (validateForm()) {
      // 这里可以添加生成表格的逻辑
      Taro.showToast({ title: '表单校验通过，生成表格', icon: 'success' });
    }
  };

  return (
    <View className="components-pe-form">
      <Form>
        {inputFieldsConfig.map((fieldConfig, index) => (
          <React.Fragment key={index}>
            <InputField
              label={fieldConfig.label}
              name={fieldConfig.name}
              value={form[fieldConfig.name]}
              placeholder={fieldConfig.placeholder}
              type={fieldConfig.type}
              unit={fieldConfig.unit}
              onChange={handleInputChange(fieldConfig.name)}
            />
            <View className="divider" />
          </React.Fragment>
        ))}
        <View className="button-group">
          <Button className='btn' type='warn' onClick={handleGenerateTable}>生成估值表格</Button>
          <Button className='btn' type='default' onClick={resetFormState}>重置</Button>
        </View>
      </Form>
    </View>
  );
};

const mapStateToProps = (state: { peForm: FormState }) => ({
  form: state.peForm,
});

const mapDispatchToProps = {
  setFormState: setPeFormState,
  resetFormState: resetPeFormState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
