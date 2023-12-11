<template>
  <div class="box8" >
    <van-grid :border="false" :column-num="2">
      <van-grid-item  v-for="(item,index) in list" :key="index">
        <goods  :product="item"></goods>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Goods from "./goods.vue";
import { computed } from "vue";
export default {
  name: "GoodsList",
  components: {
    Goods
  },
  props: ["list"]
};
</script>

<style>
.box8 {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
</style>
