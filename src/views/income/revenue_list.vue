<template>
  <DefaultLayout>
    <v-layout flex justify-space-between align-center>
      <div class="page-title">
        <h2>Analytics</h2>
      </div>
    </v-layout>

    <section id="analytics">
      <v-card class="v-card-summary">
        <v-row>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Total earnings</div>
              <div class="summary-value">2345.67 $</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">This month earnings</div>
              <div class="summary-value">345.67 $</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Total rents</div>
              <div class="summary-value">123</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Avg.Rent Pay</div>
              <div class="summary-value">12.67 $</div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </section>
    <section class="overview">
      <v-layout flex justify-space-between align-center>
        <div class="page-title my-4">
          <h2>Overview</h2>
        </div>
        <div class="d-flex">
          <div class="v-custom-select">
            <select
              class="block"
              v-model="sort_chart"
              @change="update_chart($event)"
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </v-layout>
      <v-card class="v-revenue-chart v-shadow">
        <div id="chart"></div>
      </v-card>
    </section>

    <section class="my-4">
      <div class="page-title mt-4">
        <h2>Transactions</h2>
      </div>
      <v-sheet id="data_table" class="pt-5">
        <v-card class="v-shadow">
          <v-data-table :headers="headers" :items="transactions">
          </v-data-table>
        </v-card>

        <v-pagination
          v-if="accounts_paginations.limit > 10"
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
import ApexCharts from "apexcharts";
import { mapState, mapGetters, mapActions } from "vuex";
import DefaultLayout from "@/layouts/default";
import moment from "moment";

export default {
  name: "RevenueList",
  components: {
    DefaultLayout
  },
  data: () => {
    return {
      page_data: {
        page: 1
      },
      page: 1,
      headers: [
        {
          text: "Date",
          align: "start",
          filterable: false,
          value: "date"
        },
        { text: "Amount", value: "amount", align: "start" },
        { text: "Discription", value: "discription", align: "start" },
        { text: "Status", value: "status", align: "start" }
      ],
      revenue: [
        {
          date: "28 / 10 / 2020",
          amount: "$23",
          discription: "DONE",
          status: "Approved"
        }
      ],
      another_user: {
        name: "Shan"
      },
      sort_chart: "yearly",
      chart: "",
      yearly_chart_data: [
        {
          name: "Earned",
          data: [80, 90, 100, 110, 120, 130, 60, 130, 120, 120, 100, 90]
        },
        {
          name: "Damaged",
          data: [10, 5, 20, 30, 20, 10, 30, 40, 50, 10, 10, 14]
        }
      ],
      monthly_chart_data: [
        {
          name: "Earned",
          data: [50, 90, 100, 70, 120, 100, 160, 110, 30, 80, 70, 90]
        },
        {
          name: "Damaged",
          data: [20, 5, 10, 30, 20, 10, 10, 20, 30, 10, 50, 24]
        }
      ]
    };
  },
  computed: {
    ...mapGetters("language", ["get_test_user"]),
    ...mapGetters("accounts", ["allTransaction", "accounts_paginations"]),

    transactions() {
      return this.allTransaction.map((transaction, index) => ({
        date: this.formatDate(transaction.createdAt),
        amount: Math.round((transaction.amount + Number.EPSILON) * 100) / 100,
        status: transaction.status
      }));
    }
  },
  methods: {
    ...mapActions("accounts", ["getAllTransactions"]),

    //Get all transactions
    get_all_transactions(page_number) {
      //set page number
      this.page_data = {
        page: page_number
      };
      this.getAllTransactions(this.page_data);
    },
    //Pagination
    input(page_number) {
      this.$store.commit("accounts/SET_PAGE", page_number, { root: true });
      this.page_data = {
        page: page_number
      };
      this.getAllTransactions(this.page_data);
    },
    //Chart
    update_chart(e) {
      e.preventDefault();
      if (this.sort_chart === "yearly") {
        this.chart.updateSeries(this.yearly_chart_data);
      } else {
        this.chart.updateSeries(this.monthly_chart_data);
      }
    },
    //Init chart
    chart_loaded() {
      var options = {
        colors: ["#4273B7", "#F7CF00"],

        fill: {
          type: "solid"
        },
        legend: {
          show: false
        },
        defaultLocale: "en",
        redrawOnParentResize: true,
        series: this.yearly_chart_data,
        chart: {
          type: "bar",
          height: 450,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "35%",
            startingShape: "rounded",
            endingShape: "rounded",
            colors: {
              backgroundBarRadius: "100"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
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
          title: {
            text: "2020"
          },
          labels: {
            style: {
              colors: "#CED0D6",
              fontSize: "14px",
              fontWeight: 400
            }
          }
        },
        grid: {
          show: false
        },
        yaxis: {
          // title: {
          //   text: "No of Power Banks"
          // }
        },
        fill: {
          opacity: 1
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "$" + val;
            }
          }
        }
      };

      this.chart = new ApexCharts(document.querySelector("#chart"), options);
      this.chart.render();
    },
    formatDate: function(date) {
      if (date != undefined || date != "" || date != null) {
        return moment(date).format("DD-MMM-YYYY");
      } else {
        return "N/A";
      }
    }
  },
  mounted() {
    this.get_all_transactions(this.page);
    this.$store.commit("language/SET_NEW_USER", this.another_user, {
      root: false
    });

    //load chart
    setTimeout(() => {
      this.chart_loaded();
    }, 500);
  }
};
</script>
