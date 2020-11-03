<template>
  <v-dialog
    v-model="accounts_modal"
    max-width="1300"
    max-height="1300"
    persistent
  >
    <v-sheet class="app-modal overflow-hidden" id="data_table_popup">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>{{ name }}'s Accounts Balance</h2>
        </div>

        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout >
      <v-row no-gutters >
        <v-col cols="12" md="3">
          <v-card class="accounts_balance">
            <div class="aside-info__title">Accounts balance</div>
            <div class="aside-info__value">
              {{
                $currency.symbol
              }} {{ balance != null ? balance : 'N/A' }}
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>{{ name }}'s Transactions</h2>
        </div>
      </v-layout>

      <v-data-table
        :headers="headers"
        :items="transactions"
        :search="accounts_search"
      ></v-data-table>

        <v-pagination
        v-model="action_paginations.page"
        :length="action_paginations.pages"
        :total-visible="action_paginations.pages"
   
      ></v-pagination>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mixins } from "@/plugins/mixins";

export default {
  name: "Balance",
  props: ["user_id", "accounts_modal", "name"],
  data() {
    return {
      page:1,
      accounts_search: "",
      page_data:{
        id:'',
        page:1
      },
      headers: [
        { text: "Account Id", value: "walletId" },
        { text: "Created At", value: "createdAt" },
        { text: "Amount", value: "amount" },
        { text: "Payment method", value: "paymentMethod" },
        { text: "Payment Card", value: "paymentCard" },
        { text: "Status", value: "status" }
      ],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
    };
  },
  mixins: ["mixins"],
  computed: {
    ...mapGetters("accounts", [
      "get_accounts_balance",
      "progress",
      "get_transactions",
      "action_paginations"
    ]),

    balance() {
      return (this.get_accounts_balance.balance != null) ? parseFloat(this.get_accounts_balance.balance).toFixed(2) : false ;
    },
    transactions() {

      return this.get_transactions.map((transaction, index) => ({
        walletId: transaction.walletId,
        rentalId: transaction.creditId.rentalId,
        rentedAt: transaction.creditId.rentedAt,
        returnedAt: transaction.creditId.returnedAt,
        isRefunded: transaction.creditId.isRefunded,
        _id: transaction.creditId._id,
        userId: transaction.creditId.userId,
        amount:  (transaction.creditId.amount != null) ? parseFloat(transaction.creditId.amount).toFixed(2) : 'N/A',
        time: transaction.creditId.time,
        paymentMethod: transaction.creditId.paymentMethod,
        paymentCard: "xxxx-xxxx-xxxx-" + transaction.creditId.paymentCard,
        status: transaction.creditId.status,
        createdAt: this.format_date(transaction.creditId.createdAt),
        updatedAt: transaction.creditId.updatedAt
      }));
    }
  },
  methods: {
    ...mapActions("accounts", ["accountsBalance", "getTransactions"]),

    input(page_number) {

      this.page_data ={
        id:this.user_id,
        page:page_number
      }
       this.getTransactions(this.page_data);
    },

    closeModal() {
      this.$emit("closeModal", false);
    },
     //format date
    format_date(timestamp) {
      let date = new Date(timestamp);
      return (
        date.getFullYear() +
        " - " +
        this.months[date.getMonth()] +
        " - " +
        date.getDate()
      );
    },
  },

  mounted() {}
};
</script>