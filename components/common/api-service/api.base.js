/* eslint-disable */
import Request from './request';

export default class {
  constructor(opts = {}) {
    this.options = opts;
    this.request = new Request(opts);
  }

  getOptions() {
    return this.options;
  }

  login(data) {
    const url = '/agent/login';
    return this.request.request(url, data);
  }

  getToken(data) {
    const url = '/agent/createMtoken';
    return this.request.request(url, data);
  }

  logout(data) {
    const url = '/agent/logout';
    return this.request.request(url, data);
  }

};

/* eslint-enable */
