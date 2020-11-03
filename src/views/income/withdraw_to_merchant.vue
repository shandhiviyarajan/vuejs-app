<template>
  <v-dialog max-width="1000" v-model="merchant_withdraw_model" persistent>
    <v-card class="app-modal">
      <v-layout flex justify-space-between align-center>
        <div class="page-title">
          <h2>Withdraw To Merchant</h2>
        </div>
        <div class="d-flex">
          <v-btn elevation="0" icon @click="closeModal">
            <i class="fa fa-times"></i>
          </v-btn>
        </div>
      </v-layout>
      <v-form class="v-form__add-locations" ref="form" v-model="form_valid">
        <v-row>
          <v-col cols="12" md="3">
            <div>
              <label>Merchant</label>
              <div class="v-custom-autocomplete">
                <v-autocomplete
                  v-model="id"
                  :items="allmerchants"
                  dense
                  chips
                  small-chips
                  item-text="name"
                  item-value="_id"
                  deletable-chips
                  placeholder="Search by power station ID or Name"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        <strong>
                          No powerstations available
                        </strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>

                  <template v-slot:item="{ item }">
                    <div>
                      <p>
                        {{ item.name }}
                      </p>
                    </div>
                  </template>
                </v-autocomplete>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Net Income</div>
              <div class="summary-value">$2345.67</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Total Withdrawn</div>
              <div class="summary-value">$345.67</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <div class="summary">
              <div class="summary-title">Pending</div>
              <div class="summary-value">$123</div>
            </div>
          </v-col>
          <v-col cols="12" md="3">
            <label>Transfer Amount</label>
            <v-text-field
              :hide-details="false"
              placeholder="Transfer Amount"
              required
              v-model="amount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <label>Notes</label>
            <div>
              <v-text-field
                placeholder="Notes"
                v-model="comment"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <div>
          <v-layout row wrap align-end justify-end>
            <v-btn color="primary" @click="withdrawMerchant">
              Transfer Money
            </v-btn>
          </v-layout>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "WithdrawToMerchant",
  props: ["merchant_withdraw_model"],

  data() {
    return {
      form_valid: true,
      comment: "",
      id: "",
      amount: ""
    };
  },
  computed: {
    ...mapGetters("accounts", ["allmerchants"])
  },
  methods: {
    ...mapActions("accounts", ["withdrawnToMerchant", "getAllMerchants"]),

    withdrawMerchant() {
      const payload = {
        comment: this.comment,
        userId: this.id,
        amount: this.amount
      };
      this.withdrawnToMerchant(payload);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal", false);
      (this.comment = ""), (this.id = ""), (this.amount = "");
    }
  },
  mounted() {
    this.getAllMerchants();
  }
};
</script>

<style></style>
