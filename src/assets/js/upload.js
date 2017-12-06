import axios from 'axios'
import md5 from 'md5'

// 获取上传图片参数
export const uploadPromise = new Promise((resolve, reject) => {
  axios.get('/api/config/sts/getStsParam').then((response) => {
    resolve(response)
  }).catch((error) => {
    console.log(error)
    reject(error)
  })
})

// 获取上传图片大小
export function getImgSize (file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = (theFile) => {
      var image = new Image()
      image.onload = () => {
        resolve(image)
      }
      image.src = theFile.target.result
    }
    reader.readAsDataURL(file)
  })
}
