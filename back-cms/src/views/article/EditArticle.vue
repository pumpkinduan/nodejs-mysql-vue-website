<template>
  <div class="edit-article">
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
      title="编辑文章"
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
      labels: {
        author: "作者",
        cover: "封面",
        title: "标题",
        tag: "标签",
        total_char: "字数",
        browse: "访问量"
      },
      editLists: {}, //待编辑的数据行
      tableData: [],
      id: "",
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5 //页码按钮显示数量
    };
  },
  methods: {
    submit(data) {
      api.updateArticle(data, this.id).then(res => {
        this.$refs.edit.quill.root.innerHTML = "";
        this.$message.success(res.data.msg);
      });
    },
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
    handleEdit(index, row) {
      this.id = row.article_id;
      this.editLists = this.tableData[index]; //将点击编辑按钮的那行数据与editLists对应
      api.getDetail(row.article_id).then(res => {
        //获取文章详情内容，进行编辑
        if (res.data && res.data.data) {
          this.$refs.edit.quill.root.innerHTML = res.data.data.content; //显示文章内容
        }
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
.edit-article {
  height: 70%;
}
</style>