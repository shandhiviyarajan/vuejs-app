<template>
  <AuthLayout>
    <v-card elevation="0">
      <v-card-title>
        {{ $t("reset.reset_password") }}
        <small>{{ $t("reset.enter_password") }}</small>
      </v-card-title>
      <v-form>
        <v-text-field
          hide-details="true"
          disabled
          type="hidden"
          v-model="form.email"
          required
          :placeholder="$t('signup.email')"
        ></v-text-field>

        <v-text-field
          hide-details="true"
          type="number"
          v-model="form.confirmationCode"
          required
          :placeholder="$t('reset.verification_code')"
        ></v-text-field>

        <v-text-field
          hide-details="true"
          type="password"
          v-model="form.password"
          required
          :placeholder="$t('reset.new_password')"
        ></v-text-field>

        <v-text-field
          hide-details="true"
          type="password"
          v-model="confirm_password"
          required
          :placeholder="$t('reset.confirm_password')"
        ></v-text-field>

        <v-card-actions>
          <v-btn :loading="loader" @click="reset_password">{{
            $t("buttons.reset")
          }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </AuthLayout>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
import AuthLayout from "@/layouts/auth";

export default {
  name: `Reset`,
  components: {
    AuthLayout
  },
  beforeRouteEnter(to, from, next) {
    to.query.email == undefined || to.query.email == ""
      ? next("/login")
      : next();
  },
  data() {
    return {
      confirm_password: "",
      form: {
        email: "",
        confirmationCode: "",
        password: ""
      }
    };
  },

  computed: {
    //get loader and user email
    ...mapGetters("auth", ["loader"])
  },
  methods: {
    ...mapActions("auth", ["resetPassword"]),
    rules() {
      if (this.form.confirmationCode == "") {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.empty_verification_code")
        });
        return false;
      } else if (this.form.password == "" || this.confirm_password == "") {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.empty_password")
        });
        return false;
      } else if (this.form.password !== this.confirm_password) {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.password_not_match")
        });
        return false;
      } else {
        return true;
      }
    },
    //reset password submit
    reset_password() {
      if (this.rules()) {
        this.form = {
          email: this.form.email,
          //Send the confirmation code as integer
          confirmationCode: parseInt(this.form.confirmationCode),
          password: this.form.password
        };
        this.resetPassword(this.form);
      }
    }
  },

  mounted() {
    this.form.email = this.$route.query.email;
    this.$notify({
      group: "auth",
      type: "success",
      title: this.$t("reset.email_sent") + " " + this.$route.query.email,
      duration: -1
    });
  }
};
</script>
