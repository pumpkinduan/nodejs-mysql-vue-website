<template>
  <div class="publish-article">
    <Publish
      ref="publish"
      :labels="labels"
      :tableData="tableData"
      @submit="submit"
      @resetDialog="resetDialog"
      title="发布文章"
    >
  
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
        article_id: "id",
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
          article_id: "",
          description: ""
        }
      ]
    };
  },
  methods: {
    submit(data) {
      api
        .publishArticle(data)
        .then(res => {
           this.$refs.publish.quillEditor.quill.root.innerHTML = ""; //清空编辑器;
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
  height: 100%;
}
.wrapper {
  margin: 25px 0;
}
</style>