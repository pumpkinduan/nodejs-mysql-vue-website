<template>
    <header class="clearfix">
      <div class="inner-header clearfix">
        <h1 class="logo fl">
          <img src="@/assets/image/南瓜.jpg" width="60px">
        </h1>
        <ul class="fr nav">
          <router-link v-for="(item, index) in navLinks" :key="index" :to="{name: item.component}">
            <li>
              <i :class="['iconfont', item.class]"></i>
              <span>{{item.name}}</span>
            </li>
          </router-link>
        </ul>
      </div>
    </header>
</template>
  <script>
export default {
  data() {
    return {
      navLinks: [
        {
          class: "icon-shouye",
          component: "home",
          name: "首页"
        },
        {
          class: "icon-xingxing1",
          component: "home",
          name: "作品集"
        },
        {
          class: "icon-faxian",
          component: "home",
          name: "旅游"
        },
        {
          class: "icon-nangua",
          component: "home",
          name: "美食"
        },
        {
          class: "icon-biaoqian3",
          component: "home",
          name: "标签"
        },
        {
          class: "icon-liuyan",
          component: "home",
          name: "留言板"
        },
        {
          class: "icon-sousuo",
          component: "home",
          name: "搜索"
        }
      ]
    };
  }
};
</script>
<style scoped>
header {
    position: sticky;
    top: 0;
    z-index: 999;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    box-shadow: 0 0 1px 1px #ddd;
}
header .inner-header {
    width: 70%;
    margin: 0 auto;
    padding: 20px 0;
}
header .inner-header .nav {
    margin-top: 7px;
}
header .inner-header .nav li {
    float: left;
    padding: 15px 16px;
    vertical-align: middle;
    font-size: 16px;
    color: rgb(54, 53, 53);
    transition: all 0.3s;
}
header .inner-header .nav li span {
    margin-left: 3px;
}

header .inner-header .nav li:hover {
    border-radius: 10px 18px;
    background-color: #ff000c0d;
}

</style>
