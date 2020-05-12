<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="sysDict" :rules="rules" ref="sysDictFrom" label-width="150px">
      <el-form-item label="父级：" prop="pid">
        <el-input v-model="sysDict.pid"></el-input>
      </el-form-item>
      <el-form-item label="数据类型：" prop="dataType">
        <el-input v-model="sysDict.dataType"></el-input>
      </el-form-item>
      <el-form-item label="数据编码：" prop="dataCode">
        <el-input v-model="sysDict.dataCode"></el-input>
      </el-form-item>
      <el-form-item label="数据值：" prop="dataValue">
        <el-input v-model="sysDict.dataValue"></el-input>
      </el-form-item>
      <el-form-item label="是否固定值：" prop="isFixed">
<!--        <el-input v-model="sysDict.isFixed"></el-input>-->
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="sysDict.isFixed">
        </el-switch>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-switch
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
      <el-form-item label="排序：" prop="sort">
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
    pid:null,
    dataType:null,
    dataCode:null,
    dataValue:null,
    isFixed:0,
    status: 1,
    sort: 0,
    dataDesc:null
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
          dataType: [
            {required: true, message: '请输入数据类型', trigger: 'blur'},
          ],
          dataCode: [
            {required: true, message: '请输入数据编码', trigger: 'blur'},
          ],
          dataValue: [
            {required: true, message: '请输入数据值', trigger: 'blur'}
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
            debugger
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                debugger
                console.log(this.sysDict)
                update(this.sysDict).then(response => {
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


