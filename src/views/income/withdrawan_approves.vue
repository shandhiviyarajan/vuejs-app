<template>
  <v-dialog max-width="1000" v-model="withdrawan_approve_model" persistent>
    <v-card class="app-modal" v-if="selectRowData.status != 'PENDING'">
      <v-layout flex justify-space-between align-center>
        <div class="page-title pb-5">
          <h2>{{ selectRowData.status }} Refund</h2>
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-row class="v-form__add-locations">
        <v-col cols="12" md="4">
          <label>Date</label>
          {{ selectRowData.date }}
        </v-col>
        <v-col cols="12" md="4">
          <label>Name</label>
          {{ selectRowData.name }}
        </v-col>
        <v-col cols="12" md="4">
          <label>Amount</label>
          {{ selectRowData.amount }}
        </v-col>
        <v-col cols="12" md="4">
          <label>Discription</label>
          {{ selectRowData.discription }}
        </v-col>
      </v-row>
    </v-card>
    <v-card class="app-modal" v-else>
      <v-layout flex justify-space-between align-center>
        <div class="page-title pb-5">
          <h2>Approve / Reject Refund</h2>
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
                v-model="selectRowData.name"
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
              v-model="selectRowData.amount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <label>Notes</label>
            <div>
              <v-text-field
                placeholder="Notes"
                v-model="selectRowData.discription"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div>
          <v-layout row wrap align-end justify-end>
            <div class="pr-5">
              <v-btn color="secondary" @click="rejectRefund" large>
                Reject
              </v-btn>
            </div>
            <div>
              <v-btn color="primary" @click="approveRefund" large>
                Approve
              </v-btn>
            </div>
          </v-layout>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "WithdrawanApprove",
  props: ["withdrawan_approve_model", "selectRowData"],

  data() {
    return {
      form_valid: true,
      comment: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions("accounts", ["withdrawnApprove"]),

    approveRefund() {
      const payload = {
        comment: this.comment,
        withdrawnId: this.selectRowData.id,
        status: "APPROVED"
      };
      this.withdrawnApprove(payload);
      this.closeModal();
    },
    rejectRefund() {
      const payload = {
        comment: this.comment,
        withdrawnId: this.selectRowData.id,
        status: "REJECTED"
      };
      this.withdrawnApprove(payload);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", false);
      this.comment = "";
    }
  }
};
</script>

<style></style>
