<template>
  <div class="txt-video-footer">
    <span class="txt-video-type-icon">
      <a-icon :type="icon" class="txt-icon-c"/>
    </span>
    <div class="txt-video-calls">
      <span class="txt-video-text-wrap txt-f14 txt-color-black">testtesttesttesttesttesttest</span>
      <span class="txt-f12 txt-color-black">等待视频接通中</span>
    </div>
    <div class="txt-full-width"></div>
    <vue-timing-button btn-name="接受" :is-timing="isTiming" @anwserCall="answerCall"></vue-timing-button>
  </div>
</template>

<script>
import TimingButton from '../timing/TimingButton';

export default {
  name: "Footer",
  components: {
    'vue-timing-button': TimingButton,
  },
  props: ['parentShow'],
  watch: {
    parentShow:{
      immediate:true,
      handler:function(){
        this.isTiming = this.parentShow;
      }
    },
  },
  data() {
    return {
      icon: 'android', // chrome apple wechat
      isTiming: true,
    };
  },
  mounted() {
  },
  methods: {
    answerCall() {
      this.isTiming = !this.isTiming;
    },
  },
  destroyed() {
    console.log('Footer 组件销毁');
  },
}
</script>

<style scoped>
.txt-video-footer {
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0;
  bottom: -53px;
  z-index: 101;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #eef0f6;
  padding: 0 10px;
}
.txt-icon-c {
  color: #A7C5F6;
  font-size: 24px;
}
.txt-video-type-icon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #E5EEF6;
  border: 1px solid #A7C5F6;
}
.txt-video-calls {
  display: flex;
  justify-content: center;
  align-items: left;
  padding: 0 10px;
  width: 200px;
  flex-direction: column;
}
.txt-full-width {
  flex: 1;
}
.txt-video-text-wrap {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.txt-f12 {
  font-size: 12px;
}
.txt-f14 {
  font-size: 14px;
}
.txt-color-black {
  color: black;
}
</style>
