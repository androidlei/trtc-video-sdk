<template>
  <div class="txt-local-video">
    <video id="localVideo" autoplay playsinline muted></video>
  </div>
</template>

<script>
export default {
  name: 'TxtLocalVideo',
  mounted() {
    // this.addLoaclStreamListener();
  },
  methods: {
    addLoaclStreamListener() {
      console.log('trtc: ', this.$trtc);
      this.$trtc.on('onLocalStreamAdd', (data) => {
        window.console.log('onLocalStreamAdd: ', data);
        if (data && data.stream) {
          document.querySelector("#localVideo").srcObject = data.stream;
          // this.checkSoundMeter(data.stream);
        }
      });
    },
    checkSoundMeter(stream) {
      this.$trtc.SoundMeter({
        stream: stream,
        onprocess: (data) => {
          console.log('SoundMeter: ', data);
        }
      });
    }
  },
}
</script>

<style scoped>
.txt-local-video {
  width: 200px;
  height: 150px;
  position: absolute;
  right: 0;
  top: 0;
}
#localVideo {
  height: 100%;
  width: 100%;
}
</style>
