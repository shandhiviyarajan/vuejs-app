<template>
  <DefaultLayout>
    <v-sheet
      class="overflow-hidden"
      id="data_table"
      :class="selected ? 'shrink' : ''"
    >
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Technician Listing</h2>
        </div>
        <div class="d-flex">
          <SearchComp
            placeholder="Search Technicians"
            :select="select"
            @searchClear="clearSearch()"
            @qSelections="querySelections($event)"
          />
          <v-btn icon @click="addNewRow" :class="{ close: selected }">+</v-btn>
        </div>
      </v-layout>
      <v-data-table
        :search="users_search"
        :headers="headers"
        :items="users_table"
        :loading="loading"
        @click:row="selectRow"
      >
      </v-data-table>
    </v-sheet>
    <section class="left_navigation_drawer" :class="selected ? 'active' : ''">
      <v-form ref="form" v-model="form_valid" lazy-validation>
        <v-btn
          icon
          class="aside_toggle"
          :ripple="false"
          @click="toggleAside"
          v-show="selected"
        >
          <i
            class="fa"
            :class="selected ? 'fa-angle-right' : 'fa-angle-left'"
          ></i>
        </v-btn>
        <div class="left_navigation_drawer--content">
          <Info :table_row="table_row" v-if="show_info" :editable="editable" />

          <div class="edit-form-wrapper" v-if="editable">
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
                <option
                  v-for="role in allRoles"
                  :key="role._id"
                  :value="role._id"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="add-form-wrapper" v-if="add_new">
            <label>Name</label>
            <v-text-field
              required
              placeholder="Name"
              v-model="add_user.name"
            ></v-text-field>
            <label>Email address</label>
            <v-text-field
              required
              placeholder="Email address"
              v-model="add_user.email"
            ></v-text-field>
            <label>Password</label>
            <v-text-field
              required
              placeholder="Password"
              v-model="add_user.password"
              type="password"
            ></v-text-field>
            <label>Mobile No</label>
            <vue-tel-input
              v-bind="bindProps"
              v-model="add_user.mobileNumber"
              v-on:country-changed="countryChanged"
            ></vue-tel-input>
            <label>Commission (%)</label>
            <v-text-field
              required
              type="number"
              v-model="add_user.commission"
              placeholder="%"
              :rules="rules"
            ></v-text-field>
            <label>User Type</label>
            <div class="v-custom-select">
              <select
                class="block"
                placeholder="Select user type"
                v-model="add_user.userType"
              >
                <option value="ADMIN">Admin</option>
                <option value="MERCHANT">Merchant</option>
                <option selected value="TECHNICIAN">Technician</option>
              </select>
            </div>

            <label>User Role</label>
            <div class="v-custom-select">
              <select
                class="block"
                placeholder="Select user role"
                v-model="add_user.roleID[0]"
              >
                <option value="-1">Select role</option>
                <option
                  v-for="role in allRoles"
                  :key="role._id"
                  :value="role._id"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="aside-actions">
            <v-btn v-if="add_new" color="primary" @click="handleCreate"
              >Add new</v-btn
            >
            <v-btn
              color="primary"
              v-if="editable"
              @click="handleUpdate(table_row._id)"
              >Save Changes</v-btn
            >
            <v-dialog v-model="dialog" max-width="1000">
              <Inventory :name="table_row.user_name"></Inventory>
            </v-dialog>
            <v-dialog v-model="salesDialog" max-width="1000">
              <Reports :name="table_row.user_name"></Reports>
            </v-dialog>
            <v-btn
              v-if="!editable && !add_new"
              color="primary"
              @click="editableAccess"
              >Edit User</v-btn
            >
            <v-btn
              v-if="!editable && !add_new"
              color="secondary"
              @click="Dpopup(true)"
              >{{ $t("buttons.delete") }}</v-btn
            >

            <!-- delete message -->
            <v-dialog
              v-model="Ddialog"
              persistent
              max-width="450"
              v-if="!editable && !add_new"
            >
              <v-card class="v-card-dialog v-card-dialog-delete">
                <v-card-text>
                  <h3>
                    {{ $t("error.are_you_sure") }}
                    <span>{{ table_row.name }}</span> user ?
                  </h3>
                </v-card-text>
                <v-card-actions align-center justify-center>
                  <v-btn class="primary" @click="Dpopup(false)">{{
                    $t("buttons.no")
                  }}</v-btn>
                  <v-btn
                    class="secondary"
                    :loading="Dloading"
                    @click="handleDelete(table_row._id)"
                    >{{ $t("buttons.yes") }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-form>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
import Info from "@/views/technician/Info";
import Inventory from "./inventory";
import Reports from "./reports";
import { mapActions, mapGetters } from "vuex";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import SearchComp from "@/components/common/Search";

export default {
  name: "TechnicianList",
  data() {
    return {
      country: null,
      bindProps: {
        mode: "international",
        placeholder: "Phone number",
        required: true,
        enabledCountryCode: false,
        enabledFlags: true,
        autocomplete: "off",
        name: "telephone",
        validCharactersOnly: true,
        maxLen: 25,
        inputOptions: {
          showDialCode: false
        }
      },
      select: null,
      users_search: "",
      dialog: false,
      salesDialog: false,
      add_location_dialog: false,
      select: [],
      items: ["Admin", "Merchant"],
      dialogDel: false,
      form_valid: false,
      element: {},
      shrink: false,
      drawer: null,
      page: 1,
      permanant: false,

      table_row: {},
      add_new: false,
      editable: false,
      show_info: false,
      singleSelect: false,
      selected: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "mobileNumber" },

        { text: "Type", value: "userType" },
        { text: "Added Date", value: "created_at" },
        { text: "Added By", value: "addedBy" }
      ],
      new_name: "",
      new_email: "",
      new_mobile: "",
      new_user_role: "",
      new_added_date: "",
      new_added_by: "",
      selected_item_id: "",
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      add_user: {
        name: "",
        email: "",
        mobileNumber: "",
        roleID: ["-1"],
        userType: "TECHNICIAN",
        password: ""
      },
      rules: [
        v => !!v || "Required",
        v => v <= 100 || "Commission should not be above 100%"
      ]
    };
  },
  name: "TechnicianList",
  watch: {},
  computed: {
    ...mapGetters("users", ["users"]),
    ...mapGetters("loaders", [
      "loading",
      "Cloading",
      "Eloading",
      "Dloading",
      "Ddialog"
    ]),
    ...mapGetters("roles", ["allRoles"]),
    users_table() {
      if (this.users != undefined) {
        this.users_data = this.users.map((user, index) => ({
          addedBy: user.addedBy.name,
          created_at: this.format_date(user.created_at),
          email: user.email,
          mobileNumber: user.mobileNumber.replace(/\s/g, ""),
          name: user.name,
          roleID: [user.roleID[0]._id],
          userType: user.userType,
          _id: user._id
        }));
        return this.users_data;
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.get_all_users();
  },
  components: {
    DefaultLayout,
    Inventory,
    Reports,
    Info,
    SearchComp
  },

  methods: {
    ...mapActions("users", [
      "GET_ALL_USERS",
      "CREATE_USERS",
      "DELETE_USERS",
      "UPDATE_USERS",
      "searchUsers"
    ]),
    ...mapActions("roles", ["getAllRoles"]),
    //format date
    format_date(date) {
      let timestamp = new Date(date);
      let month = timestamp.getMonth();
      return (
        timestamp.getDate() +
        " " +
        this.months[month] +
        " " +
        timestamp.getFullYear()
      );
    },
    countryChanged(country) {
      this.country = "+" + country.dialCode;
    },
    clearSearch() {
      this.get_all_users();
    },
    //Search options
    querySelections(v) {
      const data = {
        routeName: this.$route.name,
        page: 1,
        query: v
      };
      setTimeout(() => {
        this.searchUsers(data);
      }, this.delay);
    },
    //Get all users
    get_all_users() {
      const data = {
        routeName: this.$route.name,
        page: 1
      };
      this.getAllRoles();
      this.GET_ALL_USERS(data);
    },
    //create users
    handleCreate() {
      this.CREATE_USERS(this.add_user).then(success => {
        this.selected = false;
      });
    },

    //Update existing user
    handleUpdate(id) {
      const technician_update = {
        name: this.table_row.name,
        email: this.table_row.email,
        mobileNumber: this.table_row.mobileNumber.replace(/\s/g, ""),
        roleId: this.table_row.roleID[0],
        commission: this.table_row.commission
      };

      const payload = {
        id: id,
        payload: technician_update
      };
      this.UPDATE_USERS(payload).then(success => {
        this.selected = false;
      });
    },
    handleDelete(id) {
      this.DELETE_USERS(id).then(response => {
        this.selected = false;
        this.get_all_users();
        this.dialogDel = false;
      });
    },

    //Delete popups
    Dpopup(status) {
      if (status) {
        this.$store.commit("loaders/SET_DELETE_DIALOG", true, { root: true });
      } else {
        this.$store.commit("loaders/SET_DELETE_DIALOG", false, { root: true });
      }
    },

    toggleAside() {
      this.selected = !this.selected;
    },
    selectRow(data, row) {
      this.table_row = data;
      //set active row

      //toggle right side navigation
      if (this.selected) {
        this.selected = false;
        setTimeout(() => {
          this.selected = true;
        }, 500);
      } else {
        this.selected = true;
      }
      //editable
      this.show_info = true;
      this.add_new = this.editable = false;
      //table shrink
      this.shrink = !this.shrink;
    },
    editableAccess() {
      this.editable = true;
      this.add_new = this.show_info = false;
    },
    addNewRow() {
      this.add_new = true;
      this.toggleAside();
      this.editable = this.show_info = false;
      this.add_user = {
        name: "",
        email: "",
        mobileNumber: "",
        roleID: ["-1"],
        userType: "TECHNICIAN",
        password: ""
      };
    }
  }
};
</script>
