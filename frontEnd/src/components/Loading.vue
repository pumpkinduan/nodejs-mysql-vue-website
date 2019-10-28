<template>
  <transition name="pumpkin">
    <div class="box" v-show="this.$store.state.showLoading">
      <h1>爷啊，俺在拼命加载中...</h1>
      <div class="spinner spinnerThree">
        <span v-for="(item, index) in 7" :key="index"></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
        mounted() {
            console.log(this.$store.state.showLoading)
        }
    };
  }
};
</script>

<style scoped>
/* loading 动画 */
.box {
  width: 24rem;
  position: fixed;
  margin-left: -12rem;
  left: 50%;
  top: 1rem;
  z-index: 999;
}
.box h1 {
  text-align: center;
  margin-bottom: 1rem;
  color: #66666657;
}
.spinner {
  width: 100%;
  right: 50%;
  height: 4rem;
  transform: translateX(50%);
  display: inline-block;
  position: relative;
  background-color: #fff;
}
.spinnerThree span {
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  position: absolute;
  background: url("../assets/image/南瓜.jpg") center center no-repeat;
  background-size: 100% 100%;
}

.spinnerThree > span:nth-child(1) {
  top: 0;
  left: 0px;
  animation: bounce 2s linear 0s infinite;
}

.spinnerThree > span:nth-child(2) {
  top: 0;
  left: 55px;
  animation: bounce 2s linear 0.09s infinite;
}

.spinnerThree > span:nth-child(3) {
  top: 0;
  left: 110px;
  animation: bounce 2s linear 0.18s infinite;
}

.spinnerThree > span:nth-child(4) {
  top: 0;
  left: 165px;
  animation: bounce 2s linear 0.27s infinite;
}

.spinnerThree > span:nth-child(5) {
  top: 0;
  left: 218px;
  animation: bounce 2s linear 0.36s infinite;
}

.spinnerThree > span:nth-child(6) {
  top: 0;
  left: 272px;
  animation: bounce 2s linear 0.45s infinite;
}

.spinnerThree > span:nth-child(7) {
  top: 0;
  left: 325px;
  animation: bounce 2s linear 0.54s infinite;
}

.spinnerThree > span:nth-child(8) {
  top: 0;
  left: 380px;
  animation: bounce 2s linear 0.63s infinite;
}
.pumpkin-enter,
.pumpkin-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.pumpkin-enter-active,
.pumpkin-leave-active {
  transition: all 0.5s;
}
.pumpkin-enter-to {
  transform: translateY(0%);
}
@keyframes bounce {
  0%,
  10%,
  100% {
    top: 0;
    transform: scale(1);
  }
  5% {
    top: 20px;
    transform: scale(2);
  }
}
/* ---loading 动画--- */
</style>