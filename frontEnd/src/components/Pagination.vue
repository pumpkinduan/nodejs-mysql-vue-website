<template>
  <div class="pagination-wrap">
    <ul class="pagination">
      <li :class="currentIndex == 1 ? 'disabled': ''" @click="prevPage">
        <span class="iconfont iconarrow-lift"></span>
      </li>
      <li
        v-for="(item, index) in pageList"
        :key="index"
        :class="currentIndex == item.page ? 'active': ''"
        @click="currentChange(item.page)"
      >
        <span>{{item.txt}}</span>
      </li>
      <li :class="currentIndex == totalPage ? 'disabled': ''" @click="nextPage">
        <span class="iconfont iconarrow-right"></span>
      </li>
      <li class="total-count">
        共{{totalPage}}页
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    totalData: {
      //数据总条数
      type: Number,
      default: 5
    },
    currentPage: {
      //显示当前页码
      type: Number,
      default: 1
    },
    showSize: {
      //显示的分页数量
      type: Number,
      default: 5
    },
    pageSize: {
      //每一页所包含的数据条数
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      currentIndex: this.currentPage
    };
  },
  computed: {
    totalPage() {
      //页码总数
      return Math.ceil(this.totalData / this.pageSize);
    },
    pageList() {
      //计算页码的存储数组
      // 1 ... 5 6 7 8 9 ... 100  当前显示页 7，中间数为7
      //1.中间部分的页码计算(5,6,7,8,9)
      let total = this.totalPage, //页码总数
        central = this.currentIndex, //以当前显示页为 分页显示 的中间数
        temp = [], //临时存放页码的数组
        result = [],
        interval = Math.floor(this.showSize / 2); //距离中间数的偏移量
      if (total > this.showSize) {
        //页码总数大于分页数，会出现 ...
        for (var i = 1; i <= total; i++) {
          temp.push(i);
        }
        let c_index = temp.indexOf(central); //找到当前页所在的位置
        //找出中间数
        if (c_index <= interval) {
          //当前页左边的页码数小于interval
          central = temp[interval];
        }
        if (central > total - interval) {
          //当前页右边边的页码数小于interval
          central = total - interval;
        }
        temp = temp.splice(central - interval - 1, this.showSize); //收集分页页码
        for (i = 0; i < temp.length; i++) {
          result.push({
            page: temp[i],
            txt: temp[i]
          });
        }
        //当前页码左边显示的页码数量大于interval时，出现 1 ...
        if (this.currentIndex - 1 > interval) {
          result.shift();
          result.unshift(
            {
              page: 1,
              txt: 1
            },
            {
              page: this.currentIndex - interval - 1,
              txt: '...'
            }
          );
        }
        //当前页码右边显示的页码数量大于interval时，出现  ... totalData
        if (total - this.currentIndex > interval) {
          result.pop();
          result.push(
            {
              page: this.currentIndex + interval + 1,
              txt: '...'
            },
            {
              page: this.totalPage,
              txt: this.totalPage
            }
          );
        }
        return result;
      } else {
        //不会出现 ... ,则总页数有多少，显示多少分页
        for (let i = 1; i <= total; i++) {
          temp.push({
            page: i,
            txt: i
          });
        }
        return temp;
      }
    }
  },
  methods: {
    nextPage() {
      if (this.currentIndex >= this.totalPage) {
        return;
      }
      this.currentIndex++;
      this.$emit('next-page', this.currentIndex);
    },
    prevPage() {
      if (this.currentIndex <= 1) {
        return;
      }
      this.currentIndex--;
      this.$emit('prev-page', this.currentIndex);
    },
    currentChange(page) {
      if (this.currentIndex == page) {
        return;
      }
      this.currentIndex = page;
      this.$emit('current-change', page);
    }
  }
};
</script>

<style scoped lang="less">
.pagination-wrap {
  width: 100%;
  font-size: @font_medium;
  padding: 10px 0;
  text-align: center;
  ul.pagination {
    display: inline-flex;
    li {
      margin-right: 5px;
      cursor: pointer;
      &.total-count {
        font-size: @font_medium_s;
        display: inline-flex;
        align-items: center;
      }
      span {
        transition: background-color 0.3s;
        border-radius: 50%;
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }
      &.disabled span {
        cursor: not-allowed;
        color: #ccc;
      }
      &:hover:not(.disabled) span {
        background-color: rgb(245, 159, 173);
        color: #fff;
      }
      &.active span {
        background-color: #ff9d00;
        color: #fff;
      }
    }
  }
}
</style>
