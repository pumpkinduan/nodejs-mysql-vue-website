<template>
  <div class="auth">
    <el-card shadow="hover" style="width: 20%; font-size:1rem;">管理员: {{this.$store.state.userInfo.account}}</el-card>
    <el-tabs v-model="activeName" style="width: 60%;">
      <el-tab-pane label="Timeline" name="first">
        <div class="block">
          <div class="load-btn">
            <el-badge :value="totalCounts" :max="99">
              <el-button>动态</el-button>
            </el-badge>
          </div>
          <el-timeline>
            <transition-group name="slide" tag="div" appear>
              <el-timeline-item
                :timestamp="item.created_at"
                placement="top"
                v-for="(item, index) in timelineList"
                :key="index"
              >
                <el-card>
                  <h4 style="margin-bottom: 10px">
                    <strong style="color: #00a7e0; font-weight: 900;">{{item.status}}&nbsp;&nbsp;</strong>
                    <span>{{item.title}}</span>
                    <i class="el-icon-delete fr" @click="deleteOneTimeline(item.id, index)"></i>
                  </h4>
                  <p style="font-size: 14px;">{{item.description}}</p>
                </el-card>
              </el-timeline-item>
            </transition-group>
          </el-timeline>
          <el-button type="primary" @click="loadMore" :disabled="disabled">加载更多</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Activity" name="second">暂无</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from '@/api/timeline.js';
export default {
  data() {
    return {
      activeName: 'first',
      page: 1,
      disabled: false,
      timelineList: [],
      totalCounts: 0
    };
  },
  created() {
    this.getData(this.page);
  },
  methods: {
    getData(page) {
      api
        .getTimelineList(page)
        .then(res => {
          if (res.data) {
            this.totalCounts = res.data.meta.count;
            this.timelineList.push(...res.data.data);
          }
        })
        .catch(err => {
          this.disabled = true;
        });
    },
    loadMore() {
      this.page++;
      this.getData(this.page);
    },
    deleteOneTimeline(id, index) {
      this.$confirm('此操作将永久删除该动态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(val => {
        api.deleteOneTimeline(id).then(res => {
          this.timelineList.splice(index, 1);
          this.$message.success(res.data.msg);
        });
      });
    }
  }
};
</script>

<style scoped>
.el-icon-delete:hover {
  cursor: pointer;
  color: #e2aa2f;
}
.load-btn {
  margin: 20px 0;
}
.el-badge {
  margin-left: 10px;
  vertical-align: top;
}
.slide-enter {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter-to {
  transform: translateY(0%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>