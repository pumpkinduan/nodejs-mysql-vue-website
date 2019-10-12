<template>
  <div class="admin-login">
    <div class="container">
      <h2 class="center title">后台管理系统登录</h2>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="70px">
        <el-form-item label="账号:" prop="account" class="propmt">
          <el-input v-model.number="loginForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码:" prop="pwd" class="propmt">
          <el-input type="password" v-model="loginForm.pwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="记住密码">
          <el-switch v-model="isRemember"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="registerForm">注册</el-button>
          <el-button type="success" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import validator from "@/util/validateInfo.js";
export default {
  mounted() {
    this.loginForm.account = localStorage.getItem('account');
    this.loginForm.pwd = localStorage.getItem('password');
  },
  data() {
    const validateAccount = (rule, value, callback) => {
      // console.log(value); //输入框的值
      if (!value) {
        //没有输入账号
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (validator.validateUser(value)) {
          callback();
        } else {
          callback(new Error("账号格式错误"));
        }
      }, 300);
    };
    const validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (validator.validatePwd(value)) {
          callback();
        } else {
           callback(new Error("密码长度在6-18个字符之间"));
        }
      }
    };
    return {
      loginForm: {
        pwd: "",
        account: ""
      },
      isRemember: false,
      rules: {
        pwd: [{ validator: validatePwd, trigger: "blur" }],
        account: [{ validator: validateAccount, trigger: "blur" }]
      }
    };
  },
  methods: {
    registerForm() {
      //向后台发送注册信息
      const data = {
        account: this.loginForm.account,
        password: this.loginForm.pwd
      };
      this.axios.post("/api/user/register", data).then(res => {
        if ( res.data && res.data.success ) {
          alert("注册成功");
        } else {
          alert(res.data.msg);
          this.loginForm.account = '';
          this.loginForm.pwd = '';
        }
      }).catch( err => {console.log(err)});
    },
    submitForm() {
      const data = {
        account: this.loginForm.account,
        password: this.loginForm.pwd
      };
      this.axios.post("/api/user/login", data).then( (res) => {
        const data = res.data;
        if ( data && data.success ) {
          if (this.isRemember) {//保存账号密码和token到localStorage
              localStorage.setItem('account', this.loginForm.account);
              localStorage.setItem('password', this.loginForm.pwd);
              localStorage.setItem('token', data.token);
          }
          this.$router.push('home');
        } else {
          alert(data.msg);
          this.loginForm.account = '';
          this.loginForm.pwd = '';
        }
      }, (err) => {
        throw err
      });
    }
  }
};
</script>

<style scoped>
.admin-login {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}
.admin-login .container {
  width: 400px;
  height: 300px;
  background-color: rgba(0, 154, 97, 0.25);
  padding: 30px 40px 0 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 6px #ccc;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 10%;
}
.admin-login .container:hover {
  box-shadow: 0 0 20px #666;
  transition: all 0.2s;
}
.admin-login .container .title {
  margin-bottom: 24px;
  font-weight: bolder;
  color: #444;
  font-size: 20px;
  margin-left: 15px;
}
.el-form-item:last-child button:first-child {
  float: left;
}
.el-form-item:last-child button:last-child {
  float: right;
}
.admin-login .container .propmt .el-form-item__label::before {
  content: "*";
  color: #f40;
}
</style>