<template>
  <a-button type="primary" @click="handleBtn">
    <span>{{showTime}}</span>
    <span>{{name}}</span>
  </a-button>
</template>

<script>
export default {
  name: 'TimingButton',
  data() {
    return {
      name: this.btnName,
      showTime: '(0s)',
      timing: null,
    };
  },
  props: ['btnName', 'isTiming'],
  watch: {
    isTiming:{
      immediate:true,
      handler:function(){
        if (this.isTiming) {
          this.startTiming();
        } else {
          this.stopTiming();
        }
      }
    },
  },
  methods: {
    startTiming() {
      if (this.timing) {
        return;
      }
      let s = 0;
      let m = 0;
      this.timing = window.setInterval(() => {
        console.log('计时按钮');
        s++;
        if (s > 60) {
          s = 0;
          m++;
        }
        if (m > 0) {
          this.showTime = `(${m}m)`;
          return;
        }
        this.showTime = `(${s}s)`;
      }, 1000);
    },
    stopTiming() {
      if (this.timing) {
        window.clearInterval(this.timing);
        this.timing = null;
      }
    },
    handleBtn() {
      this.$emit('anwserCall');
    },
  },
  destroyed() {
    console.log('组件销毁');
    this.stopTiming();
  },
}
</script>

<style scoped>

</style>
