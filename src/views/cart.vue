<template>
  <div>
    <van-sticky>
      <div
        class="search-top"
        style="display: flex;flex-direction: row;justify-content: space-between;align-items: center"
      >
        <div class="cart-text">购物车</div>
        <div class="gray-text" @click="remove">删除</div>
      </div>
    </van-sticky>
    <div>
      <div class="cart" v-for="(item,index) in cart" :key="index">
        <van-checkbox :value="item.selected" @click="oneCheckHandler(item)"></van-checkbox>
        <van-card
          style="background-color: #FFFFFF"
          :price="item.price"
          :title="item.name"
          :thumb="item.pic"
        ></van-card>
        <van-stepper
          size="32"
          :value="item.num"
          min="1"
          max="10"
          @plus="inc(item)"
          @minus="dec(item)"
        />
      </div>
    </div>
    <van-submit-bar
      style="margin-top: 10px"
      custom-class="van-submit-bar"
      :price="cartTotal*100"
      button-text="提交订单"
      @submit="goAccount"
      to="account"
    >
      <van-checkbox @click="checkAllHandler" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import store from "..//store/index.js";
export default {
  name: "cart",
  data() {
    return {
      checked: true,
      product:[]
    };
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["cartTotal"])
  },
  methods: {
    ...mapActions(["inc", "dec", "checkAll", "checkOne"]),
    checkAllHandler() {
      console.log(this.checked);
      // this.checked=!this.checked
      this.checkAll(this.checked);
    },
    oneCheckHandler(item) {
      this.checkOne(item);
      this.checked = true;
      let arr2 = JSON.parse(localStorage.getItem("cart"));
      arr2.map(item => {
        if (!item.selected) {
          this.checked = false;
        }
      });
    },
    remove() {
      store.dispatch("removeCart");
    },
    goAccount() {
      this.cart.forEach(element => {
           if (element.selected ) {            
            this.product.push(element)
        }
      });
      console.log(this.product);     
      this.$router
        .push({
          path: "/account",
          query: { product: JSON.stringify(this.product),isCart:true }  
        })

    }
  }
};
</script>

<style scoped>
.search-top {
  background: #a9e356;
  width: 100%;
  height: 50px;
}

.cart-text {
  margin-left: 20px;
  color: white;
  font-size: 18px;
  line-height: 50px;
  font-weight: bold;
}

.gray-text {
  margin-right: 20px;
  color: #eeeeee;
  font-size: 13px;
  line-height: 50px;
}
.cart {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.van-submit-bar {
  position: relative !important;
}
</style>
