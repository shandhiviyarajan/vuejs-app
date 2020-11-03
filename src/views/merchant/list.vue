<template>
  <DefaultLayout>
    <v-sheet
      class="overflow-hidden"
      id="data_table"
      :class="selected ? 'shrink' : ''"
    >
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>
            {{ $t("merchant.title") }}
          </h2>
        </div>
        <div class="d-flex">
          <SearchComponent
            placeholder="Search Merchants"
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
        :loading="loading"
        :items="users_table"
        :item-key="users_table._id"
        :single-select="singleSelect"
        @click:row="selectRow"
      >
        <template v-slot:[`item.commission`]="{ item }">
          {{ item.commission }} %
        </template>
      </v-data-table>
       <v-pagination
        v-model="paginations.page"
        :total-visible="paginations.pages"
        :length="paginations.pages"
        @input="input"
      ></v-pagination> 

      
    </v-sheet>
    <section class="left_navigation_drawer" :class="selected ? 'active' : ''">
      <v-form>
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
          <div class="edit_btns">
            <v-btn
              v-if="!editable && !add_new"
              icon
              color="secondary"
              @click="editableAccess"
            >
              <i class="fa fa-edit"></i>
            </v-btn>
            <v-btn
              v-if="!editable && !add_new"
              icon
              color="secondary"
              @click="Dpopup(true)"
            >
              <i class="fa fa-trash"></i
            ></v-btn>
          </div>

          <Info :table_row="values" v-if="show_info" />
          <Edit :table_row="values" :roles="allRoles" v-if="editable" />
          <Add @new-user="newUser" :roles="allRoles" v-if="add_new" />
          <Locations
            :merchant_id="values._id"
            :location_modal="location_modal"
            :name="values.name"
            @closeModal="toggleLocation(false)"
          />
          <Accounts
            :user_id="values._id"
            :name="values.name"
            :accounts_modal="accounts_modal"
            @closeModal="toggleAccounts(false)"
          />

          <div class="aside-actions">
            <v-btn
              v-if="add_new"
              color="primary"
              :loading="Cloading"
              @click="handleCreate"
            >
              {{ $t("admin.add") }}
            </v-btn>
            <v-btn
              color="primary"
              v-if="editable"
              :loading="Eloading"
              @click="handleUpdate(values._id)"
              >{{ $t("buttons.save") }}</v-btn
            >

            <v-btn
              v-if="!editable && !add_new"
              color="primary"
              @click="toggleLocation(true)"
              >{{ $t("buttons.view_locations") }}</v-btn
            >
            <v-btn
              v-if="!editable && !add_new"
              color="secondary"
              @click="toggleAccounts(true)"
              >Accounts Balance</v-btn
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
                    <span>{{ values.name }}</span> user ?
                  </h3>
                </v-card-text>
                <v-card-actions align-center justify-center>
                  <v-btn class="primary" @click="Dpopup(false)">{{
                    $t("buttons.no")
                  }}</v-btn>
                  <v-btn
                    class="secondary"
                    :loading="Dloading"
                    @click="handleDelete(values._id)"
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
import Locations from "../locations/list.vue";
import Accounts from "@/views/accounts/balance.vue";
import Info from "./info.vue";
import Edit from "./edit.vue";
import Add from "./add.vue";
import { mapActions, mapGetters } from "vuex";
import { mixins } from "@/plugins/mixins";
import SearchComponent from "@/components/common/Search";

export default {
  mixins: ["mixins"],
  data() {
    return {
      select: null,
      singleSelect: true,
      close_nav: false,
      delay: 400,
      users_search: "",
      date: new Date().toISOString().substr(0, 10),
      location_modal: false,
      accounts_modal: false,
      sales_modal: false,
      add_location_dialog: false,
      items: ["Admin"],
      dialogDel: false,
      form_valid: false,
      element: {},
      shrink: false,
      drawer: null,
      page: 1,
      page_data:{
        merchant_id:'',
        page:1
      },

      permanant: false,
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
      values: {},
      add_new: false,
      editable: false,
      show_info: false,
      selected: false,
      user_table: "",
      search: "",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "mobileNumber" },
        { text: "Commission", value: "commission" },
        { text: "Type", value: "userType" }
      ],

      add_user: {},
      selected_item_id: ""
    };
  },
  name: "Merchant",
  components: {
    DefaultLayout,
    Locations,
    Accounts,
    Info,
    Edit,
    Add,
    SearchComponent
  },

  watch: {},

  computed: {
    //get users
    ...mapGetters("users", ["users","paginations"]),
    //get roles
    ...mapGetters("roles", ["allRoles"]),
    //get all loaders
    ...mapGetters("loaders", [
      "loading",
      "Cloading",
      "Eloading",
      "Dloading",
      "Ddialog"
    ]),

    ...mapGetters('accounts',["action_paginations"]),

    //manipulated array for users table with formatted date
    users_table() {
      if (this.users != undefined) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.users_data = this.users.map(user => ({
          addedBy: user.addedBy.name,
          created_at: this.format_date(user.created_at),
          email: user.email,
          mobileNumber: user.mobileNumber,
          name: user.name,
          roleID: [user.roleID[0]._id],
          userType: user.userType,
          commission: user.commission,
          _id: user._id
        }));
        return this.users_data;
      } else {
        return [];
      }
    }
  },

  methods: {
    //get all user actions
    ...mapActions("users", [
      "GET_ALL_USERS",
      "CREATE_USERS",
      "DELETE_USERS",
      "UPDATE_USERS",
      "searchUsers"
    ]),
    //get wallet actions
    ...mapActions("accounts", ["accountsBalance", "getTransactions"]),

    //get all locations actions
    ...mapActions("locations", ["getMerchantLocations"]),

    //get all roles
    ...mapActions("roles", ["getAllRoles"]),

    //get the new user data from 'Add' component
    newUser(params) {
      this.add_user = params;
    },

     //on pagination click
    input(page_number) {
      this.page = page_number;
       this.$store.commit("users/SET_PAGE", page_number, { root: true });
       this.get_all_users(page_number);
    },

    get_all_users(page_number) {
      const data = {
        routeName: this.$route.name,
        page: page_number
      };
      this.GET_ALL_USERS(data);
    },

    //Clear search
    clearSearch() {
      this.get_all_users(this.page);
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

    //format date
    format_date(timestamp) {
      let date = new Date(timestamp);
      return (
        date.getFullYear() +
        " - " +
        this.months[date.getMonth()] +
        " - " +
        date.getDate()
      );
    },
    //handle delete
    handleDelete(id) {
      this.DELETE_USERS(id);
    },

    //create mercant
    handleCreate() {
      this.CREATE_USERS(this.add_user).then(success => {
        this.selected = false;
      });
    },
    //update merchant
    handleUpdate(id) {
      const updated_merchant = {
        name: this.values.name,
        email: this.values.email,
        mobileNumber: this.values.mobileNumber.replace(/\s/g, ""),
        commission: this.values.commission,
        roleId: this.values.roleID[0]
      };

      const payload = {
        id: id,
        payload: updated_merchant
      };
      this.UPDATE_USERS(payload).then(success => {
        this.selected = false;
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

    //toggle Aside
    toggleAside() {
      this.selected = !this.selected;
    },
    //select a table row
    selectRow(data, row) {
      this.$set(row, "isSelected", true);
      this.initial_drawer = true;
      this.values = data;
      //toggle right side navigation

      if (this.selected) {
        this.selected = false;
        setTimeout(() => {
          this.selected = true;
        }, this.delay);
      } else {
        this.selected = true;
      }
      //editable
      this.show_info = true;
      this.add_new = this.editable = false;
      //table shrink
      this.shrink = !this.shrink;
    },

    //Editable conditions
    editableAccess() {
      //Get all roles from API
      this.getAllRoles();
      this.editable = true;
      this.add_new = this.show_info = false;
    },
    //Add new user conditions
    addNewRow() {
      //Toggle side bar
      //Get all roles from API
      this.getAllRoles();
      this.toggleAside();
      this.initial_drawer = true;
      this.add_new = true;
      this.editable = this.show_info = false;

      //add user object
      this.add_user = {
        name: "",
        email: "",
        mobileNumber: "",
        roleID: ["-1"], //set the placeholder
        userType: "MERCHANT",
        password: ""
      };
    },

    //Get merchant locations
    toggleLocation(status) {
      //pass the merchant id to fetch merchant locations
      if (status == true) {
        this.getMerchantLocations(this.values._id);
      }
      this.location_modal = status;
    },

    toggleAccounts(status) {
      this.page_data = {
        id:this.values._id,
        page:this.page
      }

      if (status == true) {
        this.accountsBalance(this.values._id);
        this.getTransactions(this.page_data);
      }
      this.accounts_modal = status;
    }
  },

  mounted() {
    this.get_all_users();
  }
};
</script>
