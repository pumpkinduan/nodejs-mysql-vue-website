<template>
  <div class="list">
    <div class="list-inner">
      <p class="list-header">
        <b class="list-header-tag">{{tag}}</b>
        分类文章共有
        <strong class="list-header-count">{{count}}</strong>篇。 (゜-゜)つロ 加油~
      </p>
      <ol class="list-nav" v-for="(item, index) in archives" :key="index">
        <li class="list-item">
          <span class="list-item-date">{{item.created_at}}</span>
          <router-link :to="{name: 'detail', params: {articleId: item.article_id}}">
            <span class="list-item-title">{{item.title}}</span>
          </router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  name: "list",
  prop: {
    lists: { type: Array }
  },
  data() {
    return {
      lists: this.lists
    };
  }
};
</script>

<style scoped>
.list {
  padding: 2rem 3rem;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 5px;
}
.list .list-inner {
  border-left: 4px solid #eee;
  padding: 0 1rem;
}
.list-header {
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #444;
}
.list-header .list-header-count {
  color: #ff4d00;
  font-size: 1.2rem;
  margin: 0 3px;
}

.list-nav .list-item {
  position: relative;
  padding: 0.5rem 0;
}
.list-nav .list-item::before {
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
.list-nav .list-item:hover::before {
  opacity: 1;
}
.list-nav .list-item .list-item-date {
  color: #00a7e0;
  font-size: 0.9rem;
  margin-right: 10px;
}
.list-nav .list-item a .list-item-title {
  color: #555;
  font-size: 1rem;
}
.list-nav .list-item a .list-item-title:hover {
  color: #ff4d00;
}
</style>