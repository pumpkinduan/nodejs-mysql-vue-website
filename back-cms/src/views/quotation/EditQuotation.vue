<template>
  <div class="edit-quotation">
    <el-table :data="tableData" style="width: 100%" align="center">
         <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        :min-width="attr == 'content' ? 180 : 100"
        fixed
        v-for="(value, attr, index) in labels"
        :key="index"
      >
      </el-table-column>
      <el-table-column align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="每日一句" :visible.sync="dialogFormVisible">
      <el-form :model="editQuotations">
        <el-form-item :label="v" label-width="80px" v-for="(v, i) in labels" :key="i">
          <el-input v-model="editQuotations[i]" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetDialog('addLists')">重置</el-button>
      </div>
    </el-dialog>
    <div class="wrapper">
      <div id="editor"></div>
    </div>
    <el-button type="primary" @click="submit">完成修改</el-button>
  </div>
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
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
  mounted() {
    //必须等到DOM元素挂载到页面上去才可操作DOM生成富文本编辑器
    const toolbarOptions = [
      // toolbar btns
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"], // toggled buttons
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }, { align: [] }],
      ["clean", "image", "link", "video"] // add upload image btn
    ];
    let quill = new Quill("#editor", {
      placeholder: "让你的手动起来吧！！！",
      theme: "snow",
      modules: {
        toolbar: {
          container: toolbarOptions,
          handler: {
            image(value) {
              console.log("1111");
              console.log(value);
            }
          }
        }
      }
    });
    this.quill = quill;
  },
  data() {
    return {
      id: "",
      search: "",
      dialogFormVisible: false,
      editQuotations: {}, //待编辑的数据行
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
    submit() {
      const data = {};
      Object.assign(data, this.editQuotations, {
        content: this.quill.root.innerHTML
      });
      if (!this.quill.getText().trim()) {
        return this.$message.error("内容不能为空");
      }
      api
        .updateQuotation(this.id, data)
        .then(res => {
          this.quill.root.innerHTML = ""; //清空编辑器;
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
      this.quill.root.innerHTML = row.content;
    },
    handleDelete(index, row) {
      this.dialogFormVisible = true;
      this.$confirm("此操作将永久删除该条语录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.deleteQuotation(row.article_id).then(res => {
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
.wrapper {
  height: 100%;
  margin: 25px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
.el-pagination {
  text-align: right;
  margin-top: 15px;
}
</style>