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
                  :to="{name: c_item.component}"
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
              component: "EditArticle"
            },
            {
              name: "文章发布",
              component: "PublishArticle"
            },
            {
              name: "文章信息",
              component: "ArticleList"
            }
          ]
        },
        {
          icon: "el-icon-ice-tea",
          name: "每日一句",
          children: [
            {
              name: "语录编辑",
              component: "EditQuotation"
            },
            {
              name: "语录发布",
              component: "PublishQuotation"
            },
            {
              name: "语录数据",
              component: "QuotationList"
            }
          ]
        },
        {
          icon: "el-icon-basketball",
          name: "关于我",
          children: [
            {
              name: "编辑信息",
              component: "EditMe"
            },
            {
              name: "发布信息",
              component: "PublishMe"
            },
            {
              name: "我的介绍",
              component: "MeList"
            }
          ]
        }
      ]
    };
  }
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