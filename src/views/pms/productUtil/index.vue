<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        type="danger"
        @click="handleDelete()"
        size="mini">
        删除
      </el-button>
      <el-button
        class="btn-add"
        @click="handleAddProductUtil()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productAttrCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading"
                @selection-change="handleSelectionChange"
                :cell-class-name="tableRowClassName"
                :header-cell-class-name="tableHeaderClassName"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="类型名称" align="center">
          <template slot-scope="scope">{{scope.row.utilName}}</template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,20,50,100]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import {fetchList, createUtil, updateUtilStatus, deleteUtil,deleteUtils,getUtil,updateUtil,fetchaAllList} from '@/api/util'

  export default {
    name: 'productUtilList',
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10,
          keyword:null
        },
        tableHeaderClassName:"el-table-header-customer",
        tableRowClassName:"el-table-column-customer",
        dialogVisible: false,
        dialogTitle:'',
        productAttrCate:{
          name:'',
          id:null
        },
        multipleSelection: [],
        rules: {
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleAddProductUtil() {
        this.$router.push('/pms/addProductUtil');
      },
      handleShowStatusChange(index, row) {
        // let data = new URLSearchParams();
        // data.append('id',row.id);
        // data.append('status',row.status);
        updateUtilStatus({id:row.id,status:row.status}).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      addProductAttrCate() {
        this.dialogVisible = true;
        this.dialogTitle = "添加类型";
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleDelete() {

        if(this.multipleSelection.length<1){
          this.$message({
            message: '未选择单位！',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$confirm('是否要删除该单位', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = this.multipleSelection.map(supplier=>supplier.id);
          deleteUtils(ids).then(response=>{
            this.$message({
              message: '删除成功',
              type: 'success',
              duration:1000
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/pms/updateProductUtil',query:{id:row.id}});
      },

      handleConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new URLSearchParams();
            data.append("name",this.productAttrCate.name);
            if(this.dialogTitle==="添加类型"){
              createProductAttr(data).then(response=>{
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false;
                this.getList();
              });
            }else{
              updateProductAttr(this.productAttrCate.id,data).then(response=>{
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false;
                this.getList();
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


