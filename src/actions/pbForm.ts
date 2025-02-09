import {
  SET_PB_FORM_STATE,
  RESET_PB_FORM_STATE
} from '../constants/pbForm';

// 设置表单状态
export const setPbFormState = (formData) => {
  return {
    type: SET_PB_FORM_STATE,
    payload: formData,
  };
};

// 重置表单状态
export const resetPbFormState  = () => {
  return {
    type: RESET_PB_FORM_STATE,
  };
};

