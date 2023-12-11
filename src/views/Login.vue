<template>
  <div class="box">
    <div style="  backdrop-filter: blur(15px);">
      <h1 style="text-align:center;margin:0;color:white;padding: 4em 0 0;">登录</h1>
      <div id="wraper" class="login-page">
        <div id="log_form" class="form">
          <van-form action class="register_form" v-show="showRegister">
            <van-field
              :rules="[{ required: true, message: '请填写用户昵称' }]"
              clearable
              type="text"
              :error-message="erroRegusername"
              placeholder="用户昵称"
              v-model="userRegisterName"
            />
            <van-field
              :rules="[{ required: true, message: '请填写账号' }]"
              :error-message="erroReguserid"
              clearable
              type="text"
              placeholder="账号"
              v-model="userRegisterId"
            />
            <van-field
              :rules="[{ required: true, message: '请填写密码' }]"
              type="password"
              :error-message="erroRegpassword"
              placeholder="密码"
              v-model="passwordRegister"
            />
            <button id="create" @click="register">注册</button>
            <p class="message">
              已有帐户？
              <a href="#" @click="onLogin">点击登录</a>
            </p>
          </van-form>
          <van-form action class="login_form" v-show="showLogin">
            <van-field
              :rules="[{ required: true, message: '请填写账号' }]"
              clearable
              type="text"
              :error-message="erroLoguserid"
              placeholder="账号"
              v-model="userLoginId"
            />
            <van-field
              :rules="[{ required: true, message: '请填写密码' }]"
              type="password"
              :error-message="erroLogpassword"
              placeholder="密码"
              v-model="passwordLogin"
            />
            <button id="login" @click="login">登录</button>
            <p class="message">
              还没有帐户？
              <a href="#" @click="onRegister">立即注册</a>
            </p>
          </van-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username:"",
      erroRegusername: "",
      erroReguserid: "",
      erroRegpassword: "",
      erroLoguserid: "",
      erroLogpassword: "",
      showLogin: true,
      showRegister: false,
      userRegisterName: "",
      userRegisterId: "",
      passwordRegister: "",
      userLoginId: "",
      passwordLogin: ""
    };
  },
  methods: {
    ...mapActions(["addUser","setUserInfo"]),
    login() {
      let flag = false;
      this.user.forEach(element => {
        if (
          element.userId == this.userLoginId &&
          element.password ==  this.passwordLogin
        ) {
          this.username=element.username;
          flag = true;
        } else if (
          element.userId == this.userLoginId &&
          element.password !=  this.passwordLogin
        ) {
           this.erroLoguserid = "";
          this.erroLogpassword = "密码有误";
        } else if (
          element.userId !=this.userLoginId &&
          element.password == this.passwordLogin
        ) {
          this.erroLoguserid = "账号有误";
        } else if (
          element.userId != this.userLoginId &&
          element.password !=  this.passwordLogin
        ) {
          // this.erroLogpassword = "密码有误";
          this.erroLoguserid = "账号不存在";
        }
      });
      if (flag) {
        console.log(this.username);
        this.erroLogpassword = "";
        this.erroLoguserid = "";
        let usermessage={
             username:this.username,
             islogin:flag
         }
        this.setUserInfo(usermessage)
        this.$router.push({ path: "/user",query:{username:this.username,userlogin:flag} });
        this.$toast.success("登录成功");
      }else{
        this.$toast.fail("还未注册该账号请注册！")
      }

    },
    register() {
      let regUserMessage = {
        username: this.userRegisterName,
        userId: this.userRegisterId,
        password: this.passwordRegister
      };
      this.addUser(regUserMessage);
      this.$toast.success("注册成功");
      (this.showLogin = true), (this.showRegister = false);
    },
    onLogin() {
      (this.showLogin = true), (this.showRegister = false);
    },
    onRegister() {
      (this.showLogin = false), (this.showRegister = true);
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style scoped>
.box {
  background: url(../assets/bg.jpg);
  height: 100vh;
  font-family: "微软雅黑";
  font-size: 1.05em;
}

.name {
  color: #fff;
  width: 100%;
  text-align: center;
  margin-top: 50px;
}

.name span {
  font-size: 1.2em;
}

p.center {
  text-align: center;
  color: #fff;
}

.login-page {
  width: 360px;
  margin: 0 auto;
  padding: 20px 0 100px;
}

.form {
  max-width: 360px;
  padding: 45px;
  margin: 0 auto 100px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  text-align: center;
  /* over-flow: hidden; */
}

.van-field {
  outline: 0;
  width: 100%;
  font-size: 14px;
  padding: 15px;
  margin: 0 0 15px;
  background: #f2f2f2;
  /* CSS3 box-sizing属性，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。 */
  box-sizing: border-box;
}
.form button {
  width: 100%;
  background: #4caf50;
  color: #fff;
  border: 0;
  padding: 15px;
  font-size: 14px;
  cursor: pointer;
  outline: 0;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.message {
  font-size: 12px;
  color: #b3b3b3;
  margin: 15px 0 0;
}
.message a {
  color: #4caf50;
  text-decoration: none;
}
</style>
