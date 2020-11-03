<template>
  <DefaultLayout>
    <v-sheet class="overflow-hidden v_sheet" :class="selected ? 'shrink' : ''">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Request ID 21869436948</h2>
        </div>
      </v-layout>
      <v-layout row wrap>
        <v-flex md6>
          <v-layout row wrap align-start justify-start>
            <v-flex>
              <div class="v-profile__avatar pl-4">
                <v-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
                <div class="text-left">
                  <v-sheet class="pa-3 chat_sheet_l">Hello, world! I'm a simple v-sheet</v-sheet>
                </div>
              </div>
              <div class="v-profile__avatar pl-4">
                <v-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
                <div class="text-left">
                  <v-sheet class="pa-3 chat_sheet_l">Hello, world! I'm a simple v-sheet</v-sheet>
                </div>
              </div>
              <div class="v-profile__avatar pl-4">
                <v-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
                <div class="text-left">
                  <v-sheet
                    class="pa-3 chat_sheet_l"
                  >Sheets can accept a tile property which makes them rectangular (no border-radius).</v-sheet>
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md6></v-flex>
        <v-flex md6>
          <v-layout row wrap align-end justify-end>
            <div class="v-profile__avatar">
              <div class="text-left">
                <v-sheet shaped class="chat_sheet_r pa-3">Hello, world! I'm a simple v-sheet</v-sheet>
              </div>
              <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
              </v-avatar>
            </div>
            <div class="v-profile__avatar">
              <div class="v-profile__avatar">
                <div class="text-left">
                  <v-sheet
                    shaped
                    class="chat_sheet_r pa-3"
                  >Sheets can accept a tile property which makes them rectangular (no border-radius).😍😍😍</v-sheet>
                </div>
                <v-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
              </div>
            </div>
            <div class="v-profile__avatar">
              <div class="v-profile__avatar">
                <div class="text-left">
                  <v-sheet shaped class="chat_sheet_r pa-3">Hello, world! I'm a simple v-sheet</v-sheet>
                </div>
                <v-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
              </div>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-btn color="secondary">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-text-field></v-text-field>
        <v-btn color="secondary">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </v-btn>
      </v-layout>
    </v-sheet>
    <section class="left_navigation_drawer" :class="selected? 'active' :''">
      <v-form ref="form" lazy-validation>
        <v-btn icon class="aside_toggle" :ripple="false" @click="toggleAside">
          <i class="fa" :class="selected ? 'fa-angle-right' :'fa-angle-left'"></i>
        </v-btn>

        <div class="left_navigation_drawer--content">
          <div class="info-wrapper" v-show="!assignAccess">
            <v-flex class="aside-info">
              <div class="aside-info__title">Status</div>
              <div class="aside-info__value">Active</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Assign to</div>
              <div class="aside-info__value">Lou Ruiz</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Assignee Role</div>
              <div class="aside-info__value">Technician</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Request Id</div>
              <div class="aside-info__value">98327982</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">User Name</div>
              <div class="aside-info__value">Fanny Snyder</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">User Role By</div>
              <div class="aside-info__value">Merchant</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Created Date</div>
              <div class="aside-info__value">01 Sep 2020</div>
            </v-flex>
            <v-flex class="aside-info">
              <div class="aside-info__title">Last Activity</div>
              <div class="aside-info__value">Releigh View</div>
            </v-flex>
          </div>
          <div class="edit-form-wrapper" v-if="assignAccess">
            <label>Assign To</label>
            <v-text-field required></v-text-field>
            <label>User Role</label>
            <v-flex>
              <div class="d-flex">
                <div class="v-custom-select">
                  <select class="block" v-model="select">
                    <option value="admin">Admin</option>
                    <option value="merchant">Merchant</option>
                  </select>
                </div>
              </div>
            </v-flex>
          </div>
          <div class="aside-actions">
            <v-btn color="secondary" @click="assignNew" v-show="!assignAccess">Assign New</v-btn>
            <v-btn color="primary" v-show="!assignAccess">Mark As Solved</v-btn>
            <v-btn color="primary" v-show="assignAccess" @click="assignBack">Assign</v-btn>
          </div>
        </div>
      </v-form>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/default";

export default {
  data() {
    return {
      selected: false,
      show_info: false,
      assignAccess: false,
      select: "",
      shrink: false
    };
  },
  components: {
    DefaultLayout
  },
  methods: {
    toggleAside() {
      this.selected = !this.selected;
      this.shrink = !this.shrink;
    },
    assignNew() {
      this.assignAccess = true;
    },
    assignBack() {
      this.assignAccess = false;
    }
  }
};
</script>

<style>
.theme--light.v-sheet {
  background-color: #ffffff;
  border-color: #ffffff;
  color: rgb(255 255 255 / 87%);
}
</style>