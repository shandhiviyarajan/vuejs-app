<template>
  <DefaultLayout>
    <v-sheet
      class="overflow-hidden"
      id="data_table"
      :class="selected ? 'shrink' : ''"
    >
      <v-layout flex justify-space-between align-center>
        <h2>Power Bank listings</h2>

        <div class="d-flex">
          <div class="v-custom-search">
            <v-text-field
              v-model="search_powerbanks"
              placeholder="Search Power Banks"
              single-line
              hide-details
            ></v-text-field>
            <v-btn icon>
              <i class="fa fa-search"></i>
            </v-btn>
          </div>
        </div>
      </v-layout>

      <v-data-table
        :items-per-page="24"
        :headers="headers"
        :loading="progress"
        :items="ongoingPowerBanks"
        @click:row="selectRow"
        :search="search_powerbanks"
      >
        <template v-slot:[`item.status`]="{ item }">
          <span style="color:orange" v-if="item.status == 'rented'">
            <i class="fa fa-check-circle" aria-hidden="true"></i> Rented
          </span>
          <span color="success" style="color:green" v-else>
            Available
          </span>
        </template>
      </v-data-table>

      <v-pagination
        v-if="paginations.total > 10"
        v-model="paginations.page"
        :length="paginations.pages"
        @input="input"
      >
      </v-pagination>
    </v-sheet>
    <section class="left_navigation_drawer" :class="selected ? 'active' : ''">
      <v-form>
        <v-btn
          icon
          class="aside_toggle"
          :ripple="false"
          @click="toggleAside"
          v-show="selected"
        >
          <i
            class="fa"
            :class="selected ? 'fa-angle-right' : 'fa-angle-left'"
          ></i>
        </v-btn>
        <div class="left_navigation_drawer--content">
          <div class="info-wrapper" style="height:calc(100vh - 100px)">
            <v-flex class="aside-info">
              <div class="aside-info__title">
                Power Bank ID
              </div>
              <div class="aside-info__value">
                {{ table_row.powerBankId }} -
                <span style="color:orange" v-if="table_row.status == 'rented'">
                  <i class="fa fa-check-circle" aria-hidden="true"></i> Rented
                </span>
                <span color="success" style="color:green" v-else>
                  Available
                </span>
              </div>
            </v-flex>

            <v-flex class="aside-info">
              <div class="aside-info__title">
                Location
              </div>
              <div class="aside-info__value">
                <!-- <GmapMap
                  :center="{ lat: table_row.lat, lng: table_row.lng }"
                  :zoom="15"
                  style="width: 100%; height: 100px"
                >
                  <GmapMarker :position="table_row.position"
                /></GmapMap> -->

                <strong> {{ table_row.location }}</strong>
                <br />
                {{ table_row.address }} <br />
                {{ table_row.contact }}
              </div>
            </v-flex>

            <v-flex class="aside-info">
              <div class="aside-info__title">
                User
              </div>
              <div class="aside-info__value">{{ table_row.user }}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">
                User Email
              </div>
              <div class="aside-info__value">{{ table_row.user_email }}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">
                User mobile
              </div>
              <div class="aside-info__value">{{ table_row.user_mobile }}</div>
            </v-flex>

            <v-flex class="aside-info">
              <div class="aside-info__title">
                Merchant
              </div>
              <div class="aside-info__value">{{ table_row.merchant }}</div>
            </v-flex>

            <v-flex class="aside-info">
              <div class="aside-info__title">
                Merchant email
              </div>
              <div class="aside-info__value">
                {{ table_row.merchant_mobile }}
              </div>
            </v-flex>
          </div>
        </div>
      </v-form>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PowerBanks",
  data() {
    return {
      search_powerbanks: "",
      table_row: "",
      data: {
        page: 1
      },
      show_info: false,
      selected: false,
      ongoing_powerbanks: [],
      headers: [
        { text: "Power Bank ID", value: "powerBankId", sortable: false },
        { text: "User", value: "user" },
        { text: "Location", value: "location" },
        { text: "Merchant", value: "merchant" },
        { text: "Status", value: "status" }
      ]
    };
  },

  components: {
    DefaultLayout
  },
  computed: {
    ...mapGetters("powerbanks", [
      "get_ongoing_powerbanks",
      "progress",
      "paginations"
    ]),
    ongoingPowerBanks() {
      if (this.get_ongoing_powerbanks.length > 0) {
        return this.get_ongoing_powerbanks.map((powerbank, index) => ({
          powerBankId: powerbank.rentalId.powerBankId,
          location:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.name
              : "N/A",
          address:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.address
              : "N/A",
          contact:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.contactNumber
              : "N/A",
          position: {
            lat:
              powerbank.powerStation.location != null
                ? powerbank.powerStation.location.location.coordinates[0]
                : "N/A",
            lng:
              powerbank.powerStation.location != null
                ? powerbank.powerStation.location.location.coordinates[1]
                : "N/A"
          },
          lat:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.location.coordinates[0]
              : "N/A",
          lng:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.location.coordinates[1]
              : "N/A",

          merchant:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.merchantId.name
              : "N/A",
          merchant_mobile:
            powerbank.powerStation.location != null
              ? powerbank.powerStation.location.merchantId.mobileNumber
              : "N/A",
          status: powerbank.status,
          user: powerbank.rentalId.userId.name
            ? powerbank.rentalId.userId.name
            : "N/A",
          user_email: powerbank.rentalId.userId.email,
          user_mobile:
            powerbank.rentalId.userId.mobileNumber == "null"
              ? "N/A"
              : powerbank.rentalId.userId.mobileNumber
        }));
      }
    }
  },
  methods: {
    ...mapActions("powerbanks", ["allOngoingPowerBanks"]),
    //toggle aside
    toggleAside() {
      this.selected = !this.selected;
    },
    input(page_number) {
      this.data.page = page_number;
      this.allOngoingPowerBanks(this.data);
    },
    selectRow(data, row) {
      this.table_row = data;

      if (this.selected) {
        this.selected = false;
        setTimeout(() => {
          this.selected = true;
        }, 500);
      } else {
        this.selected = true;
      }
      //editable
      this.show_info = true;
    }
  },
  mounted() {
    this.allOngoingPowerBanks(this.data);
  }
};
</script>