<template>
  <div class="about">
    <header></header>
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
          <p>我的邮箱: 1519629554@qq.com</p>
        </li>
      </ul>
    </aside>
    <main>
      <ul class="skill">
        <li>
          <em>IT 技能</em>
          <section>
            <p>1.熟练使用HTML常用标签,遵循web开发标准,有着良好的编码开发规范</p>
            <p>2.了解CSS常见规则,如: 选择器的权重,层叠性,BFC,IFC,浮动流,定位流, 能够高度还原UI给出的设计稿, 写过淘宝,努比亚,豆瓣,美团等等许多的页面</p>
            <p>3.牢牢掌握JavaScript基本语法,深入捣鼓过闭包,函数作用域,作用域链,原型链,继承以及JavaScript的执行机制</p>
            <p>4.熟悉ES6基本语法,深入了解过let变量以及块级作用域,手撕过promise的实现以及map和set数据结构的模拟实现</p>
            <p>5.掌握Ajax请求数据的原理, 手动封装过类似jQuery的Ajax函数, 了解Jsonp和CORS跨域, 利用Jsonp写过百度搜索框功能, 并且利用NodeJs模拟过Jsonp的实现原理</p>
            <p>6.了解TCP/IP协议以及位于其上的HTTP协议和常见的HTTP状态码</p>
            <p>7.熟练使用VueJs前端框架,对其中的响应式数据原理,虚拟DOM,依赖收集有过深入了解,并自己进行了实现</p>
            <p>8.熟练使用jQuery, 阅读过部分源码,了解其整体封装思想,自己封装过一个简易版的jQuery,利用jQuery写过轮播图插件,翻页插件等等小demo</p>
            <p>9.熟悉Git常见命令的使用, 有自己的GitHub主页: https://github.com/Pumpumpkin</p>
          </section>
        </li>
        <li>
          <em>我的项目</em>
          <section>
            <p>1.熟练使用HTML常用标签,遵循web开发标准,有着良好的编码开发规范</p>
            <p>2.了解CSS常见规则,如: 选择器的权重,层叠性,BFC,IFC,浮动流,定位流, 能够高度还原UI给出的设计稿, 写过淘宝,努比亚,豆瓣,美团等等许多的页面</p>
            <p>3.牢牢掌握JavaScript基本语法,深入捣鼓过闭包,函数作用域,作用域链,原型链,继承以及JavaScript的执行机制</p>
            <p>4.熟悉ES6基本语法,深入了解过let变量以及块级作用域,手撕过promise的实现以及map和set数据结构的模拟实现</p>
            <p>5.掌握Ajax请求数据的原理, 手动封装过类似jQuery的Ajax函数, 了解Jsonp和CORS跨域, 利用Jsonp写过百度搜索框功能, 并且利用NodeJs模拟过Jsonp的实现原理</p>
          </section>
        </li>
         <li>
          <em>C O N T A N T</em>
          <section>
            <p>1.熟练使用HTML常用标签,遵循web开发标准,有着良好的编码开发规范</p>
            <p>2.了解CSS常见规则,如: 选择器的权重,层叠性,BFC,IFC,浮动流,定位流, 能够高度还原UI给出的设计稿, 写过淘宝,努比亚,豆瓣,美团等等许多的页面</p>
            <p>3.牢牢掌握JavaScript基本语法,深入捣鼓过闭包,函数作用域,作用域链,原型链,继承以及JavaScript的执行机制</p>
            <p>4.熟悉ES6基本语法,深入了解过let变量以及块级作用域,手撕过promise的实现以及map和set数据结构的模拟实现</p>
            <p>5.掌握Ajax请求数据的原理, 手动封装过类似jQuery的Ajax函数, 了解Jsonp和CORS跨域, 利用Jsonp写过百度搜索框功能, 并且利用NodeJs模拟过Jsonp的实现原理</p>
          </section>
        </li>
      </ul>
    </main>
  </div>
</template>

<style scoped>
.about header {
  height: 300px;
  background: url("https://lingmissing.github.io/712f4187084b9f0445b814cbc8c2a1f6.gif")
    0 0 no-repeat;
  background-size: cover;
}
.about aside {
  width: 400px;
  height: 100%;
  position: fixed;
  padding-right: 2rem;
  padding-top: 5rem;
  top: 0;
  left: 0;
  background: url("http://demo.cssmoban.com/cssthemes6/cpts_1894_dfi/images/banner-1.jpg")
    0 0 no-repeat;
  background-size: cover;
  text-align: center;
}
.about aside h1 span {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 1px solid #555;
  border-radius: 50%;
  padding: 1px;
}
.about aside > p {
  line-height: 1.2rem;
  font-size: 1.2rem;
  color: #dcd5d5e0;
  padding-top: 2rem;
}
.about aside p.hello {
  color: #888;
}
.about aside ul {
  margin-top: 2rem;
}
.about aside ul li {
  color: #f1f1f1;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1.5rem 0;
  transition: color 0.3s;
}
.about aside ul li p {
  color: #ccc;
  font-size: 1rem;
  padding: 0.8rem 0;
}
.about aside ul > li span:hover {
  color: orange;
}
.about main {
  padding-left: 400px;
}
.about main .skill {
  padding: 1.2rem 1rem 1rem 1.5rem;
}
.about main .skill li {
  margin-top: 1.5rem;
}
.about main .skill li section {
  padding-left: 1rem;
  margin-top: 2rem;
  border-top: 2px solid #eee;
  font-weight: 350;
  color: #444;
  font-size: 0.9rem;
  line-height: 1.4rem;
 
}

.about main .skill li em {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px dotted #444948;
  display: inline-block;
}
.about main .skill li section p {
  padding: 0.6rem 0;
   /* font-family: cursive; */
}
</style>