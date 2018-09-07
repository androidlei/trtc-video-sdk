<template>
  <vue-draggable-resizable
      :key="0"
      v-if="isShowVideoDialog"
      id="txtVideoDialog"
      :w="videoW"
      :h="videoH"
      :x="videoX"
      :y="videoY"
      :parent="true"
      :z="100"
      drag-handle=".txt-drag"
      drag-cancel=".txt-mr"
      class="txt-video-dialog animated"
      :class="isIn ? 'zoomIn' : 'zoomOut'">
      <vue-header class="txt-drag" @openImgDialog="launchImgDialog" @hideDialog="hiddenVideoDialog"/>
      <vue-main></vue-main>
      <vue-footer
        v-show="isCallComing"
        class="animated"
        :class="isCallComingClass ? 'bounceIn' : 'bounceOut'"
        :parent-show="isCallComing"/>
    </vue-draggable-resizable>
  <vue-draggable-resizable
      v-else
      id="txtMinDialog"
      :key="1"
      :w="minW"
      :h="minH"
      :x="minX"
      :y="minY"
      :parent="true"
      :z="100"
      :resizable="false"
      drag-handle=".txt-min-dialog"
      drag-cancel=".txt-min-dialog-img"
      class="txt-min-dialog animated"
      :class="!isIn ? 'zoomIn' : 'zoomOut'">
      <img
        @click="hiddenMinDialog"
        class="txt-min-dialog-img"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5MTYxQkFBN0I4MDExRTg5RDY4OTg3QjU1MUVBN0Q2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5MTYxQkFCN0I4MDExRTg5RDY4OTg3QjU1MUVBN0Q2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzkxNjFCQTg3QjgwMTFFODlENjg5ODdCNTUxRUE3RDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzkxNjFCQTk3QjgwMTFFODlENjg5ODdCNTUxRUE3RDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz65og4MAAAFBUlEQVR42syZa2hcRRTHz76S3c1uHpsXSxF8pFF8NElRmjQYNQVpo8Ui9YsfQrUKhaIfRKx90KJgoihFfIsWpR+sWvygRY0i1RZaE6UxqYK4ERVLiJtNk252N/vIPvz/b++GtN3X3W5ucsJh5m7uzPlx5s7MmTOG1Seuk2Jkwj9RhqIDeg90DbQZ6oY61FeCfA3qgZ6Ffg/90V3lji3ux9P1V0H2DFpBAdiGYgd0q8VkcZWbywWlmIwmRQ0Gg/JeKpWSRDKh6HxiXqLxKMsZ/Oso9B0A/7IkoABsQdEHmE32MrvBZrEpYFqE0OH5sMzF5lKoD+Cn3YHN4dGSgALQSkCjwfiEw+owA1IMYpCrkRT+ACvBSDCeTCXfUIEjRYMCsolDZbVYW6tsVQJYKaUAUvxhv0TmIyN4fAiwf2Z715gD8g4Upyttla019pqSQyrG0Sf7pg08DjqP2dZpAgXkOkyK4+ikvqKsQpZaaMNV4aqFze+ywRqzDPexalu1A0MueglXD9qkbcA25QRVJ85RDEW9npBpoU3aJgNgrbk82seJo8dw5/oMyIDqCxlBuU5yCeLsXm5RV5gn4dU1mTza57Q6zUsxu4tZDchCpktAuS2qO46sFCELmHrg1bbFHt3JbVFWmKhMO5WdyfGFtRylt8HZUJVr7+5y3S39zS9KfVmDZoO+2KTs9jwrJ6d/WPjNZXHJ/qbnZMD3lQxMfZ01NpgMTPpRbSRoF6KfE3WOupzGTrUPFgW5GLZzsF2pb6zbJAdWPy+1llo5F/lX7v15gyRSiYztpoJTjLru4gfbzcU2n6Qhm09erxmSoRzbp73YU3+f8vvpmVOyvqZTfr9zLGu/ZANoN7/RFsaTWuSpa5+Wkc7flFKLfHn7NwpkKBGS/WP75JFfe/O2UdlaCNpsNpo1Gdx+zeNiN9mld9U2Te041PTi/Wc2yscTHynhXj5R2ZoJ2mg0als7D517T8KJOTk8/qGmdmkvjkfGC19TL7I1EteZPj4UKgf/eUVRrUIvahWVzanrNnSL49bidytogAcxPeRI66fyQMMWbceWi2wBgnqTyaQ+YZzRKi/fdFD23LBPTIbCDoYqm5egnngyrgsoJ1MsGZNtqx6VD247rKyr+URl8xB0lOduPYSTqffswzIZ80p7dYd81vZ53jYq2yhn/fFoPHrAKc68WyB3l0ITBle29ynl8OywPDi8RV67+U1ZW7lWAvGAdP/UlbUdExfMstCjQ6D2MwDIJXsQVKSNaRVv9D+037XwTI/Ss59MHJGX/u4Xf9yfNSgB2yxPqMq5HvHo+whUtzvKHSsqzAtGgxKIBA7hvP9Yeh19i5mLlSYq09sLgbO7yj0MN3+7kmDJQiZ488zlZ6ZdcDNzQcsOSQayoPrMFYc7eHUEL7zOXNByCxnIsjjTd/lev5cJq1AstGyQtA0GAu7NmoCAV8PMqs2GZ314WXdI2qRtVLfCm+GcuSfAMvW3+UL4QkhPWC7stEnbmdKPGcM8wA4hatkwMzdzXo/PgDamQ9PnaROQQwVl8xbDoujAUIwAWJZiNWCf7Js28Lg+G2ROUBV2jLD4BF71BXxxrm2FnHPyxphqapx9sm/aAKQnZ6Sv8bKhP536ucrLBtaZdSj4sqHg4ye8yw57mKfCYrwDesn1DU+LPIilk2wcVga9jCczXN+8y91Q09mphBdiN0rmC7E/pAQXYv8LMAD9n22HjV7KBQAAAABJRU5ErkJggg==">
      <span class="txt-min-dialog-text">暂无视频通话...</span>
      <a-badge count="5" class="txt-badge"/>
    </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizabel from 'vue-draggable-resizable';
