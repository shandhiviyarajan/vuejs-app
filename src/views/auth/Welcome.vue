<template>
  <v-layout
    style="background:url('/assets/bg.jpg') center center no-repeat; background-size:contain;"
  >
    <notifications group="auth" position="top center" />
    <div class="v-welcome">
      <div>
        <h1>{{ $t("welcome.title") }}</h1>

        <p>
          {{ $t("welcome.desc") }}
        </p>

        <v-btn :loading="progress" @click="redirectTo(myProfile)">
          {{ $t("buttons.go") }}
        </v-btn>
      </div>
    </div>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Welcome",
  data() {
    return {
      progress: false
    };
  },
  computed: {
    ...mapGetters("auth", ["myProfile"])
  },

  methods: {
    ...mapActions("auth", ["logout", "me"]),
    redirectTo(profile) {
      this.progress = true;
      //incase user refreshed the welcome screen
      if (profile.userType == undefined) {
        this.me().then(response => {
          this.switchUser(response.data.data.userType);
        });
      } else {
        this.switchUser(profile.userType);
      }
    },
    //swith users
    switchUser(userType) {
      switch (userType) {
        case "ADMIN":
          this.redirect("Admin");
          break;

          case "SUPER_ADMIN":
          this.redirect("Admin");
          break;

        case "MERCHANT":
          this.redirect("Merchant");
          break;

        case "TECHNICIAN":
          this.redirect("Technician");
          break;
      }
    },

    //router redirect
    redirect(type) {
      this.$router.push({
        name: type
      });
     
    }
  }
};
</script>
