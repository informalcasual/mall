<template>
  <transition name="fade">
    <div class="loading-mask absolute m0 top-0 right-0 bottom-0 left-0">
      <div class="loading-spinner absolute center col-12 top-half">
        <div class="loading-bounce1"></div>
        <div class="loading-bounce2"></div>
        <div class="loading-bounce3"></div>
        <p class="loading-text m0">{{text}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default{
    name: 'loading',
    props: {
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .loading-mask {
    /*background-color: rgba(255, 255, 255, .97);*/
    bottom: -10px;
  }

  .loading-spinner {
    margin-top: -12px;
  }

  .loading-spinner > div {
    width: 20px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.7);

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bounceDelay 1.4s infinite ease-in-out;
    animation: bounceDelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .loading-spinner .loading-bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .loading-spinner .loading-bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  .loading-text {
    margin-top: 14px;
  }

  @-webkit-keyframes bounceDelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0.0) translate3d(0,0,0);
    }
    40% {
      -webkit-transform: scale(1.0) translate3d(0,0,0);
    }
  }

  @keyframes bounceDelay {
    0%, 80%, 100% {
      transform: scale(0.0) translate3d(0,0,0);
      -webkit-transform: scale(0.0) translate3d(0,0,0);
    }
    40% {
      transform: scale(1.0) translate3d(0,0,0);
      -webkit-transform: scale(1.0) translate3d(0,0,0);
    }
  }
</style>
