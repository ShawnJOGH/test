<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar route :z-index="0"  v-show="active">
      <van-tabbar-item to="/index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/select" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" :badge="cartNum == 0 ? null : cartNum" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      active: true,
      currentComponent: "index",
      menuIndex: 0,
      tabIndex: 0,
      mockData: []
    };
  },
  watch: {
    $route(to, from) {
      let routeName = to.name;
      if (routeName == "Login" || routeName =='SuccessDeal'|| routeName =='detail'|| routeName =='myMap'|| routeName =='SearchDeatil') {
        this.active = false;
      } else {
        this.active = true;
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters(["cartNum"])
  },
  created() {
  }
};
</script>
<style scoped lang="less">
body {
  display: flex;
  flex-direction: column;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

#topBar {
  margin-top: 10px;
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;

  #searchBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #ffffff;

    .img {
      width: 20px;
      height: 20px;
    }

    .text {
      border: 0px #ffffff;
      margin-left: 10px;
      font-size: 15px;
      color: #818181;
    }
  }
}

#tabBar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 20px 0px;

  #tabBody {
    margin: 0 10px;
    background: #ffffff;
    border-radius: 10px;
    padding: 15px 35px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .img {
      width: 20px;
      height: 20px;
    }
  }
}
input[type="text"]:focus {
  outline: none;
}
.body {
  background: #ffffff;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  display: none;
  padding: 20px;
}
.show {
  display: block;
}
#menu {
  border-radius: 10px;
  padding: 10px 30px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
}

.activate {
  color: #ff7648;
  font-weight: bold;
}
.mycontent {
  margin-top: 20px;
  .mock-data {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

    .mock-item {
      margin-bottom: 30px;
      .mock-img {
        width: 180px;
      }
      .mock-name-text {
        margin-top: -40px;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import url("./assets/css/index.less");
</style>
