<template>
  <div>
    <div class="main-box">
      <div class="search-box">
        <el-card class="box-card" shadow="always" style="width: 160px;" :body-style="{padding: '0px'}">
          <el-select v-model="selectData" placeholder="搜索方式" class="inputDeep" style="width: 100%;">
            <el-option v-for="(item,index) in propertyList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-card>
        <el-card class="box-card" shadow="always" style="width: 100%;" :body-style="{padding: '0px'}">
          <el-input v-model="inputData" placeholder="请输入搜索内容" class="inputDeep" />
        </el-card>
        <el-card class="box-card" shadow="always" style="width: 120px;" :body-style="{padding: '0px'}">
          <el-button type="primary" icon="el-icon-search" style="width: 100%;" @click="search">查询</el-button>
        </el-card>
      </div>
      <el-card class="box-card" shadow="always" :body-style="{padding: '0px'}">
        <div style="margin-left: 15px;margin-right: 15px;">
          <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-background="rgba(255, 255, 255, 0.5)"
            :height="fullHeight"
            :data="goodsPurchaseList"
            stripe
            style="width: 100%;"
            :row-style="{height:'40px'}"
            :cell-style="{padding:'0px'}"
          >
            <el-table-column align="center" prop="goodsPurchaseId" label="编号" sortable width="100px" />
            <el-table-column align="center" show-overflow-tooltip prop="goodsName" label="货物名称" />
            <el-table-column align="center" prop="companyName" label="公司名称" />
            <el-table-column align="center" prop="goodsPurchaseNum" label="采购数量" />
            <el-table-column align="center" prop="goodsPurchasePrice" label="采购价格" />
            <el-table-column align="center" prop="goodsPurchaseDate" label="采购日期" />
            <el-table-column align="center" prop="payStatus" label="付款状态" />
            <el-table-column width="160px;" align="right" v-if="tradeAs">
              <template slot="header" slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加采购信息'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑采购信息'"
                >编辑
                </el-button>
                <el-popconfirm
                  title="确定删除该采购信息吗？"
                  style="margin-left: 8px;"
                  @onConfirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button slot="reference" size="mini" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-card>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" center width="40%">
      <el-form ref="form" :model="form" :rules="rules" style="text-align: center;">
        <el-form-item label="货物名称" :label-width="formLabelWidth" prop="goodsName">
          <el-input v-model="form.goodsName" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="采购公司" :label-width="formLabelWidth" prop="companyName">
          <el-input v-model="form.companyName" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="货物数量" :label-width="formLabelWidth" prop="goodsPurchaseNum">
          <el-input v-model="form.goodsPurchaseNum" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="采购价格" :label-width="formLabelWidth" prop="goodsPurchasePrice">
          <el-input v-model="form.goodsPurchasePrice" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="采购日期" :label-width="formLabelWidth" prop="goodsPurchaseDate">
          <el-date-picker
            v-model="form.goodsPurchaseDate"
            type="datetime"
            placeholder="选择日期时间"
            style="width: 90%;"
            default-time="12:00:00"
            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付状态" :label-width="formLabelWidth" prop="payStatus">
          <el-input v-model="form.payStatus" style="width: 90%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        background
        :current-page="page"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="limit"
        :hide-on-single-page="fasle"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {
  getGoodsPurchase,
  deleteGoodsPurchase,
  addGoodsPurchase,
  editGoodsPurchase
} from '@/api/goodsPurchase.js'
export default {
  data() {
    return {
      showButton: true, // 是否渲染按钮
      showElseIf: 2, // 展示else-if
      dialogVisible: false, // 表示弹出框是否显示
      goodsPurchaseList: [], // 用于存放doc数据
      showButton2: false,
      selectData: 'goodsPurchaseId', // 被选择的下拉
      inputData: '',
      queryData: '', // 用于条件查询
      dialogFormVisible: false,
      propertyList: [{
        value: 'goodsPurchaseId',
        label: '编号'
      }, {
        value: 'goodsId',
        label: '货物编号'
      }, {
        value: 'companyId',
        label: '公司编号'
      }], // 用于接收类型数据
      loading: true, // 查询时加载遮罩
      page: 1,
      limit: 20,
      total: 0,
      fullHeight: document.documentElement.clientHeight - 185,
      dialogName: '',
      form: {
        goodsName: '',
        companyName: '',
        goodsPurchaseNum: '',
        goodsPurchasePrice: '',
        goodsPurchaseDate: '',
        payStatus: ''
      },
      formLabelWidth: '120px',
      rules: {
        goodsName: [{
          required: true,
          message: '请输入货物名称',
          trigger: 'blur'
        }],
        companyName: [{
          required: true,
          message: '请输入公司名称',
          trigger: 'blur'
        }],
        goodsPurchaseNum: [{
          required: true,
          message: '请输入采购数量',
          trigger: 'blur'
        }],
        goodsPurchasePrice: [{
          required: true,
          message: '请输入采购价格',
          trigger: 'blur'
        }],
        goodsPurchaseDate: [{
          required: true,
          message: '请输入采购日期',
          trigger: 'blur'
        }],
        payStatus: [{
          required: true,
          message: '请输入支付状态',
          trigger: 'blur'
        }]
      },
      editId: -1
    }
  },
  watch: {
    fullHeight(val) { // 监控浏览器高度变化
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    console.log('mounted被调用')
    this.get_bodyHeight()
    this.$nextTick(() => {
      // 页面初始化的时候执行
      this.initList()
    })
  },
  methods: {
    testVon() {
      this.showButton2 = !this.showButton2
      // this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.limit = val
      console.log(`每页 ${val} 条`)
      this.initList()
    },
    handleCurrentChange(val) {
      this.page = val
      console.log(`当前页: ${val}`)
      this.initList()
    },
    search() {
      this.page = 1
      this.queryData = this.inputData
      this.initList()
    },
    initList() {
      this.loading = true
      // 获取用户输入/选择的查询条件
      const data = {
        limit: this.limit,
        page: this.page,
        [this.selectData]: this.queryData
      }
      console.log(this.selectData)
      console.log(this.queryData)
      getGoodsPurchase(data).then((res) => {
        this.goodsPurchaseList = res.datas
        this.total = res.total
        this.loading = false
      })
    },
    get_bodyHeight() { // 动态获取浏览器高度
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight - 185
        })()
      }
    },
    handleDelete(index, row) {
      console.log(11111)
      const data = {
        id: row.goodsPurchaseId
      }
      console.log(data.id)
      deleteGoodsPurchase(data).then((res) => {
        const h = this.$createElement
        if (res.code = 20000) {
          this.$notify({
            title: '删除' + row.goodsPurchaseName + '货物信息成功！',
            message: h('i', {
              style: 'color: teal'
            }, '编号为' + row.goodsPurchaseId + '的货物已被删除')
          })
          this.initList()
        } else {
          this.$notify({
            title: '删除' + row.goodsPurchaseName + '货物信息失败！',
            message: h('i', {
              style: 'color: teal'
            }, '')
          })
        }
      })
    },
    handleEdit(index, row) {
      this.editId = row.goodsPurchaseId
      this.form.goodsName = row.goodsName
      this.form.companyName = row.companyName
      this.form.goodsPurchaseNum = row.goodsPurchaseNum
      this.form.goodsPurchasePrice = row.goodsPurchasePrice
      this.form.goodsPurchaseDate = row.goodsPurchaseDate
      this.form.payStatus = row.payStatus
    },
    handleAdd() {
      this.editId = -1
      this.form.goodsName = ''
      this.form.companyName = ''
      this.form.goodsPurchaseNum = ''
      this.form.goodsPurchasePrice = ''
      this.form.goodsPurchaseDate = ''
      this.form.payStatus = ''
    },
    submitForm(formName) {
      console.log(11111)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(33333)
          if (this.editId == -1) {
            const data = {
              tradeAs: this.$store.getters.tradeAs,
              goodsName: this.form.goodsName,
              companyName: this.form.companyName,
              goodsPurchaseNum: this.form.goodsPurchaseNum,
              goodsPurchasePrice: this.form.goodsPurchasePrice,
              goodsPurchaseDate: this.form.goodsPurchaseDate,
              payStatus: this.form.payStatus
            }
            console.log(2222)
            console.log(data.goodsName)
            addGoodsPurchase(data).then((res) => {
              const h = this.$createElement
              this.$notify({
                title: '添加成功！',
                message: h('i', {
                  style: 'color: teal'
                }, '名字为' + this.form.goodsName + '的货物信息已被添加')
              })
              this.dialogFormVisible = false
              this.initList()
            })
          } else {
            const data = {
              // 这里的Id不能改为form.id
              goodsPurchaseId: this.editId,
              goodsName: this.form.goodsName,
              companyName: this.form.companyName,
              goodsPurchaseNum: this.form.goodsPurchaseNum,
              goodsPurchasePrice: this.form.goodsPurchasePrice,
              goodsPurchaseDate: this.form.goodsPurchaseDate,
              payStatus: this.form.payStatus
            }
            console.log(5555555555)
            console.log(data)
            editGoodsPurchase(data).then((res) => {
              const h = this.$createElement
              this.$notify({
                title: '编辑完成！',
                message: h('i', {
                  style: 'color: teal'
                }, '名字为' + this.form.goodsName + '的货物信息编辑完成')
              })
              this.dialogFormVisible = false
              this.initList()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
