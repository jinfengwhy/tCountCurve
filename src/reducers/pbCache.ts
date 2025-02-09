import Taro from '@tarojs/taro'

import { PB_CACHE_KEY, PUT_PB_CACHE } from '../constants/pbCache'

const loadCacheFromStorage = () => {
  try {
    const value = Taro.getStorageSync(PB_CACHE_KEY);
    return value ? new Map(JSON.parse(value)) : new Map();
  } catch (e) {
    console.error('---why loadCacheFromStorage: ', e);
    return new Map();
  }
}

const saveCacheToStorage = (cache) => {
  try {
    Taro.removeStorageSync(PB_CACHE_KEY);
    Taro.setStorageSync(PB_CACHE_KEY, JSON.stringify([...cache]));
  } catch (e) {
    console.error('---why saveCacheToStorage: ', e);
  }
}

const INITIAL_STATE = {
  cache: loadCacheFromStorage()
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PUT_PB_CACHE:
      const cache = new Map(state.cache);
      const { key, value } = action;
      cache.set(key, value);
      saveCacheToStorage(cache);
      return { cache };
    default:
       return state
  }
}
