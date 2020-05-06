<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="purchaseMethod" :rules="rules" ref="purchaseMethodFrom" label-width="150px">
      <el-form-item label="采购方式名称：" prop="name">
        <el-input v-model="purchaseMethod.name"></el-input>
      </el-form-item>
      <el-form-item label="状态：" >
        <el-switch
          @change="handleShowStatusChange()"
          :active-value="1"
          :inactive-value="0"
          v-model="purchaseMethod.status">
        </el-switch>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="purchaseMethod.discription">
        </el-input>
      </el-form-item>

      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="purchaseMethod.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('purchaseMethodFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('purchaseMethodFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {fetchList, createPurchaseMethod, updatePurchaseMethodStatus, deletePurchaseMethod,deletePurchaseMethods,getPurchaseMethod,updatePurchaseMethod,fetchaAllList} from '@/api/purchaseMethod'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultPurchaseMethod={
    name: null,
    status: 1,
    discription: null,
    sort: 0,
  };
  export default {
    name: 'PurchaseMethodDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        purchaseMethod:Object.assign({}, defaultPurchaseMethod),
        rules: {
          name: [
            {required: true, message: '请输入供应商名称', trigger: 'blur'},
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getPurchaseMethod(this.$route.query.id).then(response => {
          this.purchaseMethod = response.data;
        });
      }else{
        this.purchaseMethod = Object.assign({},defaultPurchaseMethod);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updatePurchaseMethod(this.$route.query.id, this.purchaseMethod).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createPurchaseMethod(this.purchaseMethod).then(response => {
                  this.$refs[formName].resetFields();
                  this.purchaseMethod = Object.assign({},defaultPurchaseMethod);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.purchaseMethod = Object.assign({},defaultPurchaseMethod);
      }
    }
  }
</script>
<style>
</style>


