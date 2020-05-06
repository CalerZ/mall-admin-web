<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productSaleForm" label-width="120px" style="width: 600px" size="small">

      <el-form-item label="安全库存：" prop="stock.safetyStock">
        <el-input v-model.number="value.stock.safetyStock"></el-input>
      </el-form-item>
      <el-form-item label="上月数量：" prop="stock.lastMonthQuantity">
        <el-input v-model.number="value.stock.lastMonthQuantity"></el-input>
      </el-form-item>
      <el-form-item label="现有库存：" prop="stock.onHandInventory">
        <el-input v-model.number="value.stock.onHandInventory"></el-input>
      </el-form-item>
      <el-form-item label="本月提报数量：" prop="stock.reportedQuantity">
        <el-input v-model.number="value.stock.reportedQuantity"></el-input>
      </el-form-item>
<!--      <el-form-item label="采购方式：" prop="stock.purchaseMethod">-->
<!--        <el-select-->
<!--          v-model="value.stock.purchaseMethod"-->
<!--          placeholder="请选择采购方式">-->
<!--          <el-option-->
<!--            v-for="item in purchaseMethodList"-->
<!--            :key="item.id"-->
<!--            :label="item.name"-->
<!--            :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="生产线人数：" prop="stock.prodLineMembers">
        <el-input v-model.number="value.stock.prodLineMembers"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写物品信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext('productSaleForm')">下一步，选择供应商</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchPurchaseMethodList} from '@/api/product'

  export default {
    name: "ProductSaleDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //日期选择器配置
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        purchaseMethodList: [],
        rules: {
          'stock.safetyStock': [
            {required: false, message: '请输入安全库存', trigger: 'blur'},
            {type: 'number', message: '安全库存必须为数字值'}

          ],
          'stock.lastMonthQuantity': [
            {required: false, message: '请输入上月数量', trigger: 'blur'},
            {type: 'number', message: '上月数量必须为数字值'}
          ],
          'stock.onHandInventory': [
            {required: false, message: '请输入现有库存', trigger: 'blur'},
            {type: 'number', message: '现有库存必须为数字值'}
          ],
          'stock.reportedQuantity': [
            {required: false, message: '请输入本月提报数量', trigger: 'blur'},
            {type: 'number', message: '本月提报数量必须为数字值'}
          ],
          'stock.prodLineMembers': [
            {required: false, message: '请输入生产线人数', trigger: 'blur'},
            {type: 'number', message: '生产线人数必须为数字值'}
          ],

        }
      }
    },
    created() {
      // this.getPurchaseMethodList();
      if (this.isEdit) {
        // this.handleEditCreated();
      } else {

      }
    },

    methods: {
      //获取采购方式列表
      getPurchaseMethodList() {
        fetchPurchaseMethodList().then(response => {
          this.purchaseMethodList = response.data;
          this.purchaseMethodList.unshift({id: 0, name: "默认采购方式"})
        });
      },
      //表单验证
      handleNext(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('nextStep');
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
      handleEditCreated() {
        let ids = this.value.serviceIds.split(',');
        console.log('handleEditCreated', ids);
        for (let i = 0; i < ids.length; i++) {
          this.selectServiceList.push(Number(ids[i]));
        }
      },
      handlePrev() {
        this.$emit('prevStep')
      },
      // handleNext() {
      //   this.$emit('nextStep')
      // }
    }
  }
</script>

<style scoped>
  .littleMargin {
    margin-top: 10px;
  }
</style>
