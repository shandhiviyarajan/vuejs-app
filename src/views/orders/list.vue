<template>
  <DefaultLayout>
    <v-sheet class="overflow-hidden" id="data_table" :class="selected ? 'shrink': ''">
     <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Orders</h2>
        </div>
      </v-layout>
      <!-- <v-data-table :headers="headers" :items="list" @click:row="selectRow"></v-data-table> -->
      <!-- <v-pagination v-model="page" :length="24" :total-visible="6"></v-pagination> -->
    </v-sheet>

   
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";

export default {
    name:`OrderList`,
    components:{
DefaultLayout
    }
}
</script>