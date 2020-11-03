<template>
  <DefaultLayout>
    <v-layout flex justify-space-between align-center>
      <RefundApprove
        :selectRowData="selectRowData"
        :refund_model="refund_model"
        @closeModal="toggleRefund(false)"
      />
    </v-layout>
    <section class="overview">
      <v-layout flex justify-space-between align-center>
        <div class="page-title pt-5 pb-5">
          <h2>Refund request</h2>
        </div>
        <div class="v-custom-search">
          <v-text-field
            v-model="search"
            item-value
            cache-items
            flat
            hide-no-data
            hide-selected
            append-icon
            placeholder="Search Refunds"
          ></v-text-field>
          <v-btn icon>
            <i class="fa fa-search"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-layout row wrap justify-end align-end class="pb-5">
        <div class="d-flex">
          {{
            search
          }}
          <div class="v-custom-select">
            <select class="block" v-model="search">
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="requested">Requested</option>
            </select>
          </div>
        </div>
      </v-layout>
      <v-sheet id="data_table">
        <v-card class="v-shadow">
          <v-data-table
            :headers="headers"
            :items="all_refunds"
            @click:row="selectRow"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-chip color="green" v-if="item.status == 'APPROVED'">
                <span style="color:white">
                  <i class="fa fa-check-circle" aria-hidden="true"></i> Approved
                </span>
              </v-chip>

              <v-chip color="red" v-else-if="item.status == 'REJECTED'">
                <span style="color:white">
                  <i class="fa fa-close" aria-hidden="true"></i> Rejected
                </span>
              </v-chip>

              <v-chip v-else color="orange">
                <span color="error" style="color:white">
                  Requested
                </span>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
        <br />
        <v-pagination
          v-if="accounts_paginations.length > 10"
          v-model="accounts_paginations.page"
          :length="accounts_paginations.pages"
          :total-visible="accounts_paginations.pages"
          @input="input"
        ></v-pagination>
      </v-sheet>
    </section>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/default";
import RefundApprove from "./refund_approves.vue";
import { mapActions, mapGetters } from "vuex";
import { mixins } from "@/plugins/mixins";
import moment from "moment";

export default {
  name: "BankTransfer",
  data: () => {
    return {
      search: "",
      page_data: {
        page: 1
      },
      page: 1,
      refund_model: false,
      sort_month: "January",
      sort_by: "all",
      sort_year: "2020",
      headers: [
        {
          text: "Date",
          align: "start",
          filterable: false,
          value: "date"
        },
        { text: "Merchant", value: "merchant", align: "start" },
        { text: "Location", value: "location", align: "start" },
        { text: "Amount", value: "amount", align: "start" },
        { text: "Discription", value: "discription", align: "start" },
        { text: "Comment", value: "comment", align: "start" },
        { text: "Status", value: "status", align: "start" }
      ],
      selectRowData: []
    };
  },
  components: {
    DefaultLayout,
    RefundApprove
  },

  mounted() {
    this.get_AllRefund(this.page);
  },
  computed: {
    ...mapGetters("accounts", ["allrefunds", "accounts_paginations"]),
    all_refunds() {
      return this.allrefunds.map((refund, index) => ({
        date: this.formatDate(refund.createdAt),
        merchant: refund.userId.name,
        location: refund.transactionId.rentedAt.powerStation.location.name,
        amount:
          Math.round((refund.transactionId.amount + Number.EPSILON) * 100) /
          100,
        discription: refund.description,
        comment: refund.comments,
        status: refund.status,
        id: refund._id
      }));
    }
  },
  methods: {
    ...mapActions("accounts", ["getAllRefund", "refundRequest"]),

    get_AllRefund(page_number) {
      this.page_data = {
        page: page_number
      };
      setTimeout(() => {
        this.getAllRefund(this.page_data);
      }, this.delay);
    },
    input(page_number) {
      this.page = page_number;
      this.$store.commit("accounts/SET_PAGE", page_number, { root: true });
      const data = {
        page: page_number
      };
      this.getAllRefund(data);
    },
    toggleRefund(status) {
      this.refund_model = status;
    },
    selectRow(data, row) {
      this.selectRowData = data;
      this.toggleRefund(true);
    },
    formatDate: function(date) {
      if (date != undefined || date != "" || date != null) {
        return moment(date).format("DD-MMM-YYYY");
      } else {
        return "N/A";
      }
    }
  }
};
</script>