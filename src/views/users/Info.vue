<template>
  <div class="info-wrapper">
    <v-flex class="aside-info">
      <div class="aside-info__title">Name dd</div>
      <div class="aside-info__value">{{ table_row.name }}</div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Email address</div>
      <div class="aside-info__value">
        {{ table_row.email }}
      </div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Mobile number</div>
      <div class="aside-info__value">
        {{ table_row.mobileNumber }}
      </div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">User type</div>
      <div class="aside-info__value">
        {{ table_row.userType }}
      </div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Added Date</div>
      <div class="aside-info__value">{{ table_row.created_at }}</div>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: ["table_row"]
};
</script>