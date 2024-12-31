import Taro from "@tarojs/taro";

import { calculateExpirationDate } from "@/utils/date";
import { GET_TOKEN_DATA, SYNC_TOKEN_DATA, STORAGE_TOKEN_KEY, STORAGE_TOKEN_EXPIRES } from "@/constants/autho";

const INITIAL_STATE = {
  token: '',
  expiresDate: 0,
};

export default function index(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TOKEN_DATA:
      const token = action.payload.access_token;
      const expiresDate = calculateExpirationDate(action.payload.expires_in);
      try {
        Taro.setStorageSync(STORAGE_TOKEN_KEY, token);
        Taro.setStorageSync(STORAGE_TOKEN_EXPIRES, expiresDate);
      } catch (error) {
        console.error("--- why: Failed to set token data in storage", error);
      }
      return {
        token,
        expiresDate,
      };
    case SYNC_TOKEN_DATA:
      return {
        token: action.payload.token,
        expiresDate: action.payload.expiresDate,
      };
    default:
      return state;
  }
}
