<template>
  <div class="footer">
    <ul class="clearfix">
      <li class="about fl">
        <h1>A B O U T</h1>
        <p>life is beautiful like summer flowers and death like autumn leaves</p>
        <section class="copyright">
          <span>@ 南瓜的时光机</span><span class="line"></span><span class="author">
            Author:
            <a href="#">Pumpkin</a>
          </span>
        </section>
      </li>
      <li class="link fl">
        <h2>F O L L O W</h2>
        <div>
          <a 
            target="_blank"
            href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tIWBhY2Cho2BgYD0xcWa19vZ"
          >
            <i class="iconfont icon icon-youjian"></i>
          </a>
          <a href="https://github.com/pumpkinduan" target="_blank">
            <i class="iconfont icon icon-github"></i>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.footer {
  background-color: #eee;
  padding: 4rem 4rem 0;
  font: bold 1.4rem cursive !important;
  /* font-family: cursive; */
  margin-top: 2rem;
}
/* --底部关于开始-- */
.footer .about {
  margin-bottom: 1.5rem;
    margin-right: 20%;
}
.footer .about h1,
.footer .link h2 {
  color: #333;
  font: inherit;
}
.footer .about p {
  color: #666;
  font-size: 1.2rem;
  margin: 2rem 0;
}
.footer .about .copyright {
  color: #888;
  font-size: 1rem;
}
.footer .about .copyright span {
    word-spacing: -2px;
}
.footer .about .copyright .line {
  border-left: 1px solid #ccc;
  padding: 1px 5px;
  margin-left: 15px;
}
.footer .about .copyright .author a {
  border-bottom: 1px dotted #666;
  color: #666;
  transition: color .4s;
}
.footer .about .copyright .author a:hover {
  color: #ff450085;
}
/* --底部关于结束-- */

/* --底部链接开始-- */
.footer .link div {
    margin-top: 2rem;
   
}
.footer .link a {
  border: 1px solid #777;
  border-radius: 5px;
  margin-right: 1rem;
  padding: 1rem;
  display: inline-block;
  transition: all .5s;
  color: #433;
}
.footer .link a:hover {
  color: #5b77dfe3;
  border-color: #5b77dfe3;
}
.footer .link a i {
  font-size: 2rem;
}
/* --底部链接结束-- */
</style>