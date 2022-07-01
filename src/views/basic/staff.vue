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
            element-loading-background="rgba(255, 255, 255, 0.5)" :height="fullHeight" :data="personList" stripe
            style="width: 100%;" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
            <el-table-column width="80px;" align="center" prop="personId" label="编号" sortable>
            </el-table-column>
            <el-table-column align="center" width="150px;" show-overflow-tooltip prop="personName" label="姓名">
            </el-table-column>
            <el-table-column align="center" width="50px;" prop="personGenderString" label="性别">
            </el-table-column>
            <el-table-column align="center" width="150px;" show-overflow-tooltip prop="personBirth" label="出生日期">
            </el-table-column>
            <el-table-column align="center" width="100px;" prop="personNumber" label="电话">
            </el-table-column>
            <el-table-column align="center" width="100px;" prop="personQq" label="QQ">
            </el-table-column>
            <el-table-column align="center" width="150px;" prop="personAddress" label="地址">
            </el-table-column>
            <el-table-column align="center" width="150px;" prop="companyName" label="公司">
            </el-table-column>
            <el-table-column align="center" prop="personBankAccount" label="账户">
            </el-table-column>
            <el-table-column width="160px;" align="right">
              <template slot="header" slot-scope="scope">
                <el-button v-show="basicAs" size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加员工'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button v-show="basicAs" size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑员工'">编辑
                </el-button>
                <el-popconfirm title="确定删除该员工信息吗？" style="margin-left: 8px;"
                  @onConfirm="handleDelete(scope.$index, scope.row)">
                  <el-button v-show="basicAs" size="mini" type="danger" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-card>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" center width="40%">
      <el-form :model="form" :rules="rules" ref="form" style="text-align: center;">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="personName">
          <el-input v-model="form.personName" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="personGender">
          <el-input v-model="form.personGender" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="personNumber">
          <el-input v-model="form.personNumber" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="personBirth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.personBirth" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth" prop="personQq">
          <el-input v-model="form.personQq" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="personAddress">
          <el-input v-model="form.personAddress" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="公司编号" :label-width="formLabelWidth" prop="companyId">
          <el-input v-model="form.companyId" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="账户" :label-width="formLabelWidth" prop="personBankAccount">
          <el-input v-model="form.personBankAccount" style="width: 90%;"></el-input>
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
  } from '@/api/staff';
  export default {
    data() {
      return {
        basicAs: this.$store.getters.basicAs,
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        personList: [], //用于存放doc数据
        showButton2: false,
        selectData: "personId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        dialogFormVisible: false,
        propertyList: [{
          value: 'personId',
          label: '编号'
        }, {
          value: 'personName',
          label: '姓名'
        }, {
          value: 'personGender',
          label: '性别'
        }, {
          value: 'personBirth',
          label: '出生日期'
        }, {
          value: 'personNumber',
          label: '电话'
        }, {
          value: 'personQq',
          label: 'QQ'
        }, {
          value: 'personAddress',
          label: '地址'
        }, {
          value: 'companyId',
          label: '公司编号'
        }, {
          value: 'personBankAccount',
          label: '账户'
        }], //用于接收类型数据
        loading: true, //查询时加载遮罩
        page: 1,
        limit: 50,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 185,
        dialogName: '',
        form: {
          personName: '',
          personGender: '',
          personBirth: '',
          personNumber: '',
          personQq: '',
          personAddress: '',
          companyId: '',
          personBankAccount: '',
        },
        formLabelWidth: '120px',
        rules: {
          personName: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          personGender: [{
            required: true,
            message: '请输入性别',
            trigger: 'blur'
          }],
          personBirth: [{
            required: true,
            message: '请输入出生日期',
            trigger: 'blur'
          }],
          personNumber: [{
            required: true,
            message: '请输入电话',
            trigger: 'blur'
          }],
          personQq: [{
            required: true,
            message: '请输入QQ',
            trigger: 'blur'
          }],
          personAddress: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
          companyId: [{
            required: true,
            message: '请输入公司编号',
            trigger: 'blur'
          }],
          personBankAccount: [{
            required: true,
            message: '请输入账户',
            trigger: 'blur'
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
          this.personList = res.datas;
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
        console.log(row.personId);
        let data = {
          id: row.personId
        }
        deleteById(data).then((res) => {
          const h = this.$createElement;
          if (res.code=20000) {
            this.$notify({
              title: '删除成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为' + row.personId + '的员工已被删除')
            });
            this.initList();
          } else {
            this.$notify({
              title: '删除编号为' + row.personId + '的员工失败！',
              message: h('i', {
                style: 'color: teal'
              }, '')
            });
          }
        })
      },
      handleEdit(index, row) {
        this.editId = row.personId;
        this.form.personName = row.personName;
        this.form.companyId = row.companyId;
        this.form.personGender = row.personGender;
        this.form.personBirth = row.personBirth;
        this.form.personNumber = row.personNumber;
        this.form.personQq = row.personQq;
        this.form.personAddress = row.personAddress;
        this.form.personBankAccount = row.personBankAccount;
      },
      handleAdd() {
        this.editId = -1;
        this.form.personName = '';
        this.form.companyId = '';
        this.form.personGender = '';
        this.form.personBirth = '';
        this.form.personNumber = '';
        this.form.personQq = '';
        this.form.personAddress = '';
        this.form.personBankAccount = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editId == -1) {
              let data = {
                personName: this.form.personName,
                companyId: this.form.companyId,
                personGender: this.form.personGender,
                personBirth: this.form.personBirth,
                personNumber: this.form.personNumber,
                personQq: this.form.personQq,
                personAddress: this.form.personAddress,
                personBankAccount: this.form.personBankAccount,
              }
              add(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '添加成功！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '新的员工信息已被添加')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            } else {
              let data = {
                personName: this.form.personName,
                companyId: this.form.companyId,
                personGender: this.form.personGender,
                personBirth: this.form.personBirth,
                personNumber: this.form.personNumber,
                personQq: this.form.personQq,
                personAddress: this.form.personAddress,
                personBankAccount: this.form.personBankAccount,
                personId: this.editId
              }
              edit(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '编辑完成！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '编号为' + this.editId + '的员工信息编辑完成')
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
