<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-badge color="orange" content="4">
          <i class="fa fa-bell-o" aria-hidden="true"></i>
        </v-badge>
      </v-btn>
    </template>
    <v-list class="v-notification">
      <div class="v-notification__title">
        <h3>
          {{ $t("notification.title") }}
        </h3>
        <a href="#">Mark all read</a>
      </div>
      <v-list-item v-for="n in parseInt(4)" :key="n">
        <v-list-item-title>
          <div class="v-notification__item">
            <figure>
              <img src="/user.png" alt />
            </figure>
            <p>
              Mark added new location "colombo " to the system
              <span>11 min ago</span>
            </p>
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: `Notifications`
};
</script>