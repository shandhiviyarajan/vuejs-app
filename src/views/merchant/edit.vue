<template>
  <div class="edit-form-wrapper">
    <label>Name</label>
    <v-text-field required v-model="table_row.name"></v-text-field>
    <label>Email</label>
    <v-text-field required v-model="table_row.email"></v-text-field>
    <label>Mobile</label>
    <vue-tel-input
      v-bind="bindProps"
      v-model="table_row.mobileNumber"
      v-on:country-changed="countryChanged"
    ></vue-tel-input>
    <label>Commission (%)</label>
    <v-text-field
      required
      type="number"
      v-model="table_row.commission"
      placeholder="%"
      :rules="rules" 
    ></v-text-field>
    <label>User Role</label>
    <div class="v-custom-select">
      <select
        class="block"
        placeholder="Select user role"
        v-model="table_row.roleID[0]"
      >
        <option>Select user roles</option>
        <option v-for="role in roles" :key="role._id" :value="role._id">
          {{ role.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      country: null,
      bindProps: {
        mode: "international",
        placeholder: "Enter a phone number",
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
      },
      rules: [
        v => !!v || "Required",
        v => v <= 100 || "Commission should not be above 100%"
      ]
    };
  },
  name: "Edit",
  props: ["table_row", "roles"],
  methods: {
    countryChanged(country) {
      this.country = "+" + country.dialCode;
    }
  }
};
</script>