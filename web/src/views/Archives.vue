<template>
  <div class="archive">
    <div class="archive-inner">
      <p class="archive-header">
        <template v-if="!tag">
          目前共计
          <strong class="archive-header-count">{{archive_count}}</strong>篇日志。 (゜-゜)つロ 干杯~
        </template>
        <template v-else>
          <b class="archive-header-tag">{{tag}}</b>
          分类文章共有
          <strong class="archive-header-count">{{tag_count}}</strong>篇。 (゜-゜)つロ 加油~
        </template>
      </p>
      <ol class="archive-nav" v-for="(item, index) in posts" :key="index">
        <template v-if="item.content">
          <li class="archive-year">{{item.year}}</li>
          <li class="archive-item" v-for="(c_item, c_index) in item.content" :key="c_index">
            <span class="archive-item-date">{{c_item.date}}</span>
            <router-link :to="{name: 'detail', params: {articleId: c_item.article_id}}">
              <span class="archive-item-title">{{c_item.title}}</span>
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="archive-item">
            <span class="archive-item-date">{{item.created_at}}</span>
            <router-link :to="{name: 'detail', params: {articleId: item.article_id}}">
              <span class="archive-item-title">{{item.title}}</span>
            </router-link>
          </li>
        </template>
      </ol>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  props: ["archives", "archive_count"],
  name: "archive",
  data() {
    return {
      tag: "",
      tag_count: "",
      posts: this.archives
    };
  },
  created() {
    // index 表示进入 总文章归档 界面
    if (this.$route.params.tag == 'index') return;
    this.searchArticle(this.$route.params.tag);
  },
  methods: {
    //根据标签获取对应的归档
    searchArticle(tag) {
      api
        .getArticleListsByTag(tag)
        .then(res => {
          if (res.data) {
            this.tag = tag;
            this.posts = res.data.data;
            this.tag_count = res.data.meta.count;
          }
        })
        .catch(err => {
          this.posts = []; //数据为空
        });
    }
  }
};
</script>

<style scoped>
.archive {
  padding: 2rem 3rem;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 5px;
}
.archive .archive-inner {
  border-left: 4px solid #eee;
  padding: 0 1rem;
}
.archive .archive-header {
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #444;
}
.archive .archive-header .archive-header-count {
  color: #ff4d00;
  font-size: 1.2rem;
  margin: 0 3px;
}
.archive .archive-header .archive-header-tag {
  color: #ff8a00;
  font-size: 1.2rem;
}
.archive .archive-nav .archive-year {
  font-size: 1.3rem;
  padding-top: 0.5rem;
  padding-bottom: 1.3rem;
  font-weight: 800;
  color: #555;
}
.archive .archive-nav .archive-item {
  position: relative;
  padding: 0.5rem 0;
}
.archive .archive-nav .archive-item::before {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #333;
  position: absolute;
  top: 50%;
  transition: opacity 0.3s;
  transform: translateY(-50%);
  left: calc(-1.25rem - 2px);
  opacity: 0.5;
}
.archive .archive-nav .archive-item:hover::before {
  opacity: 1;
}
.archive .archive-nav .archive-item .archive-item-date {
  color: #00a7e0;
  font-size: 0.9rem;
  margin-right: 10px;
}
.archive .archive-nav .archive-item a .archive-item-title {
  color: #555;
  font-size: 1rem;
}
.archive .archive-nav .archive-item a .archive-item-title:hover {
  color: #ff4d00;
}
</style>