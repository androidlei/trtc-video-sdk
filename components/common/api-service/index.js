/* eslint-disable */
import Api from './api.base';
export default {
  install(Vue, opts = {}) {
    const api = new Api(opts);
    Vue.prototype.$Api = api;
  }
}
/* eslint-enable */
