<template>
  <div class="edit-form-wrapper">
    <label>User name</label>
 
    <v-text-field
      required
      v-model="table_row.name"

      placeholder="User name"
    ></v-text-field>
    <label>Email Address</label>
    <v-text-field
      placeholder="Email Address"
      required
      v-model="table_row.email"
    ></v-text-field>
    <label>Mobile</label>
    <vue-tel-input
      solo
      v-bind="bindProps"
      type="number"
      v-model="table_row.mobileNumber"
      v-on:country-changed="countryChanged"
    ></vue-tel-input>

    <!-- <label>User Role</label> -->
    <!-- <div class="v-custom-select">
      <select
        class="block"
        placeholder="Select user role"
        v-model="table_row.roleID[0]"
      >
        <option>Select role</option>
        <option v-for="role in roles" :key="role._id" :value="role._id">
          {{ role.name }}
        </option>
      </select>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: ["table_row", "roles"],
  data() {
    return {
      country: null,
      bindProps: {
        mode: "international",
        placeholder: "Phone number",
        required: false,
        enabledCountryCode: false,
        validCharactersOnly: true,
        enabledFlags: true,
        autocomplete: "off",
        name: "telephone",
        maxLen: 25,
        inputOptions: {
          showDialCode: true
        }
      }
    };
  },
  
  methods: {
    countryChanged(country) {
      this.country = "+" + country.dialCode;
    }
  }
};
</script>