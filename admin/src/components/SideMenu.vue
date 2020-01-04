<template>
  <div class="side-menu">
    <el-row>
      <el-col :span="24">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#F5F7F9"
          text-color="#333"
          active-text-color="#fb31cf"
          :collapse="isCollapse"
        >
          <template v-for="(f_item, f_index) in menu">
            <el-submenu v-if="f_item.children" :key="f_index" :index="f_index + ''">
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
                  <el-menu-item :index="f_index + '-' + c_index">{{ c_item.name }}</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="f_index + ''" :key="f_item.icon + ''">
              <router-link 
                :to="{name: f_item.component}" 
                tag="div"
              >
                <i :class="f_item.icon"></i>
                <span>{{ f_item.name }}</span>
              </router-link>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["isCollapse", "menu"],
  data() {
    return {
      
    };
  },

  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped>
.side-menu {
  height: 100%;
  background-color: #f5f7f9;
  border-right: 1px solid #eee;
  font-weight: 600;
  overflow: hidden;
}
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
</style>