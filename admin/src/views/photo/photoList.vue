<template>
  <div class="photoList">
    <div class="photoList-wrap">
      <Waterfall :cards="urls">
        <template slot-scope="{data}">
          <div class="el-image" style="border-radius: 5px;">
            <img style="width: 100%;" :src="`${serverUrl}/${data.item.path}`" alt="加载失败" />
            <span class="el-image__item-actions">
              <span class="el-image__item-preview" @click="handlePreview(data.item.path)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span class="el-image__item-delete" @click="handleRemove(data.item.path, data.index)">
                <i slot="reference" class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </template>
      </Waterfall>
    </div>
    <div class="load-btn">
      <el-button type="primary" @click="loadMoreImgs" :disabled="disabled">加载更多</el-button>
      <el-badge :value="totalCounts" :max="99">
        <el-button>相片</el-button>
      </el-badge>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/upload.js';
import config from '@/config.js';
import Waterfall from '@/components/Waterfall.vue';
import download from '@/util/download.js';
export default {
  components: {
    Waterfall
  },
  name: 'PhotoList',
  data() {
    return {
      urls: [],
      page: 1,
      serverUrl: config.serverUrl,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      totalCounts: 0
    };
  },
  created() {
    this.getUrls(this.page);
  },
  methods: {
    getUrls(page) {
      api
        .getAllImgs(page)
        .then(res => {
          if (res && res.data) {
            this.urls.push(...res.data.imgs.rows);
            this.totalCounts = res.data.imgs.count;
          }
        })
        .catch(err => {
          this.disabled = true;
        });
    },
    handlePreview(path) {
      this.dialogImageUrl = this.serverUrl + '/' + path;
      this.dialogVisible = !this.dialogVisible;
    },
    loadMoreImgs() {
      this.page++;
      this.getUrls(this.page);
    },
    handleRemove(path, index) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        path = path.replace(/\//gi, '\\');
        api
          .deleteOneImg(path)
          .then(res => {
            if (res.data) {
              this.$message({
                type: 'success',
                duration: 400,
                message: res.data.msg
              });
              this.urls.splice(index, 1);
              this.totalCounts--;
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>

<style scoped>
.load-btn {
  margin-top: 30px;
  text-align: center;
}
.el-image__item-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.el-image__item-actions:hover {
  opacity: 1;
}
.el-image__item-actions span {
  margin: 0 10px;
}
.el-badge {
  margin-left: 10px;
  vertical-align: top;
}
</style>