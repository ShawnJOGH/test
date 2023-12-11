<template>
  <div>
    <van-cell
      title="运费险"
      is-link
      value="商家赠送，退换货可赔付"
      @click="showPopup"
      label
      label-class="label_class"
    />
    <van-popup
      v-model="showRule"
      round
      closeable
      position="bottom"
      close-on-click-overlay
      :style="{ height: '70%' }"
    >
      <div class="popup_box">
        <p style="font-weight: bold;font-size:25px;">15天价保</p>
        <p
          style="color:gray;font-size:15px;"
        >若商品在付款后15天内降价,可通过“我的淘宝-专属客服/官方客服-价保中心-—键价保"申请补差，平台将根据《价保服务标准》处理。</p>
        <p style="font-weight: bold;font-size:25px">退货运费险</p>
        <p style="color:gray;font-size:15px">卖家投保退货运费险,负担一定金额退货运费（保单生效以下单显示为准）</p>
        <p style="font-weight: bold;font-size:25px">7天无理由退货</p>
        <p style="color:gray;font-size:15px">满足7天无理由退换货申请的前提下，包邮商品需要买家承担退货邮费，非包邮商品需要买家承担发货和退货邮费。</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "popupBox",
    methods: {
    showPopup() {
      this.showRule = true;
    }
  },
  data() {
    return {
        showRule: false
    };
  }
};
</script>

<style>
.popup_box {
  margin: 10px 15px 15px 15px;
  padding: 5px 5px 5px 5px;
}
</style>