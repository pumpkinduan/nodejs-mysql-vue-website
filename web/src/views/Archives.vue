<template>
  <div class="archive">
    <div class="archive-inner">
      <p class="archive-header">目前共计 {{count}} 篇文章。 (゜-゜)つロ cheers up~</p>
      <ol class="archive-nav" v-for="(item, index) in archives" :key="index">
        <li class="archive-year">{{item.year}}</li>
        <li class="archive-item" v-for="(c_item, c_index) in item.content" :key="c_index">
          <span class="archive-item-date">{{c_item.date}}</span>
          <router-link  :to="{name: 'detail', params: {articleId: item.article_id}}">
            <span class="archive-item-title">{{c_item.title}}</span>
          </router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  name: "archive",
  data() {
      return {
          archives: [],
          count: 0
      }
  },
   created() {
     api
      .getArchives()
      .then(result => {
        this.archives = result.data.data;
        this.count = result.data.meta.count;
      })
      .catch(err => {
        this.archives = []; //数据为空
      });
  },
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
  border-radius: 10px` 0 0 10px;
  padding: 0 1rem;
}
.archive .archive-header {
  font-size: 0.8rem;
  color: #444;
}
.archive .archive-nav .archive-year {
    font-size: 1.3rem;
    padding-top: 1.5rem;
    padding-bottom: 1.3rem;
    font-weight: 800;
    color: #555;
}
.archive .archive-nav .archive-item {
  position: relative;
  padding: 0.5rem 0;
}
.archive .archive-nav .archive-item::before {
    content: '';
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #333;
    position: absolute;
    top: 50%;
    transition: opacity .3s;
    transform: translateY(-50%);
    left: calc(-1.25rem - 2px);
    opacity: .5;
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