<template>
  <div class="resume">
    <aside>
      <h1>
        <router-link to="/">
          <span>
            <img src="../assets/image/南瓜.jpg" width="100%" style="border-radius: 50%;" />
          </span>
        </router-link>
      </h1>
      <p>段征中 &nbsp; &nbsp; &nbsp; &nbsp;男</p>
      <p class="hello">Don't wait for life to start</p>
      <ul>
        <li>
          <span style="padding-bottom: 0.8rem; display: inline-block;">教育背景</span>
          <p>湖南工程学院. 2016.09-2020.06</p>
          <p>本科.专业. 材料成型及控制工程</p>
        </li>
        <li>
          <span>兴趣爱好</span>
          <p>前端、英语、阅读...</p>
          <p>健身、篮球、爬山...</p>
        </li>
        <li>
          <span>联系方式</span>
          <p>QQ邮箱: 1519629554@qq.com</p>
          <p>网易邮箱: pumpkin_1208@163.com</p>
        </li>
      </ul>
    </aside>
    <main>
      <ul class="skill">
        <li>
          <em>IT 技能</em>
          <ol>
            <li>熟练掌握HTML、CSS原理，如：选择器的权重，层叠性，BFC，IFC,，动流，定位流</li>
            <li>灵活运用html(5)&css(3)高度还原设计稿效果,，写过淘宝，努比亚，豆瓣，美团等等许多页面</li>
            <li>深刻理解原生JavaScript理论概念,如闭包，作用域，作用域链，原型链，继承以及JS的执行机制</li>
            <li>DOM：灵活自如的利用js操作DOM，实现与页面的交互效果</li>
            <li>ES6：熟练ES6基本语法，模拟实现过promise以及map和set数据结构</li>
            <li>Ajax：手动封装过类似jQuery的Ajax函数, 了解Jsonp和CORS跨域, 利用Jsonp写过百度搜索框功能, 并且利用NodeJs模拟过Jsonp的实现原理</li>
            <li>VueJs：对vuejs的响应式数据原理,虚拟DOM,依赖收集有过深入了解,并自己尝试进行了实现</li>
            <li>jQuery： 阅读过部分源码,了解其整体封装思想,自己封装过一个简易版的jQuery,利用jQuery写过轮播图插件,翻页插件,QQ音乐播放器等等demo</li>
            <li>
              熟悉Git常见命令的使用, 有自己的GitHub主页:
              <a style="color: #f39e02;" href="https://github.com/pumpkinduan" target="blank">https://github.com/pumpkinduan</a>
            </li>
          </ol>
        </li>
        <li>
          <em>我的项目</em>
          <h1>使用 Node.js + Express + MySQL + Vue.js技术栈搭建整站项目</h1>
          <ol>
            <li>利用nodejs+express实现API接口</li>
            <li>使用element-ui快速搭建后台管理系统界面，界面包含管理员的注册与登录，文章编辑与管理，留言与回复，文章编辑方面实现了图片的上传功能，借用express的multer中间件将图片直接存储在服务器中，而在数据库中存储图片的路径、大小等信息，减少了数据库的压力</li>
            <li>使用aixos进行网络请求，借用sequelieze操作MySQL数据库</li>
            <li>使用vue-cli3构建项目，利用vueRouter实现spa页面效果</li>
            <li>基于HTML(5)&CSS(3)进行整站页面的搭建与布局，包含首页，关于我以及博客列表和博客详情页面</li>
          </ol>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
.resume {
  position: relative;
}
.resume aside {
  width: 400px;
  height: 100%;
  position: fixed;
  padding-right: 2rem;
  padding-top: 5rem;
  top: 0;
  left: 0;
  background: url("../assets/image/cv.jpg") 0 0 no-repeat;
  background-size: cover;
  text-align: center;
}
.resume aside h1 span {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 1px solid #555;
  border-radius: 50%;
  padding: 1px;
}
.resume aside img {
  margin: 0;
}
.resume aside > p {
  line-height: 1.2rem;
  font-size: 1.2rem;
  color: #dcd5d5e0;
  padding-top: 2rem;
}
.resume aside p.hello {
  color: #888;
}
.resume aside ul {
  margin-top: 2rem;
}
.resume aside ul li {
  color: #f1f1f1;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1.5rem 0;
  transition: color 0.3s;
}

.resume aside ul li p {
  color: #ccc;
  font-size: 1rem;
  padding: 0.8rem 0;
}
.resume aside ul > li span:hover {
  color: orange;
}

.resume main {
  padding-left: 400px;
}
.resume main .skill {
  padding: 0 1rem 1rem 1.5rem;
}
.resume main .skill li {
  padding-top: 1.5rem;
}
.resume main .skill li section {
  padding-left: 1rem;
  margin-top: 2rem;
  border-top: 2px solid #eee;
  font-weight: 350;
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4rem;
}
.resume main .skill li em {
  padding-bottom: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
  border-bottom: 1px dotted #444948;
  display: inline-block;
}
.resume main .skill li section p {
  padding: 0.6rem 0;
}
.resume main .skill li ol {
  padding-left: 1.2rem;
}
.resume main .skill li h1 {
  font-size: 0.9rem;
  color: #888;
  margin-top: 10px;
}
.resume main .skill li ol li {
  list-style-type: disc;
  color: #666;
  font-size: 0.78rem;
}
</style>