<template>
  <div class="wrapper">
    <section class="quotation fl">
      <el-carousel :interval="1000000" arrow="never" height="240px">
        <el-carousel-item v-for="(item, index) in quotations" :key="index">
          <h1 class="clearfix">
            <span class="created-at fl">{{item.created_at}}</span>
            <span class="author fr">{{item.author}}</span>
          </h1>
          <p class="content" v-html="item.content"></p>
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>
<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      quotations: [],
      flag: false
    };
  },
  created() {
    api
      .getQuotationList()
      .then(result => {
        if (result.data && result.data.data.length) {
          this.quotations = result.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
/* 每日一句开始 */
.wrapper {
  position: relative;
  width: 50%;
    padding: 0 2rem;
}
.quotation {
  overflow: hidden;
  width: 100%;
  padding: 5rem 2rem 1rem 2rem;
  background-color: rgba(0, 0, 0, 0.85);
}
.quotation .el-carousel {
  overflow: hidden;
}
.quotation .el-carousel__item {
  transition: all 0.4s;
}
.quotation h1 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}
.quotation .content {
  font-weight: 500;
  color: #fff;
  line-height: 24px;
  font-size: 1rem;
}
@media screen and (max-width: 1200px) {
  .wrapper {
    width: 66%;
  }
}
@media screen and (max-width: 992px) {
  .wrapper {
    width: calc(100% - 2rem);
    margin: 0 2rem;
    padding-right: 4rem;
    padding-left: 0;
  }
  .quotation h1 span {
    width: 100%;
    margin: 16px 0;
  }
}
@media only screen and (min-width: 992px) {
  .quotation:hover .is-active {
    transform: scale(0.8, 1.1) translateY(20%) !important;
  }
}
/* 每日一句结束 */
</style>

