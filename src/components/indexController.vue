<template>
  <div id="box">
    <div class="box2">
      <!-- 顶部搜索 -->
      <div class="box3">
        <div
          style="color: #FFFFFF;font-weight: 600;font-size:17px;margin-left: 5px;width:50px;"
        >手办商城</div>
        <van-search
          style="margin-right: 10px;width: 72%"
          background="#A9E356"
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词"
          @focus="clickSearch"
        />
        <van-icon @click="gomap" name="location" />
        <span style="font-size:10px">{{locationMsg}}</span>
      </div>
    </div>
    <div
      v-show="!isFixed"
      :style="isGridFixed ? 'position: absolute;top:220px' : 'position: fixed'"
      class="box4"
    ></div>
    <div style="padding: 10px;margin-top: 45px">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" style="margin-top: 15px">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img
            :src="require('../assets/image/' + image)"
            style="border-radius: 15px;height: 150px;width: 100%"
          />
        </van-swipe-item>
      </van-swipe>

      <!-- 九宫格 -->
      <van-grid id="grid" :column-num="5" icon-size="50px" class="gridbox">
        <van-grid-item
          v-for="(item, index) in cataList"
          :icon="require('../assets/pic/cata/' + item.pic)"
          :text="item.name"
          :key="index"
          @click="goSelect(index)"
        ></van-grid-item>

        <!-- 滚动条 -->
      </van-grid>
      <van-notice-bar scrollable background="#a9e356" text="米袋虽空——樱花开哉！" color="white" />

      <!-- 导航栏： -->
      <div id="tab" :class="isFixed ? 'tab-sticky-true' : ''">
        <div class="box6">
          <div
            :class="(isFixed ? 'tab-sticky' : '') + (tabIndex == index ? ' tab-select' : '')"
            v-for="(item, index) in tabArr"
            :key="index"
            class="box7"
            @click="onTabClick(index)"
          >{{ item}}</div>
        </div>
      </div>
      <!-- 商品 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
window.addEventListener("beforeunload", e => {
  window.scroll(0, 0);
});
import getCurrentCityName from "@/util/getUserLocation";
import store from "..//store/index.js";
import GoodsList from "../components/GoodsList";

export default {
  name: "index",
  components: { GoodsList },
  data() {
    return {
      locationMsg: "",
      value: "",
      gridTop: 0,
      scrollTop: 0,
      tabTop: 0,
      isGridFixed: false,
      isFixed: false,
      tabIndex: 0,
      tabArr: ["全部", "精选", "热门", "畅销", "经典"],
      productlist: [],
      cataList: [],
      images: []
    };
  },
  methods: {
    async getCataList() {
      let result = await this.axios.get("/api/cataList");
      this.cataList = result.data;
    },
    async getImglist() {
      let result = await this.axios.get("/api/imgList");
      this.images = result.data;
    },
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
    onTabClick(index) {
      this.tabIndex = index;
      switch (this.tabIndex) {
        case 0:
          this.$router
            .push({
              path: "/index/both",
              query: { productlist: JSON.stringify(this.productlist) }
            })
            .then(result => {})
            .catch(err => {});
          break;
        case 1:
          this.$router
            .push({
              path: "/index/Jingxuan",
              query: { productlist: this.productlist }
            })
            .then(result => {})
            .catch(err => {});
          break;
        case 2:
          this.$router
            .push({
              path: "/index/Remen",
              query: { productlist: this.productlist }
            })
            .then(result => {})
            .catch(err => {});
          break;
        case 3:
          this.$router
            .push({
              path: "/index/Changxiao",
              query: { productlist: this.productlist }
            })
            .then(result => {})
            .catch(err => {});
          break;
        case 4:
          this.$router
            .push({
              path: "/index/Jingdian",
              query: { productlist: this.productlist }
            })
            .then(result => {})
            .catch(err => {});
      }
    },
    onTabSticky(isFixed) {
      this.isFixed = isFixed;
    },
    handleScroll() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.scrollTop > this.gridTop) {
        this.isGridFixed = true;
      } else {
        this.isGridFixed = false;
      }
      if (this.scrollTop > this.tabTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    addCart(goods) {
      store.dispatch("addCart", goods);
    },
    goSelect(index) {
      this.$router.push({
        path: "/select",
        query: { index: index }
      });
    },
    gomap() {
      this.$router.push({
        path: "/myMap"
      });
    },
    // 获取地址信息
    getCurrentCity() {
      getCurrentCityName().then(city => {
        this.locationMsg = city;
      });
    },
    clickSearch() {
      this.$router.push({
        path:"/SearchDeatil",
        query: { productlist: JSON.stringify(this.productlist) }
      })
    }
  },
  created() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.getProductList();
    this.getImglist();
    this.getCataList();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    if (this.tabIndex == 0) {
      this.onTabClick(0);
    }
    setTimeout(() => {
      this.tabTop = document.getElementById("tab").offsetTop - 60;
      this.gridTop = document.getElementById("grid").offsetTop - 60;
      this.onTabClick(0);
    }, 200);
    this.getCurrentCity();
  }
};
</script>
<style>
.van-search {
  padding: 0 !important;
}

body {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.van-search__content {
  background-color: #ffffff !important;
}
.van-grid-item__content {
  background-color: transparent !important;
}
.tab-sticky {
  background-color: #f5f5f5 !important;
}
.tab-sticky2 {
  background-color: #ffffff !important;
}
.tab-select {
  color: #ffffff;
  background-color: #a9e356 !important;
}
.tab-sticky-true {
  background-color: #ffffff !important;
  position: fixed;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  top: 60px;
  right: 0;
  left: 0;
  z-index: 99;
}
.cart-wrap {
  display: flex;
  flex-direction: row;
  margin-top: 7px;
  font-size: 14px;
  justify-content: space-between;
}
.gray_text {
  font-size: 13px;
  margin-top: 7px;
  color: #ccc;
}
.box2 {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000000;
}
.box3 {
  background-color: #a9e356;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 15px 10px 15px;
  font-size: 15px;
}
.box4 {
  background-color: #a9e356;
  height: 100px;
  width: 100%;
  z-index: -1;
}
.gridbox {
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 10px;
}
.box6 {
  font-size: 13px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.box7 {
  background-color: #ffffff;
  border-radius: 7px;
  padding: 5px 22px;
  display: flex;
  align-items: center;
}
</style>
<style lang="less" scoped>
@import url("../assets/css/index.less");
</style>
