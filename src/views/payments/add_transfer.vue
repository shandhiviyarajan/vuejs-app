<template>
  <v-dialog max-width="1000" v-model="transfer_model" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Bank Transfer</h2>
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
            <div>
              <label>Merchant</label>
              <v-text-field
                :hide-details="false"
                placeholder="Merchant"
                required
              ></v-text-field>
            </div>
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
          <v-col cols="12" md="3">
            <label>Transfer Amount</label>
            <v-text-field
              :hide-details="false"
              placeholder="Transfer Amount"
              required
            ></v-text-field>
            <!-- <label>You only can transfer $278</label> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <label>Notes</label>
            <div>
              <v-text-field placeholder="Notes"></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div>
          <v-layout row wrap align-end justify-end>
            <v-btn color="primary"  @click="closeModal">
              Transfer Money
            </v-btn>
          </v-layout>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddLocation",
  props: ["transfer_model"],

  data() {
    return {
      form_valid: true
    };
  },
  computed: {},
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>

<style></style>
