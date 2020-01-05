<template>
  <div class="blogs">
    <div class="wrapper">
      <section v-for="(item, index) in articleLists" :key="index">
        <div class="post-date">
          <div class="post-month">{{item.date | getMonth}}</div>
          <div class="post-day">{{item.date | getDate}}</div>
        </div>
        <div class="post-badge">
          <router-link
            :to="{name: 'tag', params: {tag: item.tag}}"
            class="post-tag"
          >{{item.tag}}</router-link>
        </div>
        <router-link
          class="title"
          :to="{name: 'detail', params: {articleId: item.article_id}}"
        >
          <span>{{item.title}}</span>
        </router-link>
        <ul class="post-meta">
          <li class="post-time">发表于: {{item.created_at}}</li>
          <li class="post-browse">访问量: {{item.browse}}</li>
          <li class="post-words">字数: {{item.total_char}}</li>
        </ul>
        <div class="description">{{item.description}}</div>
        <div class="bottom">
          <router-link
            :to="{name: 'detail', params: {articleId: item.article_id}}"
            class="read-more"
          >
            <em>阅读更多</em>
            <i class="iconfont icon-gengduo" style="font-size: 1.5rem;"></i>
          </router-link>
        </div>
      </section>
      <section class="pagination-nav">
        <Pagination
          :totalData="commentSize"
          :pageSize="pageSize"
          @current-change="getCurrentPage"
          @next-page="nextPage"
          @prev-page="prevPage"
        />
      </section>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import api from "@/api/article.js";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      articleLists: [],
      pageSize: 5,
      curPage: 1,
      commentSize: 0,
      cachedBlogs: new Map()
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
     api
      .getArticleList(1)
      .then(result => {
        this.articleLists = result.data.data;
        this.cachedBlogs.set(1, this.articleLists); //缓存第一页数据
        this.pageSize = +result.data.meta.pageSize;
        this.commentSize = +result.data.meta.count;
      })
      .catch(err => {
        this.blogList = []; //数据为空
      });
  },
  methods: {
     getCurrentPage(page = 1) {
      if (this.cachedBlogs.has(page)) {
        this.articleLists = this.cachedBlogs.get(page);
        document.getElementById('backToTop').click();
      } else {
        api.getArticleList(page).then(res => {
          if (res.data) {
            this.articleLists = res.data.data;
            this.cachedBlogs.set(page, this.articleLists); //缓存第一页数据
            document.getElementById('backToTop').click();
          }
        });
      }
    },
    nextPage(page) {
      this.getCurrentPage(page)
    },
    prevPage(page) {
      this.getCurrentPage(page)
    }
  }
};
</script>

<style scoped>
.blogs {
  width: 100%;
}
.blogs .wrapper {
  perspective: 800px;
  transform-style: preserve-3d;
}
.blogs .wrapper > section {
  background: #fff;
  position: relative;
  padding-top: 2rem;
  margin-bottom: 5rem;
  padding-bottom: 2rem;
  text-align: center;
  border-radius: 8px;
  transition: all 0.3s;
}
.blogs .wrapper > section:hover {
  transform: translate3d(0, 0, 10px);
  box-shadow: 0 0 40px #dcdbff;
}
.blogs .wrapper > section .title span {
  display: inline-block;
  font-size: 1.6rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
}
.blogs .wrapper > section .title span::after {
  content: "";
  display: inline-block;
  border-bottom: 2px solid orange;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: transform 0.3s;
  left: 0;
  transform: translateX(-100%);
}
.blogs .wrapper > section .title span:hover::after {
  transform: translateX(0);
}
.blogs .wrapper > section .post-meta {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.blogs .wrapper > section .description {
  padding: 1rem 3rem;
  color: #333;
  font-size: 1rem;
  text-align: left;
  line-height: 1.5rem;
}
.blogs .wrapper > section .bottom {
  margin-top: 5rem;
}
.blogs .wrapper > section .bottom .read-more {
  font-size: 0.8rem;
  color: #fff;
  background-color: #97dffd;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.blogs .wrapper > section .bottom .read-more em {
  margin-left: 2px;
}
.blogs .wrapper > section .bottom .read-more:hover {
  background-color: #666;
}
.blogs .wrapper > section .bottom .icon-gengduo {
  vertical-align: -5px;
}
.blogs .wrapper > section.pagination-nav {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  padding: 1rem 0;
}
</style>