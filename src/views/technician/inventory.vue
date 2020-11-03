<template>
  <v-card>
    <v-card-title>
     <v-layout row wrap>
         <v-flex md10>
             <h2>Inventory of {{name}}</h2>
         </v-flex>
         <v-flex md2 class="pl-5">
          <v-btn color="primary" @click.stop="add_item_dialog = true">Assign New Item</v-btn>
            <v-dialog
              v-model="add_item_dialog"
              max-width="1000"
            >
              <AddItem></AddItem>
            </v-dialog>
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
    <v-data-table :headers="headers" :items="desserts" :search="search" class="elevation-1">
       <template v-slot:item.delete="{ item }">
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

import AddItem from "./add_item.vue";

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
          text: "Station / Powerbank ID", align: "start", sortable: false, value: "station_pb_id" },
        { text: "Assign By", value: "assign_by" },
        { text: "Assign Date", value: "assign_date" },
        { text: "Status", value: "status" },
        { text: "", value: "delete" }
      ],
      desserts: [
        {
          station_pb_id: "8972170021",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Damage"
        },
        {
          station_pb_id: "8972170022",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Damage"
        },
        {
          station_pb_id: "8972170023",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Active"
        },
        {
          station_pb_id: "8972170024",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Active"
        },
        {
          station_pb_id: "8972170021",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Damage"
        },
        {
          station_pb_id: "8972170021",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Active"
        },
        {
          station_pb_id: "8972170022",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Active"
        },
        {
          station_pb_id: "8972170023",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Damage"
        },
        {
          station_pb_id: "8972170024",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Active"
        },
        {
          station_pb_id: "8972170021",
          assign_date: "26 Mar 1992",
          assign_by: "Shan",
          status: "Active"
        }
      ]
    };
  },
  name: "inventory",
  components: {
    AddItem
  },
};
</script>