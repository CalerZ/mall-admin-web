<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="ApplicationInfoForm" label-width="120px"
             style="width: 720px;margin: 0 auto" size="small">
      <el-form-item label="申请单单号：">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-input v-model="value.applicationForm.formCode" disabled></el-input>
        </el-breadcrumb>
      </el-form-item>
      <el-form-item label="申请人：">
        <el-input v-model="value.applicationForm.createrName"  disabled></el-input>
        </el-input>
      </el-form-item>
      <el-form-item label="申请人公司：">
        <el-input v-model="value.applicationForm.companyName"  disabled></el-input>
      </el-form-item>
      <el-form-item label="审核人：" prop="applicationForm.approver">
        <el-select
          v-model="value.applicationForm.approver"
          placeholder="请选择审核人">
          <el-option
            v-for="item in memberList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="value.applicationForm.description">
        </el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('ApplicationInfoForm')">下一步，选择物品信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Tinymce from '@/components/Tinymce'
  import getters from "../../../../store/getters";
  import {getCompany} from '@/api/company';
  import {fetchAllList as getAllMember} from '@/api/login';
  import {formNo,getApplication} from '@/api/application';

  let than;
  export default {
    name: "ApplicationInfoDetail",
    components: {Tinymce},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      than = this
      return {
        textarea: null,
        activeHtmlName: "pc",
        menuTreeList: [],
        defaultProps: {
          children: 'children',
          label: 'typeName'
        },
        hasEditCreated: false,
        memberList: [],
        memberArr: [],
        rules: {
          'applicationForm.approver': [
            {required: true, message: '请输选择审批人', trigger: 'blur'},
          ],
        },
        username:"",
        company:""

      };
    },
    created() {
      this.getAllUser();
      if (this.isEdit) {
        this.getData(this.$route.query.id)
      } else {
        this.username=this.$store.getters.name;
        this.company=this.$store.getters.company.name;
        this.getFormNo();
        this.value.applicationForm.applyOn = this.$store.getters.userid;
        this.value.applicationForm.applyCompany = this.$store.getters.company.id;
      }
    },

    methods: {
      getData(id){
        getApplication(id).then(result => {
          this.value = result.data
          this.username=this.memberArr[this.value.applicationForm.applyOn]
          this.company="公司1"
        })
      },
      getFormNo() {
        formNo().then(response => {
          this.value.applicationForm.formCode = response.data;
        })
      },

      getAllUser() {
        getAllMember().then(response => {
          this.memberList = response.data;
          response.data.forEach(item=>{this.memberArr[item.id]=item.username})
        })
      },

      //处理编辑逻辑
      handleEditCreated() {
        if (this.value.productCategoryId != null) {
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated = true;
      },
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
        })
      }
    }
  }
</script>
<style scoped>
</style>
