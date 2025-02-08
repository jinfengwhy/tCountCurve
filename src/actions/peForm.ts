import {
  SET_PE_FORM_STATE,
  RESET_PE_FORM_STATE
} from '../constants/peForm';

// 设置表单状态
export const setPeFormState = (formData) => {
  return {
    type: SET_PE_FORM_STATE,
    payload: formData,
  };
};

// 重置表单状态
export const resetPeFormState  = () => {
  return {
    type: RESET_PE_FORM_STATE,
  };
};

