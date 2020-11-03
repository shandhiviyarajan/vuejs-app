<template>
  <DefaultLayout>
    <v-layout flex justify-space-between align-center class="pb-5">
      <WithdrawanApprove
        :selectRowData="selectRowData"
        :withdrawan_approve_model="withdrawan_approve_model"
        @closeModal="toggleApproveWithdrawan(false)"
      />
      <div class="page-title">
        <h2>Earnings</h2>
      </div>
      <div class="d-flex" v-if="is_merchant">
        <RequestWithdrawn
          :withrawn_model="withrawn_model"
          @closeModal="toggleWithrawnUser(false)"
        />
        <v-btn color="primary" @click="toggleWithrawnUser(true)"
          >Request Withdrawn</v-btn
        >
      </div>
      <div class="d-flex" v-else>
        <WithdrawToMerchant
          :merchant_withdraw_model="merchant_withdraw_model"
          @closeModal="toggleWithrawntoMer(false)"
        />
        <v-btn color="primary" @click="toggleWithrawntoMer(true)"
          >Withdraw To Merchant</v-btn
        >
      </div>
    </v-layout>

    <section id="analytics">
      <v-card class="v-card-summary">
        <v-row>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Net Income</div>
              <div class="summary-value">2345.67 $</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Pending Clearance</div>
              <div class="summary-value">345.67 $</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Available</div>
              <div class="summary-value">123</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Withdrawn</div>
              <div class="summary-value">12.67 $</div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </section>
    <section class="overview">
      <v-layout flex justify-space-between align-center>
        <div class="page-title my-4">
          <h2>Withdraw</h2>
        </div>
        <div class="d-flex">
          <div class="v-custom-select">
            <select class="block" v-model="status" @change="update_status()">
              <option value="ALL">ALL</option>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </div>
      </v-layout>
    </section>
    <v-sheet id="data_table" class="pt-5">
      <v-card class="v-shadow" v-if="is_merchant">
        <v-data-table :headers="headers_user" :items="withdrawals_user">
        </v-data-table>
      </v-card>
      <v-card class="v-shadow" v-else>
        <v-data-table
          :headers="headers_admin"
          :items="withdrawals_admin"
          @click:row="selectRow"
        >
        </v-data-table>
      </v-card>
      <v-pagination v-if="accounts_paginations.limit > 10"
        v-model="accounts_paginations.page"
        :length="accounts_paginations.pages"
        :total-visible="accounts_paginations.pages"
        @input="input"
      ></v-pagination>
    </v-sheet>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/default";
import { mapState, mapGetters, mapActions } from "vuex";
import moment from "moment";
import RequestWithdrawn from "./request_withdrawn.vue";
import WithdrawToMerchant from "./withdraw_to_merchant.vue";
import WithdrawanApprove from "./withdrawan_approves.vue";

export default {
  name: "RevenueList",
  data: () => {
    return {
      withdrawan_approve_model: false,
      selectRowData: [],
      withrawn_model: false,
      merchant_withdraw_model: false,
      is_merchant: false,
      page_data: {
        page: 1
      },
      page: 1,
      headers_user: [
        {
          text: "Date",
          align: "start",
          filterable: false,
          value: "date"
        },
        { text: "Amount", value: "amount", align: "start" },
        { text: "Discription", value: "discription", align: "start" },
        { text: "Status", value: "status", align: "end" }
      ],
      headers_admin: [
        {
          text: "Date",
          align: "start",
          filterable: false,
          value: "date"
        },
        { text: "Name", value: "name", align: "start" },
        { text: "Amount", value: "amount", align: "start" },
        { text: "Discription", value: "discription", align: "start" },
        { text: "Status", value: "status", align: "end" }
      ],
      status: "ALL"
    };
  },
  components: {
    DefaultLayout,
    RequestWithdrawn,
    WithdrawanApprove,
    WithdrawToMerchant
  },

  computed: {
    ...mapGetters("auth", ["myProfile"]),
    ...mapGetters("accounts", [
      "allWithdrawnsByUser",
      "paginations",
      "allWithdrawns",
      "accounts_paginations"
    ]),

    withdrawals_user() {
      return this.allWithdrawnsByUser.map((withdrawals, index) => ({
        date: this.formatDate(withdrawals.createdAt),
        amount: Math.round((withdrawals.amount + Number.EPSILON) * 100) / 100,
        status: withdrawals.status,
        discription: withdrawals.description
      }));
    },
    withdrawals_admin() {
      return this.allWithdrawns.map((withdrawals, index) => ({
        date: this.formatDate(withdrawals.createdAt),
        amount: Math.round((withdrawals.amount + Number.EPSILON) * 100) / 100,
        status: withdrawals.status,
        discription: withdrawals.description,
        name: withdrawals.userId.name,
        id: withdrawals._id
      }));
    }
  },

  methods: {
    ...mapActions("accounts", ["getAllWithdrawnByUser", "getAllWithdrawn"]),
    toggleWithrawnUser(status) {
      this.withrawn_model = status;
    },
    toggleWithrawntoMer(status) {
      this.merchant_withdraw_model = status;
    },
    get_AllWithdrawans(page_number) {
      this.page_data = {
        page: page_number,
        status: this.status
      };
      setTimeout(() => {
        if (this.is_merchant) {
          this.getAllWithdrawnByUser(this.page_data);
        } else {
          this.getAllWithdrawn(this.page_data);
        }
      }, 300);
    },
    input(page_number) {
      this.page = page_number;
      this.$store.commit("accounts/SET_PAGE", page_number, { root: true });
      const data = {
        page: page_number,
        status: this.status
      };
      if (this.is_merchant) {
        this.getAllWithdrawnByUser(data);
      } else {
        this.getAllWithdrawn(data);
      }
    },
    formatDate: function(date) {
      if (date != undefined || date != "" || date != null) {
        return moment(date).format("DD-MMM-YYYY");
      } else {
        return "N/A";
      }
    },
    update_status() {
      const data = {
        status: this.status,
        page: this.page
      };
      if (this.is_merchant) {
        this.getAllWithdrawnByUser(data);
      } else {
        this.getAllWithdrawn(data);
      }
    },
    toggleApproveWithdrawan(status) {
      this.withdrawan_approve_model = status;
    },
    selectRow(data, row) {
      this.selectRowData = data;
      this.toggleApproveWithdrawan(true);
    },
  },
  mounted() {
    if (this.myProfile.roleID[0].name == "MERCHANT") {
      this.is_merchant = true;
    } else {
      this.is_merchant = false;
    }

    this.get_AllWithdrawans(this.page);
  }
};
</script>