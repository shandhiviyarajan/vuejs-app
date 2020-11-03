<template>
  <div class="v-custom-search">
    <v-autocomplete
      v-model="select"
      :search-input.sync="search"
      item-value
      cache-items
      flat
      hide-no-data
      hide-selected
      append-icon
      :placeholder="placeholder"
    ></v-autocomplete>
    <v-btn icon @click="searchClear">
      <i class="fa fa-close" v-if="search != null"></i>
      <i class="fa fa-search" v-else></i>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "SearchComp",
  props: ["select","placeholder"],
  data() {
    return {
      search: null
    };
  },
  watch: {
    search(val) {
      if (val == "") {
        this.searchClear();
      } else {
        val && val !== this.select && this.qSelections(val);
      }
    }
  },

  methods: {
    searchClear() {
      this.$emit("searchClear");
    },
    qSelections(value) {
        this.$emit('qSelections',value);
    }
  }
};
</script>