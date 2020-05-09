<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-collapse v-model="activeNames" >
        <el-collapse-item title="筛选搜索" name="1">
          <div>
          <!--  <i class="el-icon-search"></i>-->
            <!--<span>筛选搜索</span>-->
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
                <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称/商品编号"></el-input>
              </el-form-item>
              <el-form-item label="物品类型：">
                <el-select v-model="listQuery.typeid" placeholder="请选择物品类型" clearable>
                  <el-option
                    v-for="item in productTypeList"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否发布：">
                <el-select v-model="listQuery.status" placeholder="全部" clearable>
                  <el-option
                    v-for="item in verifyStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建人：">
                <el-select v-model="listQuery.createrid" placeholder="全部" clearable>
                  <el-option
                    v-for="item in userList"
                    :key="item.id"
                    :label="item.username"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        size="mini"
        @click="handleDelete()">删除
      </el-button>
      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100% ;line-height: 15px"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column fixed label="编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        <el-table-column fixed label="物品名称" width="200" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center"  width="200">
          <template slot-scope="scope">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{scope.row.type1Name }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{scope.row.type2Name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
        </el-table-column>
        <el-table-column label="规格" width="230" align="center">
          <template slot-scope="scope">
            {{scope.row.specifications}}
          </template>
        </el-table-column>
        <el-table-column label="标准" width="230" align="center">
          <template slot-scope="scope">
            {{scope.row.standard}}
          </template>
        </el-table-column>
        <el-table-column label="价格" width="120" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.price}}
          </template>
        </el-table-column>
        <el-table-column label="单位" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.utilName}}
          </template>
        </el-table-column>
        <el-table-column label="时间" width="153" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.createrName  }}</p>
          </template>
        </el-table-column>
        <el-table-column label="供应商" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.supplierId |filterSupplierName }}
          </template>
        </el-table-column>
        <el-table-column label="发布" width="140" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleShowProduct(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                size="mini"
                @click="handleUpdateProduct(scope.$index, scope.row)">编辑
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
  import {
    fetchList,
    updateDeleteStatus,
    updateNewStatus,
    updateRecommendStatus,
    updatePublishStatus,
    deleteProducts,
  } from '@/api/product'
  import {fetchAllList as fetchTypeList} from '@/api/productType'
  import {fetchAllList as getAllMember} from '@/api/login';
  import {fetchaAllList as getAllSupplier} from '@/api/supplier';
  let than;
  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    status: null,
    createrid: null,
    typeid: null,
  };
  export default {
    name: "productList",
    props: {
      view: {
        type: Boolean,
        default: false
      }
    },
    data() {
      than = this;
      return {
        editSkuInfo: {
          dialogVisible: false,
          productId: null,
          productSn: '',
          productAttributeCategoryId: null,
          stockList: [],
          productAttr: [],
          keyword: null
        },

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
        isView: false,
        productTypeList: [],
        supplierList: [],
        userList: [],
        activeNames: ['0']
      }
    },
    created() {
      this.getList();
      this.isView = this.view
      this.getProductTypeList();
      this.getAllUser();
      this.getAllSupplierList();
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
        if (value === 1) {
          return '审核通过';
        } else {
          return '未审核';
        }
      },
      filterUserName(id){
        let userName = "";
        than.userList.forEach(item=>{
          if(item.id==id){
            userName = item.username;
          }
        })
        return userName;
      },
      filterSupplierName(ids){
        let res="";
        ids&&ids.split(",").forEach(id=>{
         than.supplierList.forEach(item=>{
           if(item.id==id){
             res +=item.name+",";
           }
         })

       });
        return res.substring(0,res.length-1);
      }

    },
    methods: {
      getAllUser() {
        getAllMember().then(response => {
          this.userList = response.data;
        })
      },
      //获取物品类型
      getProductTypeList() {
        fetchTypeList(0).then(response => {
          this.productTypeList = response.data;
        })
      },

      //获取供应商
      getAllSupplierList() {
        getAllSupplier(0).then(response => {
          this.supplierList = response.data;
        })
      },

      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleAddProduct() {
        this.$router.push({path: '/pms/addProduct'});
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

      //**删除物品
      handleDelete() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            message: '未选择物品！',
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
          let ids = this.multipleSelection.map(supplier => supplier.id);
          deleteProducts(ids).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleUpdateProduct(index, row) {
        this.$router.push({path: '/pms/updateProduct', query: {id: row.id}});
      },
      handleShowProduct(index, row) {
        console.log("handleShowProduct", row);
        this.$router.push({path: '/pms/viewProduct', query: {product: row}});
      },
      handleShowVerifyDetail(index, row) {
        console.log("handleShowVerifyDetail", row);
      },
      handleShowLog(index, row) {
        console.log("handleShowLog", row);
      },
      updatePublishStatus(ids) {
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
<style scoped>
  .table-column {
    display: none;
  }
</style>


