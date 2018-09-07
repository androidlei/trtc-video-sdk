<template>
  <div class="txt-video-header">
    <span class="txt-video-text-wrap">namenamenamenamenamenamename</span>
    <div class="txt-full-width"></div>
    <span class="txt-mr">
      <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
      自动接听
    </span>
    <span class="txt-mr">
      <a-tooltip placement="top">
        <template slot="title">
          <span>
            自动接听开启后，客户发起视频时将在"嘟"一声提示以后自动为您接通
          </span>
        </template>
        <a-button shape="circle" icon="info"/>
      </a-tooltip>
    </span>
    <span
      class="txt-mr txt-header-opt"
      @click="openImgDialog">
      <a-icon type="eye-o"/>
    </span>
    <span
      class="txt-mr txt-header-opt"
      @click="onFullScreen">
      <a-icon :type="isFullScreen ? 'arrows-alt' : 'shrink'" />
    </span>
    <!--<a-icon type="" />-->
    <span class="txt-mr txt-header-opt" @click="hideDialog"><a-icon type="minus"/></span>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      isFullScreen: false,
    };
  },
  methods: {
    onFullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    openImgDialog() {
      this.$emit('openImgDialog');
    },
    hideDialog() {
      this.$emit('hideDialog');
    },
  },
  destroyed() {
    console.log('Header 组件销毁');
  },
}
</script>

<style scoped>
.txt-video-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 38px;
  padding: 0 10px;
  background: #eef0f6;
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
.txt-mr {
  margin-right: 10px;
  cursor: auto;
}
.txt-header-opt {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.txt-header-opt:hover,
.txt-header-opt:active {
  border-radius: 50%;
  background-color: #e2e4ec;
}
.ant-btn-circle, .ant-btn-circle-outline {
  width: 24px;
  height: 24px;
  color: red;
  border-color: red;
}
.ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active {
  color: red;
  border-color: red;
}
</style>
