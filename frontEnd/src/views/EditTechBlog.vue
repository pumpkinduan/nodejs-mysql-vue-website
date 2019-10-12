<template>
  <div class="tech-blog-edit">
    <div id="editor"></div>
    <div>
      标签:
      <input type="text" v-model="tag" />
    </div>
    <div>
      title:
      <input type="text" v-model="title" />
    </div>
    <div>
      访问量:
      <input type="text" v-model="counts" />
    </div>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
export default {
  mounted() {//必须等到DOM元素挂载到页面上去才可操作DOM生成富文本编辑器
    const toolbarOptions = [// toolbar btns
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
      ["image", "link", "video"]// add upload image btn
      
    ];
    let quill = new Quill("#editor", {
      placeholder: "让你的手动起来吧！！！",
      theme: "snow",
      modules: {
        toolbar: {
          container: toolbarOptions,
          handler: {
            'image'(value) {
              console.log('1111')
              console.log(value)
            }
          }
        }
      }
    });
    this.quill = quill;
  },
  data() {
    return {
      content: "",
      tag: "",
      title: "",
      counts: 1
    };
  },

  methods: {
    submit() {
      // console.log(this.quill.root.innerHTML);
      if (!this.quill.getContents()) return;
      this.$axios
        .post("/api/editTechBlog", {
          content: 'this.editor.txt.html()',
          total_char: 44,
          title: 'this.title',
          tag: 'js',
          counts: 11
        })
        .then(res => {
          console.log(res);
          this.editor.txt.text(""); //清空编辑器;
          this.counts = "";
          this.tag = "";
          this.title = "";
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