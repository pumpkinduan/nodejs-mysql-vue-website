<template>
  <transition name="pumpkin">
    <div class="box" v-show="$store.state.showLoading"> 
      <h1>爷啊，俺在拼命加载中...</h1>
      <div class="spinner">
        <span v-for="(item, index) in 8" :key="index"></span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* loading 动画 */
.box {
  width: 12rem;
  position: fixed;
  margin-left: -6rem;
  left: 50%;
  top: 1rem;
  z-index: 999;
}
.box h1 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
  color: #777;
}
.spinner {
  width: 100%;
  right: 50%;
  height: 4rem;
  transform: translateX(50%);
  display: inline-block;
  position: relative;
  background-color: transparent;
}
.spinner span {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  position: absolute;
  background: url("../assets/image/pumpkin.png") center center no-repeat;
  background-size: 100% 100%;
}
.spinner > span:nth-child(1) {
  top: 0;
  left: 0px;
  animation: bounce 2s linear 0s infinite;
}

.spinner > span:nth-child(2) {
  top: 0;
  left: 25px;
  animation: bounce 2s linear 0.09s infinite;
}

.spinner > span:nth-child(3) {
  top: 0;
  left: 50px;
  animation: bounce 2s linear 0.18s infinite;
}

.spinner > span:nth-child(4) {
  top: 0;
  left: 75px;
  animation: bounce 2s linear 0.27s infinite;
}

.spinner > span:nth-child(5) {
  top: 0;
  left: 100px;
  animation: bounce 2s linear 0.36s infinite;
}

.spinner > span:nth-child(6) {
  top: 0;
  left: 125px;
  animation: bounce 2s linear 0.45s infinite;
}

.spinner > span:nth-child(7) {
  top: 0;
  left: 150px;
  animation: bounce 2s linear 0.54s infinite;
}

.spinner > span:nth-child(8) {
  top: 0;
  left: 175px;
  animation: bounce 2s linear 0.63s infinite;
}

.pumpkin-enter,
.pumpkin-leave-to {
  opacity: 0;
  top: -5rem;
}
.pumpkin-enter-active,
.pumpkin-leave-active {
  transition: all 0.8s;
}
.pumpkin-enter-to {
   top: 1rem;
}

@keyframes bounce {
  0%,
  20%,
  100% {
    top: 0;
    transform: scale(1);
  }
  9% {
    top: 20px;
    transform: scale(3);
  }
}
/* ---loading 动画--- */
</style>