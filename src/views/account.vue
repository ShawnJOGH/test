<template>
  <div>
    <Header :headerIndex="headerIndex"></Header>

    <!-- 收货地址 -->
    <van-cell
      style="margin-top:53px;border-radius: 10px"
      center
      :title="addressName"
      :label="addressDetail"
      icon="location"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="edit" class="edit-icon" @click="showAddressPopup" />
      </template>
    </van-cell>
    <van-popup
      v-model="showAddress"
      round
      position="bottom"
      close-on-click-overlay
      :style="{ height: '70%' }"
    >
      <AddressList></AddressList>
    </van-popup>
    <!-- 商品信息 -->
    <div v-for="(item,index) in product_list"
        :key="index">
      <van-card  
        style="border-radius: 10px"
        :price="item.price"
        :desc="item.desc"
        :title="item.name"
        :thumb="item.pic_list[0].pic"
      >
        <template #tags>
          <van-tag plain type="danger">七天无理由退换货</van-tag>
          <van-tag plain type="danger">急速退款</van-tag>
          <van-tag plain type="danger">假一赔四</van-tag>
        </template>
        <template #footer>
          <van-stepper size="32" :value="item.num" min="1" max="10" @plus="inc(index)" @minus="dec(index)" />
        </template>
      </van-card>
    </div>
    <!-- 订单运费 -->
    <van-cell style="margin-top:10px;border-radius: 10px 10px 0 0" title="订单运费" value="免费" />

    <!-- 运费险规则 -->
    <popupBox></popupBox>

    <!-- 优惠券 -->
    <!-- 优惠券单元格 -->
    <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
    <!-- 优惠券列表 -->
    <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <!-- 订单留言 -->
    <van-cell
      title="订单留言"
      is-link
      value="选填，建议先与商家协商一致"
      @click="showPopup"
      label
      label-class="label_class"
    />
    <van-popup
      v-model="showRule"
      round
      position="bottom"
      close-on-click-overlay
      :style="{ height: '70%' }"
    >
      <div style="display: flex;justify-content: space-between;margin-top:20px">
        <span @click="message_cancle" style="margin-left:15px">取消</span>
        <span style="font-weight:bold">订单留言</span>
        <span style="margin-right:15px;color:red" @click="message_commit">提交</span>
      </div>
      <div class="popup_box">
        <van-field
          class="message_box"
          v-model="message"
          border
          rows="2"
          :autosize="textborder"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- 结算输入密码页面 -->
    <van-popup
      closeable
      v-model="showPassword"
      round
      position="bottom"
      close-on-click-overlay
      :style="{ height: '80%' }"
      @click-close-icon="dealCancel"
      @click-overlay="dealCancel"
    >
    <payAccount :price="totalPrice*100-discountPrice" :discountPrice="discountPrice" :product_list="product_list"></payAccount>
    </van-popup>
    <!-- 底部提交订单栏 -->
    <van-submit-bar 
      text-align="left"
      :price="totalPrice*100-discountPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
    </van-submit-bar>
      <div style="margin-top:90px;"></div>
  </div>

</template>

<script>
import payAccount from "../components/payAccount"
import popupBox from "../components/popupBox";
import Header from "../components/Header";
import AddressList from "../components/AddressList";
import { formatDate } from "../setTime.js";
import { mapState,mapGetters, mapActions } from "vuex";
//可用优惠券列表
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠20元",
  reason: "",
  value: 2000,

  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "20.0",
  unitDesc: "元"
};
const coupon2 = {
  available: 1,
  condition: "无使用门槛\n最多优惠20元",
  reason: "",
  value: 1500,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "15.0",
  unitDesc: "元"
};
export default {
  props: ["product", "isCart"],
  components: { Header, popupBox, AddressList,payAccount },
  data() {
    return {
      product_list: [],
      num: 1,
      discountPrice: "",
      totalPrice:"",
      message: "",
      addressName: "请选择地址",
      addressDetail: "",
      showPassword:false,
      showRule: false,
      showList: false,
      showAddress: false,
      // 留言板大小
      textborder: {
        maxHeight: 200,
        minHeight: 100
      },
      // 顶部传参
      headerIndex: {
        headerTitle: "确定订单",
        showIcon: false
      },
      // 当前选中优惠券的索引
      chosenCoupon: -1,
      //优惠券列表
      coupons: [coupon, coupon2],
      //不可用优惠券列表
      disabledCoupons: [coupon]
    };
  },
  methods: {
    ...mapActions(["addDeal"]),
    showPopup() {
      this.showRule = true;
    },
    showAddressPopup() {
      this.showAddress = true;
    },
    message_cancle() {
      this.message = "";
      this.showRule = false;
    },
    message_commit() {
      this.$toast.success("留言成功");
      this.showRule = false;
    },
    //优惠券切换回调	index选中优惠券的索引
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      this.discountPrice = this.coupons[index].value;
    },
    //兑换优惠券回调	code兑换码
    onExchange(code) {
      this.coupons.push(coupon);
    },
    //提交订单
    onSubmit() {
      this.showPassword=true
      console.log(this.totalPrice*100-this.discountPrice);   
    },
    onClickEditAddress() {},
    accessAddress(item) {
      this.addressName = item.name;
      this.addressDetail = item.address + item.addressDetail;
      this.showAddress = false;
    },
    inc(index) {
      this.product_list[index].num++;
      this.totalPrice+=this.product_list[index].price
    },
    dec(index) {
      this.product_list[index].num--;
      this.totalPrice-=this.product_list[index].price
    },
    dealCancel(){
      this.$toast.loading("支付中");
      setTimeout(() => {
        this.$toast.fail("支付失败")
        let isSuccessDeal = "待付款";
        let nowDate = formatDate(new Date(), "yyyy-MM-dd hh:mm");
        let dealMessage = {
          data: this.product_list,
          data2: {
            isSuccessDeal: isSuccessDeal,
            price: this.totalPrice*100-this.discountPrice,
            discountPrice: this.discountPrice,
            time:nowDate
          }
        };
        this.addDeal(dealMessage);
        this.$router.push({
          path: "/SuccessDeal"
        });
      }, 1000);
    }
  },
  mounted() {
    this.$bus.$on("selectAddress", this.accessAddress);
    if (this.isCart==='true') {
      this.product_list=this.product;
      this.totalPrice=this.cartTotal
    } else {
      this.product.num=1
      this.product_list.push(this.product); 
      this.totalPrice=this.product.price
    }
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["cartTotal"])
  },
  filters: {
	formatDate(time) {
	var date = new Date(time);
	return formatDate(date, 'yyyy-MM-dd');
   }
},
};
</script>

<style>
.popup_box {
  margin: 10px 15px 15px 15px;
  padding: 5px 5px 5px 5px;
}
.edit-icon {
  font-size: 16px;
  line-height: inherit;
}
.message_box {
  margin-top: 20px;
  background: rgb(238, 234, 234);
  border-radius: 8px;
}
</style>