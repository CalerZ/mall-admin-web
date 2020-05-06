<template> 
  <purchase-method-detail :is-edit='true'></purchase-method-detail>
</template>
<script>
  import PurchaseMethodDetail from './components/PurchaseMethodDetail'
  export default {
    name: 'updatePurchaseMethod',
    components: { PurchaseMethodDetail }
  }
</script>
<style>
</style>


