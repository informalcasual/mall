<template>
  <div class=''>
    <div class="up-image">
      <div class="img-pre" ref="imgPre">
        <!-- <div class="h"></div>
        <div class="v"></div> -->
        <img v-if="src != ''" width="120" height="120px" :src="src" style="object-fit: contain">

        <el-progress v-if="uploadInfo.putStatus == 2" class="progress" :width="50" type="circle" :percentage="uploadInfo.percent"></el-progress>
      </div>

      <input type="file" ref="uploadFile" style="display:none" accept="image/png, image/jpeg" @change="upload"/>

      <div class="button" @click="addfile">{{ buttonText }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  props: {
  // getUploadData(bucket, baseDir, extension = 'jpeg') {
    bucket: {
      type: String,
      default: 'images'
    },
    dir: {
      type: String,
      default: 'photos2/'
    },
    buttonText: {
      type: String,
      default: '上传'
    },
    sizeLimit: {
      type: Number,
      default: 0 // 单位是kb
    },
    fileType: {
      type: String,
      default: 'image/jpeg;image/png'
    },
    onImageLoaded: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
    file: null,
    uploadInfo: {
      putStatus: 0,
      url: '',
      percent: 0
    },
    isAdding: false,
    src: ''
  }),
  methods: {
    addfile() {
      if (!this.isLogin) {
        location.href = '/signin'

        return
      }

      if (this.isAdding) return

      this.isAdding = true

      this.$refs.uploadFile.click()

      setTimeout(() => {
        this.isAdding = false
      }, 1000)
    },
    upload(event) {
      let files = event.target.files || event.dataTransfer.files

      if (!files.length) return

      this.file = files[0]

      console.log(this.file)

      if (this.sizeLimit != 0) {
        if (this.file.size / 1024 > this.sizeLimit) {
          this.$notify({
            title: '警告',
            message: `图样文件大小应小于“${this.sizeLimit}KB”`,
            type: 'warning'
          })

          return
        }
      }

      let fileTypes = this.fileType.split(';')

      let isTypeRight = false

      fileTypes.forEach(type => {
        if (this.file.type == type) {
          isTypeRight = true
        }
      })

      if (!isTypeRight) {
        this.$notify({
          title: '警告',
          message: '图样文件格式不正确',
          type: 'warning'
        })

        return
      }

      let url = window.URL || window.webkitURL || window.mozURL,
        src = url.createObjectURL(this.file)

      let image = new Image()

      image.onload = () => {
        if (!this.onImageLoaded(image)) {
          return
        }

        this.src = src

        let extension = this.file.type.split('/')[1] || 'jpeg'

        let data = this.$uploadUtils.getUploadData('private', 'cards/', extension)

        this.$uploadUtils.getUptoken(data, request => {
          if (request.status === 200) {
            let res = JSON.parse(request.responseText)

            if (res.out == '1') {
              let xhr = new XMLHttpRequest()

              xhr.upload.onprogress = event => {
                this.uploadInfo.putStatus = 2

                console.log(event)

                this.uploadInfo.percent = (event.loaded / event.total).toFixed(0) * 100
              }

              xhr.upload.onload = () => {
                this.uploadInfo.putStatus = 5
              }

              xhr.upload.onerror = () => {
                this.uploadInfo.putStatus = 4
              }

              xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                  if (this.uploadInfo.putStatus == 5) {
                    let res = JSON.parse(xhr.responseText)

                    this.uploadInfo.url = 'http://private.gaga.me/' + res.key

                    this.$emit('uploadCompleted', {preUrl: this.src, url: this.uploadInfo.url})
                  }
                }
              }

              xhr.open('POST', '//up.qbox.me', true)

              let formData = new FormData()

              formData.append('token', res.data.uptoken)

              formData.append('file', this.file)

              xhr.send(formData)
            }
          }
        })
      }

      image.src = src
    }
  },
  created() {

  },
  mounted () {

  },
  watch: {

  },
  computed: {
    isLogin () {
      return this.$store.state.user.loginStatus
    }
  },
  components: {

  }
}
</script>

<style lang='scss' scoped>
.up-image {
  .button {
    width: 100px;
    height: 30px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border:1px solid rgba(205, 205, 205, 1);
    font-size: 0.8rem;
    text-align: center;
    line-height: 30px;
    margin: 10px 0 0 10px;
    cursor: pointer;
  }

  .img-pre {
    width: 120px;
    height: 120px;
    box-sizing: border-box;
    background: rgba(248, 248, 248, 1);
    border: 1px dashed rgba(217, 217, 217, 1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .progress {
      position: absolute;
      top: 35px;
      left: 35px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 60px;
    }

    .h {
      position: absolute;
      width: 21px;
      height: 1px;
      background: rgb(150, 150, 150);;
      top: 60px;
      left: 50px;
    }

    .v {
      position: absolute;
      width: 1px;
      height: 21px;
      background: rgb(150, 150, 150);;
      top: 50px;
      left: 60px;
    }
  }
}
</style>

<style>
  .progress .el-progress__text {
    color: #ffffff !important;
  }
</style>
