<template>
  
</template>

<script>
export default {
  name: `VueTitle`,
  props: {
    title:String,
    required:true
  },
  data(){
      return{
          base_title:'ZE Power '
      }
  },
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.base_title;
      }
    }
  }
};
</script>