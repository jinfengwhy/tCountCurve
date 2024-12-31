import Taro from "@tarojs/taro";

export function chooseImage() {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: 1, // 默认9，设置允许选择的图片数量
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePaths 可以作为 img 标签的 src 属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // 处理图片，例如上传到服务器或显示在页面上
        resolve(tempFilePaths[0]);
      },
      fail: function (err) {
        // 处理选择图片失败的情况
        console.error('选择图片失败：', err);
        reject(err);
      }
    });
  });
}

export function imageToBase64(filePath) {
  return new Promise((resolve, reject) => {
    Taro.getFileSystemManager().readFile({
      filePath,
      encoding: 'base64',
      success: function (res) {
        resolve(res.data);
      },
      fail: function (err) {
        console.error('图片转换base64失败：', err);
        reject(err);
      }
    });
  });
}
