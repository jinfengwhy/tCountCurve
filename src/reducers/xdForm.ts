import { SET_XD_FORM_STATE, RESET_XD_FORM_STATE } from '../constants/xdForm';

const INITIAL_STATE = {
  stockName: '',
  dividendPerShareT: '',
  minDividendYield: '',
  maxDividendYield: '',
  safetyMargin: 0.8,
  dividendPerShareT1: '',
  dividendPerShareT2: '',
  dividendPerShareT3: '',
};

export default function xdForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_XD_FORM_STATE:
      return {
        ...state,
        ...action.payload,
      }
    case RESET_XD_FORM_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
