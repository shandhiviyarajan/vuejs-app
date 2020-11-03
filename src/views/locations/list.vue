<template>
  <v-dialog
    v-model="location_modal"
    max-width="1300"
    max-height="1300"
    persistent
  >
    <v-sheet class="app-modal overflow-hidden" id="data_table_popup">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Locations of {{ name }}</h2>
        </div>
        <div class="d-flex modal_actions">
          <v-btn small color="primary" @click="toggleAddLocation(true)"
            >Add Location</v-btn
          >
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>

      <v-row>
        <v-col cols="12" md="5">
          <div class="v-custom-search">
            <v-text-field
              v-model="users_search"
              placeholder="Search users"
              single-line
              hide-details
            ></v-text-field>
            <v-btn icon>
              <i class="fa fa-search"></i>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="locations_table"
        :search="users_search"
        @click:row="getId"
      ></v-data-table>
      <AddLocation
        :merchant_id="merchant_id"
        :add_location_modal="add_location_modal"
        @closeAddLocationModal="toggleAddLocation(false)"
      />
      <EditLocation
        :location="select_loc"
        :edit_location_modal="edit_location_modal"
        @closeEditLocationModal="toggleEditLocation(false)"
        :merchant_id="merchant_id"
      />
    </v-sheet>
  </v-dialog>
</template>

<script>
import AddLocation from "./add_location.vue";
import EditLocation from "./edit_location.vue";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "location",
  components: { AddLocation, EditLocation },
  props: ["location_modal", "merchant_id", "name"],
  data() {
    return {
      add_location_modal: false,
      edit_location_modal: false,
      users_search: "",
      select_loc: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Power Station", value: "powerStation._id" },
        { text: "Contact", value: "contactNumber" },
        { text: "Email", value: "email" },
        { text: "Web", value: "web" },
        { text: "Tripadvisor", value: "tripadvisor" }
      ],
      locations: []
    };
  },

  computed: {
    ...mapGetters("locations", ["merchantLocations"]),
    locations_table() {
      if (this.merchantLocations.length > 0) {
        this.locations = this.merchantLocations.map((location, index) => ({
          id: location._id,
          name: location.name,
          location: location.location.coordinates,
          web: location.web,
          tripadvisor: location.tripadvisor,
          powerStation: location.powerStations[0],
          contactNumber: location.contactNumber,
          email: location.email,
          merchantId: location.merchantId,
          openHours: location.openHours
        }));
        return this.locations;
      }
    }
  },

  methods: {
    ...mapActions("locations", ["getMerchantLocations"]),
    getId(data, raw) {
      let selecteLocation = _.find(this.merchantLocations, { _id: data.id });
      this.toggleEditLocation(true);
      this.select_loc = selecteLocation;
    },
    toggleAddLocation(status) {
      this.add_location_modal = status;
    },
    toggleEditLocation(status) {
      this.edit_location_modal = status;
      // if (status != true) {
      //   this.getMerchantLocations(this.merchantLocations[0].merchantId._id);
      // }
    },
    closeModal() {
      this.$emit("closeModal", false);
    }
  },
  mounted() {}
};
</script>
