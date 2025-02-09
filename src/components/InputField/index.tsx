import React, { memo } from "react";
import { Input, Text, View } from "@tarojs/components";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  unit?: string;
  type: 'text' | 'digit';
  onChange: (event) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, placeholder, unit, type, onChange }) => {
  return (
    <View className="input-group">
      <Text className="input-label">{label}:</Text>
      <Input
        className="custom-input"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onInput={onChange}
      />
      {unit && <Text className="input-unit">{unit}</Text>}
    </View>
  );
};

export default memo(InputField);
