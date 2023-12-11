<template>
  <div >
    <van-nav-bar  fixed :title="headerIndex.headerTitle"  left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon v-show="headerIndex.showIcon" name="share-o" size="18" @click="showShare = true" />
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
      </template>
    </van-nav-bar>
    <div style="margin-bottom:48px"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["headerIndex"],
  data() {
    return {
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" }
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    }
  }
};
</script>

<style>
</style>