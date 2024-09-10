import Taro from '@tarojs/taro'

import { REMARK_KEY, PUT_REMARK } from '../constants/remark'
import { putRemark } from '@/utils/map';

const loadCacheFromStorage = () => {
  try {
    const value = Taro.getStorageSync(REMARK_KEY);
    return value ? new Map(JSON.parse(value)) : new Map();
  } catch (e) {
    console.error('---why loadCacheFromStorage: ', e);
    return new Map();
  }
}

const saveCacheToStorage = (cache) => {
  try {
    Taro.removeStorageSync(REMARK_KEY);
    Taro.setStorageSync(REMARK_KEY, JSON.stringify([...cache]));
  } catch (e) {
    console.error('---why saveCacheToStorage: ', e);
  }
}

const INITIAL_STATE = {
  cache: loadCacheFromStorage()
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PUT_REMARK:
      const cache = new Map(state.cache);
      const { counter, remark } = action;
      putRemark(counter, remark, cache);
      saveCacheToStorage(cache);
      return { cache };
    default:
       return state
  }
}