import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';

export default {
  name: 'Dialog',
  props: ['opts'],
  components: {
    'vue-draggable-resizable': VueDraggableResizabel,
    'vue-header': Header,
    'vue-main': Main,
    'vue-footer': Footer,
  },
  data() {
    return {
      videoW: 800,
      videoH: 500,
      videoX: 0,
      videoY: 0,
      minW: 200,
      minH: 50,
      minX: 0,
      minY: 0,
      isShowVideoDialog: true,
      isIn: true,
      isCallComing: true,
      isCallComingClass: true,
    };
  },
  beforeMount() {
    this.computeCenter();
    this.computeMin();
  },
  mounted() {
    // this.createRoom();
    setTimeout(() => {
      this.isCallComingClass = false;
      setTimeout(() => {
        this.isCallComing = false;
      }, 500);
    }, 5000);
    this.$options.sockets.SA_Call_Status = (data) => {
      console.log('SA_Call_Status: ', data);
    }
  },
  methods: {
    createRoom() {
      this.$trtc.enterRoom({
        roomid: this.opts.mRoomId,
        role: 'user',
      }, () => {
        console.log('进入房间成功')
      }, (err) => {
        this.$notification.error({
          message: '提示',
          description: JSON.stringify(err),
        });
      });
    },
    login() {
      this.$api.login(this.opts.serverUrl, { aid: this.opts.id, token: this.opts.token })
        .then((response) => {
          window.console.log('login success: ', response);
        })
        .catch((err) => {
          window.console.log('login error: ', err);
        });
    },
    launchImgDialog() {},
    hiddenVideoDialog() {
      this.isIn = false;
      setTimeout(() => {
        this.isShowVideoDialog = false;
      }, 500);
    },
    hiddenMinDialog() {
      this.isIn = true;
      setTimeout(() => {
        this.isShowVideoDialog = true;
      }, 500);
    },
    computeCenter() {
      const bw = document.body.clientWidth;
      const bh = document.body.clientHeight;
      const x = bw / 2 - this.videoW / 2;
      const y = bh / 2 - this.videoH / 2;
      this.videoX = parseInt(x);
      this.videoY = parseInt(y);
    },
    computeMin() {
      const bw = document.body.clientWidth;
      const bh = document.body.clientHeight;
      const x = bw - this.minW - 10;
      const y = bh - this.minH - 10;
      this.minX = parseInt(x);
      this.minY = parseInt(y);
    },
  },
  destroyed() {
    console.log('Dialog 组件销毁');
  },
}
</script>

<style scoped>
.txt-video-dialog {
  box-shadow: 5px 5px 5px #ccc;
  display: flex;
  flex-direction: column;
}
.txt-drag {
  cursor: move;
}
.txt-min-dialog {
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #e5f1e5;
  border: 2px solid #0cb208;
  cursor: move;
}
.txt-min-dialog-img {
  height: 50px;
  width: 50px;
  cursor: auto;
}
.txt-min-dialog-text {
  font-size: 14px;
  margin-left: 10px;
  color: #0cb208;
}
.txt-badge {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
