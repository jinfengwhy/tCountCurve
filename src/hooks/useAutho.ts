import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Taro from '@tarojs/taro';

import { isExpired } from '@/utils/date';
import { getTokenAction, syncTokenAction } from '@/actions/autho';
import { STORAGE_TOKEN_EXPIRES, STORAGE_TOKEN_KEY } from '@/constants/autho';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      try {
        const token = Taro.getStorageSync(STORAGE_TOKEN_KEY);
        const expiresDate = Taro.getStorageSync(STORAGE_TOKEN_EXPIRES);
        if (expiresDate && !isExpired(expiresDate)) {
          dispatch(syncTokenAction({
            token,
            expiresDate,
          }));
        } else {
          dispatch(getTokenAction());
        }
      } catch (error) {
        dispatch(getTokenAction());
      }
    };

    checkToken();
  }, [dispatch]);

};

export default useAuth;
