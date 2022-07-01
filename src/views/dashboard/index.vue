<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div>114514次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div>114514次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div>114514次</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" shadow="always">
          <div>卓钊今日奖励自己</div>
          <div>114514次</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
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
</style>
