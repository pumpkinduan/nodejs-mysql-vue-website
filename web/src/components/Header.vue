<template>
  <header class="clearfix">  
    <h1 class="fl">
      <router-link to="/">
        <img src="../assets/image/pumpkin.png" style="width: 5em;" />
      </router-link>
    </h1>
    <span class="fl logo orange">pumpkin</span>
    <nav id="nav-btn" class="fr" @click="show = true;">
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
  name: 'HeaderNav',
  data() {
    return {
      navLinks: [
        {
          class: "iconfont icon-shouye",
          component: "home",
          name: "首页"
        },
        {
          class: "iconfont icon-xingxing1",
          component: "home",
          name: "作品集"
        },
        {
          class: "iconfont icon-biaoqian3",
          component: "blog",
          name: "博客"
        },
        {
          class: "iconfont icon-guanyuwo",
          component: "about",
          name: "关于我"
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
header {
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  padding: 1.2rem 3rem;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 0 1px 1px #ddd;
  background-color: #fff;
}
header .logo {
  font-family: cursive;
  letter-spacing: 5px;
  color: #ff450085;
  font-size: 1.5rem;
  display:inline-block;
  line-height: 5rem;
}
header nav ul li a {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  position: relative;
}
header nav ul li a:before,
header nav ul li a:after {
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
header nav ul li a:before {
  content: "";
  opacity: 1;
  background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewbox="0 0 80 80"><line x1="0" x2="80" y1="20" y2="20" stroke="gray" stroke-width="8" stroke-linecap="round"/><line x1="0" x2="80" y1="40" y2="40" stroke-linecap="round" stroke="gray" stroke-width="8"/><line x1="0" x2="80" y1="60" y2="60" stroke-linecap="round" stroke="gray" stroke-width="8"/></svg>');
}
header nav ul li a:after {
  content: "";
  opacity: 0;
  background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewbox="0 0 80 80"><line x1="0" x2="80" y1="20" y2="20" stroke="orange" stroke-width="8" stroke-linecap="round"/><line x1="0" x2="80" y1="40" y2="40"  stroke="orange" stroke-width="8"/><line x1="0" x2="80" y1="60" y2="60" stroke="orange" stroke-width="8"/></svg>');
}
header nav ul li a:hover:after {
  opacity: 1;
}
/* ----头部样式结束---- */

/* ----右侧菜单栏开始---- */
.menu {
  width: 18rem;
  height: 100vh;
  position: fixed;
  top: 0;
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
@media screen and (max-width: 768px) {
  .menu {
    width: 100%;
  }
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
  transition: color .4s;
}
.menu ul li:first-child {
  border: none;
}
.menu ul li:hover a,
.menu ul li:hover i {
  color: orange;
}
.menu i,
.menu a {
  color: #ccc;
  transition: color 0.3s;
  margin-right: 5px; 
}
/* 菜单栏的动画 */
.menu-enter, .menu-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.menu-enter-active, .menu-leave-active {
  transition: all .5s;
}
.menu-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
/* ----右侧菜单栏结束---- */
</style>