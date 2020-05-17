<template>
  <div>
    <el-card class="form-container" shadow="never">

      <div slot="header" class="clearfix">
        <span style="font-size:20px">{{ application.applicationForm.formCode }}信息：</span>
        <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
      </div>
      <el-row>
        <el-col :span="24" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">申请单信息:</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">申请单编号:</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">{{ application.applicationForm.formCode }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">申请人:</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">
            {{ application.applicationForm.createrName }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <div class="grid-content bg-table-head">申请人公司:</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">{{ application.applicationForm.companyName }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <div class="grid-content bg-table-head">申请时间:</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">{{application.applicationForm.applyTime }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <div class="grid-content bg-table-head">申请状态：</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">{{ application.applicationForm.applyStatus }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <div class="grid-content bg-table-head">审核人：</div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">{{ application.applicationForm.approverName  }}</div>
        </el-col>
      </el-row>


    </el-card>

  </div>
</template>
<script>
  let than;
  import {fetchaAllList as getAllSupplier} from "@/api/supplier";
  import {getApplication } from "@/api/application";

  export default {
    name: "viewApplicationForm",

    data() {
      than = this;
      return {
        application: null,
        supplierList: [],
      };
    },
    created() {
      this.getApplicationForm(this.$route.query.id);
    },
    methods: {
      //获取供应商
      getApplicationForm(id) {
        getApplication(id).then((response) => {
          this.application = response.data;
          console.log(this.application);
        });
      },
      //获取供应商
      getAllSupplierList() {
        getAllSupplier(0).then((response) => {
          this.supplierList = response.data;
          console.log(this.supplierList);
        });
      },
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
  };
</script>
<style scoped>
  .form-container {
    left: 10%;
  }

  .el-row {
    /*margin-bottom: 20px;*/
  }

  .bg-table-head {
    color: white;
    background-color: cadetblue;
    font-size: 18px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    /*background: #99a9bf;*/
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    /*background: #e5e9f2;*/
  }

  .grid-content {
    text-align: center;
    line-height: 30px;
    min-height: 30px;
    border: #f2f2f2 solid 1px;
  }

  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  el-col div {
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
</style>
