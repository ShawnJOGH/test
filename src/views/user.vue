<template>
  <div class="box">
    <div class="userdetail">
      <van-image
        :src="HeaderImg"
        style="width: 80px;height: 80px;border-radius: 100%;margin:139px 0 0 118px"
      />
      <button class="loginbtn" @click="login(this)">{{ name }}</button>
      <van-button
        v-show="userloginmes.isLogin"
        color="red"
        style="margin-left: 110px;margin-top:50px;width:100px"
        round
        type="info"
        @click="onExit"
      >退出</van-button>
    </div>
    <div class="deal">
      <div style="display: flex;justify-content: space-between;">
        <span style="font-weight: bold;">我的订单</span>
        <span style="font-size:15px;color:gray;">全部订单 ></span>
      </div>
      <div style="display: flex;justify-content: space-between;margin-top:10px;">
        <div style="display: flex;flex-direction: column;">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="require('../assets/pic/btn/生产中.png')"
            @click="goSuccessDeal(1)"
          />
          <span class="btntext">全部订单</span>
        </div>
        <div style="display: flex;flex-direction: column;">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="require('../assets/pic/btn/待付款.png')"
            @click="goSuccessDeal(2)"
          />
          <span class="btntext">待付款</span>
        </div>
        <div style="display: flex;flex-direction: column;">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="require('../assets/pic/btn/1.png')"
            @click="goSuccessDeal(3)"
          />
          <span class="btntext">待收货</span>
        </div>
        <div style="display: flex;flex-direction: column;">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="require('../assets/pic/btn/未评价.png')"
            @click="goSuccessDeal(4)"
          />
          <span class="btntext">待评价</span>
        </div>
      </div>
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">猜你喜欢</van-divider>
    <Both :productlist="productlist"></Both>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Both from "./Both";
import store from "../store";
export default {
  components: { Both },
  props: ["list", "username", "userlogin"],
  data() {
    return { HeaderImg: "", name: "未登录", student: [], productlist: [] };
  },
  methods: {
    async getProductList() {
      let result = await this.axios.get("/api/productList");
      this.productlist = result.data;
      this.productlist.map(item => {
        item.pic_list.forEach(element => {
          element.pic = require("../assets/pic/product/" + element.pic);
        });
        return item;
      });
    },

    login() {
      if (!this.userloginmes.isLogin) this.$router.push({ path: "/login" });
    },
    onExit() {
      this.name = "未登录";
      this.HeaderImg = require("../assets/用户.svg");
      this.userloginmes.isLogin = false;
    },
    goSuccessDeal(tab) {
      if (this.$store.state.userloginmes.isLogin) {
        this.$router.push({
          path: "/SuccessDeal",
          query: { tabs: tab }
        });
      } else {
        this.$toast.loading("尚未登录，请先登录");
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1500);
      }
    }
  },
  created() {
    this.getProductList();
  },
  computed: {
    ...mapState(["user", "userloginmes"])
  },
  mounted() {
    if (this.userlogin) {
      this.userloginmes.isLogin = true;
      this.userloginmes.username = this.username;
    }

    if (this.userloginmes.isLogin == false) {
      this.name = "未登录";
      this.HeaderImg = require("../assets/用户.svg");
    } else {
      this.name = this.userloginmes.username;
      this.HeaderImg = require("../assets/pic/product/4.jpg");
    }
  }
};
</script>

<style scoped>
.box {
  background: greenyellow;
  width: 100%;
  height: 200px;
}
.loginbtn {
  width: 123px;
  height: 35px;
  border-radius: 20px;
  position: relative;
  top: 30px;
  right: 100px;
  background: white;
}
.detail {
  background: white;
  width: 150px;
  position: relative;
  top: 45px;
  left: 85px;
}
.deal {
  margin: 10px;
  border-radius: 15px;
  padding: 20px;
  background: rgb(255, 253, 242);
}
.btntext {
  margin-left: 15px;
}
.userdetail {
  background: url(../assets/1.png) no-repeat;
  height: 360px;
  margin-left: 30px;
  background-size: 350px;
}
</style>
