<template>
  <div>
    <div class="order_box" v-for="(item1,index1) in product_list" :key="index1">
      <div style="  display: flex;justify-content: space-between;margin:0px 20px 0 20px;">
        <span style="margin-top:10px;font-size:10px;">{{dealIndex[index1].time}}</span>
        <span style="color:red;margin-top:10px;font-size:15px;">{{dealIndex[index1].isSuccessDeal}}</span>
      </div>
      <van-card
        v-for="(item,index) in item1"
        :key="index"
        style="  border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"
        :price="item.price"
        :desc="item.desc"
        :title="item.name"
        :thumb="item.pic_list[0].pic"
        :num="item.num"
      ></van-card>
      <div style="margin-left:130px;">
        <p style="font-size:13px;">
          <span style="color:gray">共优惠:{{dealIndex[index1].discountPrice/100}}元</span>,商品实付款：
          <span style=" font-size:18px;font-weight: bold;">￥{{dealIndex[index1].price/100}}</span>
        </p>
        <van-button style="width:80px;margin:0 10px 10px 120px;" size="small" round @click="remove(index1)">删除订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "dealCard",
  props: ["dealIndex", "product_list"],
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(["removeDeal"]),
    remove(index1){
      this.$router.go(0)
      this.removeDeal(index1)
    },
  }
};
</script>

<style>
</style>