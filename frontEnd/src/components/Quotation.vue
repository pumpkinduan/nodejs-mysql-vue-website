<template>
  <div class="wrapper">
    <section class="quotation fl" ref="quotation">
      <el-carousel :interval="5000" arrow="never" height="300px">
        <el-carousel-item v-for="(item, index) in quotations" :key="index">
          <p class="content"> {{item.hitokoto}}</p>
          <h3 class="fr">~ {{item.from}} ~</h3>
        </el-carousel-item>
      </el-carousel>
    </section>
  </div>
</template>
<script>
import api from "@/api/hitokoto.js";
export default {
  data() {
    return {
      quotations: [],
      flag: false,
      timer: null,
      total: 0
    };
  },
  created() {
    this.getHitokoto();
    this.timer = setInterval(() => {
      this.getHitokoto();
    }, 10000);
  },
  mounted() {
    this.$emit("sendGap", this.$refs.quotation.offsetHeight);
  },
  methods: {
    getHitokoto() {
      //第三方获取
      api
        .getHitokoto()
        .then(res => {
          if (res.data) {
            if (this.quotations.length > 2) {
              clearInterval(this.timer);
            } else {
              this.quotations.push(res.data);
            }
          }
        })
        .catch(() => {
          this.quotations.push(
            ...[
              {
                creator: "挪威的森林",
                hitokoto:
                  "每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。即使是你最心爱的人，心中都会有一片你无法到达的森林。"
              },
              {
                creator: "挪威的森林",
                hitokoto: "死并非生的对立面，而作为生的一部分永存"
              },
              {
                creator: "朱元璋",
                hitokoto: "你的就是我的，我的还是我的"
              }
            ]
          );
        });
    }
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
  position: relative;
  width: 100%;
  font-size: 1rem;
  padding: 4rem 2rem 1rem 2rem;
  background: url("https://cn-south-227-storage-hitokoto-19627663.oss.dogecdn.com/pic/qf3cu.jpg") center center no-repeat;
  background-size: cover;
}
.quotation::before {
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
}
.quotation .el-carousel {
  overflow: hidden;
}
.quotation .el-carousel__item {
  transition: all 0.4s;
  z-index: 0;
}
.quotation h3 {
  font-weight: 500;
  font-size: 1.2rem;
  color: #dcd5d5e0;
  margin-top: 2rem;
}
.quotation .content {
  text-align: center;
  position: relative;
  letter-spacing: 2px;
  font-weight: 300;
  color: #f2f2f2;
  line-height: 28px;
  font-size: 1em;
  margin-top: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.quotation .content::before,
.quotation .content::after {
  position: absolute;
}
.quotation .content::before {
  content: "『";
  top: -1rem;
  left: 0;
}
.quotation .content::after {
  content: "』";
  bottom: -1rem;
  right: 0;
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

