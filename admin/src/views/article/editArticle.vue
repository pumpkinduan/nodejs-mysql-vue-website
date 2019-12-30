<template>
  <div class="edit-article">
    <Publish
      ref="edit"
      :labels="labels"
      :edit="true"
      :tableData="tableData"
      @handleSumbit="handleSumbit"
      @resetDialog="resetDialog"
      title="编辑文章"
      btnText="开始编辑"
    ></Publish>
  </div>
</template>
<script>
import Publish from "@/components/Publish";
import api from "@/api/article.js";
export default {
  name: "EditArticle",
  components: {
    Publish
  },
  data() {
    return {
      file: "",
      flag: true,
      edit: false,
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
    handleSumbit(data) {
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
  margin-top: 25px;
}
</style>