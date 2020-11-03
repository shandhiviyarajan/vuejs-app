<template>
  <DefaultLayout>
    <v-layout row wrap>
      <v-sheet class="overflow-hidden" id="data_table">
        <v-layout flex justify-space-between align-center>
          <div class="page-title">
            <h2>Support Request</h2>
          </div>
        </v-layout>

        <v-data-table @click:row="selectRow" :headers="headers" :items="table_items"></v-data-table>

        <v-pagination :length="10" :total-visible="4"></v-pagination>
      </v-sheet>
    </v-layout>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Request ID",
          align: "start",
          sortable: false,
          value: "requestID"
        },
        { text: "Subject", value: "subject" },
        { text: "Created On", value: "createdOn" },
        { text: "Created By", value: "createBy" },
        { text: "Assign to", value: "assignTo" },
        { text: "Status", value: "status" }
      ],
      table_items: [
        {
          requestID: "Frozen Yogurt",
          subject: 159,
          createdOn: 6.0,
          createBy: 24,
          assignTo: 4.0,
          status: "1%"
        },
        {
          requestID: "Ice cream sandwich",
          subject: 237,
          createdOn: 9.0,
          createBy: 37,
          assignTo: 4.3,
          status: "1%"
        },
        {
          requestID: "Eclair",
          subject: 262,
          createdOn: 16.0,
          createBy: 23,
          assignTo: 6.0,
          status: "7%"
        },
        {
          requestID: "Cupcake",
          subject: 305,
          createdOn: 3.7,
          createBy: 67,
          assignTo: 4.3,
          status: "8%"
        },
        {
          requestID: "Gingerbread",
          subject: 356,
          createdOn: 16.0,
          createBy: 49,
          assignTo: 3.9,
          status: "16%"
        },
        {
          requestID: "Jelly bean",
          subject: 375,
          createdOn: 0.0,
          createBy: 94,
          assignTo: 0.0,
          status: "0%"
        },
        {
          requestID: "Lollipop",
          subject: 392,
          createdOn: 0.2,
          createBy: 98,
          assignTo: 0,
          status: "2%"
        },
        {
          requestID: "Honeycomb",
          subject: 408,
          createdOn: 3.2,
          createBy: 87,
          assignTo: 6.5,
          status: "45%"
        },
        {
          requestID: "Donut",
          subject: 452,
          createdOn: 25.0,
          createBy: 51,
          assignTo: 4.9,
          status: "22%"
        },
        {
          requestID: "KitKat",
          subject: 518,
          createdOn: 26.0,
          createBy: 65,
          assignTo: 7,
          status: "6%"
        }
      ]
    };
  },
  components: {
    DefaultLayout
  },
  methods: {
    selectRow() {
      this.$router.push({ path: '/chat' });
    }
  }
};
</script>

<style>
</style>