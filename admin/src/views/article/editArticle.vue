<template>
  <div class="edit-article">
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
          ref="upload"
          :auto-upload="false"
          :action="`${serverUrl}/api/upload`"
          :on-change="fileChange"
          :http-request="uploadCompressImage"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">来换一张精致的封面图片吧</div>
        </el-upload>
        <el-button :disabled="!flag" style="margin-top: 1rem;" type="success" @click="submitUpload">上传到服务器</el-button>
      </template>
    </Publish>
  </div>
</template>

<script>import axios from "axios";
import Publish from "@/components/Publish";
import api from "@/api/article.js";
import config from "@/config.js";
import {compress} from '@/util/compress.js';
export default {
  components: {
    Publish
  },
  data() {
    return {
      file: "",
      flag: true,
      edit: false,
      serverUrl: config.serverUrl,
      title: "发布文章",
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
    submitUpload() {
      this.flag = false;
      this.uploadCompressImage(this.file);
    },
    uploadCompressImage(file) {
      let formData = new FormData();
     formData.append("picture", file.blob, file.name);
     api.uploadImg(formData).then( res => {
       this.tableData[0].cover = res.data && res.data.path.replace(/\\/gi, "/");
     })
    },
    fileChange(file) {
      this.file = file.raw;
      this.flag = true;
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
    submit(data) {
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
      this.$router.push({ name: "ArticleList" });
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