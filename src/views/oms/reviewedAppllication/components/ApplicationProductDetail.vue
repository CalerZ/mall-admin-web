<template>
  <div>
    <el-form :model="value" ref="productInfoForm" label-width="120px" style="width: 100%" size="small">
      <application-info-detail
        v-model="value"
      >
      </application-info-detail>
      <div class="table-container">
        <el-table ref="productTable"
                  :data="value.applicationProducts"
                  @selection-change="handleSelectionChange"
                  style="width: 100% ;line-height: 13px"
                  v-loading="listLoading"
                  :cell-class-name="tableRowClassName"
                  :header-cell-class-name="tableHeaderClassName"
                  :fit="true"
                  border>
          <el-table-column fixed type="selection" width="60" align="center"></el-table-column>
          <el-table-column fixed type="index" width="60" label="序号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip="true" fixed label="编号" width="200" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.code}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip="true" fixed label="商品名称" width="150" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed label="状态" width="150" align="center">
            <template slot-scope="scope">
              {{scope.row.status|verifyStatusFilter}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip="true" label="类型" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.productType1.typeName}} > {{scope.row.productType2.typeName}}</span>
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
              <span>{{scope.row.stock.onHandInventory}}</span>
            </template>
          </el-table-column>
          <el-table-column label="报告数量" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.stock.reportedQuantity}}</span>
            </template>
          </el-table-column>
          <el-table-column label="生产线人数" width="120" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.stock.prodLineMembers}}</span>
            </template>
          </el-table-column>
          <el-table-column label="供应商" width="153" align="center">
<!--              <div class="input-box">
                 <el-input size="small" v-model="scope.row.purchaseMethod.id"></el-input>
               </div>-->
               <template slot-scope="scope">
                 <el-select
                   v-model="scope.row.supplierId"
                   placeholder="请选择供应商">
                   <el-option
                     v-for="item in scope.row.supplierList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
                   </el-option>
                 </el-select>
               </template>
          </el-table-column>
          <el-table-column label="采购方式 " width="120" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.purchaseMethod.id"
                placeholder="请选择采购方式">
                <el-option
                  v-for="item in purchaseMethodList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>


          </el-table-column>
        </el-table>
      </div>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleSubmitApplicaton('productInfoForm')">提交审核</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {fetchAllList as fetchProductUtilList} from '@/api/productUtil'
  import {fetchAllList as fetchProductTypeList} from '@/api/productType'
  import {getApplicationProductList} from '@/api/product'
  import {fetchPurchaseMethodList} from '@/api/product'

  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import Tinymce from '@/components/Tinymce'
  import productList from '@/views/pms/product/index';
  import ApplicationInfoDetail from './ApplicationInfoDetail';

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
    components: {ApplicationInfoDetail, SingleUpload, MultiUpload, Tinymce, productList},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {

      return {
        keyword: null,
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
        purchaseMethodList: [],
        supplierList: [1,2,3],
        tableHeaderClassName:'el-table-header-customer',
        tableRowClassName:'el-table-column-customer',
      }
    },

    created() {
      //编辑时需要初始化list中的数据
      this.value.applicationProducts = [];
      this.getPurchaseMethodList();
      if(isEdit){
        this.value.applicationProducts = this.value.applicationProducts.map(item=>{
          item.supplierId=null;
          return item;
        })
      }
    },

    filters: {
      verifyStatusFilter(value) {
        switch (value) {
          case 0:
            return '未审核'
          case 1:
            return '审核中'
          case 2:
            return '审核通过'
        }
      },
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
      //获取采购方式列表
      getPurchaseMethodList() {
        fetchPurchaseMethodList().then(response => {
          this.purchaseMethodList = response.data;
          this.purchaseMethodList.unshift({id: 0, name: "默认采购方式"})
        });
      },
      handleCancel() {
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
          this.value.applicationProducts = response.data;
          this.dialogTableVisible = false;
        })
      },
      //input失去焦点
      handleSelectProduct() {
        this.isShow = true;

      },

      handleDelProduct() {
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
            if (this.value.applicationProducts.length > 0) {
              this.$emit('finishAdd');
            } else {
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

      //单元格点击后，显示input，并让input 获取焦点
      handleCellClick: function (row, column, cell, event) {
        emptransfer.addClass(cell, 'current-cell');
        if (emptransfer.getChildElement(cell, 3) !== 0) {
          var _inputParentNode = emptransfer.getChildElement(cell, 3);
          if (_inputParentNode.hasChildNodes() && _inputParentNode.childNodes.length > 2) {
            var _inputNode = _inputParentNode.childNodes[2];
            if (_inputNode.tagName === 'INPUT') {
              _inputNode.focus();
            }
          }
        }
      },
      //input框失去焦点事件
      handleInputBlur: function (event) {   //当 input 失去焦点 时,input 切换为 span，并且让下方 表格消失（注意，与点击表格事件的执行顺序）
        var _event = event;
        setTimeout(function () {
          var _inputNode = _event.target;
          if (emptransfer.getParentElement(_inputNode, 4) !== 0) {
            var _cellNode = emptransfer.getParentElement(_inputNode, 4);
            emptransfer.removeClass(_cellNode, 'current-cell');
            emptransfer.removeClass(_cellNode, 'current-cell2');
          }
        }, 200);
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

  .tb-edit .input-box {
    display: none
  }

  .tb-edit .current-cell .input-box {
    display: block;
    margin-left: -15px;
  }
</style>
