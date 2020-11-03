<template>
  <section>
    <notifications group="auth" position="top center" />
    <header class="auth_header">
      <router-link :class="signin ? '' : 'hide'" to="/login">
        {{ $t("buttons.signin") }}
      </router-link>
    </header>
    <v-row justify="center" id="auth_form">
      <v-col cols="12" sm="5" md="3">
        <!-- view slots -->
        <slot />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      signin: true,
      signup: false
    };
  },
  created() {
    if (this.$route.name == "Login" || this.$route.name == "Home") {
      this.signin = false;
    }
    if (this.$route.name == "Register") {
      this.signup = false;
    }
  }
};
</script>
