<template>
  <div class="article-list">
    <List 
        :labels="labels"
        :tableData="tableData"
        :amount="amount"
        :pageSize="pageSize"
        :pageBtns="pageBtns"
        :cacheData="cacheData"
        @getCurrentItem="getCurrentItem"
    />
  </div>
</template>

<script>
import api from "@/api/article.js";
import List from "@/components/List";
export default {
  created() {
    api
      .getLists()
      .then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
          this.amount = res.data.meta.count;
          this.pageSize = res.data.meta.pageSize;
          this.cacheData.set(1, res.data.data); //缓存第一页数据 {1 => [...]}
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
      List
  },
  data() {
    return {
      search: "",
      tableData: [],
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5, //页码按钮显示数量
      labels: {
        created_at: "日期",
        article_id: "id",
        total_char: "字数",
        browse: "访问量",
        author: "作者",
        tag: "标签",
        cover: "封面",
        title: "标题",
        description: "描述"
      }
    };
  },
  methods: {
    getCurrentItem(page) {
      //获取当前页的数据
      if (this.cacheData.has(page)) {
        //若是已经缓存数据了则不必发送网络请求
        this.tableData = this.cacheData.get(page); //从缓存中取数据
        return;
      }
      api
        .getLists({ page })
        .then(res => {
          if (res.data && res.data.data) {
            this.tableData = res.data.data; //更新显示数据
            this.cacheData.set(page, res.data.data); //缓存每次获取到的数据
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>

</style>