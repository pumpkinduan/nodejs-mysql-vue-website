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
      <template  slot-scope="{serverUrl}">
        <el-upload
          class="upload-demo"
          drag
          :action="`${serverUrl}/api/upload`"
          multiple
          name="picture"
          :on-success="uploadSuccess"
          :on-error="uploadErr"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">一张精致的封面图片，有利于吸引ta人的眼球噢</div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </template>
    </Publish>
  </div>
</template>
<script>
import api from "@/api/article.js";
import Publish from "@/components/Publish";
export default {
  components: {
    Publish
  },
  data() {
    return {
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
    uploadErr() {
      this.$message.error("upload failed");
    },
    uploadSuccess(response, file) {
      this.tableData[0].cover = response.path.replace(/\\/gi, "/");
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