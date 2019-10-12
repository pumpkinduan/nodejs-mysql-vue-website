<template>
  <section class="every-day-wrapper">
    <div class="every-day-inner">
      <h2>每日一句</h2>
      <div class="content" v-html="every_day.content"></div>
      <span class="ctime fl">{{every_day.ctime}}</span>
      <span class="author fr">——— {{every_day.author}}</span>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      every_day: {}
    };
  },
   created() {
     this.$axios
      .post("/api/queryEveDay")
      .then(result => {
        this.every_day = result.data.data[0];
      })
      .catch(err => {
        console.log(err);
      });
   }
};
</script>
<style scoped>
.every-day-wrapper {
    margin: 40px auto;
    width: 70%;
    box-sizing: border-box;
    padding: 25px 6%;
    background-color: #e8e4e400;
    border-radius: 4px;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.07);
    transition: all 0.35s;
}

.every-day-wrapper:hover {
    box-shadow: 0px 0px 4px 5px rgba(0, 0, 0, 0.1);
}
.every-day-wrapper .every-day-inner h2 {
    width: 70%;
    padding-left: 6%;
    font-size: 22px;
    font-weight: 900;
    color: rgb(95, 93, 93);
    text-align: center;
}

.every-day-wrapper .every-day-inner .author {
    font-weight: 800;
    color: #8a8282;
}

.every-day-wrapper .every-day-inner .content {
    color: #777;
    font-size: 15px;
    line-height: 22px;
    text-indent: 2em;
    margin: 10px;
    font-weight: 600;
}

.ctime {
    color: #8a8282;
    font-size: 16px;
    font-weight: 800;
}
</style>

