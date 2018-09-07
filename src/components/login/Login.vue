<template>
  <div class="txt-login">
    <a-card
      hoverable
      title="甜心科技视频客服登录"
      style="width: 300px;text-align: center;"
      bordered
    >
      <form>
        <p>
          <a-input
            placeholder="用户名"
            v-model="userName"
            ref="userNameInput" type="text"
          >
            <a-icon
              slot="prefix"
              type="user"
            />
            <a-icon
              v-if="userName"
              slot="suffix"
              type="close-circle"
              @click="emitUserNameEmpty"
            />
          </a-input>
        </p>
        <p>
          <a-input
            placeholder="密码"
            v-model="password"
            ref="passwordInput"
            type="password"
          >
            <a-icon
              slot="prefix"
              type="lock"
            />
            <a-icon
              v-if="password"
              slot="suffix"
              type="close-circle"
              @click="emitPassWordEmpty"
            />
          </a-input>
        </p>
      </form>
      <p>
        <a-button type="primary" :loading="iconLoading" @click="login" style="width: 100%;">
          登录
        </a-button>
      </p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
      iconLoading: false,
    };
  },
  methods: {
    emitUserNameEmpty() {
      this.$refs.userNameInput.focus();
      this.userName = '';
      this.password = '';
    },
    emitPassWordEmpty() {
      this.$refs.passwordInput.focus();
      this.password = '';
    },
    login() {
      if (this.userName === '' || this.password === '') {
        this.$notification.error({
          message: '提示',
          description: '您的账号或者密码不能为空，请确认填写再次登录。',
        });
        return;
      }
      this.iconLoading = true;
      setTimeout(() => {
        this.iconLoading = false;
        this.$router.push({ path: '/dashboard', query: { aid: this.userName, token: this.password } });
      }, 1500);
    },
  },
};
</script>

<style scoped>
.txt-login{
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
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
