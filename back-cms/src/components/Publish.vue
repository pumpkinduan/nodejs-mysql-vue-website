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
      <el-upload
        class="picture-upload"
        ref="upload"
        :action="remoteUrl"
        name="picture"
        :file-list="fileList"
        :on-success="uploadSuccess"
      >
      </el-upload>
      <quill-editor v-model="content" ref="quillEditor" :options="editorOption"></quill-editor>
    </div>
    <el-button type="primary" @click="submit">发布</el-button>
  </div>
</template>
<script>
const toolbarOptions = [
  // toolbar btns
  ["bold", "italic", "underline", "strike", "blockquote", "code-block"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ size: [false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }, { align: [] }],
  ["clean", "image"] // add upload image btn
];
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
export default {
  components: {
    quillEditor
  },
  props: {
    title: String,
    labels: {
      type: Object,
      reqiured: true
    },
    tableData: Array,
    title: String
  },
  data() {
    return {
      dialogFormVisible: false,
      remoteUrl: "/api/upload/picture", //服务器处理图片的接口地址
      fileList: [],
      content: "",
      editorOption: {
        placeholder: "让你的手动起来吧！！！",
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  //value->true :表示点击了图片上传选项
                  //触发 el-upload身上的点击上传事件
                  document.querySelector(".picture-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },

  methods: {
    submitUpload() {
      this.$confirm("即将开始上传图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.upload.submit(); //开始上传
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    uploadSuccess(response, file, fileList) {
      let quill = this.$refs.quillEditor.quill;
      //获取光标的位置
      let position = quill.getSelection().index;
      //插入img标签到光标显示处
      quill.insertEmbed(
        position,
        "image",
        `api/getPicture?path=${response.path.replace(/\\/gi, "/")}&mimetype=${
          file.raw.type
        }`
      );
      //光标到最后
      quill.setSelection(position + 1);
    },
    submit() {
      //匹配非字母数字_和汉字以外的字符,如标点符号
      const data = {},
        regSpecialCharacter = /[^\u4e00-\u9fa5\w]/gim;
      Object.assign(data, this.tableData[0], {
        content:  this.$refs.quillEditor.quill.root.innerHTML,
        total_char:  this.$refs.quillEditor.quill.root.innerText.replace(regSpecialCharacter, "")
          .length
      });
      if (!this.$refs.quillEditor.quill.root.innerText.trim()) {
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
.wrapper .quill-editor {
  height: calc(100% - 100px) !important;
}
</style>