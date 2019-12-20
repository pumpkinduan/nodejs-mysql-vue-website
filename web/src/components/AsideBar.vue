<template>
  <div
    :style="affix_bottom ? {'bottom': bottom+'px'}:''"
    :class="['aside-bar', flag ? 'affix': '',affix_bottom ? 'affix-bottom': '']"
    ref="aside_bar"
  >
    <slot>
      <template>
        <div class="site-overview-wrap">
          <span class="site-logo orange">pumpkin</span>
          <p class="site-description">Everything is Ok</p>
          <div class="site-author">
            <section class="site-author-img">
              <img src="../assets/image/cv.jpg" />
            </section>
            <p class="site-author-words">
              This is my personal blog where I share a lot of stuffs about my life and work
              everything i do in between.
            </p>
          </div>
          <nav class="site-state">
            <div class="site-state-item site-posts">
              <router-link to="/">
                <span class="site-state-item-count">11</span>
                <span class="site-state-item-name">文章</span>
              </router-link>
            </div>
            <span class="separate-line"></span>
            <div class="site-state-item site-catalogs">
              <router-link :to="{name: 'category'}">
                <span class="site-state-item-count">3</span>
                  <span class="site-state-item-name">分类</span>
              </router-link>
            </div>
          </nav>
        </div>
      </template>
    </slot>
  </div>
</template>

<script>
import { addEvent, removeEvent, throttle } from "@/lib/tool.js";
export default {
  data() {
    return {
      flag: false, //true则固定侧边栏
      bottom: 80, //侧边栏为absolute时的bottom值
      affix_bottom: false, //true 则实现侧边栏的跟随运动
      _main: "", //父级main元素，这里需要获取它底部距离视口的距离
      aside_bar: "" //侧边栏元素
    };
  },
  mounted() {
    this._main = this.$parent.$refs.main;
    this.aside_bar = this.$refs.aside_bar;
    let _html = document.documentElement;
    this.handleScroll = throttle(() => {
      //90为顶部导航栏的像素高度
      if (_html.scrollTop >= 90) {
        if (this.is_affix_bottom()) {
          this.bottom = 80;
          this.flag = false;
          this.affix_bottom = true;
        } else {
          this.flag = true;
          this.affix_bottom = false;
        }
      } else {
        this.flag = false;
        this.affix_bottom = false;
      }
    }, 30);
    addEvent(window, "scroll", this.handleScroll);
  },
  methods: {
    is_affix_bottom() {
      //实现侧边栏的无缝跟随效果
      //利用父级main元素底部距离视口的距离与侧边栏底部距离视口的距离作对比实现
      let _top = this._main && this._main.getBoundingClientRect().bottom - 80;
      let { bottom, top } =
        this.aside_bar && this.aside_bar.getBoundingClientRect();
      if (bottom >= _top && top <= 80) {
        //80为.affix的top值，也是父级main元素的上内边距
        return true;
      }
    }
  },
  destroy() {
    removeEvent(window, "scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.aside-bar {
  background-color: #fff;
  border-radius: 5px;
  color: #333;
  font-size: 0.9rem;
  line-height: 1rem;
  padding: 1rem;
  width: 320px;
}
.aside-bar.affix {
  position: fixed;
  top: 80px;
}
.aside-bar.affix-bottom {
  position: absolute;
}
.site-overview-wrap {
  font-family: cursive;
  padding: 0 1rem;
}
.site-overview-wrap .site-logo {
  display: block;
  padding: 1rem 0;
  font-family: cursive;
  letter-spacing: 5px;
  font-size: 1.65rem;
  text-align: center;
}
.site-overview-wrap .site-description {
  color: #666;
  font-size: 0.9rem;
  font-family: cursive;
  line-height: 1.5rem;
  text-align: center;
}
.site-overview-wrap .site-author .site-author-img {
  padding: 0.5rem 0;
}
.site-overview-wrap .site-author .site-author-img img {
  border-radius: 10px;
  width: 100%;
}
.site-overview-wrap .site-author .site-author-words {
  line-height: 1.2rem;
  font-family: cursive;
}
.site-overview-wrap .site-state {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.site-overview-wrap .site-state .site-state-item {
  text-align: center;
  font-weight: 600;
}
.site-overview-wrap .site-state .separate-line {
  border-left: 1px solid #ddd;
  padding: 0 4px;
  margin-left: 7px;
}
.site-overview-wrap .site-state .site-state-item span {
  display: block;
}
.site-overview-wrap .site-state .site-state-item .site-state-item-count {
  color: #555;
  font-size: 1rem;
}
.site-overview-wrap .site-state .site-state-item .site-state-item-name {
  margin-top: 2px;
  font-size: 0.85rem;
  transition: color 0.3s;
}
.site-overview-wrap .site-state .site-state-item .site-state-item-count:hover {
  color: #ff4d00;
}
.site-overview-wrap .site-state .site-posts .site-state-item-name {
  color: #00a7e0;
}
.site-overview-wrap .site-state .site-catalogs .site-state-item-name {
  color: #ff8a00;
}
</style>