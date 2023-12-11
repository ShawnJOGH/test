<template>
  <div>
    <Header :headerIndex="headerIndex"></Header>
    <div id="BaiduMap" style="padding: 20px 10px 10px 10px;width: 100vw;height: 100vh"></div>
    <div id="r-result" style="float: left; margin-top: -370px"></div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: { Header },
  name: "myMap",
  mounted() {
    this.drawer = true;
    this.getAdress();
  },
  data() {
    return {
      headerIndex: {
        headerTitle: "地图定位",
        showIcon: false
      },
      drawer: false
    };
  },
  methods: {
    getAdress() {
      setTimeout(() => {
        // 百度地图API功能
        var map = new BMapGL.Map("BaiduMap"); // 创建Map实例
        var point = new BMapGL.Point(119.177706, 26.070879);
        map.centerAndZoom(point, 17); // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(
          new BMapGL.MapTypeControl({
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
          })
        );
        // 创建点标记
        var marker1 = new BMapGL.Marker(point);
        // 在地图上添加点标记
        map.addOverlay(marker1);
        var opts = {
          width: 50, // 信息窗口宽度
          height: 10, // 信息窗口高度
          title: "闽江学院" // 信息窗口标题
        };
        var infoWindow = new BMapGL.InfoWindow("地址：闽江学院正中心", opts); // 创建信息窗口对象
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        marker1.addEventListener("click", function() {
          map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        map.addControl(new BMapGL.ScaleControl()); // 添加比例尺控件

        map.addControl(new BMapGL.ZoomControl()); // 添加比例尺控件
        map.setHeading(64.5);
        map.setTilt(73);
        // 创建定位控件
        var locationControl = new BMapGL.LocationControl({
          // 控件的停靠位置（可选，默认左上角）
          anchor: BMAP_ANCHOR_TOP_RIGHT,
          // 控件基于停靠位置的偏移量（可选）
          offset: new BMapGL.Size(20, 70)
        });
        // 将控件添加到地图上
        map.addControl(locationControl);

        // 添加定位事件
        locationControl.addEventListener("locationSuccess", function(e) {
          // var address = "";
          // console.log( e);
          // address += e.addressComponent.province;
          // address += e.addressComponent.city;
          // address += e.addressComponent.district;
          // address += e.addressComponent.street;
          // address += e.addressComponent.streetNumber;
          // alert("当前定位地址为：" + address);
        });
        locationControl.addEventListener("locationError", function(e) {
          alert(e.message);
        });
        this.drawer = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
#BaiduMap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}
</style>
