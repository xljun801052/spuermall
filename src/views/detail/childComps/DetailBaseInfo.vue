<template>
  <div>
    <!-- Object.keys(obj)获取传入对象所有的key,再借由长度判断是否为0,为0表明对象是空！ -->
    <div id="detail-baseinfo" v-if="Object.keys(goods).length !== 0">
      <!-- 标题部分 -->
      <div class="info-title">{{ goods.title }}</div>
      <!-- 价格部分 -->
      <div class="info-price">
        <span class="info-price-now">{{ goods.price }}</span>
        <span class="info-price-origin">{{ goods.oldPrice }}</span>
      </div>
      <!-- 折扣部分 -->
      <div class="info-discount">
        <span v-for="(discount, index) in goods.discountDesc" :key="index">
          {{ discount }}
        </span>
      </div>
      <!-- 服务部分 -->
      <div class="info-service">
        <div v-for="(service, index) in goods.services" :key="index">
          <img
            src="~assets/img/servicechoose/choose.svg"
            class="info-service-img"
          />
          {{ service }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.info-title {
  font-size: 40px;
  color: black;
  margin: 15px 0px;
}

.info-price-now {
  color: rgb(250, 93, 177);
  font-size: 35px;
  margin: 0px 10px;
}

.info-price-origin {
  color: rgb(177, 177, 177);
  font-size: 35px;
  /* 删除线效果 */
  text-decoration: line-through;
  margin: 5px 0px;
}

.info-discount {
  font-size: 30px;
  margin: 10px 0px;
}

.info-discount span {
  margin: 5px 10px;
}

.info-service {
  font-size: 20px;
  display: flex;
  justify-content: space-around;
}

.info-service div {
  float: left;
}

.info-service img {
  width: 20px;
}
</style>