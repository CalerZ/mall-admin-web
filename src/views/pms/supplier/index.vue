<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchSupplierList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="名称/编码"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        type="danger"
        @click="handleDelete()"
        size="mini">
        删除
      </el-button>
      <el-button
        class="btn-add"
        @click="addSupplier()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="supplierTable"
                :data="list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                :cell-class-name="tableRowClassName"
                :header-cell-class-name="tableHeaderClassName"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编码" width="200" align="center">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        <el-table-column label="供应商名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="400" align="center">
          <template slot-scope="scope">{{scope.row.discription}}</template>
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
  import {fetchList, createSupplier, updateSupplierStatus, deleteSupplier,deleteSuppliers,getSupplier,updateSupplier,fetchaAllList} from '@/api/supplier'

  export default {
    name: 'supplierList',
    data() {
      return {
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 10
        },
        tableHeaderClassName:"el-table-header-customer",
        tableRowClassName:"el-table-column-customer",
        list: null,
        total: null,
        listLoading: true,
        multipleSelection: []
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          this.totalPage = response.data.totalPage;
          this.pageSize = response.data.pageSize;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/pms/updateSupplier', query: {id: row.id}})
      },
      handleDelete() {
        if(this.multipleSelection.length<1){
          this.$message({
            message: '未选择供应商！',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$confirm('是否要删除该供应商', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = this.multipleSelection.map(supplier=>supplier.id);
          deleteSuppliers(ids).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      getProductList(index, row) {
        console.log(index, row);
      },
      getProductCommentList(index, row) {
        console.log(index, row);
      },
      handleFactoryStatusChange(index, row) {
        var data = new URLSearchParams();
        data.append("ids", row.id);
        data.append("factoryStatus", row.factoryStatus);
        updateFactoryStatus(data).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.factoryStatus === 0) {
            row.factoryStatus = 1;
          } else {
            row.factoryStatus = 0;
          }
        });
      },
      handleShowStatusChange(index, row) {
        updateSupplierStatus({"id":row.id,"status":row.status}).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        }).catch(error => {
          if (row.status === 0) {
            row.status = 1;
          } else {
            row.status = 0;
          }
        });
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
      searchSupplierList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      addSupplier() {
        this.$router.push({path: '/pms/addSupplier'})
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>


