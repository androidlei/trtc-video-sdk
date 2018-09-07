/* eslint-disable */
import Observer from './observer';
import Emitter from "./emitter";
export default {
  install(Vue, opts = {}, store) {
    let observer = new Observer(opts, store);
    Vue.prototype.$RTC = observer.RTC;
    Vue.mixin({
      created() {
        let RTC = this.$options['RTC'];
        this.$options.RTC = new Proxy({}, {
          set: (target, key, value) => {
            console.log('trtc: ', target);
            console.log('trtc: ', key);
            console.log('trtc: ', value);
            return true;
          },
          deleteProperty: (target, key) => {
            return true;
          }
        });
      },
    });
  }
}
/* eslint-enable */
