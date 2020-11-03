<template>
  <DefaultLayout>
    <v-layout flex justify-space-between align-center class>
      <div class="page-title">
        <h2>Profile</h2>
      </div>
      <div>
        <v-btn icon @click="editProfile" v-if="!editable">
          <i class="fa fa-edit" aria-hidden="true"></i>
        </v-btn>
      </div>
    </v-layout>
    <v-layout v-if="!editable" class="profile">
      <v-flex md3>
        <div class="image-input pl-4 pt-5">
          <v-avatar size="200" tile>
            <img :src="myProfile.image ? myProfile.image : '/assets/profile_avatar.png'" />
          </v-avatar>
        </div>
      </v-flex>
      <v-flex md9>
        <v-layout row wrap>
          <v-flex>
            <h2>
              {{ myProfile.name }}
              <br />
              <span>
                <v-chip color="orange" small text-color="white">
                  {{ myProfile.userType }}
                </v-chip>
              </span>
            </h2>
          </v-flex>
        </v-layout>
        <br />
        <v-layout row wrap>
          <v-flex md5>
            <h4>Gender: Male</h4>
            <h4>Date of birth: 1990-March-26</h4>
          </v-flex>
          <v-flex md5>
            <h4>Email: {{ myProfile.email }}</h4>
            <h4>Contact No: {{ myProfile.mobileNumber }}</h4>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else class="profile">
      <v-flex>
        <v-form class="v-form__add-locations" ref="form" v-model="form_valid">
          <v-layout>
            <div
              class="image-input"
              :style="{ 'background-image': `url(${imageData})` ? `url(${imageData})`:`url(/assets/profile_avatar.png)` }"
              @click="chooseImage"
            >
              <v-icon small align-center justify-center>
                mdi-upload
              </v-icon>
              <input
                class="file-input"
                ref="fileInput"
                type="file"
                @change="uploadImage"
                @input="onSelectFile"
              />
            </div>
          </v-layout>
          <v-layout row wrap>
            <v-flex md4>
              <h3>Name</h3>
              <v-text-field
                v-model="myProfile.name"
                :rules="validations.name"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <h3>Gender</h3>
              <div class="v-custom-select">
                <select class="block">
                  <option selected>
                    Male
                  </option>
                  <option>
                    Female
                  </option>
                </select>
              </div>
            </v-flex>
            <v-flex md4>
              <h3>Birthday</h3>
              <v-text-field
                type="date"
                v-model="myProfile.birthDay"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md4>
              <h3>Email</h3>
              <v-text-field
                v-model="myProfile.email"
                :rules="validations.emailRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <h3 class="pb-3">Mobile</h3>
              <vue-tel-input
                v-bind="bindProps"
                v-model="myProfile.mobileNumber"
                v-on:country-changed="countryChanged"
              ></vue-tel-input>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md4>
              <h3>Password</h3>
              <v-text-field
                type="password"
                placeholder="Password"
                v-model="myProfile.oldPassword"
              ></v-text-field>
            </v-flex>
            <v-flex md4>
              <h3>Confirm Password</h3>
              <v-text-field
                type="password"
                placeholder="Confirm Password"
                v-model="myProfile.newPassword"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-end justify-end v-show="editable">
            <v-btn color="primary" @click="handleUpdate" large>Update</v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "My_Profile",
  components: {
    DefaultLayout
  },
  data: () => {
    return {
      form_valid: true,
      validations: {
        name: [v => !!v || "Name is required"],
        mobile: [v => v.length>10 || "Please enter valid mobile number"],
        emailRules: [
          v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Please enter valid email"
        ]
      },
      editable: false,
      current_user: "",
      imageData: null,
      new_image: "",
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
      }
    };
  },

  computed: {
    ...mapGetters("auth", ["myProfile"]),
    edit_user() {
      this.current_user = this.myProfile;
      return this.current_user;
    }
  },
  methods: {
    ...mapActions("auth", ["imageUpload", "updateUser"]),
    // country code select
    countryChanged(country) {
      this.country = "+" + country.dialCode;
    },
    // pick image
    uploadImage(e) {
      if (e) {
        this.new_image = e.target.files[0];
      } else {
        this.new_image = this.myProfile.image;
      }
    },
    // handle validation
    handleUpdate() {
      if (this.$refs.form.validate()) {
        this.updateProfile();
      } else {
      }
    },
    
    // update profile
    updateProfile() {
      const id = this.myProfile._id;

      const new_data = {
        name: this.myProfile.name,
        mobileNumber: this.myProfile.mobileNumber.replace(/\s/g, ""),
        email: this.myProfile.email,
        roleId: this.myProfile.roleID[0]._id
      };
      const payload = {
        id: id,
        payload: new_data,
        type: "Admin"
      };
      this.updateUser(payload);
      // upload image
      if (this.new_image) {
        let new_form_data = new FormData();
        new_form_data.append("image", this.new_image);
        this.imageUpload(new_form_data);
      }

      this.editable = false;
    },

    chooseImage() {
      this.$refs.fileInput.click();
    },
    onSelectFile() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageData = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
    // edit profile access
    editProfile() {
      if (this.myProfile.image) {
        this.imageData = this.myProfile.image;
      }
      this.editable = !this.editable;
    }
  }
};
</script>
