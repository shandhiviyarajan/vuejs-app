<template>
  <v-container :fluid="true" class="dashboard">
    <v-row no-gutters>
      <v-col cols="12">
        <Header />
        <slot />
        <Footer />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "DashboardLayout",
  components: {
    Header,
    Footer
  }
};
</script>
