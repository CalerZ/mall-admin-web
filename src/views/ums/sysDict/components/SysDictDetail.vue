<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="sysDict" :rules="rules" ref="sysDictFrom" label-width="150px">
      <el-form-item label="父级：" prop="code">
        <el-input v-model="sysDict.pid"></el-input>
      </el-form-item>
      <el-form-item label="数据类型：" prop="name">
        <el-input v-model="sysDict.dataType"></el-input>
      </el-form-item>
      <el-form-item label="数据编码：" prop="name">
        <el-input v-model="sysDict.dataCode"></el-input>
      </el-form-item>
      <el-form-item label="数据值：" prop="name">
        <el-input v-model="sysDict.dataValue"></el-input>
      </el-form-item>
      <el-form-item label="是否固定值：" prop="name">
        <el-input v-model="sysDict.isFixed"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-switch
          @change="handleShowStatusChange()"
          :active-value="1"
          :inactive-value="0"
          v-model="sysDict.status">
        </el-switch>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="sysDict.dataDesc">
        </el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="name">
        <el-input v-model="sysDict.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('sysDictFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('sysDictFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {fetchList, insert, updateStatus, del, dels, get, update, fetchaAllList} from '@/api/sysDict'

  const defaultSysDict = {
    code: null,
    name: null,
    status: 1,
    discription: null,
    sort: 0,
  };
  export default {
    name: 'SysDictDetail',
    components: {},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sysDict: Object.assign({}, defaultSysDict),
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
        get(this.$route.query.id).then(response => {
          this.sysDict = response.data;
        });
      } else {
        this.sysDict = Object.assign({}, defaultSysDict);
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
                update(this.$route.query.id, this.sysDict).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                insert(this.sysDict).then(response => {
                  this.$refs[formName].resetFields();
                  this.sysDict = Object.assign({}, defaultSysDict);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });

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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.sysDict = Object.assign({}, defaultSysDict);
      }
    }
  }
</script>
<style>
</style>


