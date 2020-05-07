<template> 
  <supplier-detail :is-edit='false'></supplier-detail>
</template>
<script>
  import SupplierDetail from './components/SupplierDetail'
  export default {
    name: 'addSupplier',
    components: { SupplierDetail }
  }
</script>
<style>
</style>


