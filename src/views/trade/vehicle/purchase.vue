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
            element-loading-background="rgba(255, 255, 255, 0.5)" :height="fullHeight" :data="truckPurchaseList" stripe
            style="width: 100%;" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
            <el-table-column width="80px;" align="center" prop="truckPurchaseId" label="编号" sortable>
            </el-table-column>
            <el-table-column align="center"  prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column width="120px;"align="center" prop="truckPlate" label="汽车车牌">
            </el-table-column>
            <el-table-column width="120px;" align="center"show-overflow-tooltip prop="truckPurchaseNum" label="采购数量" sortable>
            </el-table-column>
            <el-table-column width="160px;" align="center"prop="truckPurchasePrice" label="采购总金额" sortable>
            </el-table-column>
            <el-table-column width="160px;" align="center" prop="truckPurchaseDate" label="采购日期" sortable>
            </el-table-column>
            <el-table-column width="100px;" align="center" prop="payStatus" label="付款状态">
            </el-table-column>
            <el-table-column width="160px;" align="right" v-if="tradeAs">
              <template slot="header" slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加购买记录'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑购买记录'">编辑
                </el-button>
                <el-popconfirm title="确定删除该购买记录吗？" style="margin-left: 8px;"
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
        <el-form-item label="汽车车牌" :label-width="formLabelWidth" prop="plate">
          <el-input v-model="form.plate" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="购买数量" :label-width="formLabelWidth" prop="num">
          <el-input v-model="form.num" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="购买总金额" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" style="width: 90%;" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="购买时间" :label-width="formLabelWidth" prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="付款状态" :label-width="formLabelWidth" prop="status">
          <el-input v-model="form.status" style="width: 90%;" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
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
    getTruckPurchase,
    deleteTruckPurchase,
    addTruckPurchase,
    editTruckPurchase
  } from '../../../api/truckPurchase.js';
  export default {
    data() {
      return {
        tradeAs: this.$store.getters.tradeAs,
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        truckPurchaseList: [], //用于存放doc数据
        showButton2: false,
        selectData: "truckPurchaseId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        dialogFormVisible: false,
        propertyList: [{
          value: 'truckPurchaseId',
          label: '编号'
        },
        // {
        //   value: 'truckPlate',
        //   label: '车牌号'
        // },
        {
          value: 'truckPurchaseNum',
          label: '购买数量'
        }, {
          value: 'truckPurchasePrice',
          label: '购买金额'
        }, {
          value: 'companyId',
          label: '公司id'
        },{
          value: 'truckPurchaseDate',
          label: '购买日期'
        }, {
          value: 'payStatus',
          label: '付款状态'
        }
        ], //用于接收类型数据
        loading: true, //查询时加载遮罩
        page: 1,
        limit: 50,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 185,
        dialogName: '',
        form: {
          plate: '',
          num: '',
          price: '',
          name: '',
          date: '',
          status: ''
        },
        formLabelWidth: '120px',
        rules: {
          plate: [{
            required: true,
            message: '请输入车牌号',
            trigger: 'blur'
          }],
          num: [{
            required: true,
            message: '请输入购买数量',
            trigger: 'blur'
          }],
          price: [{
            required: true,
            message: '请输入购买总金额',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          date: [{
            required: true,
            message: '请输入购买日期',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请输入付款状态',
            trigger: 'blur'
          }],
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
          limit: this.limit,
          page: this.page,
          [this.selectData]: this.queryData
          // categoryId: this.selectData,
          // docTitle: this.queryData
        }
        getTruckPurchase(data).then((res) => {
          res.datas.forEach((item, index) => {
            // item.test = "测试属性添加";
            // console.log(item)
          })
          // console.log(res.datas);
          this.truckPurchaseList = res.datas;
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
        console.log(row.truckPurchaseId);
        let data = {
          id: row.truckPurchaseId
        }
        deleteTruckPurchase(data).then((res) => {
          const h = this.$createElement;
          if (res.code=20000) {
            this.$notify({
              title: '删除' + row.truckPlate + '购买信息成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为' + row.truckPurchaseId + '的汽车购买记录已被删除')
            });
            this.initList();
          } else {
            this.$notify({
              title: '删除' + row.truckPlate + '购买信息失败！',
              message: h('i', {
                style: 'color: teal'
              }, '')
            });
          }
        })
      },
      handleEdit(index, row) {
        this.editId = row.truckPurchaseId;
        this.form.plate = row.truckPlate;
        this.form.num = row.truckPurchaseNum;
        this.form.price = row.truckPurchasePrice;
        this.form.name = row.companyName;
        this.form.date = row.truckPurchaseDate;
        this.form.status = row.payStatus;
      },
      handleAdd() {
        this.editId = -1;
        this.form.plate = '';
        this.form.num = '';
        this.form.price = '';
        this.form.name = '';
        this.form.date = '';
        this.form.status = '';
      },
      submitForm(formPlate) {
        this.$refs[formPlate].validate((valid) => {
          if (valid) {
            if (this.editId == -1) {
              let data = {
                truckPlate: this.form.plate,
                truckPurchaseNum: this.form.num,
                truckPurchasePrice: this.form.price,
                companyName: this.form.name,
                truckPurchaseDate: this.form.date,
                payStatus: this.form.status
              }
              addTruckPurchase(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '添加成功！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '车牌为' + this.form.plate + '的购买记录已被添加')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            } else {
              let data = {
                truckPurchaseId: this.editId,
                truckPlate: this.form.plate,
                truckPurchaseNum: this.form.num,
                truckPurchasePrice: this.form.price,
                companyName: this.form.name,
                truckPurchaseDate: this.form.date,
                payStatus: this.form.status
              }
              editTruckPurchase(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '编辑完成！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '车牌为' + this.form.plate + '的购买信息编辑完成')
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
