<template>
  <v-dialog max-width="1000" v-model="edit_location_modal" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Edit Location</h2>
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeEditLocationModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-form class="v-form__add-locations">
        <v-row>
          <v-col cols="12" md="4">
            <div class="google-map-location">
              <label>Location</label>
            </div>
            <gmap-autocomplete
              placeholder="Type to get location"
              ref="locationName"
              v-model="locationName"
              @place_changed="setPlaceEdit"
            >
            </gmap-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <label>Contact number</label>
            <v-text-field
              :hide-details="false"
              v-model="location.contactNumber"
              placeholder="Contact number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <label>Email</label>
            <v-text-field
              v-model="location.email"
              :hide-details="false"
              placeholder="Email"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <label>Web</label>
            <v-text-field
              v-model="location.web"
              :hide-details="false"
              placeholder="Web"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <label>Tripadvisor</label>
            <v-text-field
              v-model="location.tripadvisor"
              :hide-details="false"
              placeholder="Tripadvisor"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <label>Open hours</label>
          </v-col>
          <v-col
            v-for="(day, i) in processOpenHours"
            :key="`day-${i}`"
            cols="12"
            md="4"
          >
            <div class="v-custom-select-wrapper">
              <label>{{ i }}</label>
              <div class="v-custom-select">
                <select v-model="day.start">
                  <option v-for="(start, i) in times" :key="`start-${i}`">
                    {{ start }}
                  </option>
                </select>
              </div>
              <div class="v-custom-select">
                <select v-model="day.end">
                  <option v-for="(end, i) in times" :key="`end-${i}`">
                    {{ end }}
                  </option>
                </select>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <div class="v-custom-autocomplete">
            <v-autocomplete
              v-model="selectedPowerStationsList"
              :items="powerStationsList"
              dense
              chips
              small-chips
              deletable-chips
              item-text="deviceName"
              item-value="_id"
              multiple
              placeholder="Search by power station ID or Name"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    <strong>
                      No powerstations available
                    </strong>
                  </v-list-item-title>
                </v-list-item>
              </template>

              <template v-slot:item="{ item }">
                <v-list-tile-content>
                  <p>
                    <strong>
                      {{ item.deviceName }}
                    </strong>
                    <br />
                    <small>{{ item.device_code }} </small>
                  </p>
                </v-list-tile-content>
              </template>
            </v-autocomplete>
          </div>
        </v-row>
        <v-layout row wrap>
          <v-flex md3>
            <v-btn
              color="primary"
              @click="handleEditLocation()"
              :loading="Eloading"
            >
              Edit Location
            </v-btn>
          </v-flex>
          <v-flex md3>
            <v-btn
              color="primary"
              @click="handleDeleteLocation()"
              :loading="Dloading"
              class="pl-8"
            >
              Delete Location
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";
import moment from "moment";
export default {
  name: "EditLocation",
  props: ["edit_location_modal", "location", "merchant_id"],

  data() {
    return {
      powerStationsList: [],
      selectedPowerBanks: [],
      place: "",
      times: [
        "12:00 AM",
        "12:15 AM",
        "12:30 AM",
        "12:45 AM",
        "01:00 AM",
        "01:15 AM",
        "01:30 AM",
        "01:45 AM",
        "02:00 AM",
        "02:15 AM",
        "02:30 AM",
        "02:45 AM",
        "03:00 AM",
        "03:15 AM",
        "03:30 AM",
        "03:45 AM",
        "04:00 AM",
        "04:15 AM",
        "04:30 AM",
        "04:45 AM",
        "05:00 AM",
        "05:15 AM",
        "05:30 AM",
        "05:45 AM",
        "06:00 AM",
        "06:15 AM",
        "06:30 AM",
        "06:45 AM",
        "07:00 AM",
        "07:15 AM",
        "07:30 AM",
        "07:45 AM",
        "08:00 AM",
        "08:15 AM",
        "08:30 AM",
        "08:45 AM",
        "09:00 AM",
        "09:15 AM",
        "09:30 AM",
        "09:45 AM",
        "10:00 AM",
        "10:15 AM",
        "10:30 AM",
        "10:45 AM",
        "11:00 AM",
        "11:15 AM",
        "11:30 AM",
        "11:45 AM",
        "12:00 PM",
        "12:15 PM",
        "12:30 PM",
        "12:45 PM",
        "01:00 PM",
        "01:15 PM",
        "01:30 PM",
        "01:45 PM",
        "02:00 PM",
        "02:15 PM",
        "02:30 PM",
        "02:45 PM",
        "03:00 PM",
        "03:15 PM",
        "03:30 PM",
        "03:45 PM",
        "04:00 PM",
        "04:15 PM",
        "04:30 PM",
        "04:45 PM",
        "05:00 PM",
        "05:15 PM",
        "05:30 PM",
        "05:45 PM",
        "06:00 PM",
        "06:15 PM",
        "06:30 PM",
        "06:45 PM",
        "07:00 PM",
        "07:15 PM",
        "07:30 PM",
        "07:45 PM",
        "08:00 PM",
        "08:15 PM",
        "08:30 PM",
        "08:45 PM",
        "09:00 PM",
        "09:15 PM",
        "09:30 PM",
        "09:45 PM",
        "10:00 PM",
        "10:15 PM",
        "10:30 PM",
        "10:45 PM",
        "11:00 PM",
        "11:15 PM",
        "11:30 PM",
        "11:45 PM",
        "Closed"
      ]
    };
  },
  computed: {
    ...mapGetters("locations", ["progress"]),
    ...mapGetters("stations", ["bindStations"]),
    //get all loaders
    ...mapGetters("loaders", [
      "loading",
      "Cloading",
      "Eloading",
      "Dloading",
      "Ddialog"
    ]),
    locationName() {
      return this.location.name;
    },
    processOpenHours() {
      return this.mapOpenHours();
    },

    // eslint-disable-next-line vue/return-in-computed-property
    selectedPowerStationsList: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        let powerStations = [];

        let processedBindPowerStations = [];

        if (this.bindStations != null && this.bindStations.length > 0) {
          // set power station list
          this.bindStations.forEach(ps => {
            let obj = {
              _id: ps._id,
              deviceName: ps.deviceName || ps.device_code,
              device_code: ps.device_code || null
            };
            processedBindPowerStations.push(obj);
          });
        }

        if (
          this.location.powerStations != null &&
          this.location.powerStations.length > 0
        ) {
          // set power station list
          this.location.powerStations.forEach(powerStation => {
            let obj = {
              _id: powerStation._id,
              deviceName: powerStation.deviceName || powerStation.device_code,
              device_code: powerStation.device_code || null
            };
            powerStations.push(obj);
          });

          //push power stations into bind station array
          let allPowerStations = powerStations.concat(
            processedBindPowerStations
          );

          this.powerStationsList = allPowerStations;
          return powerStations;
        } else {
          this.powerStationsList = processedBindPowerStations;
        }
      },
      set(val) {
        this.selectedPowerBanks = val;
      }
    }
  },
  methods: {
    ...mapActions("locations", [
      "updateLocation",
      "deleteLocation",
      "getMerchantLocations"
    ]),
    //Add location modal
    closeEditLocationModal() {
      this.$emit("closeEditLocationModal", false);
    },

    mapOpenHours() {
      if (
        this.location.openHours != null &&
        this.location.openHours.length > 0
      ) {
        return _.pick(this.location.openHours[0], [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Tuesday",
          "Friday",
          "Saturday",
          "Sunday"
        ]);
      }
    },
    //Create location
    handleEditLocation() {
      let loc_id = this.location._id;

      let json_current_location = this.prepareLocationUpdatePayload(
        this.location
      );
      let payload = {
        json_current_location,
        loc_id
      };
      this.updateLocation(payload).then(response => {
        this.closeEditLocationModal();
      });
      this.closeEditLocationModal();
    },

    // delete location

    handleDeleteLocation() {
      const payload = {
        id: this.location._id,
        merchant_id: this.merchant_id
      };
      this.deleteLocation(payload);
      this.closeEditLocationModal();
    },

    prepareLocationUpdatePayload(payload) {
      let httpPayload = {
        name: payload.name,
        address: payload.address,
        coordinates: [
          payload.location.coordinates[0],
          payload.location.coordinates[1]
        ],
        contactNumber: payload.contactNumber,
        email: payload.email,
        web: payload.web,
        tripadvisor: payload.tripadvisor,
        openHours: this.mapOpenHoursForHttp(this.mapOpenHours()),
        powerStations: this.selectedPowerBanks,
        merchantId: payload.merchantId._id
      };

      return httpPayload;
    },

    mapOpenHoursForHttp(openHoursPayload) {
      let openHours = [
        {
          monday: {
            start: openHoursPayload.Monday.start || "Closed",
            end: openHoursPayload.Monday.end || "Closed"
          },
          tuesday: {
            start: openHoursPayload.Tuesday.start || "Closed",
            end: openHoursPayload.Tuesday.end || "Closed"
          },
          wednesday: {
            start: openHoursPayload.Wednesday.start || "Closed",
            end: openHoursPayload.Wednesday.end || "Closed"
          },
          thursday: {
            start: openHoursPayload.Tuesday.start || "Closed",
            end: openHoursPayload.Tuesday.end || "Closed"
          },
          friday: {
            start: openHoursPayload.Friday.start || "Closed",
            end: openHoursPayload.Friday.end || "Closed"
          },
          saturday: {
            start: openHoursPayload.Saturday.start || "Closed",
            end: openHoursPayload.Saturday.end || "Closed"
          },
          sunday: {
            start: openHoursPayload.Sunday.start || "Closed",
            end: openHoursPayload.Sunday.end || "Closed"
          }
        }
      ];

      return openHours;
    },

    //Set place
    setPlaceEdit(place) {
      this.location_image = place.photos[0].getUrl();
      this.location.name = place.name;
      this.location.coordinates = [
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ];
      this.location.contactNumber = place.international_phone_number;
      this.location.web = place.website;
      this.location.address = place.formatted_address;
      var i = 0;
      if (place.opening_hours.periods) {
        for (const week_day in this.location.openHours[0]) {
          // fill opening hours
          place.opening_hours.periods.forEach((element, index) => {
            if (i == index) {
              this.location.openHours[0][week_day].end = this.formatTime(
                element.close.time
              );
              this.location.openHours[0][week_day].start = this.formatTime(
                element.open.time
              );
            }
          });
          i++;
        }
      }
    },
    formatTime(time) {
      return moment(time, ["HH.mm"]).format("hh:mm A");
    }
  },
  mounted() {}
};
</script>

<style></style>
