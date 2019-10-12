<template>
  <div class="every-day-edit">
    <div id="editor">every day编辑</div>
    <div>
      作者:
      <input type="text" v-model="author">
    </div> 
    <button @click="submit">提交</button>
  </div>
</template>
<script>
import E from "wangeditor"; // 使用 npm 安装
export default {
  mounted() {
    //必须等到DOM元素挂载到页面上去才可操作DOM生成富文本编辑器
    let editor = new E("#editor");
    editor.create();
    this.editor = editor
  },
  data() {
    return {
      content: "",
      author: ''
    };
  },
  
  methods: {
    submit() {
      if ( !this.editor.txt.text() ) return;
      this.$axios
        .post("/api/editEveDay", {
          content: this.editor.txt.html(),
          author: this.author
          })
        .then(res => {
          console.log(res);
          this.editor.txt.text(""); //清空编辑器;
          this.author = '';
          alert("提交成功");
        })
        .catch(err => {
          console.log(err);
        });
      
    }
  }
};
</script>
<style scoped>
</style>

