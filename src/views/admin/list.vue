<template>
  <DefaultLayout>
    <v-sheet
      class="overflow-hidden"
      id="data_table"
      :class="selected ? 'shrink' : ''"
    >
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>{{ $t("admin.title") }}</h2>
        </div>
        <div class="d-flex">
          <SearchComp
            placeholder="Search Admins"
            :select="select"
            @searchClear="clearSearch()"
            @qSelections="querySelections($event)"
          />
          <v-btn icon @click="addNewRow" :class="{ close: selected }">+</v-btn>
        </div>
      </v-layout>
      <v-data-table
        :headers="headers"
        :loading="loading"
        :items="users_table"
        :search="users_search"
        :item-key="users_table._id"
        :single-select="singleSelect"
        @click:row="selectRow"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
        </template>
      </v-data-table>

      {{
        
      }}
     
      <v-pagination
        v-model="paginations.page"
        :total-visible="paginations.pages"
        :length="paginations.pages"
        @input="input"
      ></v-pagination> 
    </v-sheet>
    <section
      v-if="initial_drawer"
      class="left_navigation_drawer"
      :class="selected ? 'active' : ''"
    >
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
          <Info v-if="show_info" :table_row="table_row" />
          <Edit v-if="editable" :roles="allRoles" :table_row="table_row" />
          <Add v-if="add_new" @new-user="newUser" :roles="allRoles" />

          <div class="aside-actions">
            <v-btn
              v-if="add_new"
              color="primary"
              :loading="Cloading"
              @click="handleCreate"
              >{{ $t("admin.add") }}</v-btn
            >
            <v-btn
              v-if="!editable && !add_new"
              color="secondary"
              @click="editableAccess"
              >{{ $t("admin.edit") }}</v-btn
            >
            <v-btn
              color="primary"
              v-if="editable"
              :loading="Eloading"
              @click="handleUpdate(table_row._id)"
            >
              {{ $t("buttons.update") }}
            </v-btn>
            <v-btn
              v-if="!editable && !add_new"
              color="primary"
              @click="Dpopup(true)"
              >Remove user</v-btn
            >
            <v-dialog
              v-model="Ddialog"
              persistent
              max-width="450"
              v-if="!editable && !add_new"
            >
              <v-card class="v-card-dialog">
                <v-card-text>
                  <h3>Are you sure you want delete this user?</h3>
                </v-card-text>
                <v-card-actions align-center justify-center>
                  <v-btn class="secondary" @click="Dpopup(false)">Cancel</v-btn>
                  <v-btn
                    class="primary"
                    :loading="Dloading"
                    @click="handleDelete(table_row._id)"
                    >Delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-form>
    </section>
    <div></div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";
import Info from "@/views/admin/Info";
import Edit from "@/views/admin/Edit";
import Add from "@/views/admin/Add";
import VueTitle from "@/components/common/Title";
import { VueTelInput } from "vue-tel-input";
import { mapActions, mapGetters } from "vuex";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import { mixins } from "@/plugins/mixins";
import SearchComp from "@/components/common/Search";
import Table from "@/components/common/Table";

