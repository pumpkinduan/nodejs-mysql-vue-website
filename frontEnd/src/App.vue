<template>
  <div id="pumpkin">
    <transition appear mode="out-in">
      <router-view />
    </transition>
    <div v-show="isShowTool" :class="{'bottom-controls': true, 't-hover': hover}">
      <div class="change-theme" @click.stop="toggleTheme">
        <i
          @click.stop="showThemeTool"
          :class="['iconfont', !hover ? 'iconarrow-lift':'iconarrow-right']"
        ></i>
        <span>主题换肤 | THEME SETTING</span>
        <i class="iconfont iconchilun--"></i>
      </div>
      <transition name="fade">
        <div class="theme-menu" v-show="isShowMenu">
          <ul>
            <li @click.stop="changeTheme(index)" v-for="(icon, index) in themeItems" :key="index">
              <i :class="['iconfont', icon]"></i>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <canvas ref="night_theme" class="night-theme"></canvas>
    <Player />
  </div>
</template>
<script>
import Player from '@/components/Player'
export default {
  components: {Player},
  data() {
    return {
      hover: false,
      isShowMenu: false,
      isShowTool: true,
      themeItems: ['iconiconset0454', 'iconicon', 'icontaiyang', 'iconsnow'],
      themes: ['night', 'pink', 'blue', 'snow']
    };
  },
  methods: {
    showThemeTool() {
      this.hover = !this.hover;
      this.isShowMenu = false;
    },
    changeTheme(index) {
      if (index === 0) {
        this.$refs.night_theme.style = 'visibility: visible;';
      } else {
        this.$refs.night_theme.style = 'visibility: hidden;';
      }
      document.documentElement.setAttribute('data-theme', this.themes[index]);
    },
    toggleTheme() {
      this.isShowMenu = !this.isShowMenu;
    },
    onScroll() {
      this.isShowMenu = false;
      this.hover = false;
    }
  },
  watch: {
    $route: () => {
      document.getElementById('backToTop').click();
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.onScroll, false);
    });
  }
};
</script>
<style lang='less' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  transform: scale(1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
#pumpkin {
  width: 100%;
  position: relative;
  .bg_color_theme();
  .night-theme {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    visibility: hidden;
    z-index: 999;
    pointer-events: none;
  }
  .bottom-controls {
    position: fixed;
    z-index: 123;
    bottom: 0;
    right: 0;
    transform: translateX(87%);
    height: 35px;
    transition: transform 0.5s;
    &.t-hover {
      right: 5px;
      transform: translateX(0%);
    }
    .change-theme {
      height: 45px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #333;
      padding: 0 10px 10px 10px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #ddd;
      i {
        font-size: @font_super_large2;
        &:hover {
          color: @blue1;
        }
      }
      span {
        text-shadow: 2px 2px 6px @blue2;
        transition: color 0.2s;
        &:hover {
          color: @blue1;
        }
      }
      .iconchilun-- {
        color: @blue1;
        font-size: @font_super_large3;
        animation: rotate 3.3s linear infinite;
      }
    }
    .theme-menu {
      position: absolute;
      top: -50px;
      left: 0;
      width: 100%;
      height: 50px;
      background: #fff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      &::after {
        .triangle();
      }
      ul {
        padding: 10px;
        display: flex;
        justify-content: space-around;
        li {
          transition: all 0.3s;
          padding: 5px;
          background: #ddd;
          border-radius: 50%;
          cursor: pointer;
          i {
            font-size: @font_super_large2;
          }
          &:hover {
            background: @blue2;
          }
        }
      }
      .font-size-controls {
        span {
          font-size: @font_small;
        }
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
