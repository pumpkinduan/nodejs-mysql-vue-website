<template>
  <el-container class="home page-component__scroll">
    <el-header style="height: auto; padding: 0;">
      <HeaderNav @handleCollapse="handleCollapse" />
    </el-header>
    <el-container>
      <el-aside style="width: auto;">
        <SideMenu :isCollapse="isCollapse" :menu="menu" />
      </el-aside>
      <el-main style="padding: 15px; margin-bottom: 20px; overflow: hidden;">
        <Breadcrumb :menu="menu" @getBreadcrumb="getBreadcrumb" :levelList="levelList" />
        <transition name="slide" mode="out-in" appear>
          <router-view />
        </transition>
      </el-main>
    </el-container>
    <div class="preview-mask ql-snow" v-show="$store.state.showPreview">
      <div class="ql-editor inner">
        <div class="content" v-html="$store.state.previewData"></div>
        <span class="el-icon-circle-close" @click.stop="handlePreview"></span>
      </div>
    </div>
  </el-container>
</template>

<script>
// @ is an alias to /src
import HeaderNav from "@/components/HeaderNav";
import SideMenu from "@/components/SideMenu";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  components: {
    HeaderNav,
    SideMenu,
    Breadcrumb
  },
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          icon: "el-icon-s-home",
          name: "首页",
          component: "Auth"
        },
        {
          icon: "el-icon-document",
          name: "文章管理",
          children: [
            {
              name: "文章发布",
              component: "PublishArticle"
            },
            {
              name: "文章信息",
              component: "ArticleList"
            }
          ]
        },
        {
          icon: "el-icon-ice-tea",
          name: "相册墙",
          children: [
            {
              name: "图片发布",
              component: "PhotoPublish"
            },
            {
              name: "相册数据",
              component: "PhotoList"
            }
          ]
        },
        {
          icon: "el-icon-chat-dot-round",
          name: "留言",
          component: "CommentList"
        },
        {
          icon: "el-icon-chat-line-square",
          name: "回复",
          component: "ReplyList"
        }
      ],
      levelList: []
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.getBreadcrumb(to);
    next();
  },
  created() {
    this.getBreadcrumb(this.$route);
  },
  methods: {
    handleCollapse(value) {
      this.isCollapse = value;
    },
    getBreadcrumb(route) {
      if (!route.meta) return;
      let matched = route.matched.filter(item => item.meta && item.meta.title);
      const first = matched[0];
      if (first && first.meta.breadcrumb) {
        matched = [{ meta: { title: first.meta.breadcrumb } }].concat(matched);
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title);
    },
    handlePreview() {
      this.$store.state.showPreview = false;
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  min-height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
/* 预览文章样式 */
.preview-mask {
  width: 100%;
  height: auto;
  position: absolute;
  z-index: 999999999999999;
  background-color: rgba(0, 0, 0, 0.65);
}
.preview-mask .inner {
  padding: 2rem 4rem;
  width: 810px;
  min-height: 100vh;
  background-color: #ffffff;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.preview-mask .inner .content {
  margin: 3rem 0;
  line-height: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.preview-mask .inner .el-icon-circle-close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 2rem;
  cursor: pointer;
}
.preview-mask .el-icon-circle-close:hover {
  color: #ff8a00;
}
</style>
