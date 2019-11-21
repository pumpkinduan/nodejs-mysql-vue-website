<template>
  <article class="card">
    <div class="inner">
      <h1 class="cover">
        <router-link :to="{name: 'detail', params: {articleId: `${article_id}`, showList: false}}">
          <img :src="`${serverUrl}/${cover}`" width="100%" />
        </router-link>
      </h1>
      <section class="wrap">
        <p class="date">{{created_at}}</p>
        <router-link
          :to="{name: 'detail', params: {articleId: `${article_id}`, showList: false}, browse: browse}"
        >
          <p class="title">{{title}}</p>
        </router-link>
        <div class="description">{{description}}</div>
      </section>
    </div>
  </article>
</template>
<script>
import config from "@/config.js";
export default {
  data() {
    return {
      serverUrl: config.serverUrl
    };
  },
  props: [
    "title",
    "created_at",
    "cover",
    "src",
    "description",
    "article_id",
    "browse"
  ]
};
</script>
<style scoped>
.card .inner {
  border: 1px solid #eee;
}
.card .inner .wrap {
  padding: 1.2rem;
  transition: background-color .3s;
}
.card .inner .wrap:hover {
  background-color: #f8f8f8;
}
.card .inner .wrap:hover .title {
  color: rgb(221, 145, 3);
}
.card .inner .cover {
  overflow: hidden;
  position: relative;
}
.card .inner .cover a {
  width: 100%;
  display: block;
}
.card .inner .cover a:before,
.card .inner .cover a:after {
  display: block;
  position: absolute;
  opacity: 0;
  transition: all 0.35s;
  z-index: 1;
}
.card .inner .cover a:before {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  content: "";
  top: 0;
  left: 0;
}
.card .inner .cover a:after {
  content: "Let's go";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #ddd;
}
.card .inner .cover img {
  transition: all 0.35s;
  margin: 0;
}
.card .inner .cover:hover a img {
  transform: scale(1.1);
}
.card .inner .cover:hover a::before,
.card .inner .cover:hover a::after {
  opacity: 1;
}
.card .inner .wrap .date {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 400;
}
.card .inner .wrap .title {
  color: #333;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.card .inner .wrap .description {
  font-size: 0.8rem;
  color: #444;
  font-weight: 500;
  line-height: 1.5rem;
  word-break: break-all;
}
</style>

