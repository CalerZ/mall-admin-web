<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 720px" size="small">

      <el-form-item label="物品分类：">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{value.product.type1 |getProductTypeName }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{value.product.type2 |getProductTypeName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-form-item>
      <el-form-item label="物品编码：" prop="product.code">
        <el-input v-model="value.product.code"></el-input>
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
     <!--   <el-col :span="11">
        <el-input  v-model.number="value.product.price"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input value="元" disabled></el-input>
        </el-col>-->
        <el-col :span="11">
        <el-input v-model="value.product.price" class="input-width">
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


  import {fetchAllList as fetchProductUtilList} from '@/api/productUtil'
  import {fetchAllList as fetchProductTypeList} from '@/api/productCate'


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
          'product.code': [
            {required: true, message: '请输入物品编码', trigger: 'blur'},
            {min: 4, max: 140, message: '长度在 4 到 140 个字符', trigger: 'blur'},
            {validator: validateCode, trigger: 'blur'}

          ],
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
    // beforeUpdate() {
    //   than = this
    // },
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

      /*
      getProductAttrCateList() {
        let param = {pageNum: 1, pageSize: 100};
        fetchProductAttrCateList(param).then(response => {
          this.productAttributeCategoryOptions = [];
          let list = response.data.list;
          for (let i = 0; i < list.length; i++) {
            this.productAttributeCategoryOptions.push({label: list[i].name, value: list[i].id});
          }
        });
      },
      getProductAttrList(type, cid) {
        let param = {pageNum: 1, pageSize: 100, type: type};
        fetchProductAttrList(cid, param).then(response => {
          let list = response.data.list;
          if (type === 0) {
            this.selectProductAttr = [];
            for (let i = 0; i < list.length; i++) {
              let options = [];
              let values = [];
              if (this.isEdit) {
                if (list[i].handAddStatus === 1) {
                  //编辑状态下获取手动添加编辑属性
                  options = this.getEditAttrOptions(list[i].id);
                }
                //编辑状态下获取选中属性
                values = this.getEditAttrValues(i);
              }
              this.selectProductAttr.push({
                id: list[i].id,
                name: list[i].name,
                handAddStatus: list[i].handAddStatus,
                inputList: list[i].inputList,
                values: values,
                options: options
              });
            }
            if(this.isEdit){
              //编辑模式下刷新商品属性图片
              this.refreshProductAttrPics();
            }
          } else {
            this.selectProductParam = [];
            for (let i = 0; i < list.length; i++) {
              let value=null;
              if(this.isEdit){
                //编辑模式下获取参数属性
                value= this.getEditParamValue(list[i].id);
              }
              this.selectProductParam.push({
                id: list[i].id,
                name: list[i].name,
                value: value,
                inputType: list[i].inputType,
                inputList: list[i].inputList
              });
            }
          }
        });
      },
      //获取设置的可手动添加属性值
      getEditAttrOptions(id) {
        let options = [];
        for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
          let attrValue = this.value.productAttributeValueList[i];
          if (attrValue.productAttributeId === id) {
            let strArr = attrValue.value.split(',');
            for (let j = 0; j < strArr.length; j++) {
              options.push(strArr[j]);
            }
            break;
          }
        }
        return options;
      },
      //获取选中的属性值
      getEditAttrValues(index) {
        let values = new Set();
        if (index === 0) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=1) {
              values.add(spData[0].value);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=2) {
              values.add(spData[1].value);
            }
          }
        } else {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            let spData = JSON.parse(sku.spData);
            if (spData!= null && spData.length>=3) {
              values.add(spData[2].value);
            }
          }
        }
        return Array.from(values);
      },
      //获取属性的值
      getEditParamValue(id){
        for(let i=0;i<this.value.productAttributeValueList.length;i++){
          if(id===this.value.productAttributeValueList[i].productAttributeId){
            return this.value.productAttributeValueList[i].value;
          }
        }
      },
      handleProductAttrChange(value) {
        this.getProductAttrList(0, value);
        this.getProductAttrList(1, value);
      },
      getInputListArr(inputList) {
        return inputList.split(',');
      },
      handleAddProductAttrValue(idx) {
        let options = this.selectProductAttr[idx].options;
        if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
          this.$message({
            message: '属性值不能为空',
            type: 'warning',
            duration: 1000
          });
          return
        }
        if (options.indexOf(this.addProductAttrValue) !== -1) {
          this.$message({
            message: '属性值不能重复',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.selectProductAttr[idx].options.push(this.addProductAttrValue);
        this.addProductAttrValue = null;
      },
      handleRemoveProductAttrValue(idx, index) {
        this.selectProductAttr[idx].options.splice(index, 1);
      },
      getProductSkuSp(row, index) {
        let spData = JSON.parse(row.spData);
        if(spData!=null&&index<spData.length){
          return spData[index].value;
        }else{
          return null;
        }
      },
      handleRefreshProductSkuList() {
        this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.refreshProductAttrPics();
          this.refreshProductSkuList();
        });
      },
      handleSyncProductSkuPrice(){
        this.$confirm('将同步第一个sku的价格到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.skuStockList!==null&&this.value.skuStockList.length>0){
            let tempSkuList = [];
            tempSkuList = tempSkuList.concat(tempSkuList,this.value.skuStockList);
            let price=this.value.skuStockList[0].price;
            for(let i=0;i<tempSkuList.length;i++){
              tempSkuList[i].price=price;
            }
            this.value.skuStockList=[];
            this.value.skuStockList=this.value.skuStockList.concat(this.value.skuStockList,tempSkuList);
          }
        });
      },
      handleSyncProductSkuStock(){
        this.$confirm('将同步第一个sku的库存到所有sku,是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.value.skuStockList!==null&&this.value.skuStockList.length>0){
            let tempSkuList = [];
            tempSkuList = tempSkuList.concat(tempSkuList,this.value.skuStockList);
            let stock=this.value.skuStockList[0].stock;
            let lowStock=this.value.skuStockList[0].lowStock;
            for(let i=0;i<tempSkuList.length;i++){
              tempSkuList[i].stock=stock;
              tempSkuList[i].lowStock=lowStock;
            }
            this.value.skuStockList=[];
            this.value.skuStockList=this.value.skuStockList.concat(this.value.skuStockList,tempSkuList);
          }
        });
      },
      refreshProductSkuList() {
        this.value.skuStockList = [];
        let skuList = this.value.skuStockList;
        //只有一个属性时
        if (this.selectProductAttr.length === 1) {
          let attr = this.selectProductAttr[0];
          for (let i = 0; i < attr.values.length; i++) {
            skuList.push({
              spData: JSON.stringify([{key:attr.name,value:attr.values[i]}])
            });
          }
        } else if (this.selectProductAttr.length === 2) {
          let attr0 = this.selectProductAttr[0];
          let attr1 = this.selectProductAttr[1];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                spData: JSON.stringify([{key:attr0.name,value:attr0.values[i]}])
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              let spData = [];
              spData.push({key:attr0.name,value:attr0.values[i]});
              spData.push({key:attr1.name,value:attr1.values[j]});
              skuList.push({
                spData: JSON.stringify(spData)
              });
            }
          }
        } else {
          let attr0 = this.selectProductAttr[0];
          let attr1 = this.selectProductAttr[1];
          let attr2 = this.selectProductAttr[2];
          for (let i = 0; i < attr0.values.length; i++) {
            if (attr1.values.length === 0) {
              skuList.push({
                spData: JSON.stringify([{key:attr0.name,value:attr0.values[i]}])
              });
              continue;
            }
            for (let j = 0; j < attr1.values.length; j++) {
              if (attr2.values.length === 0) {
                let spData = [];
                spData.push({key:attr0.name,value:attr0.values[i]});
                spData.push({key:attr1.name,value:attr1.values[j]});
                skuList.push({
                  spData: JSON.stringify(spData)
                });
                continue;
              }
              for (let k = 0; k < attr2.values.length; k++) {
                let spData = [];
                spData.push({key:attr0.name,value:attr0.values[i]});
                spData.push({key:attr1.name,value:attr1.values[j]});
                spData.push({key:attr2.name,value:attr2.values[k]});
                skuList.push({
                  spData: JSON.stringify(spData)
                });
              }
            }
          }
        }
      },
      refreshProductAttrPics() {
        this.selectProductAttrPics = [];
        if (this.selectProductAttr.length >= 1) {
          let values = this.selectProductAttr[0].values;
          for (let i = 0; i < values.length; i++) {
            let pic=null;
            if(this.isEdit){
              //编辑状态下获取图片
              pic=this.getProductSkuPic(values[i]);
            }
            this.selectProductAttrPics.push({name: values[i], pic: pic})
          }
        }
      },
      //获取商品相关属性的图片
      getProductSkuPic(name){
        for(let i=0;i<this.value.skuStockList.length;i++){
          let spData = JSON.parse(this.value.skuStockList[i].spData);
          if(name===spData[0].value){
            return this.value.skuStockList[i].pic;
          }
        }
        return null;
      },
      //合并商品属性
      mergeProductAttrValue() {
        this.value.productAttributeValueList = [];
        for (let i = 0; i < this.selectProductAttr.length; i++) {
          let attr = this.selectProductAttr[i];
          if (attr.handAddStatus === 1 && attr.options != null && attr.options.length > 0) {
            this.value.productAttributeValueList.push({
              productAttributeId: attr.id,
              value: this.getOptionStr(attr.options)
            });
          }
        }
        for (let i = 0; i < this.selectProductParam.length; i++) {
          let param = this.selectProductParam[i];
          this.value.productAttributeValueList.push({
            productAttributeId: param.id,
            value: param.value
          });
        }
      },
      //合并商品属性图片
      mergeProductAttrPics() {
        for (let i = 0; i < this.selectProductAttrPics.length; i++) {
          for (let j = 0; j < this.value.skuStockList.length; j++) {
            let spData = JSON.parse(this.value.skuStockList[j].spData);
            if (spData[0].value === this.selectProductAttrPics[i].name) {
              this.value.skuStockList[j].pic = this.selectProductAttrPics[i].pic;
            }
          }
        }
      },
      getOptionStr(arr) {
        let str = '';
        for (let i = 0; i < arr.length; i++) {
          str += arr[i];
          if (i != arr.length - 1) {
            str += ',';
          }
        }
        return str;
      },
      handleRemoveProductSku(index, row) {
        let list = this.value.skuStockList;
        if (list.length === 1) {
          list.pop();
        } else {
          list.splice(index, 1);
        }
      },
      getParamInputList(inputList) {
        return inputList.split(',');
      },*/
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
