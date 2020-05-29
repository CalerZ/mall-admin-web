<template>
  <div style="margin-top: 20px;width: 100%">
    <el-form :model="value" ref="productInfoForm" label-width="120px" style="width: 100%" size="small">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>物品条目</span>
        <el-button
          class="btn-add"
          @click="handleDelProduct()"
          size="mini">
          删除
        </el-button>
        <el-button
          class="btn-add"
          @click="handleAddProduct()"
          size="mini">
          添加
        </el-button>
      </el-card>
      <div class="table-container">
        <el-table ref="productTable"
                  :data="value.applicationProducts"
                  @selection-change="handleSelectionChange"
                  style="width: 100% ;line-height: 15px"
                  v-loading="listLoading"
                  :cell-class-name="tableRowClassName"
                  :header-cell-class-name="tableHeaderClassName"
                  :fit='true'
                  border>
          <el-table-column fixed type="selection" width="60" align="center"></el-table-column>
          <el-table-column fixed type="index" width="60" label="序号" align="center"></el-table-column>
          <el-table-column fixed show-overflow-tooltip="true" label="物料编号" width="200" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed show-overflow-tooltip="true" label="物料名称" width="150" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip="true" label="类型" align="center" width="150">
            <template slot-scope="scope">
             {{ scope.row.productType1.typeName   }} >{{ scope.row.productType2!=null?scope.row.productType2.typeName :"" }}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip="true" label="规格" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.specifications}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip="true" label="标准" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.standard}}</span>
            </template>
          </el-table-column>
          <el-table-column label="价格" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.productUtil.utilName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="安全库存" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.stock.safetyStock}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上月数量" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.stock.lastMonthQuantity}}</span>
            </template>
          </el-table-column>
          <el-table-column label="现有库存" width="120" align="center">
            <template slot-scope="scope">
              <div class="input-box">
                <el-input size="small" v-model="scope.row.stock.onHandInventory"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="报告数量" width="120" align="center">
            <template slot-scope="scope">
              <div class="input-box">
                <el-input size="small" v-model="scope.row.stock.reportedQuantity"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="生产线人数" width="120" align="center">
            <template slot-scope="scope">
              <div class="input-box">
                <el-input size="small" v-model="scope.row.stock.prodLineMembers"></el-input>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <el-dialog title="物品列表"
                 :visible.sync="dialogTableVisible"
                 custom-class="dialog-css"
                 width="80%"
                 lock-scroll
                 :custom-class="dialogCustmerClass"
                 height="60%">
        <product-view-list ref="procedureEdit" :view="true" @selectProduct="handleOk"></product-view-list>
        <el-row align="center">
          <el-button type="primary" @click="handleOk" size="small" plain>确定</el-button>
          <el-button size="small" @click="handleCancel" plain>取消</el-button>
        </el-row>
      </el-dialog>

      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写申请信息</el-button>
        <el-button size="medium" @click="handleAddApplication('productInfoForm')">保存申请单</el-button>
        <el-button type="primary" size="medium" @click="handleSubmitApplicaton('productInfoForm')">提交申请单</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {fetchAllList as fetchProductUtilList} from '@/api/util'
  import {fetchAllList as fetchProductTypeList} from '@/api/productType'
  import {getApplicationProductList} from '@/api/product'
  import {fetchAllList as getAllProductType} from "@/api/productType";


  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import Tinymce from '@/components/Tinymce'
  import productList from '@/views/pms/product/index';
  import ProductViewList from "../productViewList";
  import {fetchAllList as getAllProductUtil } from "@/api/productUtil";

  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 10,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  let than;
  export default {
    name: "ApplicationProductDetail",
    components: {ProductViewList, SingleUpload, MultiUpload, Tinymce, productList},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {

      return {
        tableHeaderClassName:'el-table-header-customer',
        tableRowClassName:'el-table-column-customer',
        keyword: null,
        productUtilList:[],
        listQuery: Object.assign({}, defaultListQuery),
        dialogTableVisible: false,
        isShow: false,
        productcode: null,
        list: [{}],
        listLoading: false,
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
        applicationProduct: {
          id: null,//
          productId: null,//  物品id
          productCode: null,//  物品编码
          type1: null,//  一级类型
          type2: null,//  二级类型
          productName: null,//  物品名称
          mainid: null,//  申请单id
          description: null,//  物品描述
          specifications: null,//  规格
          unit: null,//  单位
          price: null,//  价格
          standard: null,//  标准
          supplierId: null,//  供应商
          safetyStock: null,//  安全库存
          lastMonthQuantity: null,//  上月数量
          onHandInventory: null,//  现有库存
          reportedQuantity: null,//  现有库存
          sort: null,//  排序
          note: null,//  备注
          STATUS: null,//  状态
          isDelete: null,//  是否删除
          recordTime: null,//  录入时间
          recordOn: null,//  录入人
          modifyTime: null,//  修改时间
          modifyOn: null,//  修改人
          purchaseMethod: null,//  采购方式
          prodLineMembers: null,//  生产线人数
        },
        multipleSelection: [],
        applicationProducts: [],
        dialogCustmerClass:'apd-el-dialog__body'
      }

    },

    created() {
      //编辑时需要初始化list中的数据

      if (this.isEdit) {

      }else{

        this.value.applicationProducts = [];
      }
      // this.getProductType();
      // this.getProductUtil();
    },

    filters: {
    /*  getProductTypeName(typeId) {
        let typename = "";
        if (than.productTypeList != null && than.productTypeList.length > 0) {
          than.productTypeList.forEach(item => {
            if (item.id == typeId) {
              typename = item.typeName
            }
          })
        }
        return typename;
      }*/
    },
    methods: {
      getProductType() {
        getAllProductType().then(response => {
          response.data.forEach(item=>{this.productTypeList[item.id]=item.typeName})
        })
      },
      getProductUtil() {
        getAllProductUtil().then(response => {
          response.data.forEach(item=>{this.productUtilList[item.id]=item.utilName})
        })
      },
      handleCancel(){
        this.dialogTableVisible = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //选择物品时点击确定按钮,把选中的行传给申请单物料列表
      handleOk() {
        this.products = this.$refs['procedureEdit'].getVal();
        //根据ids查询物品详情对象,封装成一个list然后返回给前台，存入list中即可
        let productIdList = [];
        this.products.forEach(item => productIdList.push(item.id));
        getApplicationProductList(productIdList).then(response => {//返回一个列表
          // this.value.applicationProducts = response.data;
          response.data.forEach(item=>{
            // this.value.applicationProducts.forEach(t=>{
            //   if(t.code==item.code)
            //
            // })



            // let applicationProduct ={
            //      id: item.id,//
            //     productId: item.id,//  物品id
            //     productCode: item.code,//  物品编码
            //     type1: item.productType1.id,//  一级类型
            //     type2: item.productType2.id,//  二级类型
            //     productName: item.name,//  物品名称
            //     mainid: null,//  申请单id
            //     description: item.description,//  物品描述
            //     specifications: item.specifications,//  规格
            //     unit: item.productUtil.id,//  单位
            //     price: item.price,//  价格
            //     standard: item.standard,//  标准
            //     supplierId: null,//  供应商
            //     safetyStock: item.stock.safetyStock,//  安全库存
            //     lastMonthQuantity: item.stock.lastMonthQuantity,//  上月数量
            //     onHandInventory: item.stock.onHandInventory,//  现有库存
            //     reportedQuantity: item.stock.reportedQuantity,//  现有库存
            //     sort: null,//  排序
            //     note: item.note,//  备注
            //     STATUS: item.status,//  状态
            //     isDelete: item.isDelete,//  是否删除
            //     recordTime: null,//  录入时间
            //     recordOn: null,//  录入人
            //     modifyTime: null,//  修改时间
            //     modifyOn: null,//  修改人
            //     purchaseMethod: null,//  采购方式
            //     prodLineMembers: item.stock.prodLineMembers,//  生产线人数
            // }
            this.value.applicationProducts.push(item)

          })
          this.dialogTableVisible = false;
        })
      },
      //input失去焦点
      handleSelectProduct() {
        this.isShow = true;

      },

      handleDelProduct() {
        console.log(this.multipleSelection);
        this.multipleSelection.forEach(pid => {
          let index = this.value.applicationProducts.findIndex(item => item.productId == pid.productId);
          this.value.applicationProducts.splice(index, 1)
        })
      },
      handleAddProduct() {
        this.dialogTableVisible = true;
      },
      //表单验证并保存申请单
      handleAddApplication(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.value.applicationProducts.length>0){
              this.$emit('finishAdd');
            }else{
              this.$message({
                message: '请添加物品！',
                type: 'error',
                duration: 1000
              });
              return false;
            }
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        })
      },
      //表单验证并提交审核
      handleSubmitApplicaton(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('finishCommit');
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
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .apd-el-dialog__body{
    padding: 10px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
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

  .tb-edit .input-box {
    display: none
  }

  .tb-edit .current-cell .input-box {
    display: block;
    margin-left: -15px;
  }
</style>
