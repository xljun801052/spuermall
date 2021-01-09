import axios from "axios";

// ========以下均使用自己的接口=====

// 获取Home下商品数据
export function getGoodsDetailInfo(goodsId) {
  return axios({
    timeout: 3000,
    url: "http://127.0.0.1:12020/detail/sell_info",
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    data: JSON.stringify({
      goodsId: goodsId
    })
  });
}

// 获取商品详情的图片数据
export function getDetailImageInfo(goodsId) {
  return axios({
    timeout: 3000,
    url: "http://127.0.0.1:12020/detail_image/image_info",
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8"
    },
    data: JSON.stringify({
      goodsId: goodsId
    })
  });
}

// 封装商品信息对象，便于开发商品详情组件时整体数据只需要对应这个GoodsInfo对象开发即可
export class Goods {
  constructor(title, desc, price, oldPrice, discountDesc, services) {
    (this.title = title),
      (this.desc = desc),
      (this.price = price),
      (this.oldPrice = oldPrice),
      (this.discountDesc = discountDesc),
      (this.services = services);
  }
}
