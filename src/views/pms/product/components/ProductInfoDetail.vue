<template>
    <div style="margin-top: 50px">
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
                this.$emit('nextStep');
            }
        }
    }
</script>
<style scoped>
</style>
