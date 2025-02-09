import React from 'react';
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { setXdFormState, resetXdFormState } from '@/actions/xdForm';
import { View, Button, Form } from '@tarojs/components';
import InputField from '@/components/InputField/index';
import './index.less';

interface FormState {
  stockName: string;
  dividendPerShareT: string;
  minDividendYield: string;
  maxDividendYield: string;
  safetyMargin: string;
  dividendPerShareT1: string;
  dividendPerShareT2: string;
  dividendPerShareT3: string;
}

interface InputFieldConfig {
  label: string;
  name: keyof FormState;
  placeholder: string;
  type: 'text' | 'number';
  unit?: string;
  isPositive?: boolean;  // 更改为 isPositive，表示只要求为正数
  isSafetyMargin?: boolean;
}

const inputFieldsConfig: InputFieldConfig[] = [
  { label: '股票名称', name: 'stockName', placeholder: '请输入', type: 'text' },
  { label: 'T年每股分红', name: 'dividendPerShareT', placeholder: '请输入', type: 'number', unit: '元', isPositive: true },
  { label: '最低股息率', name: 'minDividendYield', placeholder: '请输入', type: 'number', unit: '%', isPositive: true },
  { label: '最高股息率', name: 'maxDividendYield', placeholder: '请输入', type: 'number', unit: '%', isPositive: true },
  { label: '安全边际(范围0~1之间)', name: 'safetyMargin', placeholder: '请输入', type: 'number', isSafetyMargin: true },
  { label: 'T+1年每股分红', name: 'dividendPerShareT1', placeholder: '请输入', type: 'number', unit: '元', isPositive: true },
  { label: 'T+2年每股分红', name: 'dividendPerShareT2', placeholder: '请输入', type: 'number', unit: '元', isPositive: true },
  { label: 'T+3年每股分红', name: 'dividendPerShareT3', placeholder: '请输入', type: 'number', unit: '元', isPositive: true },
];

function Index({ form, setFormState, resetFormState }) {
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
      if (fieldConfig.isPositive && (parseFloat(value) <= 0)) {  // 更改为检查是否为正数
        Taro.showToast({ title: `${fieldConfig.label}必须是正数`, icon: 'none' });
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
      // Taro.showToast({ title: '表单校验通过，生成表格', icon: 'success' });
      Taro.navigateTo({ url: '/pages/xdResult/index' });
    }
  };

  return (
    <View className="components-xd-form">
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
}

const mapStateToProps = (state: { xdForm: FormState }) => ({
  form: state.xdForm,
});

const mapDispatchToProps = {
  setFormState: setXdFormState,
  resetFormState: resetXdFormState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
