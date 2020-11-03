import Vue from "vue";
import VueRouter from "vue-router";

let lang_prefix = localStorage.getItem("active_language");
if (
  lang_prefix == null ||
  lang_prefix == "" ||
  lang_prefix == undefined ||
  lang_prefix == "undefined"
) {
  lang_prefix = "en";
}

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      requiresAuth: false
    }
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      requiresAuth: false
    }
  },

  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/auth/logout.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/forgot",
    name: "Forgot",
    component: () => import("@/views/auth/Forgot.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/reset",
    name: "Reset",
    component: () => import("@/views/auth/Reset.vue"),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: () => import("@/views/auth/Welcome.vue"),
    meta: {
      requiresAuth: true
    }
  },


  {
    path: "/roles/user_roles",
    name: "UserRoles",
    component: () => import("@/views/permissions/roles.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings/language-settings",
    name: "Settings",
    component: () => import("@/views/settings"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/auth/:provider/callback",
    component: {
      template: '<div class="auth-component"></div>'
    }
  },
  {
    path: "/users/admin",
    name: "Admin",
    component: () => import("@/views/admin/list.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/users/users",
    name: "End-user",
    component: () => import("@/views/users/list.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  

  {
    path: "/users/technicians",
    name: "Technician",
    component: () => import("@/views/technician/list.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/users/merchants",
    name: "Merchant",
    component: () => import("@/views/merchant/list.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/income/revenue",
    name: "Revenue",
    component: () => import("@/views/income/revenue_list.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/income/withdraw",
    name: "Withdraw",
    component: () => import("@/views/income/withdraw_list.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/settings/profile",
    name: "Profile",
    component: () => import("@/views/settings/profile.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/settings/terms-conditions",
    name: "TermsConditions",
    component: () => import("@/views/settings/terms_conditions.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/settings/about-us",
    name: "AboutUs",
    component: () => import("@/views/settings/about_us.vue"),
    children: [],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/equipments/stations",
    name: "Stations",
    component: () => import("@/views/stations/list.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/equipments/powerbanks",
    name: "Powerbanks",
    component: () => import("@/views/powerbanks/list.vue"),
    meta: {
      requiresAuth: true
    }
  },
  
  {
    path: "/locations",
    name: "Locations",
    component: () => import("@/views/locations/list.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/support/faqs",
    name: "FAQs",
    component: () => import("@/views/support/list.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/support/support-request",
    name: "SupportRequest",
    component: () => import("@/views/support/support_request.vue"),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/support/chat",
    name: "Chat",
    component: () => import("@/views/support/chat.vue"),
    meta: {
      requiresAuth: true
    }
  },



  {
    path: "/payments/refund",
    name: "Refund",
    component: () => import("@/views/payments/refund.vue"),
    meta: {
      requiresAuth: true
    }
  },

 

  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/Page_404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * Check Authenticated user
 */
function is_authenticated() {
  const token = localStorage.getItem("token");
  if (token == "null" || token == null || token == "") {
    return false;
  } else {
    return true;
  }
}
/**
 * Router Authentication Guard
 */
router.beforeEach((to, from, next) => {
  const withoutAuth = ["Login", "Forgot", "Reset"];
  if (withoutAuth.includes(to.name) || !to.meta.requiresAuth) {
    is_authenticated() ? next({ name: "Welcome" }) : next();
  } else {
    is_authenticated() ? next() : next({ name: "Login" });
  }
});
export default router;
