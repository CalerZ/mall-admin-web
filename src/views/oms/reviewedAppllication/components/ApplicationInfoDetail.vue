<template>
  <div >
    <el-form :model="value"  ref="productInfoForm" label-width="120px" style="width: 720px;margin: 0 auto" size="small">
      <el-form-item label="申请单单号：">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-input v-model="value.applicationForm.formCode" disabled></el-input>
        </el-breadcrumb>
      </el-form-item>
      <el-form-item label="申请人：" >
        <el-input v-model="username"  disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="申请人公司：" >
        <el-input v-model="company" disabled></el-input>
      </el-form-item>
      <el-form-item label="审核人：" disabled prop="applicationForm.approver">
        <el-select
          disabled
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
    <!--  <el-form-item label="审核状态："  >
        <el-switch
          disabled
          v-model="value.applicationForm.applyStatus"
          :active-value="1"
          :inactive-value="0"
          disabled>
        </el-switch>
      </el-form-item>-->
      <el-form-item label="描述：" disabled>
        <el-input
          disabled
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="value.applicationForm.description">
        </el-input>
      </el-form-item>
<!--      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写物品信息</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<script>
  import Tinymce from '@/components/Tinymce'
  import getters from "../../../../store/getters";
  import {getCompany} from '@/api/company';
  import {fetchAllList as getAllMember} from '@/api/login';
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
        textarea:null,
        activeHtmlName:"pc",
        menuTreeList: [],
        defaultProps: {
          children: 'children',
          label: 'typeName'
        },
        hasEditCreated: false,
        memberList:[],

      };
    },
    created() {
      this.getAllUser();
      this.computeFormCode();
      this.value.applicationForm.applyOn = this.$store.getters.userid;
      this.value.applicationForm.applyCompany = this.$store.getters.company.id;
      console.log(this.$store.getters)
    },
    filters:{
      userNameFilter(id){
        return this.$store.getters.name;
      }
    },
    computed:{
      username(){
        return   this.$store.getters.name;
      },
      company(){
        return this.$store.getters.company.name;
      },
    },
    methods: {
      //后台生成流水号
      computeFormCode(){
        let date = new Date();
        console.log(date.toLocaleString())
        this.value.applicationForm.formCode =  'TAP-'+date.getFullYear()+date.getMonth()+'-'+'0001';
      },

      getAllUser(){
        getAllMember().then(response => {
         this.memberList =  response.data;
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
      handleNext() {
        //获取选中分类值
        this.$emit('nextStep');
      }
    }
  }
</script>
<style scoped>
</style>
