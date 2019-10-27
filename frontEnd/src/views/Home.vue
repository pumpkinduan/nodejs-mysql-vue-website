<template>
  <div class="home">
    <Header />
    <main class="clearfix">
      <Quotation ref="quotation" />
      <div class="wrap">
        <Waterfall :cards="cards" ref="waterfall" @loadData="loadData">
          <template slot-scope="{data}">
            <ArticleCard :title="data.title" :tag="data.tag" :info="info" />
          </template>
        </Waterfall>
      </div>
    </main>
    <footer></footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Quotation from "@/components/Quotation.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import api from "@/api/index.js";
import Waterfall from "@/components/Waterfall";
export default {
  components: {
    Header,
    Quotation,
    ArticleCard,
    Waterfall
  },
  data() {
    return {
      cards: [],
      page: 1,
      info:
        "Lorem ipsum Sed eiusmod esse aliqua sed inwfwawfawfwafwafwafwafwfawawf"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(page) {
      api
        .getArticleList(page)
        .then(result => {
          this.cards = result.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadData(page) {
      this.getData(page);
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.home main {
  width: calc(100% - 2rem);
  margin: 0 1rem;
  position: relative;
}
.wrap {
  position: relative;
}
</style>

