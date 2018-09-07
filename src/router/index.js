import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/Login';
import Dashboard from '@/components/dashboard/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});
