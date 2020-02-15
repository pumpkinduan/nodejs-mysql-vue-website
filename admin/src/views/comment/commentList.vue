<template>
  <div class="comment-list">
    <List
      :labels="labels"
      :tableData="tableData"
      :amount="amount"
      :pageSize="pageSize"
      :pageBtns="pageBtns"
      @getCurrentItem="getCurrentItem"
    >
      <template slot="only" slot-scope="{scopeProp}">
        <el-button type="danger" @click="handleDelete(scopeProp.$index, scopeProp.row)">删除</el-button>
        <el-button type="info" @click="hanldeReply(scopeProp.row)">回复</el-button>
      </template>
    </List>
    <el-dialog title="来自南瓜的回复" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item :label="labelPrompt" label-width="100">
          <el-input v-model="myReply" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import commenter from "@/api/comment.js";
import replyer from "@/api/reply.js";
import List from "@/components/List";
export default {
  components: {
    List
  },
  data() {
    return {
      labelPrompt: '',
      myReply: "",
      row: "",
      dialogFormVisible: false,
      search: "",
      tableData: [],
      cacheData: new Map(), //缓存条目数据
      amount: 0, //总条数-
      pageSize: 5, //每页的条数
      pageBtns: 5, //页码按钮显示数量
      labels: {
        created_at: "日期",
        id: "id",
        name: "名字",
        content: "留言",
        article_title: "留言的文章标题"
      },
      curPage: 1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      commenter.getCommentAll().then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
          this.amount = res.data.meta.count;
          this.pageSize = res.data.meta.pageSize;
          this.cacheData.set(1, res.data.data); //缓存第一页数据 {1 => [...]}
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          commenter.deleteComment(row.id).then(res => {
            if (res.data && res.data.success) {
              this.$message.success(res.data.msg);
              this.tableData.splice(index, 1); //删除纪录
              this.amount--;
              if (this.tableData.length == 0) {
                this.cacheData.delete(this.curPage);
              }
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
    hanldeReply(row) {
      this.dialogFormVisible = true;
      this.labelPrompt = '回复 '+row.name;
      this.row = row;
    },
    submitReply() {
      let row = this.row;
      let reply = {
        name: "南瓜",
        content: this.myReply,
        comment_id: row.id,
        parent_comment: row.content,
        parent_name: row.name
      };
      replyer.createReply(reply).then(res => {
        if (!res.data.success) return;
        this.dialogFormVisible = false;
        this.$message.success('回复成功');
      });
    },
    getCurrentItem(page) {
      //获取当前页的数据
      this.curPage = page;
      if (this.cacheData.has(page)) {
        //若是已经缓存数据了则不必发送网络请求
        this.tableData = this.cacheData.get(page); //从缓存中取数据
        return;
      }
      commenter.getCommentAll({ page }).then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data; //更新显示数据
          this.cacheData.set(page, res.data.data); //缓存每次获取到的数据
        }
      });
    }
  }
};
</script>

<style scoped>
</style>