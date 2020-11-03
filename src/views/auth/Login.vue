<template>
  <AuthLayout>
    <VueTitle :title="$t('login.signIn')" />
    <div class="v-custom-select">
      <div v-if="changing">
        <v-progress-circular
          :width="2"
          :size="24"
          color="warning"
          indeterminate
        ></v-progress-circular>
      </div>
      <select
        class="block"
        name
        id
        v-model="selected_language"
        @change="update_language"
      >
        <option
          v-for="language in all_languages"
          :key="language.key"
          :value="language.key"
        >
          {{ language.key.toUpperCase() }}
        </option>
      </select>
    </div>

    <v-card elevation="0" class="pa-4">
      <v-card-title>
        {{ $t("login.signIn") }}
        <small>
          {{ $t("login.welcome_back") }}
        </small>
      </v-card-title>
      <v-form @submit.prevent="submit">
        <v-text-field
          hide-details="true"
          v-model="form.email"
          :rules="emailRules"
          required
          :placeholder="$t('login.email')"
        ></v-text-field>

        <v-text-field
          hide-details="true"
          type="password"
          v-model="form.password"
          required
          :placeholder="$t('login.password')"
        ></v-text-field>

        <div class="is_remember">
          <input id="input_is_remember" type="checkbox" v-model="isRemember" />
          <label for="input_is_remember">{{ $t("login.keep_me_logged_in") }} </label>
          <!-- <v-checkbox
            :ripple="false"
            v-model="isRemember"
            :label="$t('login.keep_me_logged_in')"
          ></v-checkbox> -->
        </div>

        <v-card-actions>
          <v-btn type="submit" :loading="loader">
            {{ $t("buttons.login") }}
          </v-btn>
        </v-card-actions>

        <router-link to="/forgot">{{
          $t("login.forgot_password")
        }}</router-link>
      </v-form>
    </v-card>
  </AuthLayout>
</template>

<script>
import VueTitle from "@/components/common/Title";
import AuthLayout from "@/layouts/auth";
import { mapActions, mapState, mapGetters } from "vuex";
import { mixins } from "@/plugins/mixins";
export default {
  name: `Login`,
  mixins: [mixins],
  components: {
    AuthLayout,
    VueTitle
  },
  data() {
    return {
      agree: false,
      welcome: false,
      changing: false,
      selected_language: localStorage.getItem("active_language") || "en",
      isRemember: false,
      form: {
        email: "",
        password: ""
      },
      emailRules: [
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          this.$t("error.invalid_email_message")
      ]
    };
  },
  computed: {
    ...mapGetters("auth", ["loader"]),
    ...mapGetters("language", ["all_languages"])
  },
  methods: {
    ...mapActions("auth", ["LOGIN"]),
    ...mapActions("language", ["switch_language"]),

    rules() {
      var email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.form.email == "") {
        this.$notify({
          group: "auth",
          type: "error",
          title: this.$t("error.empty_email"),
          text: this.$t("error.empty_email_message")
        });
        return false;
      } else if (!this.validateEmail(this.form.email)) {
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

    submit(e) {
      let data = {
        form: this.form,
        isRemember: this.isRemember
      };
      if (this.rules()) {
        this.LOGIN(data);
      }
    },

    update_language() {
      this.changing = true;
      setTimeout(() => {
        this.switch_language(this.selected_language);
        this.changing = false;
      }, 1000);
    }
  }
};
</script>
