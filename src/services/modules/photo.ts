import request from '../request'

// 获取扫描结果
export const getScanResultData = async params => {
  const token = params.token;
  const url = `https://aip.baidubce.com/rest/2.0/image-classify/v1/car?access_token=${token}`;
  const res = await request.post(url, {
    baike_num: 1, // 返回百科信息的结果数，默认不返回
    output_brand: true, // 是否输出品牌信息，默认不输出
    top_num: 2, // 返回结果top n，默认5
    // url: `https://youjia-image.cdn.bcebos.com/modelImage/4ac7beb4770b37f27058a1b6a85036ba/16889827227246266694.jpg`,
    image: params.imgBase64,
  }, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  return res;
}
