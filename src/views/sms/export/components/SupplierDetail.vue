<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="supplier" :rules="rules" ref="supplierFrom" label-width="150px">
      <el-form-item label="供应商编码：" prop="code">
        <el-input v-model="supplier.code"></el-input>
      </el-form-item>
      <el-form-item label="供应商名称：" prop="name">
        <el-input v-model="supplier.name"></el-input>
      </el-form-item>
      <el-form-item label="状态：" >
        <el-switch
          @change="handleShowStatusChange()"
          :active-value="1"
          :inactive-value="0"
          v-model="supplier.status">
        </el-switch>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="supplier.discription">
        </el-input>
      </el-form-item>

      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="supplier.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('supplierFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('supplierFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {fetchList, createSupplier, updateSupplierStatus, deleteSupplier,deleteSuppliers,getSupplier,updateSupplier,fetchaAllList} from '@/api/supplier'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSupplier={
    code: null,
    name: null,
    status: 1,
    discription: null,
    sort: 0,
  };
  export default {
    name: 'SupplierDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        supplier:Object.assign({}, defaultSupplier),
        rules: {
          name: [
            {required: true, message: '请输入供应商名称', trigger: 'blur'},
          ],
          code: [
            {required: true, message: '请输入供应商编码', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getSupplier(this.$route.query.id).then(response => {
          this.supplier = response.data;
        });
      }else{
        this.supplier = Object.assign({},defaultSupplier);
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
                updateSupplier(this.$route.query.id, this.supplier).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSupplier(this.supplier).then(response => {
                  this.$refs[formName].resetFields();
                  this.supplier = Object.assign({},defaultSupplier);
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
        this.supplier = Object.assign({},defaultSupplier);
      }
    }
  }
</script>
<style>
</style>


