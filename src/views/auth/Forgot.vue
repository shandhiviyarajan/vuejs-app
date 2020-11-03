<template>
  <AuthLayout>
    <v-card class="v-card-forgot" :loading="false" elavation="0">
      <v-form v-model="valid">
        <div class="v-card-body pa-4">
          <v-card-title class="text-left">
            {{ $t("forgot.title") }}
            <span>
              {{ $t("forgot.desc") }}
            </span>
          </v-card-title>

          <v-text-field
            v-model="form.email"
            required
            :rules="emailRules"
            :placeholder="$t('forgot.enterEmail')"
          ></v-text-field>
        </div>

        <v-btn :loading="loading" @click="forgot($event)" :disabled="!valid">{{
          $t("buttons.continue")
        }}</v-btn>
      </v-form>
    </v-card>
  </AuthLayout>
</template>

<script>
import { mapActions } from "vuex";
import AuthLayout from "@/layouts/auth";
export default {
  name: `Forgot`,
  components: {
    AuthLayout
  },
  data() {
    return {
      valid: false,
      form: { email: "" },
      emailRules: [
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          this.$t("error.invalid_email_message")
      ]
    };
  },
  computed: {
    loading: function() {
      return this.$store.getters["auth/loader"];
    }
  },
  methods: {
    ...mapActions("auth", ["forgetPassword"]),
    forgot(e) {
      e.preventDefault();

      this.forgetPassword(this.form);
    }
  }
};
</script>
