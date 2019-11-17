<template>
  <transition name="pumpkin">
    <div class="box" v-show="$store.state.showLoading"> 
      <div class="spinner">
        <span v-for="(item, index) in 5" :key="index"></span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* loading 动画 */
.box {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.9);
  position: absolute;
  z-index: 9999;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.spinner {
  position: relative;
  background-color: transparent;
}
.spinner span {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  position: absolute;
  background-color: #999;
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
.pumpkin-enter,
.pumpkin-leave-to {
  opacity: 0;
}
.pumpkin-enter-active,
.pumpkin-leave-active {
  transition: opacity 0.8s;
}
.pumpkin-enter-to {
   opacity: 1;
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