/* eslint-disable */
import Emitter from './emitter';
import 'trtc-sdk';

export default class {
  constructor(opts = {}, store) {
    this.RTC = new window.WebRTCAPI({
      sdkAppId: opts.sdkAppId,
      userId: opts.userId,
      userSig: opts.userSig,
      accountType: window.parseInt(opts.accountType),
      debug: {
        log: true,
        vconsole: false,
        uploadLog: true,
      }
    }, () => {

    }, (err) => {

    });
    if (store) this.store = opts.store;
    // this.onEvent();
  }

  onEvent() {
    const super_onevent = this.Socket.onevent;
    this.Socket.onevent = (packet) => {
      super_onevent.call(this.Socket, packet);
      Emitter.emit.apply(Emitter, packet.data);
      if (this.store) this.passToStore('SOCKET_' + packet.data[0], [...packet.data.slice(1)])
    };
    let _this = this;
    [
      'connect',
      'error',
      'disconnect',
      'reconnect',
      'reconnect_attempt',
      'reconnecting',
      'reconnect_error',
      'reconnect_failed',
      'connect_error',
      'connect_timeout',
      'connecting',
      'ping',
      'pong'
    ].forEach((value) => {
      _this.Socket.on(value, (data) => {
        Emitter.emit(value, data);
        if (_this.store) _this.passToStore('SOCKET_' + value, data);
      });
    });
  }

  passToStore(event, payload) {
    if (!event.startsWith('SOKECT_')) return;
    for (let namespaced in this.store_muations) {
      let mutation = namespaced.split('/').pop();
      if (mutation === event.toUpperCase()) this.store.commit(namespaced, payload);
    }

    for (let namespaced in this.store_actions) {
      let action = namespaced.split('/').pop();
      if (!action.startsWith('socket_')) continue;
      let camelcased = 'socket_' + event
        .replace('SOCKET_', '')
        .toLowerCase()
        .replace(/[\W\s_] + (\w)/g, (match, p1) => p1.toUpperCase());
      if (action === camelcased) this.store.dispatch(namespaced, payload);
    }
  }
}
/* eslint-enable */
