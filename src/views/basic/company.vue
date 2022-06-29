<template>
  <div>
    <div class="main-box">
      <div class="search-box">
        <el-card class="box-card" shadow="always" style="width: 160px;" :body-style="{padding: '0px'}">
          <el-select v-model="selectData" placeholder="搜索方式" class="inputDeep" style="width: 100%;">
            <el-option v-for="item in propertyList" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-card>
        <el-card class="box-card" shadow="always" style="width: 100%;" :body-style="{padding: '0px'}">
          <el-input placeholder="请输入搜索内容" class="inputDeep" v-model="inputData"> </el-input>
        </el-card>
        <el-card class="box-card" shadow="always" style="width: 120px;" :body-style="{padding: '0px'}">
          <el-button type="primary" icon="el-icon-search" @click="search" style="width: 100%;">查询</el-button>
        </el-card>
      </div>
      <!-- <el-card class="box-card2" shadow="always" :body-style="{padding: '0px'}">
        <el-input placeholder="请输入内容" class="inputDeep" v-model="queryData">
          <el-button slot="append" type="primary" icon="el-icon-search" @click="initList">查询</el-button>
        </el-input>
      </el-card> -->
      <el-card class="box-card" shadow="always">
        <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-background="rgba(255, 255, 255, 0.5)"
          :height="fullHeight" :data="companyList" stripe style="width: 100%">
          <el-table-column width="80px;" align="center" prop="companyId" label="编号" sortable>
          </el-table-column>
          <el-table-column align="center" show-overflow-tooltip prop="companyName" label="公司名称">
          </el-table-column>
          <el-table-column width="200px;" prop="companyEstablishmentTime" label="创立日期" sortable>
          </el-table-column>
          <el-table-column width="150px;" show-overflow-tooltip prop="companyPhone" label="电话">
          </el-table-column>
          <el-table-column width="120px;" prop="companyInstruction" label="行业">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="addressContent" label="地址">
          </el-table-column>
          <el-table-column width="160px;" align="right">
            <template slot="header" slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleAdd">添加</el-button>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-popconfirm title="确定删除该公司吗？" style="margin-left: 8px;"
                @onConfirm="handleDelete(scope.$index, scope.row)">
                <el-button size="mini" type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-sizes="[50, 100, 200, 300, 400]" :page-size="limit" :hide-on-single-page="true"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getCompany,
    deleteCompany
  } from '../../api/getData.js';
  export default {
    data() {
      return {
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        companyList: [], //用于存放doc数据
        showButton2: false,
        selectData: "companyId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        propertyList: [{
          value: 'companyId',
          label: '编号'
        }, {
          value: 'companyName',
          label: '公司名称'
        }, {
          value: 'companyEstablishmentTime',
          label: '创立日期'
        }, {
          value: 'companyPhone',
          label: '电话'
        }, {
          value: 'companyInstruction',
          label: '行业'
        }], //用于接收类型数据
        loading: true, //查询时加载遮罩
        page: 1,
        limit: 50,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 230
      }
    },
    watch: {
      fullHeight(val) { //监控浏览器高度变化
        if (!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function() {
            that.timer = false
          }, 400)
        }
      }
    },
    methods: {
      testVon() {
        this.showButton2 = !this.showButton2;
        //this.dialogVisible = true;
      },
      handleSizeChange(val) {
        this.limit = val;
        console.log(`每页 ${val} 条`);
        this.initList();
      },
      handleCurrentChange(val) {
        this.page = val;
        console.log(`当前页: ${val}`);
        this.initList();
      },
      search() {
        this.queryData = this.inputData;
        this.initList();
      },
      initList() {
        this.loading = true;
        //获取用户输入/选择的查询条件
        let data = {
          limit: this.limit,
          page: this.page,
          [this.selectData]: this.queryData
          // categoryId: this.selectData,
          // docTitle: this.queryData
        }
        getCompany(data).then((res) => {
          res.datas.forEach((item, index) => {
            // item.test = "测试属性添加";
            // console.log(item)
          })
          // console.log(res.datas);
          this.companyList = res.datas;
          this.total = res.total;
          this.loading = false;
          //条件筛选遍历
          /* let filterArr = this.companyList.filter((item, index) => {
          	return item.docId % 5 == 0;
          }); */
        })
      },
      get_bodyHeight() { //动态获取浏览器高度
        const that = this
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight
            that.fullHeight = window.fullHeight - 230
          })()
        }
      },
      handleDelete(index, row) {
        console.log(row.companyId);
        let data = {
          id: row.companyId
        }
        deleteCompany(data).then((res) => {
          const h = this.$createElement;
          if (res.stat) {
            this.$notify({
              title: '删除' + row.companyName + '成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为'+row.companyId+'的公司已被删除')
            });
            this.initList();
          } else {
            this.$notify({
              title: '删除' + row.companyName + '失败！',
              message: h('i', {
                style: 'color: teal'
              }, '')
            });
          }
        })
      }
    },
    mounted() {
      console.log("mounted被调用");
      this.get_bodyHeight();
      this.$nextTick(() => {
        //页面初始化的时候执行
        this.initList();
        //this.testMap();
        //初始化获取类型数据
        // this.initCategoryList();
      })
    },
  }
</script>

<style>
  .table-style-thead {
    width: 100%;
  }

  .table-style-thead-th {
    width: 250px;
  }

  .el-select .el-input {
    width: 130px;
  }

  .inputDeep .el-input__inner {
    border: 0 !important;
    outline: none;
  }

  .box-card {
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 15px;
    border-radius: 15px;
    border: none;
  }

  .block {
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
  }

  .search-box {
    display: flex;
    flex-direction: row;
  }

  .main-box {
    margin-left: 8px;
    margin-right: 8px;
  }
</style>
