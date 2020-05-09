<template>
  <div style="margin-top: 50px">
    <el-form :model="value"
             :rules="rules"
             ref="productRelationForm"
             label-width="120px"
             style="width: 680px"
             size="small">
      <!--      <el-form-item label="供应商：" prop="brandId">-->
      <!--        <el-select-->
      <!--          v-model="value.product.supplierId"-->
      <!--          placeholder="请选择供应商">-->
      <!--          <el-option-->
      <!--            v-for="item in brandOptions"-->
      <!--            :key="item.value"-->
      <!--            :label="item.label"-->
      <!--            :value="item.value">-->
      <!--          </el-option>-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->

      <el-form-item label="采购方式：" prop="stock.purchaseMethod">
        <el-select
          v-model="value.stock.purchaseMethod"
          placeholder="请选择采购方式">
          <el-option
            v-for="item in purchaseMethodList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <!--          filterable-->
      <!--          :filter-method="filterMethod"-->

      <el-form-item label="供应商：" prop="sublist">
        <el-transfer
          style="display: inline-block"
          filter-placeholder="请选择供应商"
          v-model="sublist"
          :titles="subjectTitles"
          :data="supplierList"
        >
        </el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写物品库存信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit('productRelationForm')">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchaAllList as fetchSupplierList} from '@/api/supplier'
  import {fetchList as fetchPrefrenceAreaList} from '@/api/prefrenceArea'
  import {fetchPurchaseMethodList} from '@/api/product'

  export default {
    name: "ProductRelationDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {


      return {
        purchaseMethodList: [],
        //所有专题列表
        supplierList: [],
        //专题左右标题
        subjectTitles: ['待选择', '已选择'],
        //所有专题列表
        prefrenceAreaList: [],
        //专题左右标题
        prefrenceAreaTitles: ['待选择', '已选择'],
        brandOptions: [],
        sublist: [],
        rules: {

          'stock.purchaseMethod': [
            {required: true, message: '请选择采购方式', trigger: 'blur'},
          ],
          'sublist': [
            // {required: true, message: '请选择供应商', trigger: 'blur'},
          ],


        }
      };
    },
    created() {
      this.getSupplierList();
      this.getPurchaseMethodList();
    },
    methods: {

      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //表单验证
      handleFinishCommit(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.sublist.length>0){
              this.value.product.supplierId = this.sublist.join(",");
              this.$emit('finishCommit', this.isEdit);
            }else{
              this.$message({
                message: '请选择供应商',
                type: 'error',
                duration: 1000
              });
              return false;
            }
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      //获取采购方式列表
      getPurchaseMethodList() {
        fetchPurchaseMethodList().then(response => {
          this.purchaseMethodList = response.data;
          this.purchaseMethodList.unshift({id: 0, name: "默认采购方式"})
        });
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      getSupplierList() {
        fetchSupplierList().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            this.supplierList.push({
              label: list[i].name,
              key: list[i].id + ''
            });
          }
        });
      },
      getPrefrenceAreaList() {
        fetchPrefrenceAreaList().then(response => {
          let list = response.data;
          for (let i = 0; i < list.length; i++) {
            this.prefrenceAreaList.push({
              label: list[i].name,
              key: list[i].id
            });
          }
        });
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      // handleFinishCommit() {
      //   value.product.supplierId = this.sublist.join(",");
      //   this.$emit('finishCommit', this.isEdit);
      // }
    }
  }
</script>

<style scoped>

</style>
