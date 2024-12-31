import request from '../request'

// 获取token
export const getTokenData = async () => {
  const url = 'https://aip.baidubce.com/oauth/2.0/token';
  const params = {
    client_id: 'k6Pyx0Bnclssfdtzcis6klNB',
    client_secret: '',
    grant_type: 'client_credentials',
  };
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${url}?${queryString}`;
  const res = await request.post(fullUrl, params, {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  return res;
}
