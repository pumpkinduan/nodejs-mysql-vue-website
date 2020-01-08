<template>
  <div class="clearfix detail" ref="main">
    <div class="detail-inner fl">
      <div class="post-date">
        <div class="post-month">{{ details.created_at && details.created_at.split('-')[1] }}月</div>
        <div class="post-day">{{ details.created_at && details.created_at.split('-')[2] }}</div>
      </div>
      <div class="post-badge">
        <router-link :to="{name: 'tag', params: {tag: details.tag}}" class="post-tag">{{details.tag}}</router-link>
      </div>
      <main class="ql-snow">
        <section>
          <h1>{{details.title}}</h1>
          <ul class="post-meta">
            <li class="post-time">发表于: {{details.created_at}}</li>
            <li class="post-browse">访问量: {{details.browse}}</li>
            <li class="post-words">字数: {{details.total_char}}</li>
          </ul>
          <div class="description">{{ details.description }}</div>
        </section>
        <div ref="detail" v-html="details.content" class="content ql-editor"></div>
        <section class="wrap-comment">
          <Comment
            :article_title="details.title"
          />
        </section>
      </main>
    </div>
    <aside class="fr right-catalog">
      <AsideBar>
        <template>
          <ul class="catalog-wrap">
            <h2>文章目录</h2>
            <li v-for="(item, index) in catalogs" :key="index">
              <a
                :class="[curIndex == index ? 'active': '']"
                @click="handleClick(item._top, index)"
              >{{index + 1}}.{{item.text}}</a>
            </li>
          </ul>
        </template>
      </AsideBar>
    </aside>
    <el-dialog :lock-scroll="false" width="65%" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import AsideBar from '@/components/AsideBar';
import api from '@/api/article.js';
import Comment from '@/components/Comment';
import {
  throttle,
  addEvent,
  removeEvent,
  getElementPosition
} from '@/lib/tool.js';
export default {
  components: {
    AsideBar,
    Comment
  },
  beforeRouteEnter(to, from, next) {
    //请求数据
    api.getArticleDetail(to.params.articleId).then(res => {
      if (res.data && res.data.data) {
        next(vm => vm.setData(res.data.data));
      }
    });
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      curIndex: null,
      catalogDoms: '',
      details: {},
      catalogs: [],
      stayTime: 0,
      browse: 0,
      second: 0,
      timer: null,
      timerId: null,
      readingTime: 0 //阅读时长，大于该值访问量才会+1
    };
  },
  mounted() {
    this.startCount();
    setTimeout(() => {
      this.$nextTick(() => {
        //只有等到页面的DOM全部加载完毕后在进行DOM的获取与操作
        //setTimeout不能省，它的延迟时间是测试出来的，最好不低于100
        this.init();
      });
    }, 120);
  },
  beforeRouteLeave(to, from, next) {
    if (this.second > this.readingTime) {
      api.updateBrowse(this.$route.params.articleId, {
        browse: this.browse
      }); //更新访问量
      next();
    }
    next();
  },
  methods: {
    init() {
      this.catalogDoms =
        this.$refs.detail && this.$refs.detail.getElementsByTagName('h3');
      this.createCatalog(this.catalogDoms);
      this.handleScroll = throttle(this.onScroll, 30);
      addEvent(window, 'scroll', this.handleScroll);
    },
    createCatalog(elements) {
      //生成文章目录
      let len = elements && elements.length;
      this.preLoadImgs(() => {
        for (var i = 0; i < len; i++) {
          var text = elements[i].innerText.trim();
          elements[i].id = text;
          this.catalogs.push({
            text,
            _top: getElementPosition(elements[i]).y
          });
        }
      });
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
        this.$refs.detail && this.$refs.detail.getElementsByTagName('img');
      let totalCount = imgs && imgs.length,
        count = 0;
      for (let i = 0; i < totalCount; i++) {
        this.preLoadImg(imgs[i], img => {
          // 放大图片事件
          img.style.cursor = 'zoom-in';
          addEvent(img, 'click', () => {
            this.dialogVisible = true;
            this.dialogImageUrl = img.src;
          }, false)
          count++;
          if (count === totalCount) {
            //所有图片加载完成
            fn(this.$refs.detail); //表示可以获取包含图片的元素的实际高度
            imgs = null;
          }
        });
      }
    },
    scrollAnimate(end) {
      let k = 4;
      let speed_ms = 30;
      let _html = document.documentElement;
      let scroll_top = _html.scrollTop;
      let scrollInterval = null;
      if (scroll_top !== end) {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(function() {
          let speed = (end - scroll_top) / k;
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          scroll_top += speed;
          _html.scrollTop = scroll_top;
          if (Math.abs(end - scroll_top) <= Math.abs(speed)) {
            _html.scrollTop = end;
            clearInterval(scrollInterval);
          }
        }, speed_ms);
      }
    },
    onScroll() {
      //实现目录导航滚动效果
      let _html = document.documentElement;
      let items = this.catalogs;
      let len = items.length;
      // 100为预留距离
      if (len <= 0) return;
      if (_html.scrollTop + 100 < items[0]._top) {
        this.curIndex = null;
        return;
      }
      for (var i = 0; i < len; i++) {
        if (_html.scrollTop + 100 >= items[i]._top) {
          this.curIndex = i;
        }
      }
    },
    handleClick(end, index) {
      //实现目录导航点击动画效果
      this.curIndex = index;
      this.scrollAnimate(end);
    },
    startCount() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.second++;
        if (this.second > this.readingTime) {
          clearInterval(this.timer);
          this.browse++; //访问量+1
        }
      }, 1000);
    },
    setData(data) {
      this.details = data;
      this.readingTime = Math.floor(data.total_char / 40);
      this.browse = data.browse;
    },
    destroyed() {
      removeEvent(window, 'scroll', this.handleScroll);
    }
  }
};
</script>

<style scoped>
.detail {
  position: relative;
}
.detail img {
  display: block;
  margin: 3px 0;
  max-width: 100%;
  min-width: 80%;
}
.detail-inner main .content {
  margin: 3rem 0;
  line-height: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  font-size: 1.5em;
  overflow: hidden;
}
.detail-inner main .description {
  color: #555;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  margin-top: 1rem;
  word-break: break-all;
}
.right-catalog {
  position: sticky;
  top: 40px;
  width: 320px;
}
.right-catalog .catalog-wrap h2 {
  color: #555;
  font-size: 1rem;
  padding-bottom: 1.2rem;
  padding-top: 0.5rem;
}
.right-catalog .catalog-wrap li {
  padding: 0.4rem 0;
}
.right-catalog .catalog-wrap li a {
  font-size: 0.9rem;
  width: 100%;
  transition: color 0.3s;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.right-catalog .catalog-wrap li a.active {
  color: #ff8a00;
}
.right-catalog .catalog-wrap li a:hover {
  color: #ff8a00;
}
@media screen and (min-width: 920px) {
  .detail-inner {
    padding: 2rem 4rem;
    width: 810px;
    background-color: #ffffff;
    position: relative;
    box-shadow: 0 0 40px #dcdbff;
  }
  .detail-inner main h1 {
    width: 100%;
    font-size: 1.5rem;
  }
}
@media screen and (max-width: 920px) {
  .detail-inner main h1 {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
  .detail-inner {
    width: 100%;
    padding: 2rem 2.5rem;
  }
}
</style>