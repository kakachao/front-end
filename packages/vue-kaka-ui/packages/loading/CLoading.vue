<template>
  <div class="c-loading-wrap">
    <div class="c-loading"></div>
  </div>
</template>

<style lang="scss" scoped>
.c-loading-wrap {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  right: 0;
  bottom: 0;
  opacity: 0.6;

  .c-loading {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    margin-left: -20px;
    margin-top: -20px;
    width: 40px;
    height: 40px;
    border: 2px solid #1890ff;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-right-color: rgba(0, 0, 0, 0.2);
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    // animation: circle infinite 0.75s linear;
  }

  @keyframes circle {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>

