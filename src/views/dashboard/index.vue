<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="always" v-loading="basicLoad">
          <div>本月总收入</div>
          <div class="number">￥ {{basicData.totalIncome}}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always" v-loading="basicLoad">
          <div>本月总支出</div>
          <div class="number">￥ {{basicData.totalExpenditures}}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always" v-loading="basicLoad">
          <div>本月运输任务</div>
          <div class="number">{{basicData.trips}} 次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always" v-loading="basicLoad">
          <div>公司员工总数</div>
          <div class="number">{{basicData.personNum}}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="always" v-loading="chart1load">
          <div class="Echarts">
            <div id="main" style="width: 100%;height:400px;"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="always" v-loading="chart2load">
          <div class="Echarts">
            <div id="main2" style="width: 100%;height:400px;"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    getIndexStatistic,
    getHalfYearIncome,
    getHalfYearExpenditures,
    getSectorDiagram
  } from '@/api/getData';
  export default {
    data() {
      return {
        basicData: {
          totalIncome: 0,
          trips: 0,
          totalExpenditures: 0,
          personNum: 0
        },
        chartx: [],
        income: [],
        outcome: [],
        profit: [],
        sector: [],
        chart1load: true,
        chart2load: true,
        basicLoad: true
      }
    },
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '近半年收支概况'
          },
          tooltip: {},
          legend: {
            data: ['收入', '支出', '利润']
          },
          xAxis: {
            data: this.chartx
          },
          yAxis: {},
          series: [{
            name: '收入',
            type: 'bar',
            data: this.income
          }, {
            name: '支出',
            type: 'bar',
            data: this.outcome
          }, {
            name: '利润',
            type: 'line',
            data: this.profit
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      myEcharts2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = this.$echarts.init(document.getElementById('main2'));

        var option2 = {
          title: {
            text: '本月收入来源'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: '0%',
            left: 'center'
          },
          series: [{
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.sector
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
      },
      init() {
        var now = new Date();
        var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        console.log(today);
        let data = {
          dateString: today
        }
        var incomeT = [];
        var outcomeT = [];
        var sector = [];
        getIndexStatistic(data).then((res) => {
          this.basicData = res.datas;
          this.basicLoad = false;
        })
        Promise.all([getHalfYearIncome(data).then((res) => {
            incomeT = res.datas.totalIncomes;
          }),
          getHalfYearExpenditures(data).then((res) => {
            outcomeT = res.datas.totalExpenditureses;
          })
        ]).then(res => {
          for (var i = 0; i < 6; i++) {
            this.income[i] = incomeT[5 - i];
            this.outcome[i] = outcomeT[5 - i];
            this.profit[i] = this.income[i] - this.outcome[i];
            var m = now.getMonth() - 4 + i;
            m = m > 0 ? m : m + 12;
            this.chartx[i] = (m) + '月';
          }
          this.myEcharts();
          this.chart1load = false;
        });
        Promise.all([
          getSectorDiagram(data).then((res) => {
            sector = res.datas.chartList;
          })
        ]).then(res => {
          this.sector[0] = {
            value: sector[0],
            name: "建筑出售"
          };
          this.sector[1] = {
            value: sector[1],
            name: "建筑出租"
          };
          this.sector[2] = {
            value: sector[2],
            name: "商品出售"
          };
          this.sector[3] = {
            value: sector[3],
            name: "物资出售"
          };
          this.sector[4] = {
            value: sector[4],
            name: "运输收入"
          };
          this.sector[5] = {
            value: sector[5],
            name: "汽车出售"
          };
          this.myEcharts2();
          this.chart2load = false;
        });
      }
    },
    mounted() {
      this.init();
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
    margin-bottom: 20px;
    border-radius: 15px;
    border: none;
    padding-top: 10px;
    padding-left: 5px;
  }

  .number {
    font-size: 36px;
    font-weight: 800;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
