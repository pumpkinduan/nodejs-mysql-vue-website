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
              :created_at="data.created_at"
              :description="data.description"
              :browse="data.browse"
              :cover="data.cover"
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
  name: "Home",
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
      api.getArticleList(page).then(result => {
        this.cards.push(...result.data.data);
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
  margin-top: 1.2rem;
}
.wrap {
  position: relative;
}
</style>

