import {
  SET_XD_FORM_STATE,
  RESET_XD_FORM_STATE
} from '../constants/xdForm';

// 设置表单状态
export const setXdFormState = (formData) => {
  return {
    type: SET_XD_FORM_STATE,
    payload: formData,
  };
};

// 重置表单状态
export const resetXdFormState  = () => {
  return {
    type: RESET_XD_FORM_STATE,
  };
};

