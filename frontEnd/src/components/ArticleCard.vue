<template>
  <article class="card">
    <div class="inner">
      <h1 class="cover">
        <router-link :to="{name: 'detail', params: {articleId: `${article_id}`, showList: false}}">
          <img src="../assets/image/diagonal-building.jpg" width="100%" />
        </router-link>
      </h1>
      <section>
        <p class="tag">{{tag}}</p>
        <router-link :to="{name: 'detail', params: {articleId: `${article_id}`, showList: false}}">
          <p class="title">{{title}}</p>
        </router-link>
        <div class="description">{{description}}</div>
      </section>
    </div>
  </article>
</template>
<script>
export default {
  props: ["title", "tag", "cover", "src", "description", "article_id"],

};
</script>
<style scoped>
.card .inner {
  border: 1px solid #eee;
}
.card .inner section {
  padding: 1.2rem;
}

.card .cover {
  overflow: hidden;
  position: relative;
}
.card .cover a:before,
.card .cover a:after {
  display: block;
  position: absolute;
  opacity: 0;
  transition: all 0.35s;
  z-index: 1;
}
.card .cover a:before {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  content: "";
  top: 0;
  left: 0;
}
.card .cover a:after {
  content: "Let's go";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #ddd;
}
.card .cover img {
  transition: all 0.35s;
}
.card .cover:hover a img {
  transform: scale(1.1);
}
.card .cover:hover a::before,
.card .cover:hover a::after {
  opacity: 1;
}
.card .tag {
  color: #666;
  margin: 1.2rem 0;
  font-size: 1rem;
   font-weight: 400;
}
.card .title {
  color: #223;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}
.card .description {
  font-size: 1.3rem;
  color: #666;
  line-height: 1.5rem;
  word-break: break-all;
}
</style>

