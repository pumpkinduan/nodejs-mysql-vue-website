<template>
  <div class="aside-bar">
    <slot>
      <template>
        <div class="site-overview-wrap">
          <span class="heiguai-gif"></span>
          <span class="site-logo orange">pumpkin</span>
          <p class="site-description">这么菜鸡的博客，还不加把劲？</p>
          <div class="site-author">
            <section class="site-author-img">
              <img src="../assets/image/asideBar.jpg" alt="封面"/>
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
export default {
  props: ['archive_count', 'categories_count'],
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
  padding: 0 1rem;
}
.site-overview-wrap .site-logo {
  display: block;
  padding: 1rem 0;
  letter-spacing: 5px;
  font-size: 1.65rem;
}
.site-overview-wrap .site-description {
  font: italic 600 0.9rem/1.6rem normal;
  color: #222;;
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
}
</style>