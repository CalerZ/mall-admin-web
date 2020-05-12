<template> 
  <el-card class="form-container" shadow="never">
   <!-- <div style="width: 50%;margin: 0 auto;">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写申请单信息"></el-step>
        <el-step title="增加物品"></el-step>
      </el-steps>
    </div>-->
<!--    <application-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep">
    </application-info-detail>-->

    <application-product-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @finishAdd="finishAdd"
      @finishCommit="finishCommit"
      @prevStep="prevStep"
     >
    </application-product-detail>
  </el-card>
</template>
<script>
  import ApplicationInfoDetail from './ApplicationInfoDetail';
  import ApplicationProductDetail from './ApplicationProductDetail';
  import {createApplication, updateApplication,getApplication,finishApplication} from '@/api/application';

  const defaultProductParam = {

    applicationForm:{

      id            :null ,//
      formCode     :null ,//  单据号
      applyCompany :null ,//  申请公司
      applyStatus  :null ,//  申请状态
      applyOn      :null ,//  申请人
      applyTime    :null ,//  申请时间
      approver      :null ,//  批准人
      description:null
    },
    applicationProducts: [],

  };
  export default {
    name: 'ApplicationDetail',
    components: {ApplicationInfoDetail, ApplicationProductDetail},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false, false, false],
        applicationProduct: {
          id                   :null,//
          productId           :null,//  物品id
          productCode         :null,//  物品编码
          type1               :null,//  一级类型
          type2               :null,//  二级类型
          productName         :null,//  物品名称
          mainid               :null,//  申请单id
          description          :null,//  物品描述
          specifications       :null,//  规格
          unit                 :null,//  单位
          price                :null,//  价格
          standard             :null,//  标准
          supplierId          :null,//  供应商
          safetyStock         :null,//  安全库存
          lastMonthQuantity  :null,//  上月数量
          onHandInventory    :null,//  现有库存
          reportedQuantity    :null,//  现有库存
          sort                 :null,//  排序
          note                 :null,//  备注
          STATUS               :null,//  状态
          isDelete            :null,//  是否删除
          recordTime          :null,//  录入时间
          recordOn            :null,//  录入人
          modifyTime          :null,//  修改时间
          modifyOn            :null,//  修改人
          purchaseMethod      :null,//  采购方式
          prodLineMembers    :null,//  生产线人数
        }
      }
    },
    created() {
      if (this.isEdit) {
        getApplication(this.$route.query.id).then(response => {
          this.productParam = response.data;
        });
      }else {
        this.productParam=Object.assign({}, defaultProductParam)
      }
    },
    methods: {

      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      finishCommit() {
        this.$confirm('是否要提交该申请单', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            finishApplication(this.productParam).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功',
                duration: 1000
              });
              this.$router.back();
            });
        })
      },


    }
  }
</script>
<style scoped>
  .form-container {
    width: 1200px;
  }
</style>


