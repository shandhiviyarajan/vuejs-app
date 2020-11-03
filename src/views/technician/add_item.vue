<template>
  <v-card>
    <v-card-title>
      <v-layout row wrap>
         <v-flex md10>
             <h2>Inventory / Technician Name</h2>
         </v-flex>
        <v-flex md1>
          <v-btn color="secondary" >x</v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-layout row wrap  class="edit-form-wrapper">
      <v-flex md4 class="pa-5">
          <label>Item Type </label>
          <div >
            <v-select
              v-model="select_item_type"
              :items="item_type"
            ></v-select>
            <!-- <v-combobox
                v-model="select_item_type"
                :items="item_type"
                solo
              ></v-combobox> -->
          </div>
      </v-flex>
      <v-flex md4 class="pa-5">
        <label>ID</label>
        <div class="edit-form-wrapper">
          <v-text-field required></v-text-field>
        </div>
      </v-flex>
      <v-flex md4 class="pa-5">
        <label>Assign By</label>
        <div class="edit-form-wrapper">
          <v-text-field required></v-text-field>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md4 class="pa-5">
          <label>Assign Date</label>
          <div class="edit-form-wrapper">
            <v-text-field required></v-text-field>
          </div>
      </v-flex>
      <v-flex md4 class="pa-5">
        <label>Status</label>
        <div class="edit-form-wrapper">
           <v-select
              v-model="select_status"
              :items="status"
            ></v-select>
          <!-- <v-combobox
                v-model="select_status"
                :items="status"
                solo
              ></v-combobox> -->
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="pr-5">
      <v-flex md10>
        <v-layout row wrap align-start justify-start class="pl-6">
          <v-btn color="secondary" large>Back</v-btn>
        </v-layout>
      </v-flex>
      <v-flex md2>
        <v-layout row wrap align-end justify-end class="">
          <v-btn color="primary" large>Assign Item</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
// import DatesComp from "./dates.vue";

export default {
  data() {
    return {
      item_type: ['Power Bank'],
      status: ['Active', 'Damaged'],
      select_item_type: '',
      select_status: '',
      startTime: ['8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am','12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm','3:00 pm','3:30 pm','4:00 pm','4:30 pm','5:00 pm','5:30 pm','6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm'],
      endTime: ['8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am','12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm','3:00 pm','3:30 pm','4:00 pm','4:30 pm','5:00 pm','5:30 pm','6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm'],
      search: "",
      add_location_dialog: false,
      date: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    };
  },
  components: {
    // DatesComp
  },
  methods:{
    closeDialog: function() {
      this.$router.push({
        name:'Merchant'
      })
    }
  }
};
</script>