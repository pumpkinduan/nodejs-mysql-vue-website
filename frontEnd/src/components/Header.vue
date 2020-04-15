<template>
  <header ref="site_header" class="clearfix site-header" :style="{opacity, bgc}">
    <h1 class="fl site-logo">
      <router-link to="/">pumpkin</router-link>
    </h1>
    <nav class="site-nav fr">
      <ul class="clearfix">
        <li v-for="(item, prop, index) in navLinks" :key="index">
          <router-link :to="{name: item.component, params: {showList: true}}">{{item.name}}</router-link>
        </li>
      </ul>
    </nav>
    <div id="nav_btn" class="fr" @click="show = true;">
      <ul>
        <li>
          <a href="javascript:;"></a>
        </li>
      </ul>
    </div>

    <transition name="menu">
      <section class="menu" v-show="show">
        <i class="iconfont iconarrow-right close" @click.stop="show = false"></i>
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
  props: {
    opacity: {
      type: Number,
      default: 0.2
    },
    bgc: {
      type: String,
      default: '#000'
    }
  },
  data() {
    return {
      navLinks: [
        {
          class: 'iconfont iconshouye',
          component: 'articleList',
          name: '首页'
        },
        {
          class: 'iconfont iconjilu',
          component: 'category',
          name: '分类'
        },
        {
          class: 'iconfont iconfaxian',
          component: 'archive',
          name: '归档'
        },
        {
          class: 'iconfont iconxingxing1',
          component: 'photoWall',
          name: '相册墙'
        },
        {
          class: 'iconfont iconguanyuwo',
          component: 'about',
          name: '关于我'
        },
        {
          class: 'iconfont el-icon-chat-line-square',
          component: 'resume',
          name: '我的简历'
        }
      ],
      show: false
    };
  },
  methods: {
    onScroll() {
      if (document.documentElement.scrollTop > 1) {
        this.$refs.site_header
          ? (this.$refs.site_header.style = 'opacity: 1;background: #fff')
          : '';
      } else {
        this.$refs.site_header
          ? (this.$refs.site_header.style = `opacity:${this.opacity};background:${this.bgc}`)
          : '';
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.onScroll, false);
    });
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
};
</script>
<style lang='less' scoped>
/* ----头部样式开始---- */
.site-header {
  width: calc(100% - 60px);
  box-sizing: content-box;
  height: 50px;
  padding: 5px 30px;
  margin-bottom: 20px;
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 4;
  transition: all 0.4s;
  &:hover {
    opacity: 1 !important;
    background: #fff !important;
  }
  .site-logo {
    height: 100%;
    a {
      line-height: 50px;
      letter-spacing: 2px;
      font-size: @font_super_large1;
      color: @orange;
    }
  }
  .site-nav {
    height: 100%;
    ul {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        transition: color 0.3s;
        a {
          padding: 10px;
          &:hover {
            color: @orange;
          }
        }
      }
    }
  }
}

/* 适配移动端 */
.site-header #nav_btn {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.site-header #nav_btn ul li a {
  width: 40px;
  height: 40px;
}
.site-header #nav_btn ul li a:before,
.site-header #nav_btn ul li a:after {
  content: '';
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
.site-header #nav_btn ul li a:before {
  content: '';
  opacity: 1;
  background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewbox="0 0 80 80"><line x1="0" x2="80" y1="20" y2="20" stroke="gray" stroke-width="8" stroke-linecap="round"/><line x1="0" x2="80" y1="40" y2="40" stroke-linecap="round" stroke="gray" stroke-width="8"/><line x1="0" x2="80" y1="60" y2="60" stroke-linecap="round" stroke="gray" stroke-width="8"/></svg>');
}
.site-header #nav_btn ul li a:after {
  content: '';
  opacity: 0;
  background-image: url('data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewbox="0 0 80 80"><line x1="0" x2="80" y1="20" y2="20" stroke="orange" stroke-width="8" stroke-linecap="round"/><line x1="0" x2="80" y1="40" y2="40"  stroke="orange" stroke-width="8"/><line x1="0" x2="80" y1="60" y2="60" stroke="orange" stroke-width="8"/></svg>');
}
.site-header #nav_btn ul li a:hover:after {
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
  color: rgb(248, 172, 185);
}
.menu ul li {
  border-top: 1px solid hsla(0, 7%, 15%, 0.17);
  padding: 1.5rem 0;
  transition: color 0.4s;
}
.menu ul li:first-child {
  border: none;
}
.menu ul li i,
.menu ul li a {
  color: #ccc;
  transition: color 0.3s;
  margin-right: 5px;
}
.menu ul li:hover a,
.menu ul li:hover i {
  color: @orange;
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
@media screen and (min-width: 769px) {
  #nav_btn {
    display: none;
  }
  .site-header .site-nav {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .site-header {
    background: #fff !important;
    opacity: 1 !important;
    padding: 0 10px;
    width: calc(100% - 20px);
  }
  #nav_btn {
    display: block;
  }
  .site-nav {
    display: none;
  }
}
</style>
