<template>
  <div>
    <el-card class="form-container" shadow="never">
      <div slot="header" class="clearfix">
        <span style="font-size:30px">{{ product.name }}详情信息：</span>
      </div>
      <el-row>
        <el-col :span="6" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">物料编码:</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.code }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" align="center" style="line-height: 20px;">
          <div class="grid-content bg-table-head">类型:</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">
            {{ product.type1Name }}>{{ product.type2Name }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">单位:</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.utilName }}</div>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">规格:</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.specifications }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">标准</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.standard }}</div>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">价格</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.price }}</div>
        </el-col>
      </el-row>
      
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">供应商</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">
            {{ product.supplierId | filterSupplierName }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">安全库存</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ stock.safetyStock }}</div>
        </el-col>
        </el-row><el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">上月数量</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ stock.lastMonthQuantity }}</div>
        </el-col>
        </el-row><el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">现有库存</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ stock.onHandInventory }}</div>
        </el-col>
        </el-row><el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">本月提报数量</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ stock.reportedQuantity }}</div>
        </el-col>
        </el-row><el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">时间</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.createTime }}</div>
        </el-col>
        </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">创建人</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{ product.createrName }}</div>
        </el-col>
        </el-row>
       
        <el-row>
        <el-col :span="6">
          <div class="grid-content bg-table-head">发布状态</div>
        </el-col>
        <el-col :span="14">
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
import {getProduct} from "@/api/product";
export default {
  name: "updateProduct",

  data() {
     than = this;
    return {
      product: null,
      supplierList: [],
      stock:{}
    };
  },
  created() {
    this.product = this.$route.query.product;
    this.getAllSupplierList();
    console.log(this.product);
    this.getStock(this.product.id)
  },
  methods: {
    //获取库存信息
    getStock:function(id){
   getProduct(id).then((response)=>{
     console.log(response.data.stock)
     this.stock=response.data.stock;
   })

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

.el-row {
  /*margin-bottom: 20px;*/
}
.bg-table-head {
  color: white;
  background-color:#0070c1;
  font-size: 14px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  /*background: #99a9bf;*/
}

.bg-purple {
  background:white;
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
  margin-bottom: 14px;
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
  width: 460px;
}
</style>
