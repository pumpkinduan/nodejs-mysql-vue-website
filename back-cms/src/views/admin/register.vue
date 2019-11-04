<template>
  <div class="admin-register">
    <div class="container">
      <h2 class="center title">后台管理系统登录</h2>
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="账号:" prop="account" class="propmt">
          <el-input v-model="registerForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pwd" class="propmt">
          <el-input type="password" v-model="registerForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPwd" class="propmt">
          <el-input type="password" v-model="registerForm.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import validator from "@/util/validateInfo.js";
import { Message } from "element-ui";
import api from "@/api/admin.js";
export default {
  data() {
    const validateAccount = (rule, value, callback) => {
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
    const checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (value !== this.registerForm.pwd) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      }
    };
    return {
      registerForm: {
        pwd: "",
        account: "",
        checkPwd: ""
      },
      rules: {
        pwd: [{ validator: validatePwd, trigger: "blur", required: true }],
        checkPwd: [{ validator: checkPwd, trigger: "blur" }],
        account: [
          { validator: validateAccount, trigger: "blur", required: true }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //密码校验
      let { account, pwd, checkPwd } = this.registerForm;
      if (!account && !pwd) {
        return alert("请输入账号和密码");
      }
      if (!account) {
        return alert("请输入账号");
      } else if (!pwd) {
        return alert("请输入密码");
      } else if (checkPwd !== pwd) {
        return alert("两次密码输入不一致");
      }
      //向后台发送注册信息
      api
        .register({ account, password: pwd })
        .then(res => {
          if (res.data && res.data.success) {
            this.$message({
              message: "恭喜主人，注册成功，即将跳转登录",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("/login");
            }, 0);
          }
        })
        .catch(err => {
          this.registerForm.account = "";
          this.registerForm.pwd = "";
          this.registerForm.checkPwd = "";
          throw err;
        });
    }
  }
};
</script>

<style scoped>
.admin-register {
  width: 100%;
  height: 100%;
}
.admin-register .container {
  width: 400px;
  height: 350px;
  background-color: rgba(0, 154, 97, 0.25);
  padding: 30px 50px 20px 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 6px #ccc;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 10%;
}
.admin-register .container:hover {
  box-shadow: 0 0 20px #666;
  transition: all 0.2s;
}
.admin-register .container .title {
  margin-bottom: 24px;
  font-weight: bolder;
  color: #444;
  font-size: 20px;
  margin-left: 15px;
}
.el-form-item:last-child button:first-child {
  margin-top: 10px;
  width: 100%;
}
.admin-register .container .propmt .el-form-item__label::before {
  content: "*";
  color: #f40;
}
</style>