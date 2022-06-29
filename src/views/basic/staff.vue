<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="queryData" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="selectDoc">查询</el-button>
      </el-input>
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.2)" :data="personList" stripe style="width: 100%">
        <el-table-column width="100px;" align="center" prop="personId" label="编号">
        </el-table-column>
        <el-table-column width="150px;" align="center" prop="personName" label="姓名">
        </el-table-column>
        <el-table-column align="center" prop="personGender" label="性别">
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="personNumber" label="联系方式">
        </el-table-column>
        <el-table-column align="center" prop="personQq" label="QQ号">
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip prop="personAddress" label="地址">
        </el-table-column>
        <el-table-column align="center" prop="companyId" label="公司编号">
        </el-table-column>
        <el-table-column align="center" prop="personBankAccount" label="银行账户">
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getDocByCondition,getCategoryByCondition,docSelectOne } from '@/api/getData.js';
  export default {
    data() {
      return {
        showButton: true, //是否渲染按钮
        showElseIf: 2, //展示else-if
        dialogVisible: false, //表示弹出框是否显示
        inputData: "危", //双向绑定测试,
        personList: [], //用于存放doc数据
        showButton2: false,
        inputData: "",
        selectData: "", //被选择的下拉
        queryData: "", //用于条件查询
        categoryList: [], //用于接收类型数据
        loading: true, //查询时加载遮罩
      }
    },
    methods: {
      testVon() {
        this.showButton2 = !this.showButton2;
        //this.dialogVisible = true;
      },
      //获取类型数据
      // initCategoryList() {
      //   getCategoryByCondition().then(res => {
      //     //新增一个全部,放到数组最前面
      //     res.unshift({
      //       categoryId: "",
      //       categoryName: "全部"
      //     });
      //     this.categoryList = res;
      //   });
      // },
      //获取文档数据
      initList() {
        this.loading = true;
        //获取用户输入/选择的查询条件
        let data = {
          categoryId: this.selectData,
          docTitle: this.queryData
        }
        getDocByCondition(data).then((res) => {
          res.forEach((item, index) => {
            item.test = "测试属性添加";
            //console.log(item)
          })
          this.personList = res;
          this.loading = false;
          //条件筛选遍历
          /* let filterArr = this.personList.filter((item, index) => {
          	return item.docId % 5 == 0;
          }); */
        })
      },
      // testMap() {
      //   let mapArr = [1, 3, 5, 7, 9];
      //   let mapArr1 = mapArr.map((item, index) => {
      //     return item + 1;
      //   })
      // },
      // selectDoc() {
      //   docSelectOne({
      //     id: 105
      //   }).then()
      // },
    },
    mounted() {
      console.log("mounted被调用");

      this.$nextTick(() => {
      	//页面初始化的时候执行
      	this.initList();
      	//this.testMap();
      	//初始化获取类型数据
      	// this.initCategoryList();
      })
    },
    beforeCreate() {
      console.log("beforeCreate被调用");
    },
    created() {
      console.log("created被调用");
    },
    beforeMount() {
      console.log("beforeMount被调用");
    },
    beforeUpdate() {
      console.log("beforeUpdate被调用");
    },
    updated() {
      console.log("updated被调用");
    },
    beforeDestroy() {
      console.log("beforeDestroy被调用");
    },
    destroyed() {
      console.log("destroyed被调用");
    }

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

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
