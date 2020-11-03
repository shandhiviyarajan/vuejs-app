<template>
  <v-app>
    <transition name="fade">
        <router-view /> 
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="sass">
@import './sass/app.scss'
</style>
