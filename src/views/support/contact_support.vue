<template>
  <v-dialog v-model="location_modal" max-width="1000" persistent>
    <v-card class="support-popup">
      <v-card-title>
        <v-layout row wrap>
          <div class="page-title">
            <h2>Create New FAQ</h2>
          </div>
          <v-layout row wrap align-end justify-end>
            <v-btn color="secondary" @click="closeModal">x</v-btn>
          </v-layout>
        </v-layout>
      </v-card-title>
      <div class="pa-7">
        <v-layout row wrap>
          <v-flex md4 class="pa-3">
            <h3>Topic</h3>
            <v-text-field></v-text-field>
          </v-flex>
          <v-flex md4 class="pa-3">
            <h3>Sub Topic</h3>
            <v-text-field></v-text-field>
          </v-flex>
        </v-layout>

        <h3>Description</h3>
        <v-textarea auto-grow rows="8" row-height="30" solo shaped outlined :value="text"></v-textarea>
      </div>
      <v-layout row wrap class="pa-7">
        <v-flex>
          <!-- <v-layout row wrap align-start justify-start>
          <v-btn color="secondary" large>Back</v-btn>
          </v-layout>-->
        </v-flex>
        <v-flex>
          <v-layout row wrap align-end justify-end>
            <v-btn color="primary" large>Add</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      select: [],
      startTime: [
        "8:00 am",
        "8:30 am",
        "9:00 am",
        "9:30 am",
        "10:00 am",
        "10:30 am",
        "11:00 am",
        "11:30 am",
        "12:00 pm",
        "12:30 pm",
        "1:00 pm",
        "1:30 pm",
        "2:00 pm",
        "2:30 pm",
        "3:00 pm",
        "3:30 pm",
        "4:00 pm",
        "4:30 pm",
        "5:00 pm",
        "5:30 pm",
        "6:00 pm",
        "6:30 pm",
        "7:00 pm",
        "7:30 pm",
        "8:00 pm"
      ],
      endTime: [
        "8:00 am",
        "8:30 am",
        "9:00 am",
        "9:30 am",
        "10:00 am",
        "10:30 am",
        "11:00 am",
        "11:30 am",
        "12:00 pm",
        "12:30 pm",
        "1:00 pm",
        "1:30 pm",
        "2:00 pm",
        "2:30 pm",
        "3:00 pm",
        "3:30 pm",
        "4:00 pm",
        "4:30 pm",
        "5:00 pm",
        "5:30 pm",
        "6:00 pm",
        "6:30 pm",
        "7:00 pm",
        "7:30 pm",
        "8:00 pm"
      ],
      search: "",
      add_location_dialog: false,
      date: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    };
  },
  props: ["location_modal", "text"],
  components: {},
  methods: {
    closeModal() {
      this.$emit("closeModal", false);
    }
  }
};
</script>