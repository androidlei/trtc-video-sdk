<template>
  <div class="txt-video-main-content">
    <vue-txt-local-video></vue-txt-local-video>
    <vue-txt-remote-video></vue-txt-remote-video>
  </div>
</template>

<script>
import TxtRemoteVideo from '../video/TxtRemoteVideo';
import TxtLocalVideo from '../video/TxtLocalVideo';
export default {
  name: 'Main',
  components: {
    'vue-txt-remote-video': TxtRemoteVideo,
    'vue-txt-local-video': TxtLocalVideo,
  }
}
</script>

<style scoped>
.txt-video-main-content {
  background-color: #282828;
  background-image: -webkit-radial-gradient(black 15%, transparent 16%),
  -webkit-radial-gradient(black 15%, transparent 16%),
  -webkit-radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%),
  -webkit-radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%);
  background-image: radial-gradient(black 15%, transparent 16%),
  radial-gradient(black 15%, transparent 16%),
  radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%),
  radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%);
  background-position: 0 0px, 8px 8px, 0 1px, 8px 9px;
  background-size: 16px 16px;
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
  position: relative;
}
</style>
