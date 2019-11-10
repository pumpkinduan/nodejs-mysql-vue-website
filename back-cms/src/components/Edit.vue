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
          <el-button type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="editLists">
        <el-form-item
          :label="v"
          label-width="80px"
          v-for="(v, i) in labels"
          :key="i"
          :rules="[{required: i !== 'content', message: `${v}不能为空`}]"
        >
          <el-input v-model="editLists[i]" autocomplete="off" :disabled="i == 'content'"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetDialog()">重置</el-button>
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
export default {
  props: {
    title: String,
    labels: {
      type: Object,
      reqiured: true
    },
    editLists: Object,
    tableData: Array,
    cacheData: Map, //缓存条目数据
    amount: Number, //总条数-
    pageSize: Number, //每页的条数
    pageBtns: Number //页码按钮显示数量
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
      dialogFormVisible: false,
      search: ""
    };
  },
  methods: {
    submit() {
      const data = {},
        regSpecialCharacter = /[^\u4e00-\u9fa5\w]/gim; //匹配非字母数字_和汉字以外的字符,如标点符号
      Object.assign(data, this.editLists, {
        content: this.quill.root.innerHTML,
        total_char: this.quill.getText().replace(regSpecialCharacter,'').length
      });
      if (!this.quill.getText().trim()) return;
      this.$emit("submit", data);
      console.log(this.quill.root.innerHTML.replace(regSpace, ''))
    },
    handleDelete(index, row) {
      this.$emit("handleDelete", index, row);
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.$emit("handleEdit", index, row);
    },
    getCurrentItem(page) {
      this.$emit("getCurrentItem", page);
    },
    resetDialog() {
      this.$emit("resetDialog");
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