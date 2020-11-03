<template>
  <div>
    <v-list class="list-top">
      <v-list-group
        :value="activeGroup(group.name)"
        v-for="(group, index) in nav"
        :key="index"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              <!-- fix for user role group name -->
              {{ group.name=='roles' ? $t("navigation.roles_permissions"): group.name }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          :to="item.to"
          v-for="(item, index) in group.items"
          :key="index"
          :class="activeLink(item.name)"
        >
           <!-- fix for end-user item name -->
          {{ item.name == "End-user" ? "End Users" : item.name }}
        </v-list-item>
      </v-list-group>

      <v-list-group :value="activeGroup('equipments')">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.equipments") }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          :class="activeLink('Stations')"
          to="/equipments/stations"
          >{{ $t("navigation.stations") }}</v-list-item>
        <v-list-item
          :class="activeLink('Powerbanks')"
          to="/equipments/powerbanks"
          >{{ $t("navigation.powerbanks") }}</v-list-item>
      </v-list-group>
      <v-list-group :value="activeGroup('support')">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.support") }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item :class="activeLink('FAQs')" to="/support/faqs">{{
          $t("navigation.faq")
        }}</v-list-item>
        <v-list-item
          :class="activeLink('SupportRequest')"
          to="/support/support-request"
          >{{ $t("navigation.supportRequest") }}</v-list-item
        >
      </v-list-group>
    </v-list>

    <v-list class="list-bottom">
      <v-list-group :value="activeGroup('settings')">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.settings") }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          :class="activeLink('FAQs')"
          to="/settings/language-settings"
          >Language Settings</v-list-item
        >
        <v-list-item :class="activeLink('FAQs')" to="/settings/profile"
          >Profile</v-list-item
        >
        <v-list-item :class="activeLink('FAQs')" to="/settings/terms-conditions"
          >Terms & Conditions</v-list-item
        >
        <v-list-item :class="activeLink('About')" to="/settings/about-us"
          >About Us</v-list-item
        >
      </v-list-group>
      <v-list-item v-if="isAuthenticated" to="/logout">
        {{ $t("navigation.logout") }}
      </v-list-item>
    </v-list>
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "AdminNav",

  data() {
    return {
      active_group: true,
      nav: [
        {
          name: "income",
          items: [
            {
              name: "Revenue",
              to: "/income/revenue"
            },
            {
              name: "Withdraw",
              to: "/income/withdraw"
            }
          ]
        },
        {
          name: "payments",
          items: [
          
            {
              to: "/payments/refund",
              name: "Refund"
            }
          ]
        },
        {
          name: "users",
          items: [
            { to: "/users/admin", name: "Admins" },
            { to: "/users/merchants", name: "Merchants" },
            { to: "/users/technicians", name: "Technician" },
            { to: "/users/users", name: "End-user" }
          ]
        },
        {
          name: 'roles',
          items: [
            {
              name: this.$i18n.t("navigation.roles"),
              to: "/roles/user_roles"
            }
          ]
        }
      ]
    };
  },

  computed: {
    isAuthenticated() {
      return mapState("auth", ["isAuthenticated"]);
    },
    allRoutes() {
      return this.$router;
    }
  },

  methods: {
    linked(e) {
      this.$router.push({ name: e });
    },

    activeLink(e) {
      if (e == this.$route.name) {
        return true;
      } else {
        return false;
      }
    },
    activeGroup(path) {
      return this.$router.currentRoute.path.indexOf(path) > -1;
    }
  },

  mounted() {
    this.activeLink();
  }
};
</script>
