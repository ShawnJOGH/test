<template>
  <div style="margin-bottom:40px;">
    <div class="box2">
      <!-- 顶部搜索 -->
      <div class="box3">
        <van-icon name="arrow-left" @click="back" />
        <van-search
          style="margin-right: 10px;width: 90%"
          background="#A9E356"
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @input="onSearch"
        ></van-search>
      </div>
    </div>
    <div style="margin-bottom:65px;"></div>
    <van-card
      v-for="(item,index) in serchdata"
      :key="index"
      style="margin-top:20px;"
      tag="精品"
      :price="item.price"
      :desc="item.desc"
      :title="item.name"
      :thumb="item.pic_list[0].pic"
      origin-price="1000.00"
      @click-thumb="goDetail(item)"
    />
  </div>
</template>

<script>
export default {
  props: ["productlist"],
  data() {
    return {
      serchdata: [],
      value: ""
    };
  },
  methods: {
    onSearch(val) {
      this.serchdata = this.productlist.filter(
        value => value.name.indexOf(val) !== -1
      );
    },
    back() {
      this.$router.go(-1);
    },
    goDetail(item) {
      this.$router.push({
        path: "/detail",
        query: { product: JSON.stringify(item) }
      });
    }
  },
  mounted() {
    console.log(this.productlist);
  },
  watch: {}
};
</script>

<style scoped>
.box2 {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000000;
}
</style>