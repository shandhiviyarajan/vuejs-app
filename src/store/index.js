import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import language from "./modules/language";
import notification from "./modules/notification";
import stations from "./modules/stations";
import users from "./modules/users";
import roles from "./modules/roles";
import loaders from "./modules/loaders";
import permission from "@/store/modules/permission";
import locations from "@/store/modules/locations";
import powerbanks from "@/store/modules/powerbanks";
import accounts from "@/store/modules/accounts";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
    users,
    roles,
    language,
    permission,
    powerbanks,
    stations,
    notification,
    loaders,
    locations,
    accounts
  },
});

