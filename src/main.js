// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {
  Button,
  Card,
  Input,
  Icon,
  Layout,
  Affix,
  Menu,
  notification,
  Modal,
} from 'ant-design-vue';
import App from './App';
import router from './router';

Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Affix.name, Affix);
Vue.component(Menu.name, Menu);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Modal.name, Modal);

Vue.config.productionTip = false;

Vue.prototype.$notification = notification;
Vue.prototype.$videodialog = window.VideoCallCenter;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
