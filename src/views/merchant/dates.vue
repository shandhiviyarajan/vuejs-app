<template>
  <v-layout row wrap class="pl-7">
          <v-flex md4>
            <label >{{date}}</label>
          </v-flex>
          <v-flex md4>
            <v-combobox
              label="start"
              v-model="startTimeSelect"
              :items="startTime"
              solo
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-combobox>
          </v-flex>
          <v-flex md4>
            <v-combobox
              label="start"
              v-model="endTimeSelect"
              :items="endTime"
              solo
              :menu-props="{ bottom: true, offsetY: true }"
            ></v-combobox>
          </v-flex>
        </v-layout>
</template>

<script>
export default {
    props: {
        date: {
            type : String
        }
    },
    name: 'datesComp',
    data() {
        return {
            startTimeSelect: [],
            endTimeSelect: [],
            startTime: ['8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am','12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm','3:00 pm','3:30 pm','4:00 pm','4:30 pm','5:00 pm','5:30 pm','6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm'],
            endTime: ['8:00 am','8:30 am','9:00 am','9:30 am','10:00 am','10:30 am','11:00 am','11:30 am','12:00 pm','12:30 pm','1:00 pm','1:30 pm','2:00 pm','2:30 pm','3:00 pm','3:30 pm','4:00 pm','4:30 pm','5:00 pm','5:30 pm','6:00 pm','6:30 pm','7:00 pm','7:30 pm','8:00 pm'],
        }
    },
    created() {
        
    },
}
</script>

<style>

</style>