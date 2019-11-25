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
        <el-table-column min-width="240" fixed="right" label="封面" align="center">
       <template slot-scope="scope">
          <img style="width:100%" :src="`${serverUrl}/${scope.row.cover}`" alt="待上传">
       </template>
      </el-table-column>
      <el-table-column align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="info" @click="dialogFormVisible = true">{{btnText}}</el-button>
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
          <el-input :disabled="attr == 'cover'" v-model="tableData[0][attr]" autocomplete="off">{{ attr }}</el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="resetDialog">重置</el-button>
      </div>
    </el-dialog>
    <div class="wrapper">
      <slot :serverUrl="serverUrl"></slot>
      <el-upload
        class="picture-upload"
        ref="upload"
        :action="`${serverUrl}/api/upload`"
        name="picture"
        :file-list="fileList"
        :on-success="uploadSuccess"
        :on-error="uploadErr"
      ></el-upload>
      <quill-editor ref="quillEditor" :options="editorOption"></quill-editor>
      <el-dropdown @command="submit" trigger="click" v-if="!edit">
        <span class="el-dropdown-link">
          请选择发表文章类型
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="0">普通文章</el-dropdown-item>
          <el-dropdown-item :command="1">博客文章</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button class="edit-btn" type="primary" @click="submit" v-else>修改完成，点击提交</el-button>
    </div>
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
  ["clean", "link", "image"] // add upload image btn
];
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import config from "@/config.js"
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
    btnText: String,
    edit: Boolean
  },
  data() {
    return {
      serverUrl: config.serverUrl,
      dialogFormVisible: false,
      fileList: [],
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
    uploadErr() {
      this.$message.error("upload failed");
    },
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
        `${this.serverUrl}/${response.path.replace(/\\/gi, "/")}`
      );
      //光标到最后
      quill.setSelection(position + 1);
    },
    submit(type) {
      const data = this.edit ? {} : { type },//修改文章不用传递type值
        regSpecialCharacter = /[^\u4e00-\u9fa5\w]/gim;
      Object.assign(data, this.tableData[0], {
        content: this.$refs.quillEditor.quill.root.innerHTML,
        total_char: this.$refs.quillEditor.quill.root.innerText.replace(
          regSpecialCharacter,
          ""
        ).length
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
  height: 600px !important;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-weight: 800;
}
.el-dropdown {
  font-size: 16px;
  background-color: #409eff;
  padding: 1em;
  border-radius: 5px;
  top: 50px;
}
.el-dropdown:hover,
.el-button:hover {
  opacity: 0.8;
}
.edit-btn {
  position: relative;
  top: 50px;
}
</style>