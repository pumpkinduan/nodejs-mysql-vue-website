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
    ></Publish>
  </div>
</template>
<script>
import article from "@/api/article.js";
import Publish from "@/components/Publish";
import timeline from "@/api/timeline.js";
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
    handleSumbit(data) {
      article
        .publishArticle(data)
        .then(res => {
          if (res.data) {
            this.submitSuccess(res.data);
            //更新动态
             timeline.createOneTimeline({
              title: data.title,
              status: "发布文章",
              description: data.description
            })
          }
        })
    },
    submitSuccess(data) {
      this.$refs.publish.$refs.quillEditor.quill.root.innerHTML = ""; //清空编辑器;
      sessionStorage.clear(); //清空缓存
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