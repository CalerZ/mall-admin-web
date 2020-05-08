<template> 
  <supplier-detail :is-edit='true'></supplier-detail>
</template>
<script>
  import SupplierDetail from './components/SupplierDetail'
  export default {
    name: 'updateSupplier',
    components: { SupplierDetail }
  }
</script>
<style>
</style>


