<template>
  <article class="card" ref="card">
    <div class="inner">
      <h1 class="cover" @click="show">
        <viewer @inited="inited" class="viewer" ref="viewer">
          <template slot-scope="scope">
            <img :src="`${serverUrl}/${cover}`" width="100%" />
            {{scope.options}}
          </template>
        </viewer>
      </h1>
      <section class="img-meta">
        <p class="date">{{created_at}}</p>
        <p class="title">{{title}}</p>
      </section>
    </div>
  </article>
</template>
<script>
import config from "@/config.js";
import { relative } from "path";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component.vue";
export default {
  components: {
    Viewer
  },
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
  ],
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    }
  }
};
</script>
<style scoped>
.card .inner {
  border: 1px solid #eee;
  transition: all .3s;
  transform-style: preserve-3d;
  perspective: 800px;
}
.card .inner:hover {
  transform: translate3d(0,10px,20px);
  box-shadow: 0 40px 28px -24px rgba(136,161,206,0.3);
}
.card .inner .img-meta {
  padding: 1rem;
  transition: background-color 0.3s;
}
.card .inner .img-meta:hover {
  background-color: #f8f8f8;
}

.card .inner .img-meta:hover .title {
  color: rgb(221, 145, 3);
}
.card .inner .cover {
  position: relative;
  cursor: zoom-in;
}
.card .inner .cover:before,
.card .inner .cover:after {
  display: block;
  position: absolute;
  opacity: 0;
  transition: all 0.35s;
  z-index: 1;
}
.card .inner .cover:before {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  content: "";
  top: 0;
  left: 0;
}
.card .inner .cover:after {
  content: "Zoom in";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: #ddd;
}
.card .inner .cover img {
  transition: all 0.35s;
  margin: 0;
  cursor: zoom-out;
}
.card .inner .cover:hover::before,
.card .inner .cover:hover::after {
  opacity: 1;
}
.card .inner .img-meta .date {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 400;
}
.card .inner .img-meta .title {
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.card .inner .img-meta .description {
  font-size: 0.8rem;
  color: #444;
  font-weight: 500;
  line-height: 1.5rem;
  word-break: break-all;
}
</style>

