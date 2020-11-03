<template>
  <v-dialog persistent>
    <v-card class="v-card-dialog v-card-dialog-delete">
      <v-card-text>
        <h3>
          {{ title }}
        </h3>
      </v-card-text>
      <v-card-actions>
        <v-btn class="primary" @click="Dpopup(false)">No</v-btn>
        <v-btn
          class="secondary"
          :loading="Dloading"
          @click="DELETE_USERS(values._id)"
          >Yes</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogView",
  props: ["title"]
};
</script>