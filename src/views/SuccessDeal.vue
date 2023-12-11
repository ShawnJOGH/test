<template>
  <div>
    <Header :headerIndex="headerIndex"></Header>
    <van-tabs sticky @click="onClick" >
      <van-tab title="全部" :name="tab[0]">
        <dealCard :product_list="product_list" :dealIndex="dealIndex"></dealCard>
      </van-tab>
      <van-tab title="待付款" :name="tab[1]" replace>
        <dealCard :product_list="product_list_fail" :dealIndex="dealIndex_fail"></dealCard>
      </van-tab>
      <van-tab title="待收货" :name="tab[2]" replace>
         <dealCard :product_list="product_list_success" :dealIndex="dealIndex_success"></dealCard>
      </van-tab>
      <van-tab title="待评价" :name="tab[3]">
         <dealCard :product_list="product_list_success" :dealIndex="dealIndex_success"></dealCard>
      </van-tab>
    </van-tabs>
    <div style="margin-top:90px;"></div>
    <!-- <van-tabbar route :z-index="3">
    </van-tabbar> -->
  </div>
</template>

<script>
import dealCard from "../components/dealCard";
import { mapState, mapActions } from "vuex";
import Header from "../components/Header";
export default {
  props:["tabs"],
  components: { Header, dealCard },
  name: "SuccessDeal",
  data() {
    return {
      tab:[1,2,3,4],
      product_list: [],
      headerIndex: {
        headerTitle: "订单列表",
        showIcon: false
      },
      product_list_fail: [],
      dealIndex_fail: [],
      product_list_success: [],
      dealIndex_success: []
    };
  },
  methods: {
    onClick(name, title) {

    },
    selectDeal() {
      let i=0
      this.dealIndex.forEach(element => {
        console.log(element );
        if (element.isSuccessDeal == "交易成功") {
          this.product_list_success.push(this.deal[i]);
          this.dealIndex_success.push(this.dealIndex[i]);
          setTimeout(() => {
            this.$store.dispatch("removeCart");
        }, 1000);
        } else if (element.isSuccessDeal == "待付款") {
          this.product_list_fail.push(this.deal[i]);
          this.dealIndex_fail.push(this.dealIndex[i]);
        }
        i++
      });
    }
  },
  mounted() {
    this.product_list = this.deal;
    this.selectDeal();

  },
  computed: {
    ...mapState(["deal", "dealIndex"])
  },
  created() {  
    // this.selectDeal();
  }
};
</script>

<style>
.order_box {
  background: white;
  margin: 10px;
  border-radius: 10px;
}
</style>