<template>
  <v-container :fluid="true" class="p-0">
    <notifications group="app" position="top right" />
    <Header />
    <v-row no-gutters>
      <v-col class="left-panel">
        <LeftNav />
      </v-col>
      <v-col class="right-panel">
        <slot />
      </v-col>
    </v-row>
    <Footer />
  </v-container>
</template>

<script>
import LeftNav from "@/components/navigations/";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    LeftNav,
    Header,
    Footer
  }
};
</script>
