<template>
  <DefaultLayout>
    <v-sheet class="overflow-hidden" id="data_table_role">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>User Roles</h2>
        </div>
        <div class="d-flex">
          <v-btn :loading="loading" @click="openDialog()" icon>+</v-btn>
        </div>
      </v-layout>
      <v-data-table
        class="tables_roles"
        :headers="table_headers"
        :items="list"
        single-select
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>
              {{ item.role_name }}
            </td>
            <td>
              {{ item.active_permissions.toString() }}
            </td>
            <td>
              <v-btn icon @click="openDialog(item.role_id)">
                <i class="fa fa-edit"></i>
              </v-btn>
            </td>
            <td>
              <v-dialog v-model="del_role_dialog" persistent max-width="450">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" v-show="item.isDefault != true">
                    <i class="fa fa-trash"></i>
                  </v-btn>
                </template>

                <v-card class="v-card-dialog">
                  <v-card-text>
                    <h3>Are you sure you want delete this role?</h3>
                  </v-card-text>
                  <v-card-actions align-center justify-center>
                    <v-btn class="secondary" @click="del_role_dialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      class="primary"
                      :loading="Dloading"
                      @click="remove(item.role_id)"
                      >Delete</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </tr>
        </template>
      </v-data-table>
      <!-- <v-pagination v-model="page" :length="24" :total-visible="6"></v-pagination> -->
    </v-sheet>

    <v-dialog
      v-model="dialog"
      class="role_dialog"
      width="80%"
      :persistent="true"
    >
      <v-card class="v-card-role">
        <v-btn icon @click="closeDialog" class="float-right">
          <i class="fa fa-close"></i>
        </v-btn>
        <v-form @submit.prevent="create">
          <v-row no-gutters>
            <div class="col-md-8">
              <div class="create-role">
                <p>
                  <strong>Role name</strong>
                </p>
                <div class="d-flex align-center">
                  <v-text-field
                    :hide-details="true"
                    :autofocus="true"
                    class="m-0"
                    v-model="role.name"
                    placeholder="Role name"
                  ></v-text-field>
                  <div>
                    <label for="check_all">
                      <input
                        id="check_all"
                        type="checkbox"
                        @click="check_all"
                      />
                      Choose all permissions
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <p>
                <strong>Select Permissions</strong>
              </p>
              <div class="all-permissions">
                <ul class="row no-gutters">
                  <li
                    class="col-md-3"
                    v-for="permission in all_permissions"
                    :key="permission.id"
                  >
                    <v-switch
                      class="switch-permission"
                      v-model="role.permissions"
                      :value="permission._id"
                      :label="permission.name"
                    ></v-switch>
                  </li>
                </ul>

                <v-btn
                  v-if="editing_role"
                  @click="update(editing_role_id)"
                  :loading="loading"
                  class="pull-right"
                  >Update Role</v-btn
                >
                <v-btn
                  v-else
                  type="submit"
                  :loading="loading"
                  class="pull-right"
                  >Create Role</v-btn
                >
              </div>
            </div>
            <p>&nbsp;</p>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </DefaultLayout>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import DefaultLayout from "@/layouts/default";
export default {
  name: "UserRoles",

  data: () => {
    return {
      del_role_dialog: false,
      page: 0,
      editing_role: false,
      editing_role_id: "",
      select_all: true,
      list: [
        {
          role_id: "",
          role_name: "Admin",
          active_permissions: "All permissions",
          actions: "",
          isDefault: false
        }
      ],
      table_headers: [
        { text: "Role name", value: "role_name", sortable: true },
        {
          text: "Active Permissions",
          value: "active_permissions",
          sortable: false
        },
        {
          text: "Update role",
          value: "actions",
          sortable: false
        }
      ],
      dialog: false,
      role: {
        name: "",
        permissions: []
      }
    };
  },
  components: {
    DefaultLayout
  },
  computed: {
    //Get states from permission modules
    ...mapState("permission", [
      "all_permissions",
      "all_roles",
      "single_role",
      "user_permissions",
      "loading"
    ]),
    ...mapGetters("loaders", [
      "loading",
      "Cloading",
      "Eloading",
      "Dloading",
      "Ddialog"
    ])
  },
  methods: {
    //Get methods from permission modules
    ...mapActions("permission", [
      "allPermissions",
      "allRoles",
      "getRole",
      "createRole",
      "deleteRole",
      "updateRole"
    ]),
    //Check all permissions when click checkbox
    check_all() {
      if (this.select_all) {
        this.select_all = false;
        this.all_permissions.forEach((v, i) => {
          this.role.permissions.push(v._id);
        });
      } else {
        this.select_all = true;
        this.role.permissions.splice(0, this.role.permissions.length);
      }
    },
    //open dialog box when click create role
    openDialog(id) {
      //Load all permissons if id is not defined
      if (id == undefined) {
        //reset permission name
        this.role.name = "";
        //reset all permissions
        this.role.permissions.splice(0, this.role.permissions.length);
        //editing false and creating new role is enabled
        this.editing_role = false;
        //Open dialog after loading all permissions
        this.allPermissions().then(success => {
          this.dialog = true;
        });
      } else {
        //reset permissions
        this.role.permissions.splice(0, this.role.permissions.length);
        //set editing option to roles
        this.editing_role = true;

        //set editing role id
        this.editing_role_id = id;

        // Get the single role if id is passed
        this.allPermissions().then(success => {
          //Get the current role
          this.getRole(id).then(success => {
            this.role.name = this.user_permissions.name;
            this.all_permissions.forEach((a, i) => {
              this.user_permissions.permissions.forEach((u, i) => {
                //checking user permissions available on all permissions and adding it to the permissions array
                if (a._id === u._id) {
                  this.role.permissions.unshift(a._id);
                }
              });
            });
            //open the dialog box after loading all permissions
            this.dialog = true;
          });
        });
      }
    },
    //close dialog//
    closeDialog() {
      this.dialog = false;
    },
    //Create new role
    create() {
      this.createRole(this.role).then(success => {
        //Fetch all roles after creating a role
        this.get_all_roles();
        this.dialog = false;
        this.$notify({
          group: "app",
          type: "success",
          title: this.role.name + " " + "user role created"
        });
      });
    },
    //Delete a role
    remove(id) {
      this.deleteRole(id).then(success => {
        //Fetch all roles after deleting a role
        this.get_all_roles();
        this.del_role_dialog = false;
      })
      .finally(() => (this.del_role_dialog = false));
    },
    //Update role
    update(id) {
      this.updateRole({ id: id, role: this.role }).then(success => {
        //Fetch all roles after updating a role
        this.get_all_roles();
        this.dialog = false;
      });
    },
    //Select a table row
    selectRow(row, data) {
      this.openDialog(row.role_id);
    },
    //Fetch all roles and manipulate the arrays
    get_all_roles() {
      this.allRoles()
        .then(response => {
          this.list = this.all_roles.map((v, i) => ({
            role_id: v._id,
            role_name: v.name,
            isDefault: v.isDefault,
            //Change the permission in to a string array
            active_permissions: v.permissions.map(function(p, i) {
              return p["name"] + " ";
            })
          }));
        })
        .catch(error => {
          this.$notify({
            group: "app",
            type: "error",
            title: this.$t("error.error_loading_permissions")
          });
        });
    }
  },
  mounted() {
    //Get all roles after view is loaded
    this.get_all_roles();
  }
};
</script>