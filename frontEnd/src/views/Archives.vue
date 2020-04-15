<template>
  <div class="archive">
    <div class="archive-inner">
      <p class="archive-header">
        <template>
          目前共计
          <strong class="archive-header-count">{{archive_count}}</strong>篇日志。 (゜-゜)つロ 干杯~
        </template>
      </p>
      <ol class="archive-nav" v-for="(item, index) in archives" :key="index">
        <template>
          <li class="archive-year">{{item.year}}</li>
          <li class="archive-item" v-for="(c_item, c_index) in item.content" :key="c_index">
            <span class="archive-item-date">{{c_item.date}}</span>
            <router-link :to="{name: 'detail', params: {articleId: c_item.article_id}}">
              <span class="archive-item-title">{{c_item.title}}</span>
            </router-link>
          </li>
        </template>
      </ol>
    </div>
  </div>
</template>

<script>
import {getArchives} from "@/api/index";
export default {
  name: "archive",
  data() {
    return {
      tag: "",
      tag_count: "",
      archives: [],
      archive_count: 0
    };
  },
  created() {
    // 刷新页面时，重新获取数据
    getArchives().then(data => {
      if (data) {
        this.archives = data.data;
        this.archive_count = data.meta.count;
      }
    });
  }
};
</script>

<style lang="less">
.archive {
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 5px;
  .archive-inner {
    border-left: 2px solid @blue2;
    padding: 0 10px;
  }
  .archive-header {
    margin-bottom: 8px;
    font-size: @font_medium_s;
    color: @baseFontColor;
    .archive-header-count {
      color: @deepOrange;
      font-size: @font_large;
    }
    .archive-header-tag {
      color: @orange;
    }
  }
  .archive-nav {
    .archive-year {
      font-size: @font_large;
      padding-top: 3px;
      padding-bottom: 6px;
      font-weight: 800;
      color: @baseFontColor;
    }
    .archive-item {
      position: relative;
      padding: 3px 0;
      &:before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: @blue1;
        position: absolute;
        top: 50%;
        transition: opacity 0.3s;
        transform: translateY(-50%);
        left: -13px;
        opacity: 0.5;
      }
      &:hover::before {
        opacity: 1;
      }
      .archive-item-date {
        color: @blue1;
        font-size: @font_small;
        margin-right: 10px;
      }
      .archive-item-title {
        color: @baseFontColor;
        &:hover {
          color: @deepOrange;
        }
      }
    }
  }
}
</style>
