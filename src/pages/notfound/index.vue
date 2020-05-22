<template>
  <div class="notFound_container" @mousemove="moveMouse($event)">
    <div id="init"></div>
    <div class="notFound_content">
      <img src="./img/404.png">
    </div>
    <div class="btn_wrapper">
      <a href="/" class="index_btn">首页</a>
    </div>
    <div class="container">
      <div class="wrapper">
        <div class="body">
          <div class="body" ref="body_an7">
            <div class="body" ref="body_an6">
              <div class="body" ref="body_an5">
                <div class="body" ref="body_an4">
                  <div class="body" ref="body_an3">
                    <div class="body" ref="body_an2">
                      <div class="body" ref="body_an1">
                        <div class="body" ref="body_an">
                          <div class="body__head">
                            <div class="body_face">
                              <div class="body_mouth"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="babel">

export default {
  name: 'notFound',
  data: () => ({
    text1: '',
    text2: ''
  }),
  methods: {
    moveMouse(e) {
      let windowWidth = document.body.clientWidth / 2
      let coefficient = 2 / windowWidth
      let mX = e.clientX
      let offsetAngle = mX > windowWidth ? (mX - windowWidth) * coefficient : mX * coefficient - 2
      this.text1 = offsetAngle
      this.text2 = mX * coefficient
      for (var key in this.$refs) {
        this.$refs[key].style = `transform:rotateZ(${offsetAngle}deg)`
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.notFound_container {
  height: 100%;
  width: 100%;
}

.notFound_content {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  z-index: -5;
}

.btn_wrapper {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translateX(-50%);
}

.notFound_content img {
  width: 500px;
}

.index_btn {
  outline: none;
  width: 112px;
  border-radius: 10px;
  border: solid 3px #652096;
  background: transparent;
  margin: auto;
  margin-top: 20px;
  color: #652096;
  cursor: pointer;
  font-size: 15px;
  padding: 6px 0;
  font-weight: bold;
  display: block;
  text-align: center;
  text-decoration: none;
}

.index_btn:hover::before {
  content: "";
  position: absolute;
  top: 20px;
  left: -30%;
  width: 30px;
  height: 30px;
  background: url("/static/img/arrow.svg") no-repeat;
  background-size: 70% 70%;
  background-position: center;
}

.container {
  width: 100%;
  height: 100%;
}

.body {
  width: 120px;
  height: 0;
  padding: 1.2rem 0;
  background: black;
  margin: 0;
  position: relative;
  top: -2rem;
  left: 0;
  transition: all 1.8s ease 0s infinite;
}

.body__head {
  width: 100%;
  background-color: #000;
  font-size: 2rem;
  padding: 5.5rem 0 0;
  position: absolute;
  top: 1px;
  left: 0;
  border-radius: 60px 60px 0 0;
  transform: translateY(-100%);
}

.body_face:before,
.body_face:after {
  content: "";
  background-color: #fff;
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  position: absolute;
  top: 45%;
}

.body_face:before {
  left: 31%;
}

.body_face:after {
  left: 56%;
}

.body_mouth {
  position: absolute;
  background-color: #fff;
  top: 80%;
  transform: translateX(-50%) translateY(5px);
  left: 50%;
  width: 28px;
  height: 3px;
  border-radius: 4px;
}

.wrapper {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
}
</style>