export default {
  mixins: ["mixins"],
  data() {
    return {
      accounts_modal: false,
      select: "",
      initial_drawer: false,
      delay: 400,
      users_search: "",
      dialogDel: false,
      element: {},
      drawer: null,
      page: 1,
      permanant: false,
      table_row: "",
      add_new: false,
      editable: false,
      show_info: false,
      singleSelect: true,
      selected: false,
      right_nav: false,
      page_data: {
        routeName: "",
        page: 1
      },

      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "mobileNumber" },
        { text: "Type", value: "userType" }
      ],
      users_data: "",
      add_user: {
        name: "",
        email: "",
        mobileNumber: "",
        roleID: ["-1"],
        userType: "ADMIN",
        password: ""
      },
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
      ]
    };
  },
  name: "AdminList",
  components: {
    DefaultLayout,
    VueTelInput,
    Info,
    Edit,
    Add,
    SearchComp,
    Table
  },
  watch: {},
  computed: {
    ...mapGetters("users", ["users","paginations"]),
    ...mapGetters("roles", ["allRoles"]),
    ...mapGetters("loaders", [
      "loading",
      "Cloading",
      "Eloading",
      "Dloading",
      "Ddialog"
    ]),

    users_table() {
      if (this.users != undefined) {
        this.users_data = this.users.map((user, index) => ({
          created_at: this.format_date(user.created_at),
          email: user.email,
          mobileNumber: user.mobileNumber.replace(/\s/g, ""),
          name: user.name,
          roleID: [user.roleID[0]._id],
          userType: user.userType,
          _id: user._id,
          addedBy: user.addedBy.name
        }));

        return this.users_data;
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.get_all_users(this.page);
  },
  methods: {
    //Get accoutns transactions
    ...mapActions("accounts", ["accountsBalance", "getTransactions"]),
    //get user actions
    ...mapActions("users", [
      "GET_ALL_USERS",
      "CREATE_USERS",
      "DELETE_USERS",
      "UPDATE_USERS",
      "searchUsers"
    ]),
    //get all roles
    ...mapActions("roles", ["getAllRoles"]),
    //on pagination click
    input(page_number) {
      this.page = page_number;
       this.$store.commit("users/SET_PAGE", page_number, { root: true });
       this.get_all_users(page_number);
    },
    //get the new user data from 'Add' component
    newUser(params) {
      this.add_user = params;
    },
    //get all users
    get_all_users(page_number) {
      this.page_data = {
        routeName: this.$route.name,
        page: page_number
      };
   
        this.getAllRoles();
        this.GET_ALL_USERS(this.page_data);
  
    },

    //Clear search
    clearSearch() {
      //send to first page on paginations
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

    //helper format date
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
    //Delete user
    handleDelete(id) {
      this.DELETE_USERS(id).then(response => {
        this.selected = false;
        this.get_all_users(this.page);
      });
    },
    //Create new user
    handleCreate() {
      this.CREATE_USERS(this.add_user).then(success => {
        this.selected = false;
      });
    },

    //Update existing user
    handleUpdate(id) {
      const bpay = {
        name: this.table_row.name,
        email: this.table_row.email,
        mobileNumber: this.table_row.mobileNumber.replace(/\s/g, ""),
        roleId: this.table_row.roleID[0]
      };

      const payload = {
        id: id,
        payload: bpay
      };
      this.UPDATE_USERS(payload).then(success => {
        this.selected = false;
      });
    },
    //Delete popup
    Dpopup(status) {
      if (status) {
        this.$store.commit("loaders/SET_DELETE_DIALOG", true);
      } else {
        this.$store.commit("loaders/SET_DELETE_DIALOG", false);
      }
    },
    //Toggle navigation drawer
    toggleAside() {
      this.selected = !this.selected;
    },
    //Toggle accoutns modal
    toggleAccounts(status) {
      if (status == true) {
        this.accountsBalance(this.table_row._id);
        this.getTransactions(this.table_row._id);
      }
      this.accounts_modal = status;
    },
    //select a table row
    selectRow(data, row) {
      this.$set(row, "isSelected", true);
      this.initial_drawer = true;
      this.table_row = data;
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
    },
    //Enable editable access
    editableAccess() {
      this.editable = true;
      this.add_new = this.show_info = false;
    },
    addNewRow() {
      this.initial_drawer = true;
      //add new user true
      this.add_new = true;
      //toggle navigation drawer
      this.toggleAside();
      //editable false
      this.editable = this.show_info = false;

      //Clear add user object
      this.add_user = {
        name: "",
        email: "",
        mobileNumber: "",
        roleID: ["-1"], //set the placeholder
        userType: "ADMIN",
        password: ""
      };
    }
  }
};
</script>

<style lang="css" scoped>
tbody td:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>