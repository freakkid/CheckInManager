// TODO
// ? 发出请求给二维码api
// http://apis.juhe.cn/qrcode/api?key=df6616c88fd11236bba916113cbb704b&text=https://checkinUrl&type=2
// 根据请求返回的状态码是不是200，如果不是200则返回null
// 如果是200则返回一个png格式的图片
// !该函数暂时不能正常使用，返回的png图片无法显示
export async function getQRCode(checkinUrl) {
  return await new Promise(function(resolve, reject) {
    request('http://apis.juhe.cn/qrcode/api?key=df6616c88fd11236bba916113cbb704b&text=https://www.baidu.com&type=2', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
