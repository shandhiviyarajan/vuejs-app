<template>
  <v-card>
    <v-card-title>
     <v-layout row wrap>
         <v-flex md10>
             <h2>Reports of {{name}}</h2>
         </v-flex>
     </v-layout>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-flex md5>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-flex>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
        >
          mdi-eye
        </v-icon>
        <v-icon
          small
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
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
      add_item_dialog: false,
      search: "",
      headers: [
        {
          text: "Report ID", align: "start", sortable: false, value: "report_id" },
        { text: "Assign By", value: "report_by" },
        { text: "Assign Date", value: "report_date" },
        { text: "Status", value: "status" },
        { text: "", value: "actions" }
      ],
      desserts: [
        {
          report_id: "8972170021",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Damage"
        },
        {
          report_id: "8972170022",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Damage"
        },
        {
          report_id: "8972170023",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Active"
        },
        {
          report_id: "8972170024",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Active"
        },
        {
          report_id: "8972170021",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Damage"
        },
        {
          report_id: "8972170021",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Active"
        },
        {
          report_id: "8972170022",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Active"
        },
        {
          report_id: "8972170023",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Damage"
        },
        {
          report_id: "8972170024",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Active"
        },
        {
          report_id: "8972170021",
          report_date: "26 Mar 1992",
          report_by: "Shan",
          status: "Active"
        }
      ]
    };
  },
  name: "reports",
  components: {
    
  },
};
</script>