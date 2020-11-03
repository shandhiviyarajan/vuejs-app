<template>
  <DefaultLayout>
    <v-layout row wrap>
      <v-flex>
        <v-layout row wrap align-start justify-start>
          <div class="page-title pb-5">
            <h2>Suppport Center</h2>
          </div>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row wrap align-end justify-end class="pr-5">
          <v-btn icon>
            <i class="fa fa-search"></i>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md4>
        <v-expansion-panels focusable class="pb-5">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="support-title">
                <h3>Payments</h3>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              >I'm having issues with my payment</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Available payment methods and getting cash on
              hand</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Using local currency on powerbank</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable class="pb-5">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="support-title">
                <h3>Withdrawals</h3>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              >I'm having issues with my payment</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Available payment methods and getting cash on
              hand</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Using local currency on powerbank</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable class="pb-5">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="support-title">
                <h3>Damages</h3>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              >I'm having issues with my payment</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Available payment methods and getting cash on
              hand</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Using local currency on powerbank</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
          </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels focusable class="pb-5">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="support-title">
                <h3>Taxes</h3>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              >I'm having issues with my payment</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Available payment methods and getting cash on
              hand</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Using local currency on powerbank</v-expansion-panel-content
            >
            <v-expansion-panel-content
              >Viewing my account balance</v-expansion-panel-content
            >
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
      <v-flex md8 class="pl-5 pr-5">
        <h2 class="pb-5 pl-3">Viewing your account balance</h2>
        <v-layout row wrap class="pt-5 pl-5">
          <v-flex v-if="!editable">{{ text }}</v-flex>
          <v-textarea
            v-else
            :value="text"
            auto-grow
            rows="4"
            row-height="30"
            outlined
          ></v-textarea>
        </v-layout>
        <v-btn color="primary" @click="editFAQdone()" v-show="editable"
          >Save</v-btn
        >
      </v-flex>
    </v-layout>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
import ContactSupport from "./contact_support.vue";
export default {
  data() {
    return {
      location_modal: false,
      contact_support_dialog: false,
      editable: false,
      text:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
    };
  },
  name: `SupportList`,
  components: {
    DefaultLayout,
    ContactSupport
  },
  methods: {
    toggleLocation(status) {
      this.location_modal = status;
    },
    editFAQ() {
      this.editable = true;
    },
    editFAQdone() {
      this.editable = false;
    }
  }
};
</script>
