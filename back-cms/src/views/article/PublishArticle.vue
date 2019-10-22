<template>
  <div class="publish-article">
    <Publish
      ref="publish"
      :labels="labels"
      :tableData="tableData"
      @submit="submit"
      @resetDialog="resetDialog"
      title="发布文章"
    />
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
        article_id: "id",
        total_char: "字数",
        browse: "访问量",
        author: "作者",
        tag: "标签",
        cover: "封面",
        title: "标题"
      },
      tableData: [
        {
          author: "",
          tag: "",
          title: "",
          cover: "",
          article_id: "",
          browse: "",
          total_char: ""
        }
      ]
    };
  },
  methods: {
    submit(data) {
      api
        .publishArticle(data)
        .then(res => {
          this.$refs.publish.quill.root.innerHTML = ""; //清空编辑器;
          for (var i in this.tableData[0]) {
            this.tableData[0][i] = "";
          }
          this.$message({
            message: res.data.msg,
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err);
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
  height: 70%;
}
.wrapper {
  height: 100%;
  margin: 25px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
</style>