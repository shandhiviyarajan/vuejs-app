<template>
  <div class="add-form-wrapper">
    <label>Name</label>
    <v-text-field
      placeholder="Name"
      required
      v-model="new_user.name"
    ></v-text-field>
    <label>Email</label>
    <v-text-field
      placeholder="Email address"
      required
      v-model="new_user.email"
    ></v-text-field>
    <label>Password</label>
    <v-text-field
      required
      placeholder="Password"
      v-model="new_user.password"
      type="password"
    ></v-text-field>
    <label>Mobile</label>
    <vue-tel-input
      v-bind="bindProps"
      v-model="new_user.mobileNumber"
      v-on:country-changed="countryChanged"
    ></vue-tel-input>
    <label>Commission (%)</label>
    <v-text-field
      required
      type="number"
      v-model="new_user.commission"
      placeholder="%"
      :rules="rules"
    ></v-text-field>
    <label>User Type</label>
    <div class="v-custom-select">
      <select
        class="block"
        placeholder="Select user type"
        v-model="new_user.userType"
      >
        <option value="ADMIN">Admin</option>
        <option selected value="MERCHANT">Merchant</option>
        <option value="TECHNICIAN">Technician</option>
      </select>
    </div>
    <label>User Role</label>
    <div class="v-custom-select">
      <select
        class="block"
        v-model="new_user.roleID[0]"
        placeholder="Select role"
      >
        <option value="-1">Select role</option>
        <option v-for="role in roles" :key="role._id" :value="role._id">{{
          role.name
        }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Add",
  props: ["roles"],
  data() {
    return {
      new_user: {
        name: "",
        email: "",
        mobileNumber: "",
        roleID: ["-1"],
        userType: "MERCHANT",
        password: "",
        commission: ""
      },
      country: null,
      bindProps: {
        mode: "international",
        placeholder: "Phone number",
        required: true,
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

  watch: {
    new_user: {
      deep: true,
      handler(val) {
        this.$emit("new-user", this.new_user);
      }
    }
  },
  methods: {
    countryChanged(country) {
      this.country = "+" + country.dialCode;
    }
  }
};
</script>