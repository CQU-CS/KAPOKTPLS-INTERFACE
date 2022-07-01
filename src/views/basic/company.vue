<template>
  <div>
    <div class="main-box">
      <div class="search-box">
        <el-card class="box-card" shadow="always" style="width: 180px;" :body-style="{padding: '0px'}">
          <el-select v-model="selectData"  placeholder="搜索方式" class="inputDeepMessage" style="width: 100%;">
            <el-option style="text-align: center;" v-for="(item,index) in propertyList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-card>
        <el-card class="box-card" shadow="always" style="width: 100%;" :body-style="{padding: '0px'}">
          <el-input placeholder="请输入搜索内容" class="inputDeep" v-model="inputData"> </el-input>
        </el-card>
        <el-card class="box-card" shadow="always" style="width: 120px;" :body-style="{padding: '0px'}">
          <el-button type="primary" icon="el-icon-search" @click="search" style="width: 100%;">查询</el-button>
        </el-card>
		<el-card class="box-card" shadow="always" style="width: 120px;" :body-style="{padding: '0px'}">
		  <el-button type="primary" icon="el-icon-circle-plus"@click="handleAdd(); dialogFormVisible = true; dialogName='添加公司'" style="width: 100%;">添加</el-button>
		</el-card>
      </div>
      <el-card class="box-card" shadow="always" :body-style="{padding: '0px'}">
        <div style="margin-left: 15px;margin-right: 15px;">
          <el-table v-loading="loading" element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.5)" :height="fullHeight" :data="companyList" stripe
            style="width: 100%;" :row-style="{height:'40px'}" :cell-style="{padding:'0px'}">
            <el-table-column width="80px;" align="center" prop="companyId" label="编号" sortable>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="companyName" label="公司名称">
            </el-table-column>
            <el-table-column align="center" width="200px;" prop="companyEstablishmentTime" label="创立日期" sortable>
            </el-table-column>
            <el-table-column align="center" width="150px;" show-overflow-tooltip prop="companyPhone" label="电话">
            </el-table-column>
            <el-table-column align="center" width="120px;" prop="companyInstruction" label="行业">
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="addressContent" label="地址">
            </el-table-column>
<<<<<<< HEAD
            <el-table-column width="160px;" align="right">
              <template slot="header" slot-scope="scope">
                <el-button v-show="basicAs" size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加公司'">
=======
            <el-table-column width="160px;" align="center" label="操作">
            <!--  <template slot="header" slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加公司'">
>>>>>>> 963d944f60d3cd2c71afe4a9c8f181947b643e83
                  添加
                </el-button>
              </template> -->
              <template slot-scope="scope">
                <el-button v-show="basicAs" size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑公司'">编辑
                </el-button>
                <el-popconfirm title="确定删除该公司吗？" style="margin-left: 8px;"
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
        <el-form-item label="公司名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.tel" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="行业" :label-width="formLabelWidth" prop="ins">
          <el-input v-model="form.ins" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" style="width: 90%;" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="创立时间" :label-width="formLabelWidth" prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-sizes="[20, 30, 50, 100, 300]" :page-size="limit" :hide-on-single-page="true"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getCompany,
    deleteCompany,
    addCompany,
    editCompany
  } from '../../api/getData.js';
  export default {
    data() {
      return {
        basicAs: this.$store.getters.basicAs,
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        companyList: [], //用于存放doc数据
        showButton2: false,
        selectData: "companyId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        dialogFormVisible: false,
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
        limit: 20,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 185,
        dialogName: '',
        form: {
          name: '',
          tel: '',
          ins: '',
          address: '',
          date: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [{
            required: true,
            message: '请输入公司名称',
            trigger: 'blur'
          }],
          tel: [{
            required: true,
            message: '请输入电话号码',
            trigger: 'blur'
          }],
          ins: [{
            required: true,
            message: '请输入行业',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入公司地址',
            trigger: 'blur'
          }],
          date: [{
            required: true,
            message: '请选择创立日期',
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
            that.fullHeight = window.fullHeight - 185
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
          if (res.code=20000) {
            this.$notify({
              title: '删除' + row.companyName + '成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为' + row.companyId + '的公司已被删除')
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
      },
      handleEdit(index, row) {
        this.editId = row.companyId;
        this.form.name = row.companyName;
        this.form.tel = row.companyPhone;
        this.form.ins = row.companyInstruction;
        this.form.address = row.addressContent;
        this.form.date = row.companyEstablishmentTime;
      },
      handleAdd() {
        this.editId = -1;
        this.form.name = '';
        this.form.tel = '';
        this.form.ins = '';
        this.form.address = '';
        this.form.date = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editId == -1) {
              let data = {
                companyName: this.form.name,
                companyPhone: this.form.tel,
                companyInstruction: this.form.ins,
                addressContent: this.form.address,
                companyEstablishmentTime: this.form.date
              }
              addCompany(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '添加成功！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '名称为' + this.form.name + '的公司已被添加')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            } else {
              let data = {
                companyName: this.form.name,
                companyPhone: this.form.tel,
                companyInstruction: this.form.ins,
                addressContent: this.form.address,
                companyEstablishmentTime: this.form.date,
                companyId: this.editId
              }
              editCompany(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '编辑完成！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '名称为' + this.form.name + '的公司信息编辑完成')
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
.inputDeepMessage .el-input__inner {
    border: 0 !important;
    outline: none;
	text-align: center;
	background-color:gray;
	color: white;
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
