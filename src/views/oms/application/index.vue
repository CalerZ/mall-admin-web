<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="申请单编号"></el-input>
          </el-form-item>
          <el-form-item label="申请日期：">
            <div class="block">
              <el-date-picker
                v-model="listQuery.date"
                type="daterange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="申请单状态：">
            <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleDelete()"
        size="mini">
        删除
      </el-button>
      <el-button
        class="btn-add"
        @click="handleSubmit()"
        size="mini">
        提交申请
      </el-button>
      <el-button
        class="btn-add"
        @click="handleAddApplication()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container" >
      <el-table ref="productTable"
                :data="list"
                style="width: 100% ;line-height: 15px"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                :cell-class-name="tableRowClassName"
                :header-cell-class-name="tableHeaderClassName"
                border>
        <el-table-column type="selection" width="60" align="center" ></el-table-column>
        <el-table-column label="申请单单号" width="150" align="center">
          <template slot-scope="scope">{{scope.row.applicationForm.formCode}}</template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template slot-scope="scope">{{scope.row.applicationForm.applyOn}}</template>
        </el-table-column>
        <el-table-column label="申请日期" align="center">
          <template slot-scope="scope">
           {{scope.row.applicationForm.applyTime}}
          </template>
        </el-table-column>
        <el-table-column label="申请人公司" align="center">
          <template slot-scope="scope">
            {{scope.row.applicationForm.applyOn}}&nbsp;
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            {{scope.row.applicationForm.applyStatus|verifyStatusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button v-if="scope.row.applicationForm.applyStatus===0"
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
              </el-button>
              <el-button v-if="scope.row.applicationForm.applyStatus===1"
                         size="mini"
                         type="danger"
                         @click="handleCancelProduct(scope.$index, scope.row)">撤销
              </el-button>
            </p>
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
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>

  import {cancel,updateApplicationStatus,fetchList ,createApplication,updateApplication,delApplication,delApplications,getApplication,getApplicationProductList,getMyApplicationList,getReviewedApplicationList,formNo} from '@/api/application'

  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null,
    date:null

  };
  export default {
    name: "applicationFormList",
    data() {
      return {
        tableRowClassName:'el-table-column-customer',
        tableHeaderClassName:'el-table-header-customer',
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        verifyStatusOptions: [{
          value: 1,
          label: '已发布'
        }, {
          value: 0,
          label: '未发布'
        }],
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    created() {
      this.getList();
    },
    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productCategoryId = newValue[1];
        } else {
          this.listQuery.productCategoryId = null;
        }
      }
    },
    filters: {
      verifyStatusFilter(value) {
        switch (value) {
          case 0:
            return '未审核'
          case 1:
            return '审核中'
          case 2:
            return '审核通过'
          case 3:
            return '已撤销(未审核)'
        }
      }
    },
    methods: {
      handleCancelProduct(index,row){
        cancel(row.applicationForm.id).then(result => {
          this.$message({
            message: '取消成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        })
      },
      handleSubmit(){
        if(this.multipleSelection.length<1){
          this.$message({
            message: '未选择申请单！',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = this.multipleSelection.map(item=>item.applicationForm.id);
        updateApplicationStatus(ids).then(result => {
          if(result.data){
            this.$message({
              message: '提交成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          }else{
            this.$message({
              message: '提交失败！',
              type: 'warning',
              duration: 1000
            });
          }

        })

      },
      getList() {
        this.listLoading = true;
        getMyApplicationList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddApplication() {
        this.$router.push({path:'/apply/addApplication'});
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleDelete(index, row){
        if(this.multipleSelection.length<1){
          this.$message({
            message: '未选择申请单！',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = this.multipleSelection.map(item=>item.id);
          this.updateDeleteStatus(ids);
        });
      },
      handleUpdateProduct(index,row){
        this.$router.push({path:'/apply/updateApplication',query:{id:row.applicationForm.id}});
      },
      handleShowProduct(index,row){
        console.log("handleShowProduct",row);
      },
      handleShowVerifyDetail(index,row){
        console.log("handleShowVerifyDetail",row);
      },
      handleShowLog(index,row){
        console.log("handleShowLog",row);
      },
      updatePublishStatus(publishStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('publishStatus', publishStatus);
        updatePublishStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateNewStatus(newStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('newStatus', newStatus);
        updateNewStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateRecommendStatus(recommendStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('recommendStatus', recommendStatus);
        updateRecommendStatus(params).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      updateDeleteStatus(ids) {
        updateDeleteStatus(ids).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
        });
        this.getList();
      }
    }
  }
</script>
<style></style>


