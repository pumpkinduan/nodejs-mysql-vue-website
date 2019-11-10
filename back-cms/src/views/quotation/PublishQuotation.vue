<template>
  <div class="publish-quotation">
  <Publish
      ref="publish"
      :labels="labels"
      :tableData="tableData"
      @submit="submit"
      @resetDialog="resetDialog"
      title="每日一句"
    />
  </div>
</template>
<script>
import Publish from "@/components/Publish";
import api from "@/api/quotation.js";
export default {
    components: {
    Publish
  },
  data() {
    return {
      labels: {
        q_id: "id",
        author: "作者",
      },
      tableData: [
        {
          author: "",
          q_id: "",
        }
      ]
    };
  },

  methods: {
    submit(data) {
      api
        .publishQuotation(data)
        .then(res => {
          this.$refs.publish.quill.root.innerHTML = ""; 
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
.publish-quotation {
  height: 100%;
}
.wrapper {
  height: 100%;
  margin: 25px 0;
}
.wrapper #editor {
  height: calc(100% - 42px) !important;
}
</style>