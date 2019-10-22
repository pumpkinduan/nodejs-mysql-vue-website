<template>
  <div class="publish-me">
    <Publish
      ref="publish"
      :labels="labels"
      :tableData="tableData"
      @submit="submit"
      @resetDialog="resetDialog"
      title="关于我"
    />
  </div>
</template>
<script>
import api from "@/api/me.js";
import Publish from "@/components/Publish";
export default {
   components: {
    Publish
  },
  data() {
    return {
      labels: {
        cover: "封面"
      },
      tableData: [
        {
          cover: ""
        }
      ]
    };
  },

  methods: {
    submit(data) {
      api
        .publishMe(data)
        .then(res => {
          this.$refs.publish.quill.root.innerHTML = ""; //清空编辑器;
          for (var i in this.tableData[0]) {
            //置空tableData
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
.publish-me {
  height: 70%;
}
</style>