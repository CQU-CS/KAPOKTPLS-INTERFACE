<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div class="number">114514次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div class="number">114514次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div class="number">114514次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div class="number">114514次</div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card" shadow="always">
      <div class="Echarts">
        <div id="main" style="width: 600px;height:400px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
         	legend: {
            data: ['销量']
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }

    },
    mounted() {
      this.myEcharts();
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .box-card {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 15px;
    border-radius: 15px;
    border: none;
  }
  .number{
    font-size: 36px;
    font-weight: 800;
  }
</style>
