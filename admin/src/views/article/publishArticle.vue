<template>
  <div class="publish-article">
    <Publish
      ref="publish"
      :labels="labels"
      :tableData="tableData"
      :edit="false"
      @submit="submit"
      @resetDialog="resetDialog"
      title="发表文章"
      btnText="添加"
    >
      <template slot-scope="{serverUrl}">
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          :auto-upload="false"
          :action="`${serverUrl}/api/upload`"
          :on-change="fileChange"
          :http-request="uploadCompressImage"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">一张精致的封面图片，有利于吸引ta人的眼球噢</div>
        </el-upload>
        <el-button style="margin-top: 1rem;" type="success" @click="submitUpload">上传到服务器</el-button>
      </template>
    </Publish>
  </div>
</template>
<script>
import api from "@/api/article.js";
import Publish from "@/components/Publish";
import { compress } from "@/util/compress.js";
export default {
  components: {
    Publish
  },
  data() {
    return {
      file: "",
      labels: {
        tag: "标签",
        title: "标题",
        description: "描述"
      },
      tableData: [
        {
          tag: "",
          title: "",
          cover: "",
          description: ""
        }
      ]
    };
  },
  methods: {
    submitUpload() {
      this.uploadCompressImage(this.file);
    },
    fileChange(file) {
      this.file = file && file.raw;
      compress({
        target: file.raw,
        target_size: 100,
        maxWidth: 400,
        maxHeight: 600,
        onSuccess: data => {
          this.file = data;
        }
      });
    },
    uploadCompressImage(file) {
      let formData = new FormData();
      formData.append("picture", file.blob, file.name);
      api.uploadImg(formData).then(res => {
        this.tableData[0].cover =
          res.data && res.data.path.replace(/\\/gi, "/");
      });
    },
    submit(data) {
      api
        .publishArticle(data)
        .then(res => {
          if (res.data) {
            this.submitSuccess(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitSuccess(data) {
      this.$refs.publish.$refs.quillEditor.quill.root.innerHTML = ""; //清空编辑器;
      this.resetDialog();
      this.$message({
        message: data.msg,
        duration: 1000
      });
    },
    resetDialog() {
      for (var i in this.tableData[0]) {
        this.tableData[0][i] = "";
      }
    }
  }
};
</script>
<style scoped>
.publish-article {
  height: 100%;
}
.wrapper {
  margin: 25px 0;
}
</style>