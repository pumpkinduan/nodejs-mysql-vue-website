<template>
  <div class="aside-bar">
    <slot>
      <template>
        <div class="site-overview-wrap">
          <span class="heiguai-gif" @mousedown="handleDown" @mouseup="handleUp"></span>
          <span class="site-logo orange">pumpkin</span>
          <p class="site-description">Everything is Ok~</p>
          <div class="site-author">
            <section class="site-author-img">
              <img src="../assets/image/asideBar.jpg" />
            </section>
            <p class="site-author-words">
              This is my personal website where I share a lot of stuffs about my life and work
              everything i do in between.
              <br />Hope you guys love it！
            </p>
          </div>
          <nav class="site-state">
            <div class="site-state-item site-posts">
              <router-link :to="{name: 'archive'}">
                <span class="site-state-item-count">{{archive_count}}</span>
                <span class="site-state-item-name">文章</span>
              </router-link>
            </div>
            <span class="separate-line"></span>
            <div class="site-state-item site-catalogs">
              <router-link :to="{name: 'category'}">
                <span class="site-state-item-count">{{categories_count}}</span>
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
import { removeEvent, addEvent, getElementPosition } from "@/lib/tool";
export default {
  props: ["archive_count", "categories_count"],
  methods: {
    handleDown(ev) {
      let oBox = ev.target;
      let { x, y } = getElementPosition(oBox.offsetParent);
      //元素活动的范围
      let range = {
        maxLeft: document.documentElement.clientWidth - x - oBox.offsetWidth,
        minLeft: -x,
        maxTop: document.documentElement.clientHeight - y - oBox.offsetHeight,
        minTop: -y
      };
      //获取不变的差值；
      //水平方向公式： 差值+元素left = 鼠标点击位置距离窗口左侧距离
      let extraX = ev.pageX - parseInt(oBox.offsetLeft);
      let extraY = ev.pageY - parseInt(oBox.offsetTop);
      this.handleMove = e => {
        //计算元素的left和top
        let newX = e.pageX - extraX;
        let newY = e.pageY - extraY;
        if (newX >= range.maxLeft) {
          oBox.style.left = range.maxLeft + "px";
        } else if (newX <= range.minLeft) {
          oBox.style.left = range.minLeft + "px";
        } else {
          oBox.style.left = newX + "px";
        }
        if (newY <= range.minTop) {
          oBox.style.top = range.minTop + "px";
        } else if (newY >= range.maxTop) {
          oBox.style.top = range.maxTop + "px";
        } else {
          oBox.style.top = newY + "px";
        }
      };
      addEvent(document, "mousemove", this.handleMove);
      document.addEventListener('mouseleave', () => {
        this.handleUp();
      }, false)
    },
    handleUp() {
      removeEvent(document, "mousemove", this.handleMove);
    }
  },
  destroyed() {
    removeEvent(document, "mousemove", this.handleMove);
  }
};
</script>

<style scoped>
.aside-bar {
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  color: #333;
  font-size: 0.9rem;
  line-height: 1rem;
  padding: 1rem;
  width: 320px;
  text-align: center;
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
}
.site-overview-wrap .site-description {
  color: #666;
  font-size: 0.9rem;
  font-family: cursive;
  line-height: 1.5rem;
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
  padding-right: 3px;
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
.heiguai-gif {
  display: inline-block;
  background: url("../assets/image/heiguai.gif") 0 0 no-repeat;
  position: absolute;
  top: -20px;
  right: -15px;
  width: 60px;
  height: 80px;
  cursor: move;
}
@media screen and (max-width: 1280px) {
  .aside-bar {
    display: none;
  }
}
</style>