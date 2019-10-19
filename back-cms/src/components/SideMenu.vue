<template>
  <div class="side-menu">
    <el-row>
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#324157"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link to="/">
            <el-menu-item index="0">
              <i class="el-icon-s-home"></i>
              <span style="color: #fff">首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="(f_item, f_index) in menu">
            <el-submenu v-if="f_item.children" :key="f_index" :index="f_index">
              <template slot="title">
                <i :class="f_item.icon"></i>
                <span>{{ f_item.name }}</span>
              </template>
              <el-menu-item-group>
                <router-link
                  v-for="(c_item, c_index) in f_item.children"
                  :key="c_index"
                  :to="c_item.path"
                >
                  <el-menu-item :index="c_index">{{ c_item.name }}</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
             <el-menu-item :index="f_index" v-else :key="f_item.icon">
              <i :class="f_item.icon"></i>
              <span>{{ f_item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          icon: "el-icon-document",
          name: "文章管理",
          children: [
            {
              name: "文章编辑",
              path: "/editArticle"
            },
            {
              name: "文章发布",
              path: "/publishArticle"
            },
            {
              name: "文章列表",
              path: "/articleList"
            }
          ]
        },
        {
          icon: "el-icon-ice-tea",
          name: "每日一句",
          children: [
            {
              name: "语录编辑",
              path: "/editQutation"
            },
            {
              name: "语录发布",
              path: "/publishQutation"
            },
            {
              name: "语录详情",
              path: "/qutations"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
.side-menu {
  height: 100%;
  background-color: #324157;
}
.el-menu {
  border: none;
}
</style>