import Taro from "@tarojs/taro";

class Request {
  static request(method, url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        Taro.request({
            url,
            data,
            header: headers,
            method: method.toUpperCase(), // 将请求方法转换为大写
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
  }

  static get(url, data = {}, headers = {}) {
    return this.request("GET", url, data, headers);
  }

  static post(url, data = {}, headers = {}) {
    return this.request("POST", url, data, headers);
  }
}

export default Request;
