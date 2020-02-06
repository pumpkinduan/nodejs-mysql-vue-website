<template>
  <div class="archive">
    <div class="archive-inner">
      <p class="archive-header">
        <template>
          目前共计
          <strong class="archive-header-count">{{archive_count}}</strong>篇日志。 (゜-゜)つロ 干杯~
        </template>
      </p>
      <ol class="archive-nav" v-for="(item, index) in archives" :key="index">
        <template>
          <li class="archive-year">{{item.year}}</li>
          <li class="archive-item" v-for="(c_item, c_index) in item.content" :key="c_index">
            <span class="archive-item-date">{{c_item.date}}</span>
            <router-link :to="{name: 'detail', params: {articleId: c_item.article_id}}">
              <span class="archive-item-title">{{c_item.title}}</span>
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
  name: 'archive',
  data() {
    return {
      tag: '',
      tag_count: '',
      archives: [],
      archive_count: 0
    };
  },
  created() {
      // 刷新页面时，重新获取数据
      api.getArchives().then(res => {
        if (res.data) {
          this.archives = res.data.data;
          this.archive_count = res.data.meta.count;
        }
      });
  }
};
</script>

<style scoped>
@import "~@/assets/css/archive.css";
</style>