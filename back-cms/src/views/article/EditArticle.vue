<template>
  <div class="edit-article ">
    <Publish
      ref="edit"
      :labels="labels"
      :edit="true"
      :tableData="tableData"
      @submit="submit"
      @resetDialog="resetDialog"
      title="编辑文章"
      btnText="开始编辑"
    >
      <template>
        <el-upload
          class="upload-demo"
          drag
          action="/api/upload/picture"
          multiple
          name="picture"
          :on-success="uploadSuccess"
          :on-error="uploadErr"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">来换一张精致的封面图片吧，有利于吸引ta人的眼球噢</div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </template>
    </Publish>
  </div>
</template>

<script>
import Publish from "@/components/Publish";
import api from "@/api/article.js";
export default {
  components: {
    Publish
  },
  data() {
    return {
      edit: false,
      title: "发布文章",
      labels: {
        tag: "标签",
        cover: "封面",
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
  beforeRouteEnter(to, from, next) {
    const article = to.params.article;
    if (article) {
      //代表编辑文章
      next(vm => {
        vm.title = "编辑文章";
        vm.btnText = "开始编辑";
        vm.edit = true;
        for (var i in vm.tableData[0]) {
          vm.tableData[0][i] = article[i];
        }
        api.getArticleDetail(article.article_id).then(res => {
          //获取文章详情内容，进行编辑
          if (res.data && res.data.data) {
            vm.$refs.edit.$refs.quillEditor.quill.root.innerHTML =
              res.data.data.content;
            //显示文章内容
          }
        });
      });
    }
  },
  methods: {
    uploadErr() {
      this.$message.error("upload failed");
    },
    uploadSuccess(response, file) {
      this.tableData[0].cover = response.path.replace(/\\/gi, "/");
    },
    submit(data) {
      console.log(data)
      api
        .updateArticle(data, this.$route.params.article.article_id)
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
      this.$refs.edit.$refs.quillEditor.quill.root.innerHTML = ""; //清空编辑器;
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
.edit-article {
  height: 100%;
}
.wrapper {
  margin: 25px 0;
}
</style>