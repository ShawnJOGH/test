<template>
  <div>
      <GoodsList :list="pl"></GoodsList>
  </div>
</template>

<script>
import GoodsList from "../components/GoodsList"
export default {
    data() {
        return {
            pl:[]
        }
    },
    name:'Jingxuan',
    props:["productlist"],
    components:{GoodsList},
      methods: {
    select() {
      this.productlist.forEach(element => {
        if (element.desc == "摆件") {
          this.pl.push(element);
        }
      });
    }
  },
  mounted() {
    this.select();
  }
}

</script>

<style>

</style>