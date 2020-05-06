
<template>
  <div>
    <iframe src="http://127.0.0.1:8088/sys/dataBase" ref="database" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;    height: 800px;width: 97%;"></iframe>
  </div>
</template>
<script>
  export default {
    name:"database",
    data () {
      return {
        token:null,
        url:null,
      }
    },
    created() {
      this.token=this.$store.getters.token;
      this.url="http://127.0.0.1:8088/sys/dataBase?token="+this.token;
    },
    mounted(){
      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe(){
        const mobsf = document.getElementById('mobsf');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight)-80) + 'px'; //数字是页面布局高度差
      }

    },
  }
</script>
