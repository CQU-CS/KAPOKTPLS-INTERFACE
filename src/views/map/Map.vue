<template>
  <div class="main-box">
    <div class="search-box" style="padding-bottom: 10px;">
      <el-card class="box-card" shadow="always" style="width: 160px;" :body-style="{padding: '0px'}">
        <el-select v-model="selectData" placeholder="搜索方式" class="inputDeep" style="width: 100%;">
          <el-option v-for="(item,index) in propertyList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-card>
      <el-card class="box-card" shadow="always" style="width: 100%;" :body-style="{padding: '0px'}">
        <el-input placeholder="请输入搜索内容" class="inputDeep" v-model="inputData"> </el-input>
      </el-card>
      <el-card class="box-card" shadow="always" style="width: 120px;" :body-style="{padding: '0px'}">
        <el-button type="primary" icon="el-icon-search" @click="search" style="width: 100%;">查询</el-button>
      </el-card>
    </div>
    <div id="container" style="width:100%;height:90vh" />
  </div>
</template>

<script>
  import {
    getBuildings,
  } from '../../api/getDataBuilding.js';
  export default {
    name: "mapView",
    data() {
      return {
        map: null,
        local: null,
        mk: null,
        latitude: '',
        longitude: '',
        keyWords: '',
        name: '',
        addressList: [],
        selectData: "buildingId", //被选择的下拉
        inputData: "",
        propertyList: [{
          value: 'buildingId',
          label: '编号'
        },
        {
          value: 'buildName',
          label: '建筑名称'
        }], //用于接收类型数据
        loading: null,
        queryData: ''
      };
    },
    methods: {
      search() {
        this.queryData = this.inputData;
        this.initList();
      },
      initList() {
        this.loading = true;
        //获取用户输入/选择的查询条件
        let data = {
          [this.selectData]: this.queryData,
        }
        getBuildings(data).then((res) => {
          this.addressList = res.datas;
          this.addressList.forEach((item)=>{
            this.keyWords = item.addressContent;
            this.name = item.buildingName;
            console.log(this.keyWords);
            this.setPlace();
            console.log("继续")
          });
        })
      },
      initMap() {
        this.map = new BMap.Map('container', {
          resizeEnable: true, // 窗口大小调整
          zoom: 5
        })
        let point = new BMap.Point(116.404, 39.915);
        this.map.centerAndZoom(point, 12);
        this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        this.map.addControl(new BMap.NavigationControl());
        // this.fixedPos();
      },
      // 搜索地址
      setPlace() {
        this.local = new BMap.LocalSearch(this.map, {
          onSearchComplete: this.searchPlace,
        });
        this.local.search(this.keyWords);
        console.log("开始")
      },
      searchPlace() {
        console.log("进入")
        var that = this;
        if (this.local.getResults() != undefined) {
          this.map.clearOverlays(); //清除地图上所有覆盖物
          if (this.local.getResults().getPoi(0)) {
            let point = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            this.map.centerAndZoom(point, 18);
            this.handleMarker(this, point);
            console.log("经度：" + point.lng + "--" + "纬度" + point.lat);
            this.latitude = point.lat;
            this.longitude = point.lng;
            point = new BMap.Point(this.longitude, this.latitude);
            let marker = new BMap.Marker(point);
            this.map.addOverlay(marker);
            marker.addEventListener("click",function() {
              that.message(that.map,point);
            });
          } else {
            this.$message.error("未匹配到地点!");
          }
        } else {
          this.$message.error("未找到搜索结果!");
        }
      },
      // 设置标注
      handleMarker(obj, point) {
        let that = this;
        obj.mk = new BMap.Marker(point);
        obj.map.addOverlay(obj.mk);
        obj.mk.enableDragging(); // 可拖拽
        obj.mk.addEventListener("dragend", function (e) {
          // 监听标注的拖拽，获取拖拽后的经纬度
          that.latitude = e.point.lat;
          that.longitude = e.point.lng;
        });
        obj.map.panTo(point);
      },
      message(obj,point) {
        var opts = {
          width: 0,
          height: 0,
          title: '<a>'+this.name+'</a>'
        }
        var infoWindow = new BMap.InfoWindow("<span style='font-weight:bold;'>地址：</span>"+this.keyWords,opts);
        obj.openInfoWindow(infoWindow,point);
      }
    },
    mounted() {
      var that = this;
      this.$nextTick(()=>{
        that.initMap();
      })
    }
  };
</script>

<style lang="scss" scoped>
  .search-box {
    display: flex;
    flex-direction: row;
  }

  .main-box {
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
