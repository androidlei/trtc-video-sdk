<template>
  <div class="txt-remote-video">
    <video id="remoteVideo" autoplay playsinline></video>
  </div>
</template>

<script>
export default {
  name: 'TxtRemoteVideo',
  mounted() {
    // this.addRemoteStreamListener();
    // this.addRemoteStreamRemoveListener();
  },
  methods: {
    addRemoteStreamListener() {
      this.$trtc.on('onRemoteStreamUpdate', (data) => {
        if (data && data.stream) {
          document.querySelector("#remoteVideo").srcObject = data.stream;
        }
      });
    },
    addRemoteStreamRemoveListener() {
      this.$trtc.on('onRemoteStreamRemove', (data) => {
        document.querySelector("#remoteVideo").srcObject = null;
      });
    },
  },
}
</script>

<style scoped>
.txt-remote-video {
  width: 100%;
  height: 100%;
}
#remoteVideo {
  width: 100%;
  height: 100%;
}
</style>
