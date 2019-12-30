<template>
  <div class="list">
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        :min-width="attr == 'title' ? 200 : 95"
        :fixed="attr == 'created_at'"
        v-for="(value, attr, index) in labels"
        :key="index"
        :sortable="attr == 'created_at' || attr == 'total_char' || attr=='browse'"
        :sort-method="attr == 'total_char' ? sortByAmount : attr == 'browse' ? sortByBrowse : null"
      ></el-table-column>
      <el-table-column min-width="220" align="center" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <slot name="only" :scopeProp="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <slot></slot>
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
import config from "@/config";
export default {
  props: {
    stay: {
      type: Boolean,
      default: false
    },
    tableData: Array,
    amount: Number, //总条数-
    pageSize: Number, //每页的条数
    pageBtns: Number, //页码按钮显示数量
    labels: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      search: "",
      serverUrl: config.serverUrl
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
    },
    getCurrentItem(page) {
      this.$emit("getCurrentItem", page);
    }
  }
};
</script>

<style scoped>
.list {
  height: 70%;
}
.el-pagination {
  text-align: right;
  margin-top: 15px;
}
</style>