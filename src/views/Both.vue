<template>
      <GoodsList :list="productlist"></GoodsList>
</template>

<script>
import GoodsList from "../components/GoodsList"
export default {
    name:'Both',
    props:["productlist"],
    components:{GoodsList},
    mounted() {      
    
    },
}

</script>

<style >
 
</style>
