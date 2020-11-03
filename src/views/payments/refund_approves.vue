<template>
  <v-dialog max-width="1000" v-model="refund_model" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title pb-5" v-if="selectRowData.status == 'REQUESTED'">
          <h2>Approve / Reject Refund</h2>
        </div>
        <div class="page-title pb-5" v-else>
          <h2>{{selectRowData.status}} Refund</h2>
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
          {{selectRowData.date}}
        </v-col>
        <v-col cols="12" md="4">
          <label>merchant</label>
          {{selectRowData.merchant}}
        </v-col>

        <v-col cols="12" md="4">
          <label>location</label>
          {{selectRowData.location}}
        </v-col>
        <v-col cols="12" md="4">
          <label>amount</label>
          {{selectRowData.amount}}
        </v-col>
        <v-col cols="12" md="4">
          <label>discription</label>
          {{selectRowData.discription}}
        </v-col>
      </v-row>
      <v-form class="v-form__add-locations" ref="form" v-model="form_valid" v-show="selectRowData.status == 'REQUESTED'">
        <v-row>
          <v-col cols="12" md="12">
            <div class="pt-5">
              <label>Comment</label>
              <v-textarea
                auto-grow
                rows="4"
                row-height="30"
                outlined
                solo
                v-model="comment"
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
        <div v-show="selectRowData.status == 'REQUESTED'">
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
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";

export default {
  name: "RefundApprove",
  props: ["refund_model", "selectRowData"],

  data() {
    return {
      form_valid: true,
      comment: ''
    };
  },
  computed: {},
  methods: {
    ...mapActions("accounts", ["refundRequest"]),

    approveRefund() {
      const payload = {
        comment: this.comment,
        requestId: this.selectRowData.id,
        status: "APPROVED"
      }
      this.refundRequest(payload);
      this.closeModal();
    },
    rejectRefund() {
     const payload = {
        comment: this.comment,
        requestId: this.selectRowData.id,
        status: "REJECTED"
      }
      this.refundRequest(payload);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", false);
      this.comment = '';
    }
  }
};
</script>

<style></style>
