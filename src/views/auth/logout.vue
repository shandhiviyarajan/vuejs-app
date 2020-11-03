<template> </template>

<script>
import { mapActions } from "vuex";

export default {
  name: `Logout`,

  data() {
    return {};
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions("auth", ["logout"])
  }
};
</script>
