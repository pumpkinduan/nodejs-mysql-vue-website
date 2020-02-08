<template>
  <header
    id="nav_header"
    class="clearfix site-header"
    :style="{opacity: opacity, 'background-color': bgc}"
  >
    <h1 class="fl">
      <router-link to="/">
        <span class="fl site-logo orange">pumpkin</span>
      </router-link>
    </h1>
    <section class="site-nav fr">
      <ul class="clearfix">
        <li v-for="(item, prop, index) in navLinks" :key="index">
          <router-link :to="{name: item.component, params: {showList: true}}">{{item.name}}</router-link>
        </li>
      </ul>
    </section>
    <nav id="nav_btn" class="fr" @click="show = true;">
      <ul>
        <li>
          <a href="javascript:;"></a>
        </li>
      </ul>
    </nav>
    <transition name="menu">
      <section class="menu" v-show="show">
        <i class="iconfont icon-weibiaoti34 close" @click.stop="show = false"></i>
        <ul>
          <li v-for="(item, prop, index) in navLinks" :key="index">
            <i :class="item.class"></i>
            <router-link :to="{name: item.component, params: {showList: true}}">{{item.name}}</router-link>
          </li>
        </ul>
      </section>
    </transition>
  </header>
</template>
  <script>
export default {
  name: "HeaderNav",
  props: {
    opacity: {
      type: Number,
      default: 0.2
    },
    bgc: {
      type: String,
      default: "#000"
    }
  },
  data() {
    return {
      navLinks: [
        {
          class: "iconfont icon-shouye",
          component: "articleList",
          name: "首页"
        },
        {
          class: "iconfont icon-jilu",
          component: "category",
          name: "分类"
        },
        {
          class: "iconfont icon-biaoqian3",
          component: "archive",
          name: "归档"
        },
        {
          class: "iconfont icon-xingxing1",
          component: "photoWall",
          name: "相册墙"
        },
        {
          class: "iconfont icon-guanyuwo",
          component: "about",
          name: "关于我"
        },
        {
          class: "iconfont el-icon-chat-line-square",
          component: "resume",
          name: "我的简历"
        }
      ],
      show: false
    };
  },
  method: {
    hideMenu() {}
  }
};
</script>
<style scoped>
/* ----头部样式开始---- */
.site-header {
  width: 100%;
  height: 5rem;
  padding: 0rem 3rem;
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: all 0.4s;
}
.site-header:hover {
  background-color: #fff !important;
  opacity: 0.9 !important;
}
.site-header .site-logo {
  letter-spacing: 5px;
  color: #ff450085;
  font-size: 1.5rem;
  display: inline-block;
  line-height: 5rem;
}

.site-header .site-nav {
  height: 100%;
}
.site-header .site-nav ul {
  position: relative;
  top: 0.8rem;
}
.site-header .site-nav ul li {
  float: left;
  transition: color 0.3s;
}
.site-header .site-nav ul li a {
  padding: 1rem;
}
.site-header .site-nav ul li a:hover {
  color: #ff8a00;
}

/* 适配移动端 */
.site-header nav ul li a {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  position: relative;
}
.site-header nav ul li a:before,
.site-header nav ul li a:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.3s;
}
.site-header nav ul li a:before {
  content: "";
  opacity: 1;
  background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewbox="0 0 80 80"><line x1="0" x2="80" y1="20" y2="20" stroke="gray" stroke-width="8" stroke-linecap="round"/><line x1="0" x2="80" y1="40" y2="40" stroke-linecap="round" stroke="gray" stroke-width="8"/><line x1="0" x2="80" y1="60" y2="60" stroke-linecap="round" stroke="gray" stroke-width="8"/></svg>');
}
.site-header nav ul li a:after {
  content: "";
  opacity: 0;
  background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewbox="0 0 80 80"><line x1="0" x2="80" y1="20" y2="20" stroke="orange" stroke-width="8" stroke-linecap="round"/><line x1="0" x2="80" y1="40" y2="40"  stroke="orange" stroke-width="8"/><line x1="0" x2="80" y1="60" y2="60" stroke="orange" stroke-width="8"/></svg>');
}
.site-header nav ul li a:hover:after {
  opacity: 1;
}
/* ----右侧菜单栏开始---- */
.menu {
  width: 18rem;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 666;
  right: 0;
  background-color: #666;
  padding: 2rem 1.5rem 2.5rem 2rem;
  color: #fff;
  font-weight: 300;
  /* 当设置为绝对定位元素且设置了transform时，该元素变得好像不完全脱离文档流了，使得网页出现了滚动条，待解？*/
  /* 而fixed定位则不会出现上述情况 */
  /* position: absolute; */
  /* transform: translateX(100%); */
}
.menu .close {
  font-size: 2rem;
  position: absolute;
  top: 1rem;
  right: 5px;
  cursor: pointer;
}
.menu .close:hover {
  color: pink;
}
.menu ul li {
  border-top: 1px solid hsla(0, 7%, 15%, 0.17);
  padding: 1.5rem 0;
  transition: color 0.4s;
}
.menu ul li:first-child {
  border: none;
}
.menu ul li:hover a,
.menu ul li:hover i {
  color: #ff8a00;
}
.menu i,
.menu a {
  color: #ccc;
  transition: color 0.3s;
  margin-right: 5px;
}
/* 菜单栏的动画 */
.menu-enter,
.menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.menu-enter-active,
.menu-leave-active {
  transition: all 0.5s;
}
.menu-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
/* ----右侧菜单栏结束---- */
@media screen and (min-width: 781px) {
  #nav_btn {
    display: none;
  }
  .site-header .site-nav {
    display: block;
  }
}
@media screen and (max-width: 780px) {
  .site-header {
    background: #fff !important;
    opacity: 1 !important;
    padding: 0rem 1rem;
  }
  #nav_btn {
    display: block;
  }
  .site-nav {
    display: none;
  }
}
</style>