<template>
  <div class="photo-wall">
    <Header :opacity="1" bgc="#fff" />
    <div class="clearfix box">
      <Quotation ref="quotation" @sendGap="sendGap" />
      <div class="wrap">
        <Waterfall :cards="cards" ref="waterfall" @loadData="loadData" :gap="gap">
          <template slot-scope="{data}">
            <div class="el-image" style="border-radius: 5px;">
              <img
                style="width: 100%;border-radius: 5px;"
                :src="`${serverUrl}/${data.path}`"
                alt="加载失败"
              />
              <span class="el-image__item-actions">
                <span class="el-image__item-preview" @click="handlePreview(data.path)">
                  <i class="el-icon-zoom-in"></i>
                </span>
              </span>
            </div>
          </template>
        </Waterfall>
      </div>
    </div>
    <el-dialog :lock-scroll="false" top="0" :visible.sync="dialogVisible" :show-close="false">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div :class="[loading_gif ? 'block-loading': '']"></div>
    <div v-show="showPrompt" class="prompt-text">亲，没有更多相片了噢~</div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Quotation from "@/components/Quotation";
import config from "@/config.js";
import Waterfall from "@/components/Waterfall";
import {getAllImgs} from "@/api/index.js";
export default {
  components: {
    Quotation,
    Waterfall,
    Header
  },
  data() {
    return {
      cards: [],
      gap: 300,
      page: 1,
      serverUrl: config.serverUrl,
      dialogImageUrl: "",
      dialogVisible: false,
      totalPhotoes: 0,
      loading_gif: false,
      showPrompt: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    sendGap(gap) {
      this.gap = gap;
    },
    getData(page) {
      this.loading_gif = true;
      getAllImgs(page).then(data => {
        if (data && data.imgs) {
          this.totalPhotoes = data.imgs.count;
          this.cards.push(...data.imgs.rows);
        }
      });
    },
    loadData(page) {
      // 减少一次请求
      if (this.totalPhotoes != 0 && this.totalPhotoes === this.cards.length) {
        this.showPrompt = true;
        return;
      }
      this.getData(page);
    },
    handlePreview(path) {
      this.dialogImageUrl = this.serverUrl + "/" + path;
      this.dialogVisible = !this.dialogVisible;
    }
  }
};
</script>

<style scoped>
main {
  width: 100%;
  position: relative;
  background: #f5f7f9;
  padding-bottom: 0;
}
.box {
  padding-top: 80px;
}
.el-image {
  width: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
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
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.el-image__item-actions:hover {
  opacity: 1;
}
.el-image__item-actions span {
  margin: 0 10px;
}
.prompt-text {
  position: relative;
  top: -12px;
  text-align: center;
}
.photo-wall >>> .el-dialog__header,
.photo-wall >>> .el-dialog__body {
  padding: 0;
}
@media screen and (max-width: 768px) {
  .photo-wall >>> .el-dialog {
    width: 100%;
  }
}
</style>