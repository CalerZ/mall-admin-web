<template> 
  <purchase-method-detail :is-edit='false'></purchase-method-detail>
</template>
<script>
  import PurchaseMethodDetail from './components/PurchaseMethodDetail'
  export default {
    name: 'addPurchaseMethod',
    components: { PurchaseMethodDetail }
  }
</script>
<style>
</style>


