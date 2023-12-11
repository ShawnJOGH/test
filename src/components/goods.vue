<template>
  <div v-if="product.id"  class="content">
    <van-image  :src="product.pic_list[0].pic" @click="goDetail()"></van-image>
    <div>{{product.name}}</div>
    <div class="gray_text">{{product.desc}}</div>
    <div class="cart-wrap">
      <div>
        <span style="color:red">¥{{product.price}}</span>
        <span class="gray_text">/{{product.unit}}</span>
      </div>
      <van-icon name="shopping-cart-o" size="20px" color="red" @click="onAddCart"></van-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["product"],
  methods: {
    ...mapActions(["addCart"]),
    goDetail() {
      this.$router.push({
        path: "/detail",
        query: { product: JSON.stringify(this.product) }
      });
    },
    onAddCart(){
      if(this.$store.state.userloginmes.isLogin){    
         this.addCart(this.product)
         this.$toast.success("加入购物车成功");
      }else{
        this.$toast.loading("尚未登录，请先登录")
        setTimeout(() => {    
            this.$router.push({path:"/login"})
        }, 1500);
        // this.$toast.fail("尚未登录")
       
      }
 
    }
  },
  mounted() {
  }
};
</script>

<style scoped="scoped">
.cart-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.gray_text {
  color: #ccc;
}
.content {
  background: #ffffff;
  padding: 10px;
  border: 1px rgb(45, 248, 136) solid;
}
</style>
