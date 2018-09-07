/* eslint-disable */
import axios from 'axios';

export default class {
  constructor(opts = {}) {
    this.options = opts;
    axios.defaults.timeout = 15000;
    axios.defaults.baseURL = opts.serverUrl;

    if (opts.notification) this.notification = opts.notification;

    // 请求拦截器
    axios.interceptors.request.use((config) => {
      // TODO: 在请求之前进行一些操作
      return config;
    }, (error) => {
      // 请求错误拦截
      return Promise.reject(error);
    });

    // 响应拦截器
    axios.interceptors.response.use((res) => {
      // TODO: 在这里对返回数据进行处理
      if (res.data. statusCode === 500) {
        this.notification.error({
          message: '提示',
          description: res.data.error.errorInfo || '服务器开小差了～～',
        });
        return Promise.reject(res.data.error);
      }
      return res.data.response;
    }, (err) => {
      // 响应错误拦截
      let errorInfo = {errorCode: err.response.status, errorInfo: ''};
      switch (err.response.status) {
        case 401:
          errorInfo.errorInfo = '网络防伪未授权，访问被拒绝';
          break;
        case 404:
          console.log(err.response.status);
          errorInfo.errorInfo = '该请求不存在';
          break;
        case 500:
          console.log(err.response.status);
          errorInfo.errorInfo = '服务端发生错误';
          break;
        default:
          console.log(err.response.status);
          errorInfo.errorInfo = '服务器开小差了～～';
          break;
      }
      this.notification.error({
        message: '提示',
        description: errorInfo.errorInfo || '服务器开小差了～～',
      });
      return Promise.reject(errorInfo);
    });
  }

  request(url, data) {
    const params = { aid: this.options.id, token: this.options.token };
    let req;
    if (!data) {
      req = params;
    } else {
      req = Object.assign(params, data);
    }
    return axios.post(url, req, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `TxAuth ${this.options.token}`
      }
    });
  }
}
/* eslint-enable */
