<template>
  <div>
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="address"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
        @click-item="onChoose"
      />
    </div>
    <!-- 编辑地址 -->
    <van-popup
      v-model="showEditAddress"
      round
      position="bottom"
      close-on-click-overlay
      :style="{ height: '75%' }"
    >
      <van-address-edit
        :area-list="areaList"
        :address-info="deatil"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </van-popup>
    <!-- 新增地址 -->
    <van-popup
      v-model="showaddAddress"
      round
      position="bottom"
      close-on-click-overlay
      :style="{ height: '70%' }"
    >
      <van-address-edit
        save-button-text="确认添加地址"
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onAddadress"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { areaList } from "@vant/area-data";
import { Locale } from "vant";
export default {
  data() {
    return {
      addAddressMsg: [
        {
          id: "",
          name: "",
          tel: "",
          province: "",
          city: "",
          country: "",
          addressDetail: "",
          isDefault: true
        }
      ],
      showaddAddress: false,
      showEditAddress: false,
      chosenAddressId: "1",
      editId:"",
      deatil: [],
      areaList,
      searchResult: [],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          addressDetail: "",
          address: "美国华盛顿高尔夫庄园66666号"
        }
      ]
    };
  },
  computed: {
    ...mapState(["address","selectIndex"])
  },
  methods: {
    ...mapActions(["addAddress","updataAddress","removeAddress"]),
    onAdd() {
      this.showaddAddress = true;
    },
    onEdit(item, index) {
      this.showEditAddress = true;
      this.deatil = item;
      this.editId = index;
      console.log(item);
    },
    onSave(content) {
      this.address[this.editId] = content;
      let updataContent={
        "index":this.editId,
        "data":content
      }
      this.updataAddress(updataContent)
      this.$toast.success("修改成功");
      this.showEditAddress = false;
    },
    onDelete(content) {
      let Deletaddressmes={
        "index":this.editId,
        "data":content
      }
      this.removeAddress(Deletaddressmes);
      this.$toast.success("删除成功");
      this.showEditAddress = false;
    },
    onAddadress(e) {
      console.log(e);
      this.addAddress(e);
      this.$toast.success("添加成功");
      this.showaddAddress = false;
    },
    onSelect(item,index){
      console.log(index);
         this.chosenAddressId = this.address[index].id;
         this.$bus.$emit("selectAddress",item)  
         this.$toast.success("选择成功");        
    },
    onChoose(item,index){
          //  this.chosenAddressId = this.address[index].id;
    },
    // 修改详细地址时触发	value: 详细地址内容
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    },
    getLocalStorage() {
      return JSON.parse(localStorage.getItem("address"));
    },
    setLocalStorage(updateAddress) {
      localStorage.setItem("address", JSON.stringify(updateAddress));
      console.log(this.getLocalStorage());
    }
  },
  mounted() {}
};
</script>

<style>
</style>