<template>
  <v-pagination
    v-model="paginations.page"
    :length="paginations.limit"
    :total-visible="4"
    @input="input"
  ></v-pagination>
</template>
<script>
export default {
  name:'Paginations',
  props:["paginations"]
}
</script>