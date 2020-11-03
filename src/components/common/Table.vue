<template>
  <v-data-table
    :headers="headers"
    :loading="loading"
    :items="items"
    :search="search"
    :item-key="items._id"
    :single-select="singleSelect"
    @click:row="rowSelect"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "Table",
  props: ["headers","loading","items","search"],

  data() {
      return {
          singleSelect: true,
      }
  },
  methods: {
    rowSelect(row) {
        this.$emit('rowSelect', row);
    }
  }
};
</script>

<style>
</style>