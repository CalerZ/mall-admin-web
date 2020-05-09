<template> 
  <div>
    <el-card class="form-container" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{product.code}}详情</span>
      </div>
      <el-row>
        <el-col :span="10" align="center" style="line-height: 20px">
          <div class="grid-content bg-purple">物料编码:</div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple">{{product.code}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">物料名称:</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{product.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">物料名称</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{product.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">物料名称</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{product.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">物料名称</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">{{product.name}}</div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
  import ProductDetail from './components/ProductDetail'

  export default {
    name: 'updateProduct',

    data() {
      return {
        product: null
      }
    },
    created() {
      this.product = this.$route.query.product
    },
    methods: {}
  }
</script>
<style scoped>

  .el-row {
    /*margin-bottom: 20px;*/

  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    /*background: #99a9bf;*/
  }

  .bg-purple {
    /*background: #d3dce6;*/
  }

  .bg-purple-light {
    /*background: #e5e9f2;*/
  }

  .grid-content {
    border-radius: 4px;
    min-height: 30px;
    border: #1e6abc solid 1px;
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

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
