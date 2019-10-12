<template>
  <main>
    <section class="blog-wrap" v-for="(item, index) in blogs" :key="index">
      <h2 class="title">{{item.title }}</h2>
      <ul class="sign-wrap">
        <li>发布于: {{item.ctime}}</li>
        <li class="tag">
          标签: <a href>{{item.tag }}</a>
        </li>
        <li>字数统计: {{item.total_char }}</li>
        <li class="like star" @click="likeHandler(index)">
          <span class="info-box">赞一个呀</span>
          <i class="iconfont icon-xingxing1"></i>
          <span>{{item.likes || 11}}</span>
        </li>
        <li class="dislike star" @click="dislikeHandler(index)">
          <span class="info-box">真的要踩吗?</span>
          <i class="iconfont icon-xingxing1"></i>
          <span>{{item.dislikes || 1}}</span>
        </li>
        <li>
          <span>访问: </span>
          <span>{{item.counts}}</span>
        </li>
      </ul>
      <div class="content" v-html="item.content">{{ item.content }}</div>
      <a href class="read-more">阅读全文 »</a>
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      blogs: [
        {
          title: "",
          ctime: "",
          tag: "",
          total_char: '',
          likes: 0,
          dislikes: 10,
          counts: 0,
          content:""
        }
      ]
    };
  },
  created() {
    this.$axios
      .post("/api/queryTechBlog")
      .then(result => {
        this.blogs = result.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    dislikeHandler(index) {
      this.blogs[index].dislikes++;
    },
    likeHandler(index) {
      this.blogs[index].likes++;
    }
  }
};
</script>
<style scoped>
main {
  margin: 100px 0;
}
.blog-wrap {
  width: 70%;
  height: auto;
  margin: 50px auto;
  border: 1px solid #eee;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff87;
  padding: 35px 25px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  position: relative;
}

.blog-wrap .content {
  width: 100%;
  max-height: 200px;
  margin: 12px 0;
  overflow: hidden;
  mask-image: linear-gradient(#000 calc(10%), transparent);
  mask-size: cover;
}

.blog-wrap .title {
  font-size: 20px;
  margin-bottom: 18px;
  text-align: center;
}

.blog-wrap .sign-wrap {
  width: 55%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.blog-wrap .sign-wrap li {
  color: #888;
}

.blog-wrap .sign-wrap li.tag a:hover {
  text-decoration: underline;
  color: #18a9e4;
}

.blog-wrap .sign-wrap .like,
.blog-wrap .sign-wrap .dislike {
  cursor: pointer;
  position: relative;
}

/* 移动至星星处显示提示框 */

.blog-wrap .sign-wrap .star .info-box {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 2px solid #ddd;
  border-radius: 12%;
  position: absolute;
  left: -58%;
  top: -230%;
  display: inline-block;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.03);
  transition: all 0.3s;
  opacity: 0;
  font-weight: bold;
  font-size: 12px;
  color: #999;
}

.blog-wrap .sign-wrap .dislike .info-box {
  width: 80px;
  border-radius: 20%;
}

.blog-wrap .sign-wrap .star:hover .info-box {
  opacity: 1;
}

.blog-wrap .sign-wrap .star .info-box:before,
.blog-wrap .sign-wrap .star .info-box:after {
  content: " ";
  position: absolute;
  border: 8px solid transparent;
  left: 30%;
  width: 0;
  height: 0;
}

.blog-wrap .sign-wrap .star .info-box:before {
  border-top-color: #ddd;
  top: 100%;
}

.blog-wrap .sign-wrap .star .info-box:after {
  border-top-color: #fff;
  top: 20px;
  border-width: 8px;
  top: 27px;
}

/* --移动至星星处显示提示框-- */

.blog-wrap .sign-wrap .like .icon-xingxing1 {
  color: #ff4500ab;
}

.blog-wrap .content {
  line-height: 24px;
  text-align: justify;
}

.blog-wrap .read-more {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #999;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s;
  padding-bottom: 5px;
}

.blog-wrap .read-more:hover {
  font-weight: 800;
  border-bottom: 2px solid #222;
  color: #444;
}
</style>

