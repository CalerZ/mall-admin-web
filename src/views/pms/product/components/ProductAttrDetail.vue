<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 720px" size="small">

      <el-form-item label="物品分类：">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="value.product.type1!=null&&value.product.type2!=null&&value.product.type1!=''&&value.product.type2!=''" >
          <el-breadcrumb-item>{{value.product.type1 |getProductTypeName }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{value.product.type2 |getProductTypeName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div v-else-if="value.product.type1!=null&&value.product.type1!=''&&(value.product.type2==null||value.product.type2=='')">{{value.product.type1 |getProductTypeName }}</div>
        <div v-else-if="value.product.type2!=null&&value.product.type2!=''&&(value.product.type1==null||value.product.type1=='')">{{value.product.type2 |getProductTypeName }}</div>
      </el-form-item>
      <el-form-item label="物品编码：" prop="product.code">
        <el-input v-model="value.product.code" disabled></el-input>
      </el-form-item>
      <el-form-item label="物品名称：" prop="product.name">
        <el-input v-model="value.product.name"></el-input>
      </el-form-item>
      <el-form-item label="规格：" prop="product.specifications">
        <el-input v-model="value.product.specifications"></el-input>
      </el-form-item>
      <el-form-item label="单位：" prop="product.unit">
        <el-select
          v-model="value.product.unit"
          placeholder="请选择单位">
          <el-option
            v-for="item in unitOptions"
            :key="item.id"
            :label="item.utilName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价：" prop="product.price" >
        <el-col :span="11">
        <el-input v-model.number="value.product.price" class="input-width">
          <template slot="append">元</template>
        </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="标准：" prop="product.standard">
        <el-input v-model="value.product.standard"></el-input>
      </el-form-item>
      <el-form-item label="是否发布：" prop="product.status">
        <el-switch
          v-model="value.product.status"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </el-form-item>

      <el-form-item label="描述：">
        <el-tabs v-model="activeHtmlName" type="card">
          <el-tab-pane label="物品详情" name="pc">
            <tinymce :width="595" :height="300" v-model="value.product.description"></tinymce>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，选择物品分类</el-button>
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写物品信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {fetchList as fetchProductAttrCateList} from '@/api/productAttrCate'
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'


  import {fetchAllList as fetchProductUtilList} from '@/api/util'

  import {fetchAllList as fetchProductTypeList} from '@/api/productType'


  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import Tinymce from '@/components/Tinymce'

  let than;
  export default {
    name: "ProductAttrDetail",
    components: {SingleUpload, MultiUpload, Tinymce},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      than = this;

      var validateCode = (rule, value, callback) => {
        if (value === '') {//正则匹配
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        //编辑模式时是否初始化成功
        hasEditCreated: false,
        //商品属性分类下拉选项
        productAttributeCategoryOptions: [],
        //选中的商品属性
        selectProductAttr: [],
        //选中的商品参数
        selectProductParam: [],
        //选中的商品属性图片
        selectProductAttrPics: [],
        //可手动添加的商品属性
        addProductAttrValue: '',
        //商品富文本详情激活类型
        activeHtmlName: 'pc',
        unitOptions: [],
        productTypeList: [],

        rules: {
        'product.name': [
            {required: true, message: '请输入物品名称', trigger: 'blur'},
            {min: 2, max: 512, message: '长度在 2 到 512 个字符', trigger: 'blur'}
          ],
          'product.specifications': [
            {required: true, message: '请输入规格', trigger: 'blur'},
            {min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur'}
          ],
        'product.unit': [
            {required: true, message: '请选择物品单位', trigger: 'blur'},
          ],
        'product.price': [
            {required: true, message: '请输入物品单价', trigger: 'blur'},
            {type: 'number', message: '单价必须为数字值'}
          ],
        'product.standard': [
            {required: false, message: '请输入标准', trigger: 'blur'},
          ],
        'product.status': [
            {required: true, message: '请选择物品状态', trigger: 'blur'},
          ],

        }
      }
    },

    created() {
      this.getProductUtilList();
      this.getProductTypeList();

    },
    filters: {
      getProductTypeName(typeId) {
        let typename = "";
        if (than.productTypeList != null && than.productTypeList.length > 0) {
          than.productTypeList.forEach(item => {
            if (item.id == typeId) {
              typename = item.typeName
            }
          })
        }
        return typename;
      }
    },

    methods: {
      getPartNo(){
        console.log({type1:this.value.product.type1,type2:this.value.product.type2})
        partNo({type1:this.value.product.type1,type2:this.value.product.type2}).then(response=>{
          this.value.product.code = response.data;
        })
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      //获取所有物品分类
      getProductTypeList() {
        fetchProductTypeList().then(response => {
          this.productTypeList = response.data;
        });
      },
      //获取所有单位列表
      getProductUtilList() {
        fetchProductUtilList().then(response => {
          this.unitOptions = response.data;
        });
      },


      handleEditCreated() {
        //根据商品属性分类id获取属性和参数
        if (this.value.productAttributeCategoryId != null) {
          this.handleProductAttrChange(this.value.productAttributeCategoryId);
        }
        this.hasEditCreated = true;
      },

      handlePrev() {
        this.$emit('prevStep')
      },
    }
  }
</script>

<style scoped>
  .littleMarginLeft {
    margin-left: 10px;
  }

  .littleMarginTop {
    margin-top: 10px;
  }

  .paramInput {
    width: 250px;
  }

  .paramInputLabel {
    display: inline-block;
    width: 100px;
    text-align: right;
    padding-right: 10px
  }

  .cardBg {
    background: #F8F9FC;
  }
</style>
