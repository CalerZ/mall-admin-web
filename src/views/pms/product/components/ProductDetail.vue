<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="选择物品类型"></el-step>
      <el-step title="填写物品信息"></el-step>
      <el-step title="填写物品库存"></el-step>
      <el-step title="选择物品供应商"></el-step>
    </el-steps>
    <product-info-detail
      ref="productInfoDetail"
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </product-info-detail>

    <product-attr-detail
      ref="productAttrDetail"
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </product-attr-detail>

    <product-sale-detail
      ref="productSaleDetail"
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep">
    </product-sale-detail>

    <product-relation-detail
      ref="productRelationDetail"
      v-show="showStatus[3]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit">
    </product-relation-detail>
  </el-card>
</template>
<script>
  import ProductInfoDetail from './ProductInfoDetail';
  import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  import ProductRelationDetail from './ProductRelationDetail';
  import {createProduct, getProduct, updateProduct} from '@/api/product';

  const defaultProductParam = {
    product: {
      id: null,//  序号
      name: null,//  物品名称
      type1: null,//  一级类型
      type2: null,//  二级类型
      description: null,//  描述
      specifications: null,//  规格
      unit: null,//  单位
      price: 0,//  参考单价
      standard: null,//  标准
      status: 1,//  状态
      createTime: null,//  创建时间
      createOn: null,//  创建人
      modifyTime: null,//  修改时间
      modifyOn: null,//  修改人
      supplierId: null,//  供应商id
      isDelete: null,//  是否删除
      code: null,//  物品编码
    },
    stock: {
      safetyStock: 0,//  安全库存
      lastMonthQuantity: 0,//  上月数量
      onHandInventory: 0,//  现有库存
      reportedQuantity: 0,//  本月提报数量
      productId: 0,//  物品id
      productCode: 0,//  物品编码
      purchaseMethod: 0,//  采购方式
      prodLineMembers: 0,//  生产线人数
    }

  };
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductSaleDetail, ProductAttrDetail, ProductRelationDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false, false, false]
      }
    },
    created() {
      if (this.isEdit) {
        getProduct(this.$route.query.id).then(response => {
          this.productParam = response.data;
          this.nextStep()
        });
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (isEdit) {
            updateProduct(this.$route.query.id, this.productParam).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功',
                duration: 1000
              });
              this.$router.back();
            });
          } else {
            createProduct(this.productParam).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功',
                duration: 1000
              });
              //初始化表单
              debugger
              console.log(this.$refs)
              this.$refs.productAttrDetail.resetForm("productInfoForm");
              this.$refs.productRelationDetail.resetForm("productRelationForm");
              this.$refs.productSaleDetail.resetForm("productSaleForm");
              this.$router.push("/pms/product")
              this.productParam=Object.assign({}, defaultProductParam)
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


