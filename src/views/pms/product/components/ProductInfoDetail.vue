<template>
  <div style="margin-top: 50px;margin-left: 80px">
    <el-tree
      :data="menuTreeList"
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      @node-click="handleNext">
    </el-tree>
  </div>
</template>
<script>
  import {fetchTreeList} from '@/api/productType';
  import {partNo } from '@/api/product'
  export default {
    name: "ProductInfoDetail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

        menuTreeList: [],
        defaultProps: {
          children: 'children',
          label: 'typeName'
        },
        hasEditCreated: false,

      };
    },
    created() {
      this.treeList();
    },
    methods: {

      //重置表单
      resetForm(formName) {
       // this.$refs[formName].resetFields();
      },
      treeList() {
        fetchTreeList().then(response => {
          this.menuTreeList = response.data;
          console.log(response.data)
        });
      },
      //处理编辑逻辑
      handleEditCreated() {
        if (this.value.productCategoryId != null) {
          this.selectProductCateValue.push(this.value.cateParentId);
          this.selectProductCateValue.push(this.value.productCategoryId);
        }
        this.hasEditCreated = true;
      },
      handleNext(data, node, nodec) {
        //获取选中分类值
        this.value.product.type1 = data.pId;
        this.value.product.type2 = data.id;
        this.getPartNo();
        this.$emit('nextStep');
      },
      getPartNo() {
        partNo({type1: this.value.product.type1, type2: this.value.product.type2}).then(response => {
          this.value.product.code = response.data;
        })
      },
    }
  }
</script>
<style scoped>
</style>
