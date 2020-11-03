<template>
  <DefaultLayout>
    <v-layout flex justify-space-between align-center class="v-page-title">
      <div class="page-title">
        <h2>{{ $t("settings.languageSelect") }}</h2>
      </div>
    </v-layout>

    <v-row no-gutters>
      <v-col cols="12" md="12" sm="12">
        <div v-if="changing">
          <p class="m-0">
            {{ $t("language.progress_message") }}
            <v-progress-circular
              :width="2"
              :size="24"
              color="warning"
              indeterminate
            ></v-progress-circular>
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="4" sm="8">
        <div class="v-custom-select">
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
              {{ language.name }}
            </option>
          </select>
        </div>
      </v-col>
    </v-row>


    
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "Settings",
  components: {
    DefaultLayout
  },
  data: () => {
    return {
      changing: false,
      selected_language: localStorage.getItem("active_language") || "en"
    };
  },
  computed: {
    ...mapGetters("language", ["all_languages"])
  },
  methods: {
    ...mapActions("language", ["switch_language"]),
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
