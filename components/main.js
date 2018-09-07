import Vue from 'vue';
import {
  Icon,
  Switch,
  Button,
  Tooltip,
  Badge,
  notification,
} from 'ant-design-vue';
import 'trtc-sdk';
import 'animate.css';
import socket from './common/socket-service';
import Dialog from './dialog/Dialog';
import DefaultOptions from './common/default-options';
import Api from './common/api-service';
import RTC from './common/rtc-service';

let vm = null;

const initvm = () => {
  /* eslint-disable no-new */
  vm = new Vue({
    el: '#txt-video-dialog',
    components: { Dialog },
    template: '<Dialog v-if="isShow"/>',
    data: {
      isShow: false,
    },
    methods: {
      getToken() {
        this.$Api.getToken()
          .then((result) => {
            window.console.log('getToken: ', result);
            this.isShow = true;
            Vue.use(RTC, {
              sdkAppId: result.info.sdkAppId,
              userId: result.info.userId,
              userSig: result.info.userSign,
              accountType: window.parseInt(result.info.accountType),
            });
          })
          .catch((err) => {
            window.console.error(err);
          });
      },
    },
    created() {
      this.getToken();
    },
    beforeDestroy() {
      this.isShow = false;
      this.$Api.logout();
      this.$socket.disconnect();
      this.$socket.close();
      // Vue.prototype.$trtc.quit();
    },
    destroyed() {
      window.console.log('组件实例销毁');
      const dialog = document.getElementById('txtVideoDialog');
      const minDialog = document.getElementById('txtMinDialog');
      if (dialog) {
        document.body.removeChild(dialog);
      }
      if (minDialog) {
        document.body.removeChild(minDialog);
      }
    },
  });
};

// const checkRTC = (opts = {}) => {
//   Vue.prototype.$trtc.detectRTC({ screenshare: false }, (info) => {
//     if (!info.support) {
//       notification.error({
//         message: '提示',
//         description: '您的设备暂不支持视频功能',
//       });
//     } else {
//       initvm(opts);
//     }
//   });
// };

const init = (opts = {}) => {
  const body = document.body;
  if (!document.getElementById('txt-video-dialog')) {
    const videoDialogRoot = document.createElement('div');
    videoDialogRoot.id = 'txt-video-dialog';
    body.appendChild(videoDialogRoot);
    Vue.config.productionTip = false;
    Vue.component(Icon.name, Icon);
    Vue.component(Switch.name, Switch);
    Vue.component(Button.name, Button);
    Vue.component(Tooltip.name, Tooltip);
    Vue.component(Badge.name, Badge);
    Vue.prototype.$notification = notification;
    const options = Object.assign(DefaultOptions, opts);
    Vue.use(Api, options);
    Vue.use(
      socket,
      `${options.socketUrl}?client=agent&token=${options.token}&id=${options.id}`,
      { format: { reconnectionAttempts: 5, reconnectionDelay: 2000, reconnectionDelayMax: 50000 } },
    );
    initvm(options);
    // api.getToken(opts.serverUrl, { aid: opts.id, token: opts.token })
    //   .then((response) => {
    //     window.console.log('getToken: ', response);
    //     Vue.prototype.$trtc = new window.WebRTCAPI({
    //       sdkAppId: response.info.sdkAppId,
    //       userId: response.info.userId,
    //       userSig: response.info.userSign,
    //       accountType: window.parseInt(response.info.accountType),
    //       debug: {
    //         log: true,
    //         vconsole: false,
    //         uploadLog: true,
    //       },
    //     }, () => {
    //       opts.mRoomId = response.mRoomId; // eslint-disable-line
    //       opts.mUserToken = response.mUserToken; // eslint-disable-line
    //       checkRTC(opts);
    //     }, (error) => {
    //       notification.error({
    //         message: '提示',
    //         description: error,
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     window.console.log('getToken: ', err);
    //     notification.error({
    //       message: '提示',
    //       description: err.errorInfo || '服务器开小差了～～',
    //     });
    //   });
  }
};

const sendImg = (opts = {}) => {
  alert(JSON.stringify(opts));
};

const logout = () => {
  if (vm) {
    vm.$destroy();
    vm = null;
  }
  window.console.log('logout: ', vm);
};

export { init, sendImg, logout };

