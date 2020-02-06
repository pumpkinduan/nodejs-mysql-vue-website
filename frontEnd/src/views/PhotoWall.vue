<template>
  <div>
    <Header :opacity="1" bgc="#fff" />
    <main class="clearfix main-block">
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
    </main>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div :class="[loading_gif ? 'block-loading': '']"></div>
    <div v-show="showPrompt" class="prompt-text">亲，没有更多相片了噢~</div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Quotation from "@/components/Quotation.vue";
import config from "@/config.js";
import Waterfall from "@/components/Waterfall";
import api from "@/api/img.js";
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
      api.getAllImgs(page).then(result => {
        if (result.data && result.data.imgs) {
          this.totalPhotoes = result.data.imgs.count;
          this.cards.push(...result.data.imgs.rows);
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
.el-image {
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
.prompt-text {
  text-align: center;
  font-size: 1rem;
  padding-bottom: 14px;
  color: #9c9c87;
}
</style>