<template>
  <div class="waterfall-container" ref="waterfall_container">
    <div
      class="waterfall-item"
      :style="{transition: 'all .4s', 'padding': `0 ${gutter/2}px`}"
      ref="waterfall_item"
      v-for="(item, index) in cards"
      :key="index"
    >
      <slot :data="{item, index}"></slot>
    </div>
  </div>
</template>
<script>
import { debounce } from '@/util/debounce.js';
export default {
  activated() {
    //解决 失活的瀑布流组件 再次被激活时 定位发生错乱的bug
    this.setPostion();
  },
  name: 'waterFall',
  props: {
    gutter: {
      type: Number,
      default: 30
    },
    cards: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      screenWidth: document.documentElement.clientWidth, //number
      rowLeftX: [],
      rowHeightArr: [],
      loadPage: 1,
      handleDebounce: ''
    };
  },
  created() {
    let _self = this;
    this.handleDebounce = debounce(function() {
      _self.setPostion();
    }, 550);
  },
  mounted() {
    this.init();
  },
  updated() {
    setTimeout(() => {
      this.setPostion();
    }, 200);
  },
  methods: {
    init() {
      window.addEventListener('resize', this.handleDebounce, false);
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
      let imgs =
        this.$refs.waterfall_container &&
        this.$refs.waterfall_container.getElementsByTagName('img');
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
              rowHeightArr.push(0);
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
        container.style.height = Math.max.apply(null, rowHeightArr) + 'px';
        this.$parent.fullscreenLoading = false;
      });
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.handleDebounce);
  }
};
</script>

<style scoped>
.waterfall-container {
  position: relative;
  width: 100%;
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