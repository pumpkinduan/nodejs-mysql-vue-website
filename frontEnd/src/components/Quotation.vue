<template>
  <div class="wrapper">
    <section class="quotation fl" ref="quotation">
      <el-carousel :interval="3000" arrow="never" height="300px">
        <el-carousel-item v-for="(item, index) in quotations" :key="index">
          <h1 class="clearfix">
            <span class="created-at fl">{{format()}}</span>
            <span class="author fr">{{item.from}}</span>
          </h1>
          <p class="content" v-html="item.hitokoto"></p>
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>
<script>
import api from "@/api/index.js";
import { format } from "@/lib/formatTime.js";
export default {
  data() {
    return {
      quotations: [],
      flag: false,
      format: format,
      timer: null
    };
  },
  mounted() {
    this.$emit("sendGap", this.$refs.quotation.offsetHeight);
  },
  methods: {
    getHitokoto() {
      api.getHitokoto().then(res => {
        if (this.quotations.length > 2) {
          clearInterval(this.timer);
        } else {
          this.quotations.push(res.data);
        }
      });
    }
  },
  created() {
    // api
    //   .getQuotationList()
    //   .then(result => {
    //     if (result.data && result.data.data.length) {
    //       this.quotations = result.data.data;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    this.getHitokoto();
    this.timer = setInterval(() => {
      this.getHitokoto();
    }, 10000);
  }
};
</script>
<style scoped>
/* 每日一句开始 */
.wrapper {
  position: relative;
  width: 50%;
  padding: 0 1rem;
}
.quotation {
  width: 100%;
  font-size: 1rem;
  padding: 4rem 2rem 1rem 2rem;
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
  font-weight: 300;
  color: #dcd5d5e0;
  line-height: 24px;
  font-size: 1em;
}
@media screen and (max-width: 1200px) {
  .wrapper {
    width: 66%;
  }
}
@media screen and (max-width: 992px) {
  .wrapper {
    width: 100%;
  }
}
@media only screen and (max-width: 600px) {
  .quotation {
    padding-top: 1rem;
    font-size: 0.8rem;
  }
  .quotation h1 span {
    width: 100%;
    margin: 12px 0;
  }
}
@media only screen and (min-width: 600px) {
  .quotation:hover .is-active {
    transform: scale(0.8, 1.1) translateY(20%) !important;
  }
}
/* 每日一句结束 */
</style>

