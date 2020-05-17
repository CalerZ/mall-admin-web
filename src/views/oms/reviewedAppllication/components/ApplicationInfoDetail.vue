<template>
  <div >
    <el-form :model="value"  ref="productInfoForm" label-width="120px" style="width: 720px;margin: 0 auto" size="small">
      <el-form-item label="申请单单号：">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-input v-model="value.applicationForm.formCode" disabled></el-input>
        </el-breadcrumb>
      </el-form-item>
      <el-form-item label="申请人：" >
        <el-input v-model="value.applicationForm.applyOn"  disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="申请人公司：" >
        <el-input v-model="value.applicationForm.applyCompany" disabled></el-input>
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

      <el-form-item label="描述：" disabled>
        <el-input
          disabled
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="value.applicationForm.description">
        </el-input>
      </el-form-item>

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
        members:[],
      };
    },
    created() {
      this.getAllUser();
    },
    methods: {

      getAllUser(){
        getAllMember().then(response => {
         this.memberList =  response.data;
          response.data.forEach(item=>{this.members[item.id]=item.username})
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
