<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" class="btn-profile">
        <v-avatar size="44" v-if="user.image">
          <img :src="user.image" alt="" />
        </v-avatar>
        <i v-else class="fa fa-user-o" aria-hidden="true"></i>
      </v-btn>
    </template>
    <v-list class="v-profile">
      <v-list-item>
        <v-list-item-title>
          <div class="v-profile__avatar">
            <v-avatar size="64" v-if="user.image">
              <img :src="user.image" alt="" />
            </v-avatar>
            <div>
              <h3>
                {{ user.name ? user.name : "" }}
              </h3>
              <v-chip color="orange" small text-color="white">
                {{ user.userType ? user.userType : "" }}
              </v-chip>
              <a :href="'mailto:' + user.email">
                {{ user.email ? user.email : "" }}
              </a>
            </div>
          </div>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item to="/settings/language-settings">
        <v-list-item-title>{{ $t("profile.settings") }}</v-list-item-title>
      </v-list-item>
      <v-list-item to="/settings/profile">
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>

      <v-list-item to="/logout">
        <v-list-item-title>{{
          $t("profile.logout")
        }}</v-list-item-title> </v-list-item
      >>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: `Profile`,

  computed: {
    ...mapGetters("auth", ["user"])
  },
  mounted() {
    this.me();
  },
  methods: {
    ...mapActions("auth", ["me"])
  }
};
</script>