<template> 
  <application-detail :is-edit='true'></application-detail>
</template>
<script>
  import ApplicationDetail from './components/ApplicationDetail'
  export default {
    name: 'updateReviewedApplication',
    components: { ApplicationDetail }
  }
</script>
<style>
</style>
