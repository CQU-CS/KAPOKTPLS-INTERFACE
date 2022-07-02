<template>
  <div id="container" style="width:100%;height:90vh" />
</template>

<script>
// 绘制线路需要的坐标
var lineArr = [[116.478935, 39.997761], [108.983569, 34.285675]]
export default {
  data () {
    return {
      firstArr: [116.478935, 39.997761] // 中心点/初始坐标
    }
  },
  created () {},
  mounted () {
    setTimeout(() => {
      this.initMap() // 异步加载（否则报错initMap is not defined）
      // this.initroad()
    }, 1000)
  },

  methods: {
    // 初始化地图
    initMap () {
      var that = this
      this.map = new AMap.Map('container', {
        resizeEnable: true, // 窗口大小调整
        center: this.firstArr, // 中心 firstArr: [116.478935, 39.997761],
        zoom: 5
      })
      // 添加maker
      that.initroad()
    },
    // 初始化轨迹
    initroad () {
      // 绘制还未经过的路线
      this.polyline = new AMap.Polyline({
        map: this.map,
        path: lineArr,
        showDir: true,
        strokeColor: '#77DDFF', // 线颜色--浅蓝色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 4, // 线宽
        // strokeStyle: "solid"  //线样式
        lineJoin: 'round' // 折线拐点的绘制样式
      })
      // 绘制路过了的轨迹
      var passedPolyline = new AMap.Polyline({
        map: this.map,
        strokeColor: '#00BBFF', // 线颜色-深蓝色
        path: [[116.478935, 39.997761], [108.983569, 34.285675]],
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6 // 线宽
        // strokeStyle: "solid"  //线样式
      })
      this.map.setFitView() // 合适的视口
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
