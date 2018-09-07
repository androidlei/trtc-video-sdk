<template>
  <a-layout class="txt-dashboard">
    <a-affix>
      <a-layout-header class="txt-header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggleCollapsed"
        />
        <div class="txt-full-width"></div>
        <a-icon
          type="logout"
          @click="logout"
          class="txt-logout"
        />
      </a-layout-header>
    </a-affix>
    <a-layout class="txt-content">
      <a-layout-sider
        :trigger="null"
        class="txt-sider"
        collapsible
        v-model="collapsed"
      >
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          theme="light"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user"/><span>导航一</span></span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop"/><span>导航二</span></span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="txt-main-content">
        <a-button type="primary" @click="() => modal2Visible = true">查看照片</a-button>
        <a-modal
          wrapClassName="vertical-center-modal"
          v-model="modal2Visible"
          :footer="null"
        >
          <p><img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style="width: 100%;"></p>
        </a-modal>
        <a-button type="primary" @click="sendImg">发送照片</a-button>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      collapsed: false,
      modal2Visible: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const query = this.$route.query;
      this.$videodialog.init({ serverUrl: 'http://52.80.60.186:6001', socketUrl: 'http://52.80.60.186:6060', id: query.aid, token: query.token });
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    sendImg() {

    },
    logout() {
      this.$videodialog.logout();
    },
  },
};
</script>

<style>
.txt-dashboard {
  display: flex;
  flex-direction: column;
}
.txt-content {
  flex: 1;
  height: calc(100vh - 64px);
}
.txt-sider {
  background: #fff;
}
.txt-main-content {
  background: #fff;
  padding: 24px;
  margin: 10px;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
  color: white;
}
.trigger:hover {
  color: #1890ff;
}
.txt-logout {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
  color: white;
}
.txt-logout:hover {
  color: #1890ff;
}
.ant-layout-header {
  padding: 0;
}
.vertical-center-modal {
  text-align: center;
  white-space: nowrap;
}

.vertical-center-modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  width: 0;
}

.vertical-center-modal .ant-modal {
  display: inline-block;
  vertical-align: middle;
  top: 0;
  text-align: left;
}
.ant-modal-close-x {
  width: 27px;
  height: 27px;
  line-height: 27px;
}
.ant-modal-body {
  height: 70%;
}
.txt-full-width {
  flex: 1;
}
.txt-header {
  display: flex;
  flex-direction: row;
}
</style>
