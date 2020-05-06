<template> 
  <application-detail :is-edit='false'></application-detail>
</template>
<script>
  import ApplicationDetail from './components/ApplicationDetail'
  export default {
    name: 'addApplication',
    components: { ApplicationDetail }
  }
</script>
<style>
</style>
