<template>
  <div class="edit">
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      align="center"
    >
      <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        min-width="100"
        fixed
        v-for="(value, attr, index) in labels"
        :key="index"
      ></el-table-column>
      <el-table-column align="center" min-width="180" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="info" v-if="flag" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <router-link v-else style="margin-right: 8px;" :to="{name: 'EditArticle', params: {article: scope.row}}">
            <el-button type="info">编辑</el-button>
          </router-link>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  props: {
    title: String,
    stay: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Object,
      reqiured: true
    },
    tableData: Array,
    cacheData: Map, //缓存条目数据
    amount: Number, //总条数-
    pageSize: Number, //每页的条数
    pageBtns: Number //页码按钮显示数量
  },
  data() {
    return {
      dialogFormVisible: false,
      search: "",
      flag: this.stay
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$emit("handleEdit", index, row);
    },
    handleDelete(index, row) {
      this.$emit("handleDelete", index, row);
    },
    getCurrentItem(page) {
      this.$emit("getCurrentItem", page);
    }
  }
};
</script>
<style scoped>
.edit {
  height: 100%;
}
.wrapper {
  height: 100%;
  margin: 20px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
.el-pagination {
  text-align: right;
  margin-top: 15px;
}
</style>