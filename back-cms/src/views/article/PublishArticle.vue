<template>
  <div class="publish-article">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column align="center" label="文章 ID" prop="article_id" min-width="100"></el-table-column>
      <el-table-column align="center" label="作者" prop="author" min-width="100"></el-table-column>
      <el-table-column align="center" label="标签" prop="tag" min-width="80"></el-table-column>
      <el-table-column align="center" label="访问量" prop="browse" min-width="80"></el-table-column>
      <el-table-column align="center" label="字数" prop="total_char" min-width="100"></el-table-column>
      <el-table-column align="center" label="标题" prop="title" min-width="180"></el-table-column>
      <el-table-column align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="dialogFormVisible = true">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="文章列表" :visible.sync="dialogFormVisible">
      <el-form :model="tableData[0]">
        <el-form-item
          :label="val"
          label-width="80px"
          v-for="(val, attr) in labels"
          :key="attr"
          :rules="[{required: true, message: `${val}不能为空`}]"
          :prop="attr" 
        >
          <el-input v-model="tableData[0][attr]" autocomplete="off">{{ attr }}</el-input>
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
    <el-button type="primary" @click="submit">发布文章</el-button>
  </div>
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import api from "@/api/article.js";
export default {
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
      dialogFormVisible: false,
      labels: {
        article_id: "文章ID",
        total_char: "字数",
        browse: "访问量",
        author: "作者",
        tag: "标签",
        cover: "封面",
        title: "标题"
      },
      tableData: [
        {
          author: "",
          tag: "",
          title: "",
          cover: "",
          article_id: "",
          browse: "",
          total_char: ""
        }
      ]
    };
  },

  methods: {
    /** 
     * 后台API http://localhost:8021/api/article/create
     * @创建文章
     * @GET请求
     * @params {
	        "title": STRING,
          "content": STRING,
          "tag": STRING,
          "total_char": INTEGER,
          "article_id": INTEGER,
          "author": STRING,
          "browse": INTEGER
        }
     * @success 
       @returns { 
         "msg": "添加成功",
         "success": true
        }
        ---------------------
        @failed
        @return {
          "msg": "不可重复创建",
          "errCode": 40012,
          "code": 412,
          "success": false
        }
     */
    submit() {
      const data = {};
      Object.assign(data, this.tableData[0], { content: this.quill.root.innerHTML });
      if (!this.quill.getText().trim()) {
        return this.$message.error("内容不能为空");
      }
      api
        .publishArticle(data)
        .then(res => {
          this.quill.root.innerHTML = ""; //清空编辑器;
          for (var i in this.tableData[0]) {
            //置空tableData
            this.tableData[0][i] = "";
          }
          this.$message({
            message: res.data.msg,
            duration: 1000
          })
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetDialog() {
      for (var i in this.addLists) {
        this.addLists[i] = "";
      }
    }
  }
};
</script>
<style scoped>
.publish-article {
  height: 70%;
}
.wrapper {
  height: 100%;
  margin: 25px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
</style>