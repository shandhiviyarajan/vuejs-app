<template>
  <header>
    <v-row no-gutters>
      <v-col cols="12" md="2">
        <Logo />
      </v-col>
      <v-col cols="12" md="8">
        <div class="header_search"></div>
      </v-col>
      <v-col cols="12" md="2">
        <div class="d-flex justify-end header_actions">
          <Notification />
          <Profile />
        </div>
      </v-col>
    </v-row>
  </header>
</template>


<script>
import Logo from "@/components/common/Brand.vue";
import Notification from "@/components/notification/";
import Profile from "@/components/profile/";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  components: {
    Logo,
    Notification,
    Profile
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user"])
  }
};
</script>





