<template>
  <div class="article-list">
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :default-sort="{prop: 'created_at', order: 'descending'}"
    >
      <el-table-column label="日期" prop="created_at" align="center" min-width="90" sortable fixed></el-table-column>
      <el-table-column label="文章ID" prop="article_id" align="center" min-width="80"></el-table-column>
      <el-table-column label="作者" prop="author" align="center" min-width="80"></el-table-column>
      <el-table-column
        label="访问量"
        prop="browse"
        align="center"
        min-width="100"
        sortable
        :sort-method="sortByBrowse"
      ></el-table-column>
      <el-table-column label="标签" prop="tag" align="center" min-width="80"></el-table-column>
      <el-table-column label="封面" prop="cover" align="center" min-width="100"></el-table-column>
      <el-table-column
        label="字数"
        prop="total_char"
        align="center"
        min-width="100"
        sortable
        :sort-method="sortByAmount"
      ></el-table-column>
      <el-table-column label="题目" prop="title" align="center" min-width="200"></el-table-column>
      <el-table-column min-width="160" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/article.js";
export default {
  created() {
    api.getLists().then((res) => {
      if(res.data && res.data.data) {
        this.tableData = res.data.data;
              }
    }).catch( (err) => {
      console.log(err)
    });
  },
  data() {
    return {
      search: "",
      tableData: []
    };
  },
  methods: {
    sortByBrowse(list1, list2) {
      var browse1 = parseInt(list1.browse);
      var browse2 = parseInt(list2.browse);
      return browse1 - browse2;
    },
    sortByAmount(list1, list2) {
      var total1 = parseInt(list1.total_char);
      var total2 = parseInt(list2.total_char);
      return total1 - total2;
    }
  }
};
</script>

<style scoped>
.article-list {
  height: 70%;
}
</style>