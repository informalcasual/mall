import { axiosBase } from '../axiosBaseConfig'

export default class Upload {
  uploadFile(uploadData) {
    let url = `/thirdpart/qiniu`
    return axiosBase(url, uploadData)
  }

  getKeyAndTokenForUploadSmilarFile(uploadData) {
    let url = `/thirdpart/qiniu_temp_uptoken`
    return axiosBase(url, uploadData)
  }

  uploadAvatar(data) {
    let url = `/user/set_avatar`
    return axiosBase(url, data)
  }
}
