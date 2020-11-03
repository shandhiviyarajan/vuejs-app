<template>
  <v-dialog max-width="1000" v-model="withrawn_model" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Request Withdrawn</h2>
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-form class="v-form__add-locations" ref="form" v-model="form_valid">
        <v-row>
          <v-col cols="12" md="3">
            <label>Transfer Amount</label>
            <v-text-field
              :hide-details="false"
              placeholder="Transfer Amount"
              required
              v-model="amount"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Net Income</div>
              <div class="summary-value">$2345.67</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Total Withdrawn</div>
              <div class="summary-value">$345.67</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Pending</div>
              <div class="summary-value">$123</div>
            </div>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <label>Notes</label>
            <div>
              <v-text-field placeholder="Notes" v-model="description"></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div>
          <v-layout row wrap align-end justify-end>
            <v-btn color="primary"  @click="requestWithdrawn">
              Request Withdrawn
            </v-btn>
          </v-layout>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AddLocation",
  props: ["withrawn_model"],

  data() {
    return {
      form_valid: true,
      description: "",
      amount: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions("accounts", ["withdrawnRequest"]),

    requestWithdrawn() {
      const payload = {
        amount: this.amount,
        description: this.description
      }
      this.withdrawnRequest(payload);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style></style>
