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
            <el-table-column width="80px;" align="center" prop="advertisementId" label="编号" sortable>
            </el-table-column>
            <el-table-column align="center" show-overflow-tooltip prop="advertisementContent" label="广告内容">
            </el-table-column>
            <el-table-column  show-overflow-tooltip prop="advertisementPicture" label="广告图片地址">
            </el-table-column>
            <el-table-column width="200px;" prop="advertisementStartTime" label="开始日期" sortable>
            </el-table-column>
            <el-table-column width="200px;" prop="advertisementEndTime" label="结束日期" sortable>
            </el-table-column>
            <el-table-column width="160px;" align="right" v-if="exhibitionAs">
              <template slot="header" slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加广告'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑广告'">编辑
                </el-button>
                <el-popconfirm title="确定删除该广告吗？" style="margin-left: 8px;"
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
        <el-form-item label="广告内容" :label-width="formLabelWidth" prop="advertisementContent">
          <el-input v-model="form.advertisementContent" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="广告图片地址" :label-width="formLabelWidth" prop="advertisementPicture">
          <el-input v-model="form.advertisementPicture" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth" prop="advertisementStartTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.advertisementStartTime" style="width: 90%;"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth" prop="advertisementEndTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.advertisementEndTime" style="width: 90%;"
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
        :current-page="page" :page-sizes="[50, 100, 200, 300, 400]" :page-size="limit" :hide-on-single-page="true"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getAdvertisement,
    deleteAdvertisement,
    addAdvertisement,
    editAdvertisement
  } from '../../api/getDataAdvertisement.js';
  export default {
    data() {
      return {
        exhibitionAs: this.$store.getters.exhibitionAs,
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        companyList: [], //用于存放doc数据
        showButton2: false,
        selectData: "advertisementId", //被选择的下拉
        inputData: "",
        queryData: "", //用于条件查询
        dialogFormVisible: false,
        propertyList: [{
          value: 'advertisementId',
          label: '编号'
        }, {
          value: 'advertisementContent',
          label: '广告内容'
        }, {
          value: 'advertisementPicture',
          label: '广告图片地址'
        }], //用于接收类型数据
        loading: true, //查询时加载遮罩
        page: 1,
        limit: 50,
        total: 0,
        fullHeight: document.documentElement.clientHeight - 185,
        dialogName: '',
        form: {
          advertisementContent: '',
          advertisementPicture: '',
          advertisementStartTime: '',
          advertisementEndTime: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [{
            required: true,
            message: '请输入广告名称',
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
            message: '请输入地址',
            trigger: 'blur'
          }],
          date: [{
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
          limit: this.limit,
          page: this.page,
          [this.selectData]: this.queryData
          // categoryId: this.selectData,
          // docTitle: this.queryData
        }
        getAdvertisement(data).then((res) => {
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
        console.log(row.advertisementId);
        let data = {
          id: row.advertisementId
        }
        deleteAdvertisement(data).then((res) => {
          const h = this.$createElement;
          if (res.code=20000) {
            this.$notify({
              title: '删除' + row.advertisementContent + '成功！',
              message: h('i', {
                style: 'color: teal'
              }, '编号为' + row.advertisementId + '的广告已被删除')
            });
            this.initList();
          } else {
            this.$notify({
              title: '删除' + row.advertisementContent + '失败！',
              message: h('i', {
                style: 'color: teal'
              }, '')
            });
          }
        })
      },
      handleEdit(index, row) {
        this.editId = row.advertisementId;
        this.form.advertisementContent = row.advertisementContent;
        this.form.advertisementPicture = row.advertisementPicture;
        this.form.advertisementStartTime = row.advertisementStartTime;
        this.form.advertisementEndTime = row.advertisementEndTime;
      },
      handleAdd() {
        this.editId = -1;
        this.form.advertisementContent = '';
        this.form.advertisementPicture = '';
        this.form.advertisementStartTime = '';
        this.form.advertisementEndTime = '';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editId == -1) {
              let data = {
                advertisementContent: this.form.advertisementContent,
                advertisementPicture: this.form.advertisementPicture,
                advertisementStartTime: this.form.advertisementStartTime,
                advertisementEndTime: this.form.advertisementEndTime
              }
              addAdvertisement(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '添加成功！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '名称为' + this.form.name + '的广告已被添加')
                });
                this.dialogFormVisible = false;
                this.initList();
              });
            } else {
              let data = {
                advertisementContent: this.form.advertisementContent,
                advertisementPicture: this.form.advertisementPicture,
                advertisementStartTime: this.form.advertisementStartTime,
                advertisementEndTime: this.form.advertisementEndTime,
                advertisementId: this.editId
              }
              editAdvertisement(data).then((res) => {
                const h = this.$createElement;
                this.$notify({
                  title: '编辑完成！',
                  message: h('i', {
                    style: 'color: teal'
                  }, '名称为' + this.form.name + '的广告信息编辑完成')
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
