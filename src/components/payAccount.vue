<template>
  <div>
    <h4>支付订单</h4>
    <p>需支付的金额为</p>
    <h1>{{price/100}}.00￥</h1>

    <van-divider :style="{ color: '#1989fa', borderColor: 'black', padding: '0 16px' }">选择支付方式</van-divider>
    <van-cell title="选择付款方式" is-link @click="onshowPayway" label label-class="label_class">
      <template #default>
        <van-icon :name="payIcon" />
        <span>{{payWay}}</span>
      </template>
    </van-cell>
    <van-popup
      v-model="showPayway"
      round
      closeable
      position="bottom"
      close-on-click-overlay
      :style="{ height: '70%' }"
    >
      <p>选择付款方式</p>
      <van-cell style="margin-top:30px;font-size:10px" title="支付工具" />
      <van-radio-group v-model="radio">
        <van-cell-group v-for="(item,index) in radios" :key="index">
          <van-cell :icon="item.icon" :title="item.title" clickable @click="onChoosePayway(index)">
            <template #right-icon>
              <van-radio :name="index+1" />
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell
          title="添加银行卡"
          icon="card"
          is-link
          @click="onaddCard"
          label
          label-class="label_class"
        ></van-cell>
      </van-radio-group>
    </van-popup>
    <van-password-input
      gutter="10px"
      :value="value"
      info="密码为 6 位数字"
      :error-info="errorInfo"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <van-number-keyboard
      style="padding-bottom:0px;"
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { formatDate } from "../setTime.js";
import { mapState, mapActions } from "vuex";
export default {
  props: ["price", "product_list", "discountPrice"],
  name: "payAccount",
  data() {
    return {
      radios: [
        {
          icon: "alipay",
          title: "支付宝"
        },
        {
          icon: "wechat-pay",
          title: "微信"
        },
        {
          icon: "vip-card",
          title: "工商银行卡"
        },
        {
          icon: "vip-card",
          title: "招商银行卡"
        }
      ],
      payIcon: "alipay",
      payWay: "支付宝",
      activeNames: ["1"],
      radio: "1",
      value: "",
      errorInfo: "",
      showKeyboard: true,
      showPayway: false
    };
  },
  methods: {
    ...mapActions(["addDeal"]),
    onshowPayway() {
      this.showPayway = true;
    },
    onaddCard() {},
    onChoosePayway(index) {
      this.radio = index + 1;
      this.payWay = this.radios[index].title;
      this.payIcon = this.radios[index].icon;
      this.showPayway = false;
      this.showKeyboard = true;
    }
  },
  watch: {
    value(value) {
      if (value.length === 6 && value !== "123456") {
        this.errorInfo = "密码错误";
        this.$toast.fail("密码错误");
      } else if (value == "123456") {
        this.$toast.loading("支付中");
        setTimeout(() => {
          this.$toast.success("支付成功");
          let isSuccessDeal = "交易成功";
          let nowDate = formatDate(new Date(), "yyyy-MM-dd hh:mm");
          let dealMessage = {
            data: this.product_list,
            data2: {
              isSuccessDeal: isSuccessDeal,
              price: this.price,
              discountPrice: this.discountPrice,
              time: nowDate
            }
          };
          this.addDeal(dealMessage);
          this.$router.push({
            path: "/SuccessDeal"
          });
        }, 1000);
      }else if(value.length>6){
        this.value = value.slice(0, 6)
      }
    },
//添加到过滤器中
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
      }
    }
  },
  mounted() {
    console.log(this.price);
    this.onChoosePayway(0);
  },
  computed: {
    ...mapState(["deal"])
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 0px;
}
p {
  text-align: center;
  margin-bottom: 0px;
  font-size: 15px;
}
h4 {
  text-align: center;
  margin-top: 10px;
}
.van-password-input__security li {
  background: rgb(219, 215, 215);
  border-radius: 10px;
}
</style>