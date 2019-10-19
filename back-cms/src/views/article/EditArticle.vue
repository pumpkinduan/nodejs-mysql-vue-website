<template>
  <div class="edit-article">
    <el-table :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" style="width: 100%" align="center">
      <el-table-column align="center" label="文章 ID" prop="article_id" min-width="100" fixed></el-table-column>
      <el-table-column align="center" label="作者" prop="author" min-width="100"></el-table-column>
      <el-table-column align="center" label="标签" prop="tag" min-width="80"></el-table-column>
      <el-table-column align="center" label="封面" prop="cover" min-width="180"></el-table-column>
      <el-table-column align="center" label="访问量" prop="browse" min-width="80"></el-table-column>
      <el-table-column align="center" label="字数" prop="total_char" min-width="100"></el-table-column>
      <el-table-column align="center" label="标题" prop="title" min-width="180"></el-table-column>
      <el-table-column align="center" min-width="180" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="文章列表" :visible.sync="dialogFormVisible">
      <el-form :model="editLists">
        <el-form-item :label="v" label-width="80px" v-for="(v, i) in labels" :key="i">
          <el-input v-model="editLists[i]" autocomplete="off">{{i}}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetDialog('editLists')">重置</el-button>
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
import api from "@/api/article.js";
export default {
  created() {
    api
      .getLists()
      .then(res => {
        if (res.data && res.data.data) {
          this.tableData = res.data.data;
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
      search: "",
      dialogFormVisible: false,
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
      id: ""
    };
  },
  methods: {
    submit() {
      const data = {};
      Object.assign(data, this.editLists, {
        content: this.quill.root.innerHTML
      });
      if (!this.quill.getText().trim()) return;
      api.updateArticle(data, this.id).then(res => {
        this.quill.root.innerHTML = "";
        this.$message.success(res.data.msg);
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.deleteArticle(row.article_id).then(res => {
          if (res.data && res.data.success) {
            this.$message.success(res.data.msg);
            this.tableData.splice(index, 1);//删除纪录
          }
        });
      }).catch( () => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(index, row) {
      this.id = row.article_id;
      this.dialogFormVisible = true; //显示填写框
      this.editLists = this.tableData[index]; //将点击编辑按钮的那行数据与editLists对应
      api.getDetail(row.article_id).then(res => {
        //获取文章详情内容，进行编辑
        if (res.data && res.data.data) {
          this.quill.root.innerHTML = res.data.data.content; //显示文章内容
        }
      });
    },
    resetDialog() {
      for (var i in this.editLists) {
        this.editLists[i] = "";
      }
    },
    confirm() {
      this.dialogFormVisible = false;
    }
  }
};
</script>
<style scoped>
.edit-article {
  height: 70%;
}
.wrapper {
  height: 100%;
  margin: 20px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
</style>