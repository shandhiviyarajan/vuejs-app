<template>
  <div class="info-wrapper">
    <v-flex class="aside-info">
      <div class="top_action_btns">
        <v-btn
          small
          class="btn_toggle_activate"
          :loading="active_station"
          :color="station.auth_status ? 'danger ' : 'success'"
          @click="activate"
        >
          {{ station.auth_status ? "Deactivate" : "Activate" }}
        </v-btn>

        <v-btn
          small
          class="btn_toggle_activate"
          color="danger"
          :loading="progress"
          @click="detachStation"
        >
          <i class="fa fa-chain-broken" aria-hidden="true"></i>
          Detach
        </v-btn>
      </div>
      <p>
        &nbsp;
      </p>
    </v-flex>
    <v-flex v-if="qr_image">
      <div class="aside-info__title">QR code</div>
      <img width="80px" :src="qr_image" alt="" />
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Device code</div>
      <div class="aside-info__value">{{ station.device_code }}</div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Device name</div>
      <div class="aside-info__value">{{ station.deviceName }}</div>
    </v-flex>
    <v-flex class="aside-info" v-if="station.location">
      <div class="aside-info__title">Location Name</div>
      <div class="aside-info__value">{{ station.location.name }}</div>
    </v-flex>
    <v-flex class="aside-info" v-if="station.location">
      <div class="aside-info__title">Location Address</div>
      <div class="aside-info__value">{{ station.location.address }}</div>
    </v-flex>

    <v-flex class="aside-info">
      <div class="aside-info__title">Status</div>
      <div class="aside-info__value">
        <v-chip small color="success" v-if="station.status == 'ONLINE'">
          {{ station.status }}
        </v-chip>
        <v-chip small color="warning" v-else-if="station.status == 'OFFLINE'">
          {{ station.status }}
        </v-chip>
        <v-chip small disabled color="default" v-else>
          {{ station.status }}
        </v-chip>
      </div>
    </v-flex>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      active_station: false,
      deactive_station: false,
      progress: false
    };
  },
  name: "Info",
  props: ["station", "single_station"],
  computed: {
    ...mapGetters("stations", ["singleStation"]),
    qr_image() {
      if (this.station.qr_code != null) {
        return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${this.station.qr_code}`;
      } else {
        return false;
      }
    }
  },
  methods: {
    //Get all stations actions
    ...mapActions("stations", [
      "activePowerStation",
      "deactivePowerStation",
      "detachPowerStation"
    ]),

    //Detach station
    detachStation() {
      this.progress = true;
      this.detachPowerStation(this.station._id)
        .then((success) => {
          this.progress = false;
        })
        .catch((error) => {
          this.progress = false;
        });
    },

    //Activate auth status
    activate() {
      this.active_station = true;
      if (this.station.auth_status == false) {
        this.activePowerStation(this.station._id)
          .then((response) => {
            if (response.data.success) {
              this.active_station = false;
            }
          })
          .finally(() => {
            this.active_station = false;
          });
      } else {
        this.deactivePowerStation(this.station._id)
          .then((response) => {
            if (response.data.success) {
              this.active_station = false;
            }
          })
          .finally(() => {
            this.active_station = false;
          });
      }
    }
  }
};
</script>
