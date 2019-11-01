<template>
  <div class="waterfall-container" ref="waterfall_container">
    <div
      class="waterfall-item"
      :style="{width: `${width}px`, transition: 'all .4s', 'padding': `0 ${gutter/2}px`}"
      ref="waterfall_item"
      v-for="(item, index) in lists"
      :key="index"
    >
      <slot :data="item"></slot>
    </div>
    <Loading />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import {debounce} from "@/lib/debounce.js";
import {throttle} from "@/lib/throttle.js";
export default {
  components: {
    Loading
  },
  props: {
    gap: Number,
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
      leftX: [],
      heightArr: [],
      width: 240,
      loadPage: 1,
      canLoad: true,
      lists: this.cards
    };
  },
  watch: {
    cards(newVal, oldVal) {
      if (newVal.length < 1) {
        this.$nextTick(() => {
           this.canLoad = false;
        });
      } else {
        this.lists.push(...newVal);
        this.canLoad = true;
      }
    }
  },
  updated() {
    this.setPostion();
  },
  mounted() {
    this.init();
  },
  computed: {
    columns() {
      const { screenWidth, gutter, width } = this;
      return Math.floor(screenWidth / this.$refs.waterfall_item[0].offsetWidth);
    }
  },
  methods: {
    init() {
      let _self = this;
      window.onresize = debounce(function() {
        _self.setPostion();
      }, 300);
      window.onscroll = throttle(function() {
        if (_self.isloadedMore() && _self.canLoad) {
          _self.canLoad = false;
          _self.loadPage++;
          _self.$emit("loadData", _self.loadPage);
        }
      }, 300);
    },
    setPostion() {
      //避免累加
      this.heightArr = [];
      this.leftX = [];
      this.screenWidth = document.documentElement.clientWidth; //获取实时减去滚动条的视口宽度
      const { screenWidth, gutter, leftX, heightArr, columns } = this;
      const width = this.$refs.waterfall_item[0].offsetWidth;
      const eleNodeLists = this.$refs.waterfall_item;
      const container = this.$refs.waterfall_container;
      if (eleNodeLists && eleNodeLists.length) {
        for (let i = 0; i < columns; i++) {
          //计算并收集卡片的水平偏移量
          leftX.push(i * width);
          if (i == 0 || i == 1) {
            heightArr.push(this.gap + gutter); //第一行元素垂直方向排列的偏移量
          } else {
            heightArr.push(0);
          }
        }
        eleNodeLists.forEach(item => {
          const img = item.getElementsByTagName("img")[0];
          if (img.complete) {
            this.gridEle({
              heightArr,
              item,
              leftX,
              gutter,
              container
            });
          } else {
            new Promise(function(suc, err) {
              img.onload = function() {
                suc();
              };
            }).then(val => {
              this.gridEle({
                heightArr,
                item,
                leftX,
                gutter,
                container
              });
            });
          }
        });
      }
    },
    gridEle(opt) {
      const { container, heightArr, gutter, item, leftX } = opt;
      const minHeight = Math.min.apply(null, heightArr);
      const minHeightIndex = heightArr.indexOf(minHeight);
      item.style.transform =
        "translate(" + leftX[minHeightIndex] + "px," + minHeight + "px)";
      item.style.opacity = 1;
      heightArr[minHeightIndex] += Math.ceil(item.offsetHeight) + gutter;
      container.style.height = Math.max.apply(null, heightArr) + "px";
    },
    isloadedMore() {
      const { heightArr } = this;
      const heightMin = Math.min.apply(null, heightArr);
      if (heightMin < window.innerHeight + document.documentElement.scrollTop) {
        return true;
      }
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
  width: 25% !important;
  position: absolute;
  left: 0;
  right: 0;
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