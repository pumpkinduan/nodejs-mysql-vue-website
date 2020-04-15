<template>
  <div class="home">
    <Header />

    <div class="headertop">
      <figure class="themebg" ref="themebg">
        <div class="mask"></div>
        <div class="site-info">
          <h1 class="site-greet">Hey Guys, This is Pumpkin!</h1>
          <div class="sg-content">
            <i @click="prevCover" class="iconfont iconarrow-lift"></i>
            <p>『如果每个人都能理解我们，那我们得普通成什么样呢』</p>
            <i @click="nextCover" class="iconfont iconarrow-right"></i>
          </div>
        </div>
        <div class="banner-wave-transition">
          <div class="wave1"></div>
          <div class="wave2"></div>
        </div>
      </figure>
    </div>

    <main class="clearfix">
      <div class="left-aside fl" ref="main">
        <transition appear mode="out-in">
          <router-view :categories="categories" :categories_count="categories_count" />
        </transition>
      </div>
      <aside class="right-aside fr">
        <AsideBar :categories_count="categories_count" :archive_count="archive_count" />
      </aside>
    </main>
    <Footer />
  </div>
</template>
<script>
import AsideBar from '@/components/AsideBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCategories, getArchives } from '@/api/index.js';
export default {
  components: {
    Header,
    Footer,
    AsideBar
  },
  data() {
    return {
      archive_count: '',
      categories_count: '',
      categories: [],
      archives: [],
      bgCovers: ['cover1', 'cover2', 'cover3', 'cover4', 'cover5'],
      co_index: 0
    };
  },
  created() {
    getCategories().then(data => {
      if (data) {
        this.categories_count = data.meta.categories_count;
        this.categories = data.data;
      }
    });
    getArchives().then(data => {
      if (data) {
        this.archive_count = data.meta.count;
        this.archives = data.data;
      }
    });
  },
  methods: {
    nextCover() {
      let len = this.bgCovers.length;
      this.co_index++;
      if (this.co_index > len) {
        this.co_index = 0;
      }
      document.documentElement.setAttribute(
        'data-cover',
        this.bgCovers[this.co_index]
      );
    },
    prevCover() {
      let len = this.bgCovers.length;
      this.co_index--;
      if (this.co_index < 0) {
        this.co_index = len - 1;
      }
      document.documentElement.setAttribute(
        'data-cover',
        this.bgCovers[this.co_index]
      );
    }
  }
};
</script>

<style lang="less" scoped>
// 首页背景图片url 大图
@cover1: 'https://raw.githubusercontent.com/pumpkinduan/FigureBed/master/img/20200415104316.jpg';
@cover2: 'https://raw.githubusercontent.com/pumpkinduan/FigureBed/master/img/20200415104910.jpg';
@cover3: 'https://raw.githubusercontent.com/pumpkinduan/FigureBed/master/img/20200415104927.jpg';
@cover4: 'https://raw.githubusercontent.com/pumpkinduan/FigureBed/master/img/20200415104939.png';

// @cover1: 'https://s1.ax1x.com/2020/04/15/J9sTyj.jpg'

// @cover1: 'https://s1.ax1x.com/2020/04/14/JSh7lT.jpg';
// @cover2: 'https://s1.ax1x.com/2020/04/14/JS4pp6.png';
// @cover3: 'https://s1.ax1x.com/2020/04/14/JShLm4.jpg';
// @cover4: 'https://s1.ax1x.com/2020/04/14/JShO0J.jpg';
// @cover5: 'https://s2.ax1x.com/2020/02/03/1aiMRJ.png';

// 首页背景图片url 中等图
@cover1_s: 'https://s1.ax1x.com/2020/04/14/JSh7lT.md.jpg';
@cover2_s: 'https://s1.ax1x.com/2020/04/14/JS4pp6.md.png';
@cover3_s: 'https://s1.ax1x.com/2020/04/14/JShLm4.md.jpg';
@cover4_s: 'https://s1.ax1x.com/2020/04/14/JShO0J.md.jpg';
@cover5_s: 'https://s2.ax1x.com/2020/02/03/1aiMRJ.md.png';

@font_super_large5: 50px;
.home {
  width: 100%;
  position: relative;
  .headertop {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #999;
    .themebg {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      .bg_image(@cover1);
      .site-info {
        font-size: @font_large;
        color: rgba(255, 255, 255, 0.77);
        text-align: center;
        max-width: 444px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .site-greet {
          font-size: @font_super_large5;
          text-shadow: 2px 2px 4px #544;
        }
        .sg-content {
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          i {
            color: rgba(255, 255, 255, 0.33);
            font-weight: bolder;
            font-size: @font_super_large4;
            transition: color 0.3s;
            &:hover {
              color: @blue1;
            }
          }
        }
      }
    }
    .banner-wave-transition {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      overflow-x: hidden;
      height: 52px;
      div {
        width: 600%;
        height: 100%;
        position: absolute;
      }
      .wave1 {
        left: -120rem;
        top: 0;
        background: url('../assets/image/wave1.png') repeat-x;
        animation: wave1 30s infinite linear;
      }
      .wave2 {
        left: -100rem;
        top: 0;
        background: url('../assets/image/wave2.png') repeat-x;
        animation: wave2 60s infinite linear;
      }
    }
  }
  main {
    .bg_color_theme();
    width: 100%;
    padding: 30px;
    position: relative;
    .left-aside {
      width: 63%;
    }
    .right-aside {
      position: sticky;
      top: 80px;
      width: 27%;
      margin-right: 3%;
      border-radius: 5px;
    }
  }
}

@keyframes wave1 {
  0% {
    left: -120rem;
  }
  100% {
    left: -40rem;
  }
}
@keyframes wave2 {
  0% {
    left: -100rem;
  }
  100% {
    left: -60rem;
  }
}
@media screen and (max-width: 768px) {
  .home {
    .headertop {
      height: 233px;
      .themebg {
        top: 40px;
        height: 233px;
        .site-greet {
          display: none;
        }
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .home main {
    padding: 10px;
    .left-aside {
      width: 100%;
    }
    .right-aside {
      display: none;
    }
  }
}
</style>

