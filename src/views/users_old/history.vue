<template>
  <v-card>
    <v-card-title>
      <v-layout row wrap>
        <v-flex md6>
          <h2>History of {{ name }}</h2>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-layout row wrap class="pl-5">
      <v-flex md5>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="history_details"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      add_location_dialog: false,
      search: "",
      headers: [
        {
          text: "Power Bank ID",
          align: "start",
          sortable: false,
          value: "pb_id"
        },
        { text: "Rented Location", value: "rented_location" },
        { text: "Rented Date", value: "rented_date" },
        { text: "Rented Time", value: "rented_time" },
        { text: "Returned Location", value: "returned_location" },
        { text: "Returned date", value: "returned_date" }
      ],
      history_details: [
        {
          pb_id: "Shan Dhiviyarajan",
          rented_location: "8972170021",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Thiviya",
          rented_location: "8972170022",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Amila ",
          rented_location: "8972170023",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Gajaendrean",
          rented_location: "8972170024",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Nipun Teekshana",
          rented_location: "8972170021",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Shan Dhiviyarajan",
          rented_location: "8972170021",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Thiviya",
          rented_location: "8972170022",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Amila ",
          rented_location: "8972170023",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Gajaendrean",
          rented_location: "8972170024",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        },
        {
          pb_id: "Nipun Teekshana",
          rented_location: "8972170021",
          rented_time: "user@website.com",
          returned_location: "0779773225",
          returned_date: "Admin",
          rented_date: "26 Mar 1992",
          web: "Shan"
        }
      ]
    };
  },
  name: "history",
  components: {}
};
</script>
