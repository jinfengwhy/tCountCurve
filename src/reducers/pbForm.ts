import { SET_PB_FORM_STATE, RESET_PB_FORM_STATE } from '../constants/pbForm';

const INITIAL_STATE = {
  stockName: '',
  totalShares: '',
  netProfitForT: '',
  minEarningsRate: '',
  maxEarningsRate: '',
  safetyMargin: 0.8,
  growthRateT1: '',
  growthRateT2: '',
  growthRateT3: '',
};

export default function pbForm(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PB_FORM_STATE:
      return {
        ...state,
        ...action.payload,
      }
    case RESET_PB_FORM_STATE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
