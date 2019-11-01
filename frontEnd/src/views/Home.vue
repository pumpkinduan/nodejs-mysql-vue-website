<template>
  <div class="home">
    <Header />
    <main class="clearfix">
      <Quotation ref="quotation" @sendGap="sendGap" />
      <div class="wrap">
        <Waterfall :cards="cards" ref="waterfall" @loadData="loadData" :gap="gap">
          <template slot-scope="{data}">
            <ArticleCard
              :title="data.title"
              :article_id="data.article_id"
              :tag="data.tag"
              :description="data.description"
            />
          </template>
        </Waterfall>
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Quotation from "@/components/Quotation.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import api from "@/api/index.js";
import Waterfall from "@/components/Waterfall";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Quotation,
    ArticleCard,
    Waterfall,
    Footer
  },
  data() {
    return {
      cards: [],
      gap: 300,
      page: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    sendGap(gap) {
      this.gap = gap;
    },
    getData(page) {
      api
        .getArticleList(page)
        .then(result => {
          this.cards = result.data.data;
        })
        .catch(err => {
          this.cards = []; //数据为空
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
  width: 100%;
  padding: 0 3rem;
  position: relative;
}
.wrap {
  position: relative;
}
</style>

