<template>
  <div>
    <div class="main-box">
      <div class="search-box">
        <el-card class="box-card" shadow="always" style="width: 160px;" :body-style="{padding: '0px'}">
          <el-select v-model="selectData" placeholder="搜索方式" class="inputDeep" style="width: 100%;">
            <el-option v-for="(item,index) in propertyList" :key="index" :label="item.label" :value="item.value">
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
            element-loading-background="rgba(255, 255, 255, 0.5)" :height="fullHeight" :data="materialSaleList" stripe
            style="width: 100%;" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
            <el-table-column width="80px;" align="center" prop="materialSaleId" label="编号" sortable>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="materialName" label="物资">
            </el-table-column>
            <el-table-column align="center" width="200px;" prop="companyName" label="公司">
            </el-table-column>
            <el-table-column align="center" width="150px;" show-overflow-tooltip prop="materialSaleDate" label="日期">
            </el-table-column>
            <el-table-column align="center" width="150px;" prop="materialSaleNum" label="数量">
            </el-table-column>
            <el-table-column align="center" width="150px;" show-overflow-tooltip prop="materialSalePrice" label="价格" sortable>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="payStatus" label="交易状态">
            </el-table-column>
            <el-table-column width="160px;" align="right" v-if="tradeAs">
              <template slot="header" slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加销售记录'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑销售记录'">编辑
                </el-button>
                <el-popconfirm title="确定删除该记录吗？" style="margin-left: 8px;"
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
        <el-form-item label="物资编号" :label-width="formLabelWidth" prop="materialId">
          <el-input v-model="form.materialId" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="公司编号" :label-width="formLabelWidth" prop="companyId">
          <el-input v-model="form.companyId" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" prop="materialSaleNum">
          <el-input v-model="form.materialSaleNum" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="materialSalePrice">
          <el-input v-model="form.materialSalePrice" style="width: 90%;" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="销售日期" :label-width="formLabelWidth" prop="materialSaleDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.materialSaleDate" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="交易状态" :label-width="formLabelWidth" prop="payStatus">
          <el-input v-model="form.payStatus" style="width: 90%;" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-sizes="[50, 100, 200, 300, 400]" :page-size="limit" :hide-on-single-page="false"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getPage,deleteById,add,edit
  } from '@/api/materialSale';
  export default {
    data() {
      return {
        tradeAs: this.$store.getters.tradeAs,
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        materialSaleList: [], //用于存放doc数据
        showButton2: false,
        selectData: "materialSaleId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        dialogFormVisible: false,
        propertyList: [{
          value: 'materialSaleId',
          label: '编号'
        }, {
          value: 'materialId',
          label: '物资编号'
        }, {
          value: 'companyId',
          label: '公司编号'
        }, {
          value: 'materialSaleDate',
          label: '日期'
        }, {
          value: 'materialSaleNum',
          label: '数量'
        }, {
          value: 'materialSalePrice',
          label: '价格'
        },{
          value: 'payStatus',
          label: '交易状态'
        }], //用于接收类型数据
        loading: true, //查询时加载遮罩
        page: 1,
        limit: 50,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 185,
        dialogName: '',
        form: {
          materialId: '',
          companyId: '',
          materialSaleDate: '',
          materialSaleNum: '',
          materialSalePrice: '',
          payStatus: ''
        },
        formLabelWidth: '120px',
        rules: {
          materialId: [{
            required: true,
            message: '请输入物资编号',
            trigger: 'blur'
          }],
          companyId: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }],
          materialSaleNum: [{
            required: true,
            message: '请输入数量',
            trigger: 'blur'
          }],
          materialSalePrice: [{
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          }],
          payStatus: [{
            required: true,
            message: '请输入交易状态',
            trigger: 'blur'
          }],
          materialSaleDate: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }]
        },
        editId: -1
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
          size: this.limit,
          page: this.page,
          [this.selectData]: this.queryData
          // categoryId: this.selectData,
          // docTitle: this.queryData
        }
        getPage(data).then((res) => {
          // console.log(res.datas);
          this.materialSaleList = res.datas;
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
        console.log(row.materialSaleId);
        let data = {
          id: row.materialSaleId
        }
        deleteById(data).then((res) => {
          const h = this.$createElement;
          if (res.code=20000) {
            this.$notify({
              title: '删除成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为' + row.materialSaleId + '的物资销售记录已被删除')
            });
            this.initList();
          } else {
            this.$notify({
              title: '删除编号为' + row.materialSaleId + '的销售记录失败！',
              message: h('i', {
                style: 'color: teal'
              }, '')
            });
          }
        })
      },
      handleEdit(index, row) {
        this.editId = row.materialSaleId;
        this.form.materialId = row.materialId;
        this.form.companyId = row.companyId;
        this.form.materialSaleNum = row.materialSaleNum;
        this.form.materialSalePrice = row.materialSalePrice;
        this.form.materialSaleDate = row.materialSaleDate;
        this.form.payStatus = row.payStatus;
      },
      handleAdd() {
        this.editId = -1;
        this.form.materialId = '';
        this.form.companyId = '';
        this.form.materialSaleNum = '';
        this.form.materialSalePrice = '';
        this.form.materialSaleDate = '';
        this.form.payStatus = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editId == -1) {
              let data = {
                materialId: this.form.materialId,
                companyId: this.form.companyId,
                materialSalePrice: this.form.materialSalePrice,
                materialSaleNum: this.form.materialSaleNum,
                materialSaleDate: this.form.materialSaleDate,
                payStatus: this.form.payStatus,
              }
              add(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '添加成功！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '新的交易记录已被添加')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            } else {
              let data = {
                materialId: this.form.materialId,
                companyId: this.form.companyId,
                materialSalePrice: this.form.materialSalePrice,
                materialSaleNum: this.form.materialSaleNum,
                materialSaleDate: this.form.materialSaleDate,
                payStatus: this.form.payStatus,
                materialSaleId: this.editId
              }
              edit(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '编辑完成！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '编号为' + this.editId + '的交易记录编辑完成')
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
