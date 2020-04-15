<template>
  <div class="posts">
    <div class="wrapper">
      <article v-for="(item, index) in articleLists" :key="'o-'+index">
        <div class="post-date">
          <div class="post-month">{{item.date | getMonth}}</div>
          <div class="post-day">{{item.date | getDate}}</div>
        </div>
        <div class="post-badge">
          <router-link :to="{name: 'tag', params: {tag: item.tag}}" class="post-tag">{{item.tag}}</router-link>
        </div>
        <header class="post-title">
          <router-link :to="{name: 'detail', params: {articleId: item.article_id}}">{{item.title}}</router-link>
        </header>
        <ul class="post-meta">
          <li class="post-time">Posted on: {{item.created_at}}</li>
          <li class="post-browse">Visited: {{item.browse}}</li>
          <li class="post-words">Words: {{item.total_char}}</li>
        </ul>
        <div class="description">{{item.description}}</div>
        <div class="bottom">
          <router-link
            :to="{name: 'detail', params: {articleId: item.article_id}}"
            class="read-more"
          >
            <b>阅读更多</b>
          </router-link>
        </div>
      </article>
    </div>
    <div class="block-loading" v-if="articleLists.length <= 0"></div>
    <Pagination
      v-else
      :totalData="totalArtiles"
      :pageSize="pageSize"
      @current-change="getCurrentPage"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { getArticleList } from '@/api/index';
export default {
  components: {
    Pagination
  },
  data() {
    return {
      articleLists: [],
      pageSize: 5,
      curPage: 1,
      totalArtiles: 0,
      cachedArtiles: new Map(),
      comments: 0
    };
  },
  filters: {
    getDate(value = '') {
      return value.split('-')[1];
    },
    getMonth(value = '') {
      return value.split('-')[0] + '月';
    }
  },
  created() {
    getArticleList(1)
      .then(result => {
        this.articleLists = result.data;
        this.cachedArtiles.set(1, this.articleLists); //缓存第一页数据
        this.pageSize = +result.meta.pageSize;
        this.totalArtiles = +result.meta.count;
      })
      .catch(() => {
        this.blogList = []; //数据为空
      });
  },
  methods: {
    getCurrentPage(page = 1) {
      if (this.cachedArtiles.has(page)) {
        this.articleLists = this.cachedArtiles.get(page);
        document.getElementById('backToTop').click();
      } else {
        this.NProgress.start();
        getArticleList(page).then(res => {
          if (res) {
            this.articleLists = res.data;
            this.cachedArtiles.set(page, this.articleLists); //缓存第一页数据
            document.getElementById('backToTop').click();
            this.NProgress.done();
          }
        });
      }
    },
    nextPage(page) {
      this.getCurrentPage(page);
    },
    prevPage(page) {
      this.getCurrentPage(page);
    }
  }
};
</script>

<style lang='less' scoped>
.posts .wrapper {
  perspective: 800px;
  transform-style: preserve-3d;
  
}
.posts .wrapper > article {
  background: rgba(255,255,255, .8);
  position: relative;
  padding-top: 2rem;
  margin-bottom: 5rem;
  padding-bottom: 2rem;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s;
  .description {
    padding: 1rem 3rem;
    color: #333;
    font-size: @font_small;
    text-align: left;
    line-height: 1.5rem;
  }
  .post-meta {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  &:hover {
    transform: translate3d(0, 0, 10px);
    box-shadow: 0 0 10px #dcdbff;
  }
  .post-title {
    padding: 0 1rem;
  }
  .post-title a {
    font-size: 1.6rem;
    font-weight: bold;
    padding-bottom: 0.5rem;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:after {
      content: '';
      display: inline-block;
      border-bottom: 2px solid @orange;
      width: 100%;
      position: absolute;
      bottom: 0;
      transition: transform 0.3s;
      left: 0;
      transform: translateX(-100%);
    }
    &:hover::after {
      transform: translateX(0);
    }
  }
  .bottom {
    margin-top: 3rem;
    .icon-gengduo {
      vertical-align: -5px;
    }
    .read-more {
      font-size: 0.9rem;
      color: #fff;
      background-color: @blue2;
      padding: 8px 10px;
      border-radius: 4px;
      transition: background-color 0.3s;
      &:hover {
        background-color: @baseFontColor;
      }
      b {
        margin-left: 2px;
        font-weight: 500;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .posts .wrapper > article .post-title a {
    width: 100%;
  }
  .posts .wrapper > article .description {
    padding: 0.6rem;
  }
}
</style>
