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
            :data="materialList"
            stripe
            style="width: 100%;"
            :row-style="{height:'40px'}"
            :cell-style="{padding:'0px'}"
          >
            <el-table-column align="center" prop="materialId" label="编号" sortable width="100px" />
            <el-table-column align="center" show-overflow-tooltip prop="materialName" label="物资名称" />
            <el-table-column align="center" prop="materialType" label="物资类型" sortable />
            <el-table-column align="center" prop="materialPrice" label="物资价格" />
            <el-table-column align="center" prop="materialSize" label="物资尺寸" />
            <el-table-column width="160px;" align="right" v-if="basicAs">
              <template slot="header" slot-scope="scope">
<!--                <el-button size="mini" type="primary" @click="handleExport();">
                  导出
                </el-button> -->
                <el-button v-show="basicAs" size="mini" type="primary" @click="handleAdd(); dialogFormVisible = true; dialogName='添加物资信息'">
                  添加
                </el-button>
              </template>
              <template slot-scope="scope">
                <el-button
                  v-show="basicAs" size="mini"
                  @click="handleEdit(scope.$index, scope.row); dialogFormVisible = true; dialogName='编辑物资信息'"
                >编辑
                </el-button>
                <el-popconfirm
                  title="确定删除该物资信息吗？"
                  style="margin-left: 8px;"
                  @onConfirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button v-show="basicAs" slot="reference" size="mini" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-card>
    </div>
    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" center width="40%">
      <el-form ref="form" :model="form" :rules="rules" style="text-align: center;">
        <el-form-item label="物资名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth" prop="tel">
          <el-input v-model="form.type" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="物资价格" :label-width="formLabelWidth" prop="ins">
          <el-input v-model="form.price" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="物资尺寸" :label-width="formLabelWidth" prop="ins">
          <el-input v-model="form.size" style="width: 90%;" />
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
  getMaterial,
  deleteMaterial,
  addMaterial,
  editMaterial,
  exportMaterial
} from '../../api/material.js'
export default {
  data() {
    return {
      basicAs: this.$store.getters.basicAs,
      showButton: true, // 是否渲染按钮
      showElseIf: 2, // 展示else-if
      dialogVisible: false, // 表示弹出框是否显示
      materialList: [], // 用于存放doc数据
      showButton2: false,
      selectData: 'materialId', // 被选择的下拉
      inputData: '',
      queryData: '', // 用于条件查询
      dialogFormVisible: false,
      propertyList: [{
        value: 'materialId',
        label: '编号'
      }, {
        value: 'materialName',
        label: '物资名称'
      }, {
        value: 'materialType',
        label: '物资类型'
      }, {
        value: 'materialPrice',
        label: '物资价格'
      }, {
        value: 'materialSize',
        label: '物资尺寸'
      }], // 用于接收类型数据
      loading: true, // 查询时加载遮罩
      page: 1,
      limit: 20,
      total: 0,
      fullHeight: document.documentElement.clientHeight - 185,
      dialogName: '',
      form: {
        name: '',
        type: '',
        price: '',
        size: ''
      },
      formLabelWidth: '120px',
      rules: {
        name: [{
          required: true,
          message: '请输入物资名称',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请输入物资类型',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入物资价格',
          trigger: 'blur'
        }],
        size: [{
          required: true,
          message: '请输入物资尺寸',
          trigger: 'change'
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
      getMaterial(data).then((res) => {
        this.materialList = res.datas
        this.total = res.total
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
        id: row.materialId
      }
      console.log(data.id)
      deleteMaterial(data).then((res) => {
        const h = this.$createElement
        if (res.code = 20000) {
          this.$notify({
            title: '删除' + row.materialName + '物资信息成功！',
            message: h('i', {
              style: 'color: teal'
            }, '编号为' + row.materialId + '的物资已被删除')
          })
          this.initList()
        } else {
          this.$notify({
            title: '删除' + row.materialName + '物资信息失败！',
            message: h('i', {
              style: 'color: teal'
            }, '')
          })
        }
      })
    },
    handleEdit(index, row) {
      this.editId = row.materialId
      this.form.name = row.materialName
      this.form.type = row.materialType
      this.form.price = row.materialPrice
      this.form.size = row.materialSize
    },
    handleAdd() {
      this.editId = -1
      this.form.name = ''
      this.form.type = ''
      this.form.price = ''
      this.form.size = ''
    },
    handleExport() {
      location.href = "http://localhost:8080/material/exportMaterial";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.editId == -1) {
            const data = {
              materialName: this.form.name,
              materialType: this.form.type,
              materialSize: this.form.size,
              materialPrice: this.form.price
            }
            addMaterial(data).then((res) => {
              const h = this.$createElement
              this.$notify({
                title: '添加成功！',
                message: h('i', {
                  style: 'color: teal'
                }, '名字为' + this.form.name + '的物资信息已被添加')
              })
              this.dialogFormVisible = false
              this.initList()
            })
          } else {
            const data = {
              materialName: this.form.name,
              materialType: this.form.type,
              materialSize: this.form.size,
              materialPrice: this.form.price,
              materialId: this.editId
            }
            editMaterial(data).then((res) => {
              const h = this.$createElement
              this.$notify({
                title: '编辑完成！',
                message: h('i', {
                  style: 'color: teal'
                }, '名字为' + this.form.name + '的物资信息编辑完成')
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
