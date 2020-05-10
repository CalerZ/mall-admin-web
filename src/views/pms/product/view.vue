<template>
  <div>
    <el-card class="form-container" shadow="never">
      <div slot="header" class="clearfix">
        <span style="font-size:30px">{{ product.name }}详情信息：</span>
      </div>
      <el-row>
        <el-col :span="8" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">物料编码:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">{{ product.code }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">类型:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            {{ product.type1Name }}>{{ product.type2Name }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-table-head">单位:</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ product.utilName }}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-table-head">规格:</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ product.specifications }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-table-head">标准</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ product.standard }}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-table-head">价格</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">{{ product.price }}</div>
        </el-col>
      </el-row>
      <el-row> </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-table-head">供应商</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            {{ product.supplierId | filterSupplierName }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-table-head">创建人</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{ product.createrName }}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-table-head">时间</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">{{ product.createTime }}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-table-head">发布状态</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            {{ product.status == 1 ? "已发布" : "未发布" }}
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import ProductDetail from "./components/ProductDetail";
let than;
import { fetchaAllList as getAllSupplier } from "@/api/supplier";
export default {
  name: "updateProduct",

  data() {
     than = this;
    return {
      product: null,
      supplierList: [],
    };
  },
  created() {
    this.product = this.$route.query.product;
    this.getAllSupplierList();
    console.log(this.product);
  },
  methods: {
    //获取供应商
    getAllSupplierList() {
      getAllSupplier(0).then((response) => {
        this.supplierList = response.data;
        console.log(this.supplierList);
      });
    },
  },
  filters: {
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
};
</script>
<style scoped>
.form-container{
  left:10%;
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
