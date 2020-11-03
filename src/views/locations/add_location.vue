<template>
  <v-dialog max-width="1000" v-model="add_location_modal" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Add New Location</h2>
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeAddLocationModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-form class="v-form__add-locations" ref="form" v-model="form_valid">
        <v-row>
          <v-col cols="12" md="4">
            <div class="google-map-location">
              <label>Location</label>
            </div>
            <gmap-autocomplete
              placeholder="Type to get location"
              @place_changed="setPlace"
              :value="new_location.name"
            >
            </gmap-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <label>Contact number</label>
            <v-text-field
              :hide-details="false"
              v-model="new_location.contactNumber"
              placeholder="Contact number"
              :rules="validations.mobile"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <label>Email</label>
            <v-text-field
              v-model="new_location.email"
              :hide-details="false"
              placeholder="Email"
              required
              :rules="validations.emailRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <label>Web</label>
            <v-text-field
              v-model="new_location.web"
              :hide-details="false"
              placeholder="Web"
              :rules="validations.web"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <label>Tripadvisor</label>
            <v-text-field
              v-model="new_location.tripadvisor"
              :hide-details="false"
              placeholder="Tripadvisor"
              required
              :rules="validations.tripadvisor"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <label>Address</label>
            <v-text-field
              v-model="new_location.address"
              :hide-details="false"
              placeholder="Address"
              required
              :rules="validations.address"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <label>Open hours</label>
          </v-col>
          <v-col
            v-for="(day, i) in new_location.openHours[0]"
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
          <v-col cols="12" md="12">
            <label>Add power stations to the location</label>
            <div class="v-custom-autocomplete">
              <v-autocomplete
                v-model="new_location.powerStations"
                :items="toBindPowerStations"
                dense
                chips
                small-chips
                item-text="deviceName"
                item-value="_id"
                deletable-chips
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
                  <div>
                    <p>
                      {{ item.deviceName }}
                      <br />
                      <small>{{ item.device_code }} </small>
                    </p>
                  </div>
                </template>
              </v-autocomplete>
            </div>
          </v-col>
        </v-row>
        <div>
          <v-btn
            :loading="Cloading"
            color="primary"
            @click="handleAddLocation()"
          >
            Add Location
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  mixins: ["mixins"],
  name: "AddLocation",
  props: ["add_location_modal", "merchant_id"],

  data() {
    return {
      select: [],
      search: null,
      imageData: null,
      location_image: "",
      form_valid: true,
      validations: {
        mobile: [v => !!v || "Contact number is required"],
        emailRules: [
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            this.$t("error.invalid_email_message")
        ],
        req_email: [v => !!v || "Email is required"],
        web: [v => !!v || "Web is required"],
        tripadvisor: [v => !!v || "Tripadvisor is required"],
        address: [v => !!v || "Address is required"]
      },
      new_location: {
        name: "",
        coordinates: [],
        contactNumber: "",
        email: "",
        web: "",
        tripadvisor: "",
        address: "",
        openHours: [
          {
            monday: {
              start: "08:00 AM",
              end: "06:00 PM"
            },
            tuesday: {
              start: "08:00 AM",
              end: "06:00 PM"
            },
            wednesday: {
              start: "08:00 AM",
              end: "06:00 PM"
            },
            thursday: {
              start: "08:00 AM",
              end: "06:00 PM"
            },
            friday: {
              start: "08:00 AM",
              end: "06:00 PM"
            },
            saturday: {
              start: "Closed",
              end: "Closed"
            },
            sunday: {
              start: "Closed",
              end: "Closed"
            }
          }
        ],
        powerStations: [],
        merchantId: this.merchant_id,
        coverImage: []
      },
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

    toBindPowerStations: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        let powerStations = [];
        if (this.bindStations != null && this.bindStations.length > 0) {
          // set power station list
          this.bindStations.forEach(powerStation => {
            let obj = {
              _id: powerStation._id,
              deviceName: powerStation.deviceName || powerStation.device_code,
              device_code: powerStation.device_code
            };
            powerStations.push(obj);
          });
          return powerStations;
        }
      },
      set(val) {}
    }
  },
  methods: {
    ...mapActions("locations", ["createLocation"]),
    ...mapActions("stations", ["getStationsToBind"]),

    // choose image
    //@Todo - fix upload images
    chooseImage() {
      this.$refs.fileInput.click();
    },
    uploadImage(e) {
      if (e) {
        this.new_image = e.target.files[0];
      } else {
        this.new_image = this.myProfile.image;
      }
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    //Add location modal
    closeAddLocationModal() {
      this.$emit("closeAddLocationModal", false);
    },

    //Create location
    handleAddLocation() {
      if (this.$refs.form.validate()) {
        this.new_location.merchantId = this.merchant_id;
        this.createLocation(this.new_location)
          .then(success => {
            this.closeAddLocationModal();
            this.place = "";
            this.new_location = {
              name: "",
              coordinates: [],
              contactNumber: "",
              email: "",
              web: "",
              tripadvisor: "",
              address: "",
              openHours: [
                {
                  monday: {
                    start: "08:00 AM",
                    end: "06:00 PM"
                  },
                  tuesday: {
                    start: "08:00 AM",
                    end: "06:00 PM"
                  },
                  wednesday: {
                    start: "08:00 AM",
                    end: "06:00 PM"
                  },
                  thursday: {
                    start: "08:00 AM",
                    end: "06:00 PM"
                  },
                  friday: {
                    start: "08:00 AM",
                    end: "06:00 PM"
                  },
                  saturday: {
                    start: "Closed",
                    end: "Closed"
                  },
                  sunday: {
                    start: "Closed",
                    end: "Closed"
                  }
                }
              ],
              powerStations: [],
              merchantId: this.merchant_id,
              coverImage: []
            };
          })
          .catch(error => {
            
          });
      }
    },

    //Set place
    setPlace(place) {
      this.location_image = place.photos[0].getUrl();
      this.new_location.name = place.name;
      this.new_location.coordinates = [
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ];
      this.new_location.contactNumber = place.international_phone_number;
      this.new_location.web = place.website;
      this.new_location.address = place.formatted_address;
      var i = 0;
      if (place.opening_hours.periods) {
        for (const week_day in this.new_location.openHours[0]) {
          place.opening_hours.periods.forEach((element, index) => {
            if (i == index) {
              this.new_location.openHours[0][week_day].end = this.formatTime(
                element.close.time
              );
              this.new_location.openHours[0][week_day].start = this.formatTime(
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
  mounted() {
    this.getStationsToBind();
  }
};
</script>

<style></style>
