<template>
  <div class="edit-quotation">
   <Edit
       ref="edit"
      :labels="labels"
      :tableData="tableData"
      :amount="amount"
      :pageSize="pageSize"
      :pageBtns="pageBtns"
      :cacheData="cacheData"
      :editLists="editLists"
      @getCurrentItem="getCurrentItem"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @submit="submit"
      @resetDialog="resetDialog"
      title="关于我的信息编辑"
    />
  </div>
</template>
<script>
import api from "@/api/quotation.js";
import Edit from "@/components/Edit";
export default {
  components: {
    Edit
  },
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
      id: "",
      search: "",
      dialogFormVisible: false,
      editLists: {}, //待编辑的数据行
      labels: { 
        q_id: "id",
        author: "作者",
        content: "内容",
      },
      cacheData: new Map(),
      tableData: [],
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5 //页码按钮显示数量
    };
  },

  methods: {
    submit(data) {
      api
        .updateQuotation(this.id, data)
        .then(res => {
          this.$refs.edit.quill.root.innerText = ""; //清空编辑器;
          this.$message({
            message: res.data.msg,
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.editQuotations = row;
      this.id = row.q_id;
      this.$refs.edit.quill.root.innerText = row.content;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条语录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteQuotation(row.q_id).then(res => {
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
      for (var i in this.addLists) {
        this.addLists[i] = "";
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
.edit-quotation {
  height: 70%;
}
</style>