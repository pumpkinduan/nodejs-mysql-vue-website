<template>
  <div class="resume">
    <aside>
      <h1>
        <router-link to="/">
          <img alt="avator" src="../assets/image/南瓜.jpg" width="100%" style="border-radius: 50%;" />
        </router-link>
      </h1>
      <p>段征中 &nbsp; &nbsp; &nbsp; &nbsp;男</p>
      <p class="hello">Don't wait for life to start</p>
      <ul>
        <li>
          <span style="padding-bottom: 0.8rem; display: inline-block;">教育背景</span>
          <p>湖工. 2016.09-2020.06</p>
          <p>专业. 材料成型及控制工程</p>
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
            <li>能够语义化的编写HTML文档，独立完成PC端和移动端的响应式布局、交互等功能</li>
            <li>熟悉CSS3动画、Flex布局及HTML5的存储等几只新功能，对CSS中的盒模型、层叠规则、BFC也有一定的了解</li>
            <li>熟练使用CSS3动画、Flex布局及HTML5的存储等几只新功能</li>
            <li>熟悉JavaScript面向对象编程以及ES6语法，深入理解原型、闭包、作用域链、事件循环机制等重要知识 </li>
            <li>熟悉VueJs框架基础，能够基于Vue+VueRouter+Vuex+Axios+Webpack构建前端应用 </li>
            <li>了解Less、Sass预处理语言</li>
            <li>可以写点Node，基于Express搭建过个人网站的后台接口 </li>
            <li>了解常见的设计模式和数据结构，如：发布订阅者模式，利用该模式实现过Vue的响应式数据原理</li>
            <li>了解HTTP、TCP/IP网络协议，熟悉常见的跨域方式，如JSONP和CORS</li>
            <li>熟悉Git常用的命令以及Git的工作流程</li>
            <li>具备良好的英文阅读能力，可以熟读英文技术文档</li>
            <li>
              GitHub主页:
              <a
                style="color: #f39e02;"
                href="https://github.com/pumpkinduan"
                target="blank"
              >https://github.com/pumpkinduan</a>
            </li>
          </ol>
        </li>
        <li>
          <em>我的项目</em>
          <h1>WebApp版的网易云音乐 =>请用移动设备打开</h1>
          <h4 style="margin: 12px 0;">在线展示:<a style="color: #4343c6;" href="http://pumpkinduan.cn:3000">http://pumpkinduan.cn:3000</a></h4>
          <p>Vue全家桶+Webpack4.x+Sass+Axios+Better-Scroll</p>
          <ol>
            <li>该项目是一款webapp版的网易云音乐，项目主体分为推荐歌单、排行榜单、歌手、不同歌单的详情模块、歌手详情模块、歌曲播放等模块；支持主题换肤，歌曲搜索，收藏歌曲，并利用localStorage缓存播放历史、搜索记录和收藏的歌曲。</li>
            <li>利用rem+视口缩放+动态设置根元素字体大小来适配不同机型的手机设备，并根据dpr的不同来动态设置字体大小，保证字体大小的效果不会随着设备变化而变化</li>
          </ol>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
.resume {
  position: relative;
  min-height: 100vh;
  background: #fff;
}
.resume aside {
  width: 28%;
  height: 100%;
  position: fixed;
  padding-right: 12px;
  padding-top: 30px;
  top: 0;
  left: 0;
  background: url("../assets/image/cv.jpg") 0 0 no-repeat;
  background-size: cover;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .resume aside {
    position: relative;
  }
}
.resume aside h1 a {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.resume aside img {
  margin: 0;
}
.resume aside > p {
  line-height: 12px;
  font-size: 18px;
  color: #dcd5d5e0;
  padding-top: 20px;
}
.resume aside p.hello {
  color: #888;
}
.resume aside ul {
  margin-top:15px;
}
.resume aside ul li {
  color: #f1f1f1;
  font-weight: 500;
  padding: 12px 0;
  transition: color 0.3s;
}

.resume aside ul li p {
  color: #ccc;
  padding: 8px 0;
}
.resume aside ul > li span:hover {
  color: #ff8a00;
}
.resume main {
  padding-left: 28%;
}
.resume main .skill {
  padding: 0 1rem 1rem 1.5rem;
}
.resume main .skill li {
  padding-top: 15px;
}
.resume main .skill li section {
  padding-left: 1rem;
  margin-top: 2rem;
  border-top: 2px solid #eee;
  font-weight: 350;
  color: #444;
  font-size: 18px;
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
  color: #666;
  margin-top: 10px;
}
.resume main .skill li ol li {
  list-style-type: disc;
  color: #666;
  font-size: 13px;
}
@media screen and (max-width: 780px) {
  .resume aside {
    width: 100%;
  }
  .resume main {
    display: none;
  }
}
</style>