<template>
  <div class="publish-article">
    <Publish
      ref="publish"
      :labels="labels"
      :tableData="tableData"
      :edit="false"
      @handleSumbit="handleSumbit"
      @resetDialog="resetDialog"
      title="发表文章"
      btnText="添加"
    >
    </Publish>
  </div>
</template>
<script>
import api from "@/api/article.js";
import Publish from "@/components/Publish";
// import { compress } from "@/util/compress.js";
export default {
  name: "PublishArticle",
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
          description: ""
        }
      ]
    };
  },
  methods: {
    // submitUpload() {
    //   this.uploadCompressImage(this.file);
    // },
    // fileChange(file) {
    //   this.file = file && file.raw;
    //   compress({
    //     target: file.raw,
    //     target_size: 100,
    //     maxWidth: 400,
    //     maxHeight: 600,
    //     onSuccess: data => {
    //       this.file = data;
    //     }
    //   });
    // },
    // uploadCompressImage(file) {
    //   let formData = new FormData();
    //   formData.append("picture", file.blob, file.name);
    //   api.uploadImg(formData).then(res => {
    //     this.tableData[0].cover =
    //       res.data && res.data.path.replace(/\\/gi, "/");
    //   });
    // },
    handleSumbit(data) {
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