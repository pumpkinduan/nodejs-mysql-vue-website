<template>
  <div class="select-edit">
    <Edit
      :labels="labels"
      :tableData="tableData"
      :amount="amount"
      :pageSize="pageSize"
      :pageBtns="pageBtns"
      :cacheData="cacheData"
      @getCurrentItem="getCurrentItem"
      @handleDelete="handleDelete"
      @resetDialog="resetDialog"
    />
  </div>
</template>
<script>
import api from "@/api/article.js";
import Edit from "@/components/Edit";
export default {
  components: {
    Edit
  },
  created() {
    api
      .getAllLists()
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
      labels: {
        cover: "封面",
        title: "标题",
        tag: "标签",
        description: "描述"
      },
      tableData: [],
      id: "",
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5 //页码按钮显示数量
    };
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteArticle(row.article_id).then(res => {
            if (res.data && res.data.success) {
              this.$message.success(res.data.msg);
              this.tableData.splice(index, 1); //删除纪录
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    resetDialog() {
      for (let i in this.editLists) {
        this.editLists[i] = "";
      }
    },
    getCurrentItem(page) {
      //获取当前页的数据
      if (this.cacheData.has(page)) {
        //若是已经缓存数据了则不必发送网络请求
        this.tableData = this.cacheData.get(page); //从缓存中取数据
        return;
      }
      api
        .getAllLists({ page })
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
.select-edit{
  height: 70%;
}
</style>