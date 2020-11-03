import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";
import Notifications from 'vue-notification'
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTelInput from 'vue-tel-input'



Vue.use(vuetify);
Vue.use(VueTelInput);
Vue.use(Notifications);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCzATU_j6vWKfJth5gYzIXC_3XDXBrfFDY',
    libraries: 'places'
  }
  /**
   * Prod settings
   */
});
if (process.env.NODE_ENV === "production") {
  Vue.config.productionTip = true;
  Vue.config.performance = true;
};

Vue.prototype.$currency = {
  name:'Euro',
  symbol:'€'
}

/**
 * Set active lanuage
 */
let active_language = localStorage.getItem("active_language");
i18n.locale = active_language != "undefined" ? active_language : 'en'

/**
 * Create Vue instance
 */
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
