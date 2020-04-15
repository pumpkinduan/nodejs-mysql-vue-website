<template>
  <div class="aside-bar">
    <slot>
      <template>
        <div class="site-overview-wrap">
          <span class="heiguai-gif"></span>
          <span class="site-logo">pumpkin</span>
          <p class="site-description">这么菜鸡的博客，还不加把劲？</p>
          <div class="site-author">
            <figure class="site-author-img">
              <img src="../assets/image/asideBar.jpg" alt="封面" />
            </figure>
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
  props: ["archive_count", "categories_count"]
};
</script>

<style lang="less" scoped>
.aside-bar {
  position: relative;
  border-radius: 5px;
  color: #333;
  line-height: 10px;
  padding: 5px;
  width: 100%;
  text-align: center;
  background: rgba(255,255,255,.8);
  .site-overview-wrap {
    padding: 0 10px;
    .site-logo {
      color: @orange;
      display: block;
      padding: 10px 0;
      letter-spacing: 5px;
      font-size: 1.65rem;
    }
    .site-description {
      font: italic 600 0.9rem/1.6rem normal;
      color: #222;
    }
    .site-author .site-author-words {
      line-height: 1.2rem;
    }
    .site-author .site-author-img {
      padding: 0.5rem 0;
      img {
        border-radius: 10px;
        width: 100%;
      }
    }
    .site-state {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      .site-state-item {
        text-align: center;
        font-weight: 600;
        .site-state-item-count {
          color: #555;
          font-size: 14px;
          padding-right: 3px;
          &:hover {
            color: #ff4d00;
          }
        }
        span {
          display: block;
        }
      }
      .separate-line {
        border-left: 1px solid #ddd;
        padding: 0 4px;
        margin-left: 7px;
      }
      .site-state-item-name {
        margin-top: 2px;
        font-size: 0.85rem;
        transition: color 0.3s;
        color: @orange;
      }
      .site-posts .site-state-item-name {
        color: @blue1;
      }
    }
  }
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
