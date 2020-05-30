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
          <el-form-item label="季度：">
            <el-select v-model="listQuery.quarter" placeholder="全部" clearable>
              <el-option
                v-for="item in quarterList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年度：">
            <el-select v-model="listQuery.year" placeholder="全部" clearable>
              <el-option
                v-for="item in yearList"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>导出数据预览</span>
      <el-button
        class="btn-add"
        @click="exportData()"
        size="mini">
        导出
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100% ;line-height: 15px"
                v-loading="listLoading"
                border>
        <!--      <el-table-column fixed label="编号" width="200" align="center">
                <template slot-scope="scope">{{scope.row.code}}</template>
              </el-table-column>-->
        <el-table-column fixed label="序号" align="center" type="index" width="50">
        </el-table-column>
        <el-table-column fixed label="物品名称" width="200" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="类型" align="center" width="200">
          <template slot-scope="scope">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{scope.row.type }}</el-breadcrumb-item>
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
            {{scope.row.unit}}
          </template>
        </el-table-column>
        <!--  <el-table-column label="时间" width="153" align="center">
            <template slot-scope="scope">
              {{scope.row.createTime }}
            </template>
          </el-table-column>-->
        <el-table-column label="生产线人数" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.prodLineMembers }}</p>
          </template>
        </el-table-column>
        <el-table-column label="安全库存" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.safetyStock }}
          </template>
        </el-table-column>
        <el-table-column label="上月数量" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.lastMonthQuantity }}</p>
          </template>
        </el-table-column>
        <el-table-column label="现有库存" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.onHandInventory }}</p>
          </template>
        </el-table-column>
        <el-table-column label="本月提报数量" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.reportedQuantity }}</p>
          </template>
        </el-table-column>
        <el-table-column label="采购方式" width="120" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.purchaseMethod }}</p>
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
  import {selectExcelData} from '@/api/application'
  import {exportList} from '@/api/info'
  import {fetchaAllList as getAllSupplier} from '@/api/supplier';
  import {dateFormat} from '@/utils/date';

  let than;
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    date: [],
    quarter: null,
    year: null

  };
  export default {
    name: "productViewList",
    props: {
      view: {
        type: Boolean,
        default: false
      }
    },
    data() {
      than = this;
      return {

        operateType: null,
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        selectProductCateValue: null,
        multipleSelection: [],
        productCateOptions: [],
        brandOptions: [],
        isView: false,
        pickerOptions: {
          shortcuts: [
            {
              text: '当前月',
              onClick(picker) {
                const date = new Date();
                var nowMonthDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                const end = new Date(date.getFullYear(), date.getMonth(), nowMonthDay);
                const start = new Date(date.getFullYear(), date.getMonth(), 1);
                picker.$emit('pick', [start, end]);
              }
            },
            {
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
            },


          ]
        },
        quarterList: [
          {id: 1, value: "第一季度"}, {id: 2, value: "第二季度"}, {id: 3, value: "第三季度"}, {id: 4, value: "第四季度"},
        ],
        yearList: [
          {id: 1, value: "上半年"}, {id: 2, value: "下半年"}
        ],
        supplierList: []
      }
    },
    created() {
     // this.getList();
      this.getAllSupplierList();
    },
    filters: {
      filterSupplierName(ids) {
        let res = "";
        ids && ids.split(",").forEach(id => {
          than.supplierList.forEach(item => {
            if (item.id == id) {
              res += item.name + ",";
            }
          })

        });
        return res.substring(0, res.length - 1);
      }
    },
    methods: {
      // 近一个月
      getLastMonth() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;//0-11表示1-12月
        var day = now.getDate();
        var dateObj = {};
        dateObj.now = year + '-' + month + '-' + day;
        var nowMonthDay = new Date(year, month, 0).getDate();    //当前月的总天数
        if (month - 1 <= 0) { //如果是1月，年数往前推一年<br>　　　　
          dateObj.last = (year - 1) + '-' + 12 + '-' + day;
        } else {
          var lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();
          if (lastMonthDay < day) {    //1个月前所在月的总天数小于现在的天日期
            if (day < nowMonthDay) {        //当前天日期小于当前月总天数
              dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (nowMonthDay - day));
            } else {
              dateObj.last = year + '-' + (month - 1) + '-' + lastMonthDay;
            }
          } else {
            dateObj.last = year + '-' + (month - 1) + '-' + day;
          }
        }
        return dateObj;
      },
      //获取供应商
      getAllSupplierList() {
        getAllSupplier(0).then(response => {
          this.supplierList = response.data;
        })
      },
      exportData() {
        let searchData = {
          keyword: this.listQuery.keyword,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          date1: null,
          date2: null,
          quarter: this.listQuery.quarter,
          year: this.listQuery.year
        };
        if (this.listQuery.date && this.listQuery.date.length > 0) {
          searchData.date1 = dateFormat(this.listQuery.date[0], "yyyy-MM-dd")
          searchData.date2 = dateFormat(this.listQuery.date[1], "yyyy-MM-dd")
        }

        let current = dateFormat(new Date(), "yyyy-MM-dd");
        exportList(searchData).then(result => {
          const data = new Blob([result], {type: 'application/vnd.ms-excel'})
          const url = URL.createObjectURL(data)
          const a = document.createElement('a')
          a.href = url
          let fileName = "物资申请汇总表.xlsx";
          if (searchData.date1 != null && searchData.date1 != '') {//按月查询，那么文件名为1月，2月...等  5-9月
            if (searchData.date1 == searchData.date2) {
              fileName = searchData.date1+ "物资申请汇总表";
            } else {
              fileName = searchData.date1 + "-" + searchData.date2 + "物资申请汇总表";
            }
          } else if (searchData.quarter != null && searchData.quarter != '') {//按季度查询，那么文件名为  第xx季度物资申请汇总表

            if (searchData.quarter == "1") {
              fileName = current.substring(0, 4) + "年第一季度物资申请汇总表"
            } else if (searchData.quarter == "2") {
              fileName = current.substring(0, 4) + "年第二季度物资申请汇总表"
            }else if (searchData.quarter == "3") {
              fileName = current.substring(0, 4) + "年第三季度物资申请汇总表"
            }else if (searchData.quarter == "4") {
              fileName = current.substring(0, 4) + "年第四季度物资申请汇总表"
            }

          } else if (searchData.year != null && searchData.year != '') {
            if (searchData.year == "1") {
              fileName = current.substring(0, 4) + "年上半年物资申请汇总表"
            } else if (searchData.year == "2") {
              fileName = current.substring(0, 4) + "年下半年物资申请汇总表"
            }
          }
          a.download = fileName
          a.click()
          URL.revokeObjectURL(url)

        })

      },
      getList() {
        this.listLoading = true;
        let searchData = {
          keyword: this.listQuery.keyword,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          date1: null,
          date2: null,
          quarter: this.listQuery.quarter,
          year: this.listQuery.year
        };
        if (this.listQuery.date && this.listQuery.date.length > 0) {
          searchData.date1 = dateFormat(this.listQuery.date[0], "yyyy-MM-dd")
          searchData.date2 = dateFormat(this.listQuery.date[1], "yyyy-MM-dd")
        }
        if(searchData.date1==null&&searchData.quarter==null&&searchData.year==null){
          this.$message({
            message: '请选择查询条件！',
            type: 'warning',
            duration: 1000
          });
          this.listLoading = false;
          return
        }
        selectExcelData(searchData).then(response => {
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
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },


    }
  }
</script>
<style scoped>
  .el-table-column-row-height {
    max-height: 30px;
  }
</style>


