<template>
  <div class="archive">
    <div class="archive-inner">
      <p class="archive-header">
        <template>
          <b class="archive-header-tag">{{tag}}</b>
          分类文章共有
          <strong class="archive-header-count">{{tag_count}}</strong>篇。 (゜-゜)つロ 加油~
        </template>
      </p>
      <ol class="archive-nav" v-for="(item, index) in links" :key="index">
        <template>
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
import api from '@/api/article.js';
export default {
  name: 'tag',
  data() {
    return {
      tag: '',
      tag_count: '',
      links: [],
      archive_count: 0
    };
  },
  created() {
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
            this.links = res.data.data;
            this.tag_count = res.data.meta.count;
          }
        })
        .catch(() => {
          this.links = []; //数据为空
        });
    }
  }
};
</script>

<style scoped>
@import "~@/assets/css/archive.css";
</style>