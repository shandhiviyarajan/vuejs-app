<template>
  <v-list class="list-bottom">
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t("navigation.settings") }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <v-list-item to="/language-settings">Language Settings</v-list-item>
      <v-list-item to="/profile">Profile</v-list-item>
      <v-list-item to="/terms-conditions">Terms & Conditions</v-list-item>
      <v-list-item to="/about-us">About Us</v-list-item>
    </v-list-group>
    <v-list-item v-if="isAuthenticated" to="/logout">
      {{ $t("navigation.logout") }}
    </v-list-item>
  </v-list>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "SettingsNav",
  computed: {
    isAuthenticated: function() {
      return mapState("auth", ["isAuthenticated"]);
    }
  },
  methods: {}
};
</script>
