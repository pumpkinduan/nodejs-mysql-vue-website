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
import article from "@/api/article.js";
import timeline from "@/api/timeline.js";
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
  beforeRouteLeave(to, from, next) {
    //从编辑文章路由到发布文章时，清空编辑文章时所缓存的文章信息
    sessionStorage.clear();
    next();
  },
  methods: {
    handleSumbit(data) {
      article
        .updateArticle(data, this.$route.params.article.article_id)
        .then(res => {
          if (res.data) {
            this.submitSuccess(res.data);
            timeline.createOneTimeline({
              title: data.title,
              status: "更新文章",
              description: data.description
            })
            // this.create_one_timeline({
            //   title: data.title,
            //   created_at: createDate(),
            //   status: "更新文章"
            // });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitSuccess(data) {
      sessionStorage.clear();
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