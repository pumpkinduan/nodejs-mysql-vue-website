<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6">
        <div class="left-nav">
          <i :class="[!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold', 'el-icon']" @click="toggleCollapse"></i>
          <h3>后台管理系统</h3>
        </div>
      </el-col>
      <el-col :span="4" :offset="14">
        <ul class="right-nav">
          <li>
            <el-tooltip class="item" effect="dark" :content="content" placement="bottom">
              <i class="el-icon-full-screen" @click="fullScreenHandle"></i>
            </el-tooltip>
          </li>
          <li>
            <img src="../assets/image/南瓜.jpg" />
          </li>
          <li>
            <el-dropdown trigger="click" @command="handleUser">
              <span class="el-dropdown-link">
                <span class="user-name">{{ userName }}</span>
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </el-col>
    </el-row>
  </header>
</template>
<script>
import { showFullScreen, cancelFullScreen } from "@/util/fullScreenHandle.js";
export default {
  created() {
    const { userInfo } = this.$store.state;
    this.userName = userInfo.account;
  },
  data() {
    return {
      userName: "",
      content: "全屏显示",
      isCollapse: false
    };
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit('handleCollapse', this.isCollapse);
    },
    handleUser(command) {
      if (command == "logout") {
        //退出登录
        //1.清除token
        localStorage.removeItem("token");
        //2.清空store里的用户数据
        this.$store.dispatch("clear_all");
        //3.退出当前页面，跳转到登录页面
        this.$router.push({name: "login"});
      } else if (command == "info") {
        //展示用户个人信息
        alert(`${this.userName}，您好`);
      }
    },
    fullScreenHandle() {
      // 点击切换全屏模式
      //document.fullscreenElement 返回全屏模式下的元素，非全屏则返回null
      if (document.fullscreenElement) {
        cancelFullScreen();
        this.content = "全屏显示";
      } else {
        showFullScreen();
        this.content = "退出全屏";
      }
    }
  }
};
</script>>
<style scoped>
/* --头部导航开始-- */
.header-nav {
  width: 100%;
  height: 70px;
  background: #F5F7F9;
  padding-right: 30px;
  color: #333;
  border-bottom: 1px solid #eee;
}
.header-nav .left-nav {
  font-size: 24px;
}
.header-nav .left-nav .el-icon {
  padding: 0 20px;
  line-height: 70px;
  transition: all 0.3s;
  cursor: pointer;
  font-weight: 400;
}
.header-nav .left-nav .el-icon:hover {
  background-color: #e3eef9;
}
.header-nav .left-nav h3 {
  display: inline-block;
  font-size: 22px;
  font-weight: 600;
}
.header-nav .right-nav {
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-content: center;
}
.header-nav .right-nav li {
  height: 70px;
  text-align: center;
  flex-grow: 1;
  line-height: 70px;
}
.header-nav .right-nav li img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 6px;
}
.el-icon-caret-bottom,
.user-name {
  margin-left: 5px;
  color: #333;
  font-size: 20px;
  font-weight: 400;
}
.el-icon-full-screen {
  font-size: 24px;
  vertical-align: middle;
}
.el-icon-full-screen:hover,
.el-dropdown:hover {
  cursor: pointer;
}
</style>