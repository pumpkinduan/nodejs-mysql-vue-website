<template>
  <div class="waterfall-container" ref="waterfall_container">
    <div
      class="waterfall-item"
      :style="{transition: 'all .4s', 'padding': `0 ${gutter/2}px`}"
      ref="waterfall_item"
      v-for="(item, index) in cards"
      :key="index"
    >
      <slot :data="item"></slot>
    </div>
  </div>
</template>
<script>
import { debounce } from "@/lib/debounce.js";
import { throttle } from "@/lib/throttle.js";
export default {
  activated() {
    //解决 失活的瀑布流组件 再次被激活时 定位发生错乱的bug
    this.setPostion();
  },
  name: "waterFall",
  props: {
    gap: {
      type: Number,
      default: 0
    },
    gutter: {
      type: Number,
      default: 32
    },
    cards: {
      type: Array,
      default: () => []
    },
    backgroundColor: {
      type: String,
      default: "#eee"
    }
  },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, //number
      rowLeftX: [],
      rowHeightArr: [],
      width: 240,
      loadPage: 1,
      canLoad: true
    };
  },
  updated() {
    this.setPostion();
  },
  mounted() {
    this.init();
  },
  watch: {
    cards: {
      handler(newVal, oldVal) {
        this.canLoad = true;
      },
      immediate: true
    }
  },
  methods: {
    init() {
      let _self = this;
      window.onresize = debounce(function() {
        _self.setPostion();
      }, 550);
      window.onscroll = throttle(function() {
        if (_self.isloadedMore()) {
          _self.canLoad = false;
          _self.loadData();
        }
      }, 400);
    },
    preLoadImg(img, fn) {
      if (img && img.complete) {
        fn(img);
      } else {
        img.onload = () => {
          fn(img);
        };
        img.onerror = () => {
          fn(img);
        };
      }
    },
    preLoadImgs(fn) {
      let imgs = this.$refs.waterfall_container && this.$refs.waterfall_container.getElementsByTagName("img");
      let totalCount = imgs && imgs.length,
        count = 0;
      for (let i = 0; i < totalCount; i++) {
        this.preLoadImg(imgs[i], img => {
          count++;
          if (count === totalCount) {
            //所有图片加载完成
            fn(this.$refs.waterfall_item); //表示可以获取包含图片的元素的实际高度
            imgs = null;
          }
        });
      }
    },
    setPostion() {
      //避免累加
      this.rowHeightArr = [];
      this.rowLeftX = [];
      this.screenWidth = document.documentElement.clientWidth; //获取实时减去滚动条的视口宽度
      const { screenWidth, gutter, rowLeftX, rowHeightArr } = this;
      let oWidth, columns;
      const container = this.$refs.waterfall_container;
      this.preLoadImgs(eleNodeLists => {
        //图片加载完成
        if (eleNodeLists && eleNodeLists.length) {
          oWidth = eleNodeLists[0].offsetWidth;
          columns = Math.floor(screenWidth / oWidth);
          for (let i = 0; i < columns; i++) {
            if (i < columns) {
              //第一行
              rowLeftX.push(i * oWidth);
              if (i == 0 || i == 1) {
                //处理特殊元素
                rowHeightArr.push(this.gap + gutter);
              } else {
                rowHeightArr.push(0);
              }
            }
          }
          eleNodeLists.forEach((item, index) => {
            //遍历所有元素
            //第二行开始，按照指定的规则来排版布局
            //获取上一行高度数组中最矮的那个元素的高度
            const minHeight = Math.min.apply(null, rowHeightArr);
            const minHeightIndex = rowHeightArr.indexOf(minHeight);
            item.style.transform = `translate(${rowLeftX[minHeightIndex]}px, ${minHeight}px)`;
            item.style.opacity = 1;
            rowHeightArr[minHeightIndex] +=
              Math.ceil(item.offsetHeight) + gutter;
          });
        }
        container.style.height = Math.max.apply(null, rowHeightArr) + "px";
        if (this.isloadedMore()) {
          //防止 刚载入页面时的留白现象
          this.canLoad = false;
          this.loadData();
        }
      });
    },
    isloadedMore() {
      if (this.canLoad) {
        const { rowHeightArr } = this;
        //获取最后一个插入到页面的DOM元素
        const lastDom = this.$refs.waterfall_item[
          this.$refs.waterfall_item.length - 1
        ];
        const minHeight = Math.min.apply(null, rowHeightArr);
        const lastDomHeight = lastDom && lastDom.offsetHeight;
        if (
          lastDomHeight / 2 + minHeight <
          window.innerHeight +
            document.documentElement.scrollTop +
            document.body.scrollTop -
            124
        ) {
          //这里- 124是因为瀑布流的起始参考线不是浏览器窗口的顶部，而是往下124px
          return true;
        }
      }
    },
    loadData() {
      this.loadPage++;
      this.$emit("loadData", this.loadPage);
    }
  }
};
</script>

<style scoped>
.waterfall-container {
  position: relative;
  margin-bottom: 2rem;
}
.waterfall-item {
  width: 25%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
@media screen and (max-width: 1200px) {
  .waterfall-item {
    width: 33.33% !important;
  }
}
@media screen and (max-width: 992px) {
  .waterfall-item {
    width: 50% !important;
  }
}
@media screen and (max-width: 768px) {
  .waterfall-item {
    width: 100% !important;
  }
}
</style>