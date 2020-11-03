<template>
  <div class="info-wrapper" >
    <v-flex class="aside-info">
      <div class="aside-info__title">Name</div>
      <div class="aside-info__value">{{ table_row.name }}</div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Email</div>
      <div class="aside-info__value" v-if="!editable">
        {{ table_row.email }}
      </div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">Mobile</div>
      <div class="aside-info__value" v-if="!editable">
        {{ table_row.mobileNumber }}
      </div>
    </v-flex>
     <v-flex class="aside-info">
      <div class="aside-info__title">Commission (%)</div>
      <div class="aside-info__value" v-if="!editable">
        {{ table_row.commission }} %
      </div>
    </v-flex>
    <v-flex class="aside-info">
      <div class="aside-info__title">User type</div>
      <div class="aside-info__value" v-if="!editable">
        {{ table_row.userType }}
      </div>
    </v-flex>

     <v-flex class="aside-info">
      <div class="aside-info__title">Created at</div>
      <div class="aside-info__value" v-if="!editable">
        {{ table_row.created_at }}
      </div>
    </v-flex>

     <v-flex class="aside-info">
      <div class="aside-info__title">Added By</div>
      <div class="aside-info__value" v-if="!editable">
        {{ table_row.addedBy }}
      </div>
    </v-flex>
  </div>
</template>
<script>
export default {
  name: "Info",
  props: ["table_row","editable"]
};
</script>