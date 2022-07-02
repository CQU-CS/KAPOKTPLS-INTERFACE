<template>
  <div id="all">
<!--    <input type="text" id="addressId" name="address_detail" placeholder="地址" v-model="address_detail"-->
<!--           className="input_style">-->
    <span style="padding-left: 1%;padding-right: 20px">仓库地址:</span>
    <el-input id = "addressId" v-model="address_detail" placeholder="请输入地址" style="width: 30%; padding-top: 20px; padding-bottom: 20px; margin-right: 10%"></el-input>

    <span style="padding-left: 1%;padding-right: 20px">运输任务编号:</span>
    <el-input id = "missionId" v-model="mission_detail" placeholder="请输入任务编号" style="width: 30%; padding-top: 20px; padding-bottom: 20px"></el-input>
    <div id="allmap"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address_detail: null, //详细地址
      userlocation: {lng: "", lat: ""},
      mission_detail:''
    }
  },
  mounted() {
    this.$nextTick(function () {

      var th = this
      // 创建Map实例
      var map = new BMap.Map("allmap");
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(106.29879552551228, 29.594395759765654); // 创建点坐标，重庆大学的经纬度坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();
      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象,自动提示
        {
          "input": "addressId"
          , "location": map
        })
      var myValue;
      ac.addEventListener("onconfirm", function (e) {    //鼠标选择下拉列表中某条记录的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        this.address_detail = myValue
        setPlace();
      });

      function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
          th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索，搜索完成后执行myFun函数
          onSearchComplete: myFun
        });
        local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener("click", function (e) {
          //经度
          console.log(th.userlocation.lng);
          //维度
          console.log(th.userlocation.lat);

        })
      }

    })
  }
  // ,
  //
  // methods: {
  //   handleMission()
  // }
}
</script>
<style scoped>
#allmap {
  margin-left: 1%;
  width: 98%;
  height: 800px;
  font-family: "微软雅黑";
  border: 1px solid green;
}
</style>
