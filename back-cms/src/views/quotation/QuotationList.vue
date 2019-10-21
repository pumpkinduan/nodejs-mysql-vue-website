<template>
  <div class="quotation-list">
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :default-sort="{prop: 'created_at', order: 'descending'}"
    >
      <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        :min-width="attr == 'title' ? 200 : 95"
        :fixed="attr == 'created_at'"
        v-for="(value, attr, index) in labels"
        :key="index"
        :sortable="attr == 'created_at'"
      ></el-table-column>
      <el-table-column min-width="160" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="amount"
      :page-size="pageSize"
      :pager-count="pageBtns"
      @current-change="getCurrentItem"
    ></el-pagination>
  </div>
</template>

<script>
import api from "@/api/quotation.js";
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
  data() {
    return {
      search: "",
      tableData: [],
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5, //页码按钮显示数量
       labels: {
        q_id: "id",
        author: "作者",
        content: "内容"
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
.quotation-list {
  height: 70%;
}
.el-pagination {
  text-align: right;
  margin-top: 15px;
}
</style>