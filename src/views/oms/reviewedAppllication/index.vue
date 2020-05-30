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
          <el-form-item label="申请单单号：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="申请单单号"></el-input>
          </el-form-item>
          <el-form-item label="创建人：">
            <el-select v-model="listQuery.applyUser" placeholder="全部" clearable>
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.nickname"
                :value="item.id">
              </el-option>
            </el-select>
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
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleFinishLog()"
        size="mini">
        审核记录
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
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="申请单单号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.formCode}}</template>
        </el-table-column>
        <el-table-column label="申请人" width="100" align="center">
          <template slot-scope="scope">{{scope.row.createrName}}</template>
        </el-table-column>
        <el-table-column label="申请日期" align="center">
          <template slot-scope="scope">
            {{scope.row.applyTime}}
          </template>
        </el-table-column>
        <el-table-column label="申请人公司" align="center">
          <template slot-scope="scope">
            {{scope.row.companyName}}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            {{scope.row.applyStatus|verifyStatusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShow(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)">审核
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
        :page-sizes="[10,20,50,100]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    fetchList,
    updateDeleteStatus,
    updateNewStatus,
    updateRecommendStatus,
    updatePublishStatus
  } from '@/api/product'

  import {dateFormat} from '@/utils/date';
  import {fetchAllList as getAllTypeList} from '@/api/productType'
  import {getReviewedApplicationList as fetchListApplicationForm} from '@/api/application'
  import {fetchAllList as getAllMember} from "@/api/login";
  import {fetchListAll as getAllCompany} from "@/api/company";
  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 10,
    date:[],
    applyUser:null,
  };
  export default {
    name: "reviewedApplicationFormList",
    data() {
      return {
        tableRowClassName:'el-table-column-customer',
        tableHeaderClassName:'el-table-header-customer',
        companyList:[],
        memberList:[],
        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],

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
        userList:[]
      }
    },
    created() {
      this.getList();
      this.getUserList();
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
            return '未审核(已撤销)'
        }
      }
    },
    methods: {


      handleFinishLog(){
        this.$router.push({path:'/apply/finishApplicationFormList'});
      },
      getCompany(){
        getAllCompany().then(response => {
          response.data.forEach(item=>{this.companyList[item.id]=item.name})
        })
      },
      getUserList() {
        getAllMember().then(response => {
        //  response.data.forEach(item=>{this.memberList[item.id]=item.username})
          this.userList = response.data;
        })
      },
      getList() {
        this.listLoading = true;

        let searchData = {
          keyword: this.listQuery.keyword,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          applyUser:this.listQuery.applyUser,
          date1:"",
          date2:"",
        };
        if(this.listQuery.date&&this.listQuery.date.length>0){
          searchData.date1=dateFormat(this.listQuery.date[0],"yyyy-MM-dd")
          searchData.date2=dateFormat(this.listQuery.date[1],"yyyy-MM-dd")
        }
        fetchListApplicationForm(searchData).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },

      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
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
      handlePublishStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updatePublishStatus(row.publishStatus, ids);
      },
      handleNewStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateNewStatus(row.newStatus, ids);
      },
      handleRecommendStatusChange(index, row) {
        let ids = [];
        ids.push(row.id);
        this.updateRecommendStatus(row.recommandStatus, ids);
      },
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleDelete(index, row){
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id);
          this.updateDeleteStatus(1,ids);
        });
      },
      handleUpdate(index,row){
        this.$router.push({path:'/apply/updateReviewedApplication',query:{id:row.id,isNext:true}});
      },
      handleShow(index,row){
        this.$router.push({path:'/apply/viewApplicationForm',query:{id:row.id,isNext:true}});

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
      updateDeleteStatus(deleteStatus, ids) {
        let params = new URLSearchParams();
        params.append('ids', ids);
        params.append('deleteStatus', deleteStatus);
        updateDeleteStatus(params).then(response => {
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


