<template>
  <AuthLayout>
    <v-card elevation="0" class="pa-4">
      <v-card-title>
        {{ $t("signup.title") }}
        <small>
          {{ $t("signup.desc") }}
        </small>
      </v-card-title>
      <v-form ref="form">
        <v-text-field
          hide-details="true"
          v-model="form.name"
          required
          v-bind:placeholder="$t('signup.name')"
        ></v-text-field>

        <v-text-field
          hide-details="true"
          v-model="form.email"
          required
          v-bind:placeholder="$t('signup.email')"
        ></v-text-field>

        <v-text-field
          hide-details="true"
          type="password"
          v-model="form.password"
          required
          v-bind:placeholder="$t('signup.password')"
        ></v-text-field>

        <div>
          <v-checkbox
            :ripple="false"
            v-model="form.agree"
            :label="$t('signup.agreeTerms')"
          ></v-checkbox>
        </div>

        <v-card-actions>
          <v-btn :loading="loading" @click="register($event)">
            {{ $t("buttons.register") }}
          </v-btn>
        </v-card-actions>
      </v-form>
      <p>{{ $t("signup.signUpUsing") }}</p>
    </v-card>
  </AuthLayout>
</template>

<script>
import { mapActions } from "vuex";
import AuthLayout from "@/layouts/auth";
export default {
  name: "Register",
  components: {
    AuthLayout
  },
  data: () => ({
    valid: true,

    form: {
      name: "",
      email: "",
      password: "",
      userType: "Admin"
    }
  }),
  computed: {
    loading: function() {
      return this.$store.getters["auth/loader"];
    }
  },
  methods: {
    ...mapActions("auth", ["createUser"]),

    rules() {
      var email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.form.name == "") {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.empty_name"),
          text: this.$t("error.empty_name_message")
        });
        return false;
      } else if (this.form.email == "") {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.empty_email"),
          text: this.$t("error.empty_email_message")
        });
        return false;
      } else if (!email_regex.test(this.form.email)) {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.invalid_email"),
          text: this.$t("error.invalid_email_message")
        });
        return false;
      } else if (this.form.password == "") {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.empty_password"),
          text: this.$t("error.empty_password_message")
        });
        return false;
      } else {
        return true;
      }
    },

    //Creating user
    register(e) {
      e.preventDefault();
      if (this.rules()) {
        this.createUser(this.form);
      }
    }
  }
};
</script>
