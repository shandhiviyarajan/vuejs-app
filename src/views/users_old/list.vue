<template>
  <DefaultLayout>
    <v-sheet class="overflow-hidden" id="data_table" :class="selected ? 'shrink': ''">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>
            End User Listing
          </h2>
          <v-btn color="secondary" @click="addNewRow">+</v-btn>
        </div>
      </v-layout>

      <v-data-table :headers="headers" :items="table_items" @click:row="selectRow"></v-data-table>

      <v-pagination v-model="page" :length="10" :total-visible="4"></v-pagination>
    </v-sheet>
    <section class="left_navigation_drawer" :class="selected? 'active' :''">
      <v-form ref="form" v-model="form_valid" lazy-validation>
        <v-btn icon class="aside_toggle" :ripple="false" @click="toggleAside" v-show="selected">
          <i class="fa" :class="selected ? 'fa-angle-right' :'fa-angle-left'"></i>
        </v-btn>

        <div class="left_navigation_drawer--content">
          <div class="info-wrapper" v-if="show_info">
            <v-flex class="aside-info">
              <div class="aside-info__title">Name</div>
              <div class="aside-info__value">{{values.user_name}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Email</div>
              <div class="aside-info__value" v-if="!editable">{{values.email}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Mobile</div>
              <div class="aside-info__value" v-if="!editable">{{values.mobile}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">User Role</div>
              <div class="aside-info__value" v-if="!editable">{{values.user_role}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Joined Date</div>
              <div class="aside-info__value">{{values.joined_date}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Last Rental Date</div>
              <div class="aside-info__value">{{values.last_rental_date}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Last Rental Power Bank</div>
              <div class="aside-info__value">{{values.last_rental_power_bank}}</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Last Rental</div>
              <div class="aside-info__value">{{values.last_rental}}</div>
            </v-flex>
          </div>

          <div class="edit-form-wrapper" v-if="editable">
            <label>Name</label>
            <v-text-field required v-model="values.user_name"></v-text-field>
            <label>Email</label>
            <v-text-field required v-model="values.email"></v-text-field>
            <label>Mobile</label>
            <v-text-field required v-model="values.mobile"></v-text-field>
            <label>User Role</label>
            <v-flex >
              <v-combobox
                v-model="select"
                :items="roles"
                solo
              ></v-combobox>
            </v-flex>
            <label>Joined Date</label>
            <v-text-field required v-model="values.joined_date"></v-text-field>
            <label>Last Rental Date</label>
            <v-text-field required v-model="values.last_rental_date"></v-text-field>
            <label>Last Rental Power Bank</label>
            <v-text-field required v-model="values.last_rental_power_bank"></v-text-field>
            <label>Last Rental</label>
            <v-text-field required v-model="values.last_rental"></v-text-field>
          </div>

          <div class="add-form-wrapper" v-if="add_new">
            <label>Name</label>
            <v-text-field required v-model="new_name"></v-text-field>
            <label>Email</label>
            <v-text-field required v-model="new_email"></v-text-field>
            <label>Mobile</label>
            <v-text-field required v-model="new_mobile"></v-text-field>
            <label>User Role</label>
            <!-- <v-text-field required v-model="new_user_role"></v-text-field> -->
            <v-combobox
                v-model="new_user_role"
                :items="roles"
                solo
              ></v-combobox>
            <label>Joined Date</label>
            <v-text-field required v-model="new_joined_date"></v-text-field>
            <label>Last Rental Date</label>
            <v-text-field required v-model="new_last_rental_date"></v-text-field>
            <label>Last Rental Power Bank</label>
            <v-text-field required v-model="new_rental_power_bank"></v-text-field>
            <label>Last Rental</label>
            <v-text-field required v-model="new_last_rental"></v-text-field>
          </div>

          <div class="aside-actions">
            <v-btn v-if="add_new" color="primary" small @click="handleSaveUpdate">Add new</v-btn>
            <v-btn color="primary" v-if="editable" @click="handleUpdate">Save Changes</v-btn>
            <v-btn color="secondary" @click.stop="dialog = true">History</v-btn>
            <v-dialog
              v-model="dialog"
              max-width="1000"
              
            >
              <History :name="values.user_name"></History>
            </v-dialog>
            <v-btn v-if="!editable && !add_new" color="secondary" small @click="editableAccess">Edit User</v-btn>
            <v-dialog v-model="dialogDel" persistent max-width="450" v-if="!editable && !add_new">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on">Remove user</v-btn>
              </template>
              <v-card>
                <v-card-text>
                  Are you sure you want delete this user?
                </v-card-text>
                <v-card-actions align-center justify-center>
                  <v-btn
                    style="border-radius:0px; font-weight:bold"
                    outlined
                    color="orange pointer"
                    text
                    @click="dialogDel = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    style="border-radius:0px; font-weight:bold"
                    color="orange white--text"
                    text
                    @click="remove_power_station"
                  >
                    Delete
                  </v-btn>
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
import { CREATEHTTP, HTTP } from "@/plugins/api";
import History from "./history.vue";

export default {
  data() {
    return {
      dialog: false,
      salesDialog: false,
      add_location_dialog: false,
      select:[],
      roles: ['Admin','Merchant'],
      loading: false,
      dialogDel: false,
      form_valid: false,
      element: {},
      shrink: false,
      drawer: null,
      page: 1,
      permanant: false,

      values: {},
      add_new: false,
      editable: false,
      show_info: false,
      singleSelect: false,
      selected: false,

      search: "",
      headers: [
        { text: "Name", align: "start",  sortable: false,  value: "user_name"},
        { text: "User Id", value: "user_id" },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "mobile" },
        { text: "User Role", value: "user_role" },
        { text: "Joined Date", value: "joined_date" },
        { text: "Last Rental Date", value: "last_rental_date" },
        { text: "Last Rental Power Bank", value: "last_rental_power_bank" },
        { text: "Last Rental", value: "last_rental" }
      ],
      table_items: [
        {
          user_name: "Shan Dhiviyarajan",
          user_id: "8972170021",
          email: "user@website.com",
          mobile: "0779773225",
          user_role: "Admin",
          joined_date: "26 Mar 1992",
          last_rental_date: "26 Apr 1992",
          last_rental_power_bank: "Pb-212-sfd",
          last_rental: "$24"
        },
        {
          user_name: "Thiviya",
          user_id: "8972170022",
          email: "user@website.com",
          mobile: "0779773225",
          user_role: "Admin",
          joined_date: "26 Mar 1992",
          last_rental_date: "26 Apr 1992",
          last_rental_power_bank: "Pb-212-sfd",
          last_rental: "$24"
        },
        {
          user_name: "Amila ",
          user_id: "8972170023",
          email: "user@website.com",
          mobile: "0779773225",
          user_role: "Admin",
          joined_date: "26 Mar 1992",
          last_rental_date: "26 Apr 1992",
          last_rental_power_bank: "Pb-212-sfd",
          last_rental: "$24"
        },
        {
          user_name: "Gajaendrean",
          user_id: "8972170024",
          email: "user@website.com",
          mobile: "0779773225",
          user_role: "Admin",
          joined_date: "26 Mar 1992",
          last_rental_date: "26 Apr 1992",
          last_rental_power_bank: "Pb-212-sfd",
          last_rental: "$24"
        },
        {
          user_name: "Nipun Teekshana",
          user_id: "8972170021",
          email: "user@website.com",
          mobile: "0779773225",
          user_role: "Admin",
          joined_date: "26 Mar 1992",
          last_rental_date: "26 Apr 1992",
          last_rental_power_bank: "Pb-212-sfd",
          last_rental: "$24"
        }
      ],
      new_name:'',
      new_email:'',
      new_mobile:'',
      new_user_role:'',
      new_joined_date:'',
      new_last_rental_date:'',
      new_rental_power_bank:'',
      new_last_rental:'',
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
      ]
    };
  },
  name: "EndUsers",
  components: {
    DefaultLayout,
    History,
  },
  created() {
    
  },

  methods: {
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

    handleSaveUpdate() {
      this.selected = false;
    },

    handleUpdate() {
      this.selected = false;
    },

    updateSubmit() {
      
    },
    addNewRowSubmit() {

    },
    remove_power_station() {
      const vm = this;
      vm.dialogDel = false;
      // vm.get_all_users();
    },

    toggleAside() {
      this.selected = !this.selected;
    },
    selectRow(data, row) {
      //show active row
      var tr = document.getElementsByClassName("v-data-table__selected");
      while (tr.length > 0) {
        tr[0].classList.remove("v-data-table__selected");
      }
      this.values = data;
      //set active row
      row.select(true);

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
      this.add_new = this.selected = true;
      this.editable = this.show_info = false;
    }
  }
};
</script>
