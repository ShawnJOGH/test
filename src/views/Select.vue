<template>
  <div>
    <Header :headerIndex="headerIndex"></Header>
    <van-tree-select
      v-model="activeIndex"
      :main-active-index="activeIndex"
      height="160vw"
      :items="items"
      @click-nav="changeImg"
    >
      <template #content>
        <!-- v-show="activeIndex == index" -->
        <van-card
          v-for="(item,index) in productlist"
          :key="index"
          :price="item.price"
          :desc="item.desc"
          :title="item.name"
          :thumb="item.pic_list[0].pic"
          @click-thumb="goDetail(item)"
        >
          <template #tags>
            <van-tag plain type="danger">急速退款</van-tag>
            <van-tag plain type="danger">假一赔四</van-tag>
          </template>
          <template #footer>
            <van-icon name="add" size="20px" color="red" @click="onAddCart(index)"></van-icon>
          </template>
        </van-card>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Header from "../components/Header";
export default {
  components: { Header },
  props: ["index"],
  data() {
    return {
      productlist: [],
      headerIndex: {
        headerTitle: "分类",
        showIcon: false
      },
      activeIndex: 0,
      SelectIndex: 0,
      items: [
        { text: "小型手办" },
        { text: "24cm手办" },
        { text: "35cm手办" },
        { text: "大型手办" },
        { text: "典藏手办" },
        { text: "鬼灭手办" },
        { text: "海贼手办" },
        { text: "积木" },
        { text: "毛绒" },
        { text: "玩偶" }
      ],
      guimei: [],
      longzhu: [],
      haizei: [],
      wanou: []
    };
  },
  methods: {
    ...mapActions(["addCart"]),
    goDetail(item) {
      this.$router.push({
        path: "/detail",
        query: { product: JSON.stringify(item) }
      });
    },
    onAddCart(index) {
      if (this.$store.state.userloginmes.isLogin) {
        this.addCart(this.productlist[index]);
        this.$toast.success("加入购物车成功");
      } else {
        this.$toast.loading("尚未登录，请先登录");
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1500);
      }
    },
    async getProductList() {
      let result = await this.axios.get("/api/productList");
      // this.productlist = result.data;
      // console.log(this.productlist);
      result.data.map(item => {
        item.pic_list.forEach(element => {
          element.pic = require("../assets/pic/product/" + element.pic);
        });
        return item;
      });
      result.data.forEach(element => {
        if (element.desc == "鬼灭之刃") {
          this.guimei.push(element);
        }
        if (element.desc == "海贼王") {
          this.haizei.push(element);
        }
        if (element.desc == "龙珠") {
          this.longzhu.push(element);
        }
        if (element.desc == "摆件") {
          this.wanou.push(element);
        }
      });
      console.log(this.productlist);
    },

    changeImg(index) {
      this.activeIndex = index;
      if (this.activeIndex == 0) {
        this.productlist = this.guimei;
      } else if (this.activeIndex == 1) {
        this.productlist = this.haizei;
      } else if (this.activeIndex == 2) {
        this.productlist = this.longzhu;
      } else {
        this.productlist = this.wanou;
      }
    },
    changeS(item) {}
  },
  created() {
    // this.getItems();
    this.getProductList();
  },
  mounted() {
    this.productlist = this.guimei;
    this.activeIndex = this.index;
  },
  computed: {
    ...mapState(["cart"])
  }
};
</script>

<style>
.van-sidebar-item--select {
  background: #a9e356;
}
.van-sidebar-item--select::before {
  height: 100%;
  background-color: rgb(75, 236, 183);
}
.van-tree-select__content {
  font-size: 17px;
}
</style>