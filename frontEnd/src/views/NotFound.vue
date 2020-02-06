<template>
  <div class="not-found">
    <div class="container">
      <h1>
        <img src="../assets/image/404.png" alt="404" />
      </h1>
      <h2 style="font-size: 2rem;">对不起的!找不到网页.</h2>
      <p>您访问的页面不存在或已被删除！(｡•ˇ‸ˇ•｡)..</p>
      <div class="backBtn">
        <router-link to="/">返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.not-found {
  width: 100%;
  text-align: center;
}
.not-found .container {
  width: 1200px;
  margin: 0 auto;
}
.not-found .container h1 {
  width: 70%;
  margin: 0 auto;
}
.not-found .container img {
  display: inline-block;
}
.not-found .container p {
  font-size: 1.3rem;
  line-height: 2rem;
  padding: 1rem 0;
}
.not-found .container .backBtn a {
  padding: 1rem 1.5rem;
  border-radius: 100px;
  background: linear-gradient(
    135deg,
    #5a7ce2 0%,
    #8283e8 50%,
    #5c5de8 51%,
    #565bd8 71%,
    #575cdb 100%
  );
  background-size: 400% 400%;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.2);
}
</style>