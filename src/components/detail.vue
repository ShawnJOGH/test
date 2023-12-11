<template>
  <div>
    <!-- 顶部 -->
    <Header :headerIndex="headerIndex"></Header>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(image,index) in product.pic_list" :key="index">
        <van-image :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
    <!-- 抢购倒计时 -->
    <van-cell-group>
      <van-cell title="限购5" value="距结束仅剩" :label="sign+product.price+sign2+product.unit" />
      <van-count-down class="time_sty" :time="time">
        <template #default="timeData">
          <span class="block">{{ Math.floor(time/1000/60/60) }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </van-cell-group>
    <van-cell
      style="margin-top:10px;border-radius: 10px"
      :title="product.name"
      value="内容"
      size="large"
      label="描述信息"
    />
    <!-- 送货信息 -->
    <van-cell
      style="margin-top:10px;border-radius: 10px"
      title="送货信息，预计3日之内到达"
      is-link
      value="售后说明"
      @click="showPopup"
      label="15天价保 · 退货运费险 · 7天无理由退换"
      label-class="label_class"
    />
    <van-popup
      v-model="showRule"
      closeable
      position="bottom"
      close-on-click-overlay
      :style="{ height: '70%' }"
    >
      <p style="font-weight: bold;font-size:25px;">15天价保</p>
      <p
        style="color:gray;font-size:10px;"
      >若商品在付款后15天内降价,可通过“我的淘宝-专属客服/官方客服-价保中心-—键价保"申请补差，平台将根据《价保服务标准》处理。</p>
      <p style="font-weight: bold;font-size:25px">退货运费险</p>
      <p style="color:gray;font-size:10px">卖家投保退货运费险,负担一定金额退货运费（保单生效以下单显示为准）</p>
      <p style="font-weight: bold;font-size:25px">7天无理由退货</p>
      <p style="color:gray;font-size:10px">满足7天无理由退换货申请的前提下，包邮商品需要买家承担退货邮费，非包邮商品需要买家承担发货和退货邮费。</p>
    </van-popup>

    <!-- 评价 -->
    <van-cell-group>
      <van-cell
        style="margin-top:10px;border-radius: 10px"
        title="买家评价"
        is-link
        value="查看更多"
        label="95.7%超高好评"
      >
        <van-rate
          v-model="value"
          @change="onChange"
          void-icon="star"
          color="#ffd21e"
          void-color="#eee"
        />
      </van-cell>
      <van-cell title="用户" icon="user-circle-o" label="价格实惠，好评！">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">用户</span>
          <van-tag style="margin:0px 8px 0px 8px;" type="danger">好评</van-tag>
          <van-tag style="margin:0px 8px 0px 8px;" type="danger">买过4次</van-tag>
        </template>
      </van-cell>
      <van-cell icon="user-circle-o" label="价格实惠，好评！">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">用户2</span>
          <van-tag style="margin:0px 8px 0px 8px;" type="danger">好评</van-tag>
          <van-tag style="margin:0px 8px 0px 8px;" type="danger">买过4次</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 商品参数 -->
    <van-cell style="margin-top:10px" title="商品参数">
      <template #label>
        <span>生产日期</span>
        <span style="color:black;">&emsp;&emsp;720天</span>
        <van-divider />
        <span>材料</span>
        <span style="color:black;">&emsp;&emsp;&emsp;&emsp;2</span>
        <van-divider />
        <span>品牌</span>
        <span style="color:black;">&emsp;&emsp;&emsp;&emsp;3</span>
        <van-divider />
        <span>产地</span>
        <span style="color:black;">&emsp;&emsp;&emsp;&emsp;4</span>
        <van-divider />
        <span>规格</span>
        <span style="color:black;">&emsp;&emsp;&emsp;&emsp;5</span>
        <br />
      </template>
    </van-cell>

    <div style="margin-bottom:50px;"></div>
    <!-- 底部栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="home-o" text="主页" dot to="index" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="cartNum == 0 ? null : cartNum"
        to="cart"
      />
      <van-goods-action-icon :badge="1" icon="shop-o" text="店铺" to="select" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onAddCart()" />
      <van-goods-action-button type="danger" text="立即购买" @click="goAccount()" />
    </van-goods-action>
  </div>
</template>

<script>
import Header from "./Header";
import { mapGetters, mapActions } from "vuex";
import { showToast } from "vant";
export default {
  components: { Header },
  props: ["product"],
  data() {
    return {
      headerIndex: {
        headerTitle: "商品详细",
        showIcon: true
      },
      sign: "￥",
      sign2: "/",
      title: "商品名",
      sysTime: 0,
      imgage: [],
      value: 3,
      time: 0,
      showRule: false
    };
  },
  methods: {
    ...mapActions(["addCart"]),
    onChange(value) {
      console.log("当前值：" + value);
    },
    showPopup() {
      this.showRule = true;
    },
    setTime(time) {
      this.sysTime = new Date();
      var spaceTime = new Date(time) - this.sysTime;
      if (spaceTime < 0) spaceTime = 0;
      return spaceTime;
    },
    goAccount() {
      if (this.$store.state.userloginmes.isLogin) {
        this.$router.push({
          path: "/account",
          query: { product: JSON.stringify(this.product), isCart: false }
        });
      } else {
        this.$toast.loading("尚未登录，请先登录");
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1500);
      }
      console.log(this.product);
    },
    onAddCart() {
      if (this.$store.state.userloginmes.isLogin) {
        this.addCart(this.product);
        this.$toast.success("加入购物车成功");
      } else {
        this.$toast.loading("尚未登录，请先登录");
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1500);
      }
    }
  },

  mounted() {
    window.scroll(0, 0);
    this.time = this.setTime(this.product.time);
  },
  computed: {
    ...mapGetters(["cartNum"])
  }
};
</script>

<style scoped>
p {
  padding: 0px 10px 0px 10px;
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  /* line-height: 150px; */
  text-align: center;
  background-color: #a9e356;
  /* margin-top: 48px; */
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #a9e356;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #a9e356;
}

.time_sty {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.birth {
  position: absolute;
  left: -100px;
}
.label_class {
  width: 250px;
}
/* /deep/ .van-share-sheet__cancel::before { 
  position: relative;
  z-index: 2200
} */
</style>