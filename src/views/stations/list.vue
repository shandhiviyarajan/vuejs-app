<template>
  <DefaultLayout>
    <v-sheet
      class="overflow-hidden"
      id="data_table"
      :class="selected ? 'shrink' : ''"
    >
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>{{ $t("stations.title") }}</h2>
        </div>

        <div class="d-flex">
          <div class="v-custom-search">
            <v-autocomplete
              v-model="select"
              :search-input.sync="search"
              item-value
              cache-items
              flat
              hide-no-data
              hide-selected
              append-icon
              placeholder="Search stations"
            ></v-autocomplete>
            <v-btn icon @click="clearSearch">
              <i class="fa fa-close" v-if="search != null"></i>
              <i class="fa fa-search" v-else></i>
            </v-btn>
          </div>
          <v-btn small color="warning" @click="syncAllStations">
            Sync &nbsp;
            <i
              class="fa fa-refresh"
              :class="{ 'fa-spin': sync_stations }"
              aria-hidden="true"
            ></i>
          </v-btn>
        </div>
      </v-layout>
      <v-data-table
        color="primary"
        :headers="headers"
        :loading="loading"
        :items-per-page="20"
        :items="stations_table"
        :search="stations_search"
        @click:row="selectRow"
      >
        <template v-slot:[`item.product_code`]="{ item }">
          {{ item.product_code }}
        </template>
        <template v-slot:[`item.cardslot_total`]="{ item }">
          <span class="slot_has">
            {{ item.cardslot_has }}
          </span>
          /
          <span class="slot_total">
            {{ item.cardslot_total }}
          </span>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip small color="success" v-if="item.status == 'ONLINE'">
            {{ item.status }}
          </v-chip>
          <v-chip small color="warning" v-else-if="item.status == 'OFFLINE'">
            {{ item.status }}
          </v-chip>
          <v-chip small disabled color="default" v-else>
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.auth_status`]="{ item }">
          <span disabled style="color:red" v-if="item.auth_status == false">
            Not Active
          </span>
          <span style="color:green" v-else>
            Active
          </span>
        </template>
        <template v-slot:[`item.isAssign`]="{ item }">
          <span color="warning" v-if="item.isAssign">
            Yes
          </span>
          <span color="success" v-else>
            No
          </span>
        </template>
      </v-data-table>
      <!-- show pagination if total is more than 10 -->
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
          <PowerBanks
            :power_bank_modal="power_bank_modal"
            
            @closePowerBankModal="togglePowerBanks"
            :single_station="singleStation"
          />
          <Info
            v-if="show_info"
            :station="send_single_station_data.powerStation"
          />
          <Edit v-if="editable" :station="table_row" />
          <div class="aside-actions">
            <v-btn
              v-if="powerBanks.length > 0"
              color="primary"
              @click="togglePowerBanks"
            >
              Show power banks
            </v-btn>

            <v-btn
              v-if="!add_new && !editable"
              color="secondary"
              @click="editableAccess"
              >Edit</v-btn
            >

            <v-btn
              color="primary"
              v-if="editable"
              :loading="Eloading"
              @click="handleUpdate(table_row._id)"
              >Update</v-btn
            >
            <v-dialog v-model="Ddialog" persistent max-width="450">
              <v-card>
                <v-card-text>
                  {{ $t("stations.confirm_message") }}
                </v-card-text>
                <v-card-actions align-center justify-center>
                  <v-btn
                    style="border-radius:0px; font-weight:bold"
                    outlined
                    color="orange pointer"
                    text
                    @click="Dpopup(false)"
                  >
                    {{ $t("buttons.cancel") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-form>
    </section>
  </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/default";
import Info from "@/views/stations/Info";
import Edit from "@/views/stations/Edit";
import PowerBanks from "@/views/stations/PowerBanks";
import { mapActions, mapGetters } from "vuex";
import { mixins } from "@/plugins/mixins";

export default {
  mixins: [mixins],
  name: "stations",
  components: {
    DefaultLayout,
    PowerBanks,
    Info,
    Edit
  },
  data() {
    return {
      send_single_station_data: "",
      select: "",
      is_power_banks: false,
      power_bank_modal: false,
      dialogDamaged: false,
      stations_search: "",
      loading_data: true,
      dialogDel: false,
      form_valid: false,
      element: {},
      shrink: false,
      page: 1,
      permanant: false,
      table_row: {},
      table_stations_list: [],
      add_new: false,
      editable: false,
      show_info: false,
      singleSelect: false,
      selected: false,
      new_device_product_key: "",
      new_device_name: "",
      new_device_secret: "",
      add_power_station: {
        productKey: "",
        deviceName: "",
        deviceSecret: ""
      },
      sync_stations: false,
      search: "",
      headers: [
        { text: "Device code", value: "device_code", sortable: false },
        { text: "QR code", value: "qr_code" },
        { text: "Name", value: "deviceName" },
        { text: "Available / Total", value: "cardslot_total", sortable: false },
        { text: "Status", value: "status" },
        { text: "Auth Status", value: "auth_status" },
        { text: "Assigned ", value: "isAssign", sortable: false }
      ]
    };
  },

  computed: {
    //Get power station functions
    ...mapGetters("stations", [
      "allStations",
      "singleStation",
      "paginations",
      "powerBanks",
      "oneLocation"
    ]),

    ...mapGetters("loaders", [
      "loading",
      "Cloading",
      "Eloading",
      "Dloading",
      "Ddialog"
    ]),

    stations_table() {
      return this.allStations.map((station, index) => ({
        product_code: station.product_code,
        device_code: station.device_code,
        account_uid: station.account_uid,
        deviceName: station.deviceName ? station.deviceName : "N/A",
        auth_status:
          station.auth_status != undefined ? station.auth_status : false,
        net_type: station.net_type,
        name: station.name,
        net_number: station.net_number,
        signal_intensity: station.signal_intensity
          ? station.signal_intensity
          : "N/A",
        isAssign: station.isAssign,
        _id: station._id,
        cardslot_has: station.cardslot_has,
        cardslot_non: station.cardslot_non,
        cardslot_total: station.cardslot_total,
        created_at: station.created_at,
        qr_code: station.qr_code != undefined ? station.qr_code : "N/A",
        status: station.status
      }));
    }
  },

  watch: {
    search(val) {
      if (val == "") {
        this.clearSearch();
      } else {
        val && val !== this.select && this.querySelections(val);
      }
    }
  },

  methods: {
    //Get all stations actions
    ...mapActions("stations", [
      "searchStations",
      "getAllStations",
      "getSingleStation",
      "updateStation",
      "deleteStation",
      "syncStations"
    ]),
    input(page_number) {
      this.$store.commit("stations/SET_PAGE", page_number, { root: true });
      this.page = page_number;
      this.getAllStations(page_number);
    },

    //Clear search
    clearSearch() {
      this.search = null;
      this.getAllStations(this.page);
    },

    //Sync all stations
    syncAllStations() {
      this.sync_stations = true;
      this.syncStations().then((response) => {
         this.sync_stations = (response.data.success) ? false : false;
      });
    },

    //Search options
    querySelections(query) {
      this.searchStations({
        page_number: this.paginations.page,
        query: query
      });
    },

    //Update stattions
    handleUpdate(id) {
      const bpay = {
        deviceName: this.table_row.deviceName,
        auth_status: this.table_row.auth_status
      };
      const payload = {
        id: id,
        payload: bpay
      };
      this.updateStation(payload);
      this.selected = false;
      this.editable = false;
    },

    //toogle Powerbanks
    togglePowerBanks() {
      if (
        this.singleStation != undefined ||
        this.singleStation.powerBanks.length > 0
      ) {
        this.power_bank_modal = !this.power_bank_modal;
      }
    },

    //toggle aside
    toggleAside() {
      this.selected = !this.selected;
    },

    //Select table row
    selectRow(data, row) {
      //get single power staion on row click//
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
      this.add_new = this.editable = false;
      //table shrink
      this.shrink = !this.shrink;
      this.getSingleStation(data._id).then((response) => {
        this.send_single_station_data = this.singleStation;
      });

      this.is_power_banks =
        this.singleStation.powerBanks != null &&
        this.singleStation.powerBanks.length > 0
          ? true
          : false;
    },
    //Edit stations
    editableAccess() {
      this.editable = true;
      this.add_new = this.show_info = false;
    }
  },
  mounted() {
    //get all power stations
    this.getAllStations(this.page);
  }
};
</script>
