<template>
  <v-dialog max-width="1000" v-model="power_bank_modal" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Powerbanks</h2>
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closePowerBankModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-data-table
        color="primary"
        :headers="headers"
        :items="single_station.powerBanks"
      >
        <template #item.health="{item}"> {{ item.health }} % </template>
        <template #item.isUsing="{item}">
          <v-chip small color="default" v-if="item.isUsing == true">
            Using
          </v-chip>
          <v-chip small color="success" v-else>
            Availble
          </v-chip>
        </template>
        <template #item.battery_status="{item}">
          <span disabled style="color:green" v-if="item.battery_status == 0">
            Healthy
          </span>
          <span style="color:red" v-else>
            Damage
          </span>
        </template>
        <template #item.cable_status="{item}">
          <span disabled style="color:green" v-if="item.cable_status == 0">
            Healthy
          </span>
          <span style="color:red" v-else>
            Damage
          </span>
        </template>
        <template #item.temp="{item}"> {{ item.temp }} `C </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PowerBanks",
  props: ["power_bank_modal", "single_station"],
  data() {
    return {
      headers: [
        { text: "Device name", value: "deviceId", sortable: false },
        { text: "Health", value: "health" },
        { text: "Using", value: "isUsing" },
        { text: "Battery ", value: "battery_status", sortable: false },
        { text: "Cable ", value: "cable_status", sortable: false },
        { text: "Slot number", value: "slot" },
        { text: "Temperature 'C", value: "temp" }
      ]
    };
  },

  methods: {
    closePowerBankModal() {
      this.$emit("closePowerBankModal", false);
    }
  }
};
</script>
