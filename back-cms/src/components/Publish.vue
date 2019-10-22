<template>
  <div class="publish">
    <el-table :data="tableData" style="width: 100%" align="center">
      <el-table-column
        align="center"
        :label="value"
        :prop="attr"
        :min-width="attr == 'title' ? 180 : 100"
        fixed
        v-for="(value, attr, index) in labels"
        :key="index"
      ></el-table-column>
      <el-table-column align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="dialogFormVisible = true">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
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
        <el-button @click="resetDialog">重置</el-button>
      </div>
    </el-dialog>
    <div class="wrapper">
      <div id="editor"></div>
    </div>
    <el-button type="primary" @click="submit">发布</el-button>
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
    tableData: Array,
    title: String
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
      dialogFormVisible: false
    };
  },

  methods: {
    submit() {
      const data = {};
      Object.assign(data, this.tableData[0], {
        content: this.quill.root.innerHTML
      });
      if (!this.quill.getText().trim()) {
        return this.$message.error("内容不能为空");
      }
      this.$emit("submit", data);
    },
    resetDialog() {
      this.$emit("resetDialog");
    }
  }
};
</script>
<style scoped>
.publish {
  height: 100%;
}
.wrapper {
  height: 100%;
  margin: 25px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
</style>