<template>
  <div>
    <div class="main-box">
      <div class="search-box">
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
      <el-card class="box-card" shadow="always" :body-style="{padding: '0px'}">
        <div style="margin-left: 15px;margin-right: 15px;">
          <el-table v-loading="loading" element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.5)" :height="fullHeight" :data="companyList" stripe
            style="width: 100%;" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
            <el-table-column width="80px;" align="center" prop="buildingRentId" label="编号" sortable>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="addressContent" label="地址">
            </el-table-column>
            <el-table-column width="100px;" prop="buildingType" label="建筑类型" sortable>
            </el-table-column>
            <el-table-column prop="companyName" label="租赁公司" sortable>
            </el-table-column>
            <el-table-column width="100px;" prop="buildingRentPrice" label="租赁价格" sortable>
            </el-table-column>
            <el-table-column width="150px;" prop="buildingRentStartTime" label="开始日期" sortable>
            </el-table-column>
            <el-table-column width="150px;" prop="buildingRentEndTime" label="结束日期" sortable>
            </el-table-column>
            <el-table-column align="center" width="100px;" prop="payStatus" label="付款状态" sortable>
            </el-table-column>
            <el-table-column width="160px;" align="right" v-if="tradeAs">
              <template slot="header" slot-scope="scope">
                <el-button size="mini" type="primary"
                  @click="handleAdd(); dialogFormVisible = true; dialogName='添加建筑租赁'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑建筑租赁'">编辑
                </el-button>
                <el-popconfirm title="确定删除该建筑租赁吗？" style="margin-left: 8px;"
                  @onConfirm="handleDelete(scope.$index, scope.row)">
                  <el-button size="mini" type="danger" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-card>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" center width="40%">
      <el-form :model="form" :rules="rules" ref="form" style="text-align: center;">

        <el-form-item label="建筑id" :label-width="formLabelWidth" prop="buildingId">
          <el-input v-model="form.buildingId" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="公司id" :label-width="formLabelWidth" prop="companyId">
          <el-input v-model="form.companyId" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth" prop="buildingRentStartTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.buildingRentStartTime" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth" prop="buildingRentEndTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.buildingRentEndTime" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="租赁价格" :label-width="formLabelWidth" prop="buildingRentPrice">
          <el-input v-model="form.buildingRentPrice" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="付款状态" :label-width="formLabelWidth" prop="payStatus" align="left">
          <div>
            <el-switch style="margin-left: 5%;" v-model="form.payStatus" active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-sizes="[20,50, 100, 200, 300]" :page-size="limit" :hide-on-single-page="true"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getBuildingRent,
    deleteBuildingRent,
    addBuildingRent,
    editBuildingRent
  } from '@/api/getDataBuildingRent.js';
  export default {
    data() {
      return {
        tradeAs: this.$store.getters.tradeAs,
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        companyList: [], //用于存放doc数据
        showButton2: false,
        selectData: "buildingRentId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        dialogFormVisible: false,
        propertyList: [{
            value: 'buildingRentId',
            label: '编号'
          },
          {
            value: 'buildingRentEndTime',
            label: '结束时间'
          },
          {
            value: 'payStatus',
            label: '付款状态'
          }
        ], //用于接收类型数据
        loading: true, //查询时加载遮罩
        page: 1,
        limit: 20,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 185,
        dialogName: '',
        form: {
          buildingId: '',
          companyId: '',
          buildingRentStartTime: '',
          buildingRentEndTime: '',
          buildingRentPrice: '',
          payStatus: ''
        },
        formLabelWidth: '120px',
        rules: {
          buildingId: [{
            required: true,
            message: '请输入建筑编号',
            trigger: 'blur'
          }],
          companyId: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }],
          buildingRentStartTime: [{
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }],
          buildingRentEndTime: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'change'
          }],
          buildingRentPrice: [{
            required: true,
            message: '请输入租赁价格',
            trigger: 'blur'
          }]
        },
        editId: -1,
        options: [{
          value: '办公楼',
          label: '办公楼'
        }, {
          value: '驿站',
          label: '驿站'
        }, {
          value: '仓库',
          label: '仓库'
        }]
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
        this.page = 1;
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
        getBuildingRent(data).then((res) => {
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
            that.fullHeight = window.fullHeight - 185
          })()
        }
      },
      handleDelete(index, row) {
        console.log(row.buildingRentId);
        let data = {
          id: row.buildingRentId
        }
        deleteBuildingRent(data).then((res) => {
          const h = this.$createElement;
          if (res.code = 20000) {
            this.$notify({
              title: '删除' + row.buildingRentId + '成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为' + row.buildingRentId + '的建筑租赁已被删除')
            });
            this.initList();
          } else {
            this.$notify({
              title: '删除' + row.buildingRentId + '失败！',
              message: h('i', {
                style: 'color: teal'
              }, '')
            });
          }
        })
      },
      handleEdit(index, row) {
        this.editId = row.buildingRentId;
        this.form.buildingId = row.buildingId;
        this.form.companyId = row.companyId;
        this.form.buildingRentStartTime = row.buildingRentStartTime;
        this.form.buildingRentEndTime = row.buildingRentEndTime;
        this.form.buildingRentPrice = row.buildingRentPrice;
        this.form.payStatus = row.payStatus ? true : false;
      },
      handleAdd() {
        this.editId = -1;
        this.form.buildingId = '';
        this.form.companyId = '';
        this.form.buildingRentStartTime = '';
        this.form.buildingRentEndTime = '';
        this.form.buildingRentPrice = '';
        this.form.payStatus = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editId == -1) {
              let data = {
                buildingId: this.form.buildingId,
                companyId: this.form.companyId,
                buildingRentStartTime: this.form.buildingRentStartTime,
                buildingRentEndTime: this.form.buildingRentEndTime,
                buildingRentPrice: this.form.buildingRentPrice,
                payStatus: this.form.payStatus ? 1 : 0
              }
              console.log(this.form.payStatus);
              console.log(data.payStatus);
              addBuildingRent(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '添加成功！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '建筑编号为' + this.form.buildingId + '的建筑租赁已被添加')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            } else {
              let data = {
                buildingId: this.form.buildingId,
                companyId: this.form.companyId,
                buildingRentStartTime: this.form.buildingRentStartTime,
                buildingRentEndTime: this.form.buildingRentEndTime,
                buildingRentPrice: this.form.buildingRentPrice,
                payStatus: this.form.payStatus ? 1 : 0,
                buildingRentId: this.editId
              }
              editBuildingRent(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '编辑完成！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '建筑编号为' + this.form.buildingId + '的建筑租赁编辑完成')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
