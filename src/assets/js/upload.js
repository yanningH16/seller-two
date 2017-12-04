// 获取上传图片参数
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
