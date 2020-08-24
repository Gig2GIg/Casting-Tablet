<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>
    <div class="flex flex-col flex-1 justify-center items-center py-8 buefy-style">
      <template>
        <section class="w-full">
          <div class="container">
            <p class="text-3xl mb-5 text-white text-center">Manual Check-In</p>
            <div class="table-responsive">
              <b-table
                :data="rows"
                :bordered="true"
                :striped="true"
                :narrowed="false"
                :hoverable="false"
                :default-sort-direction="defaultSortDirection"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                :focusable="false"
                :mobile-cards="false"
              >
                <b-table-column field="image" label="Picture" v-slot="props" centered>
                  <img :src="props.row.image" width="50" height="50" />
                </b-table-column>

                <b-table-column
                  field="name"
                  label="Name"
                  sortable
                  v-slot="props"
                >{{ props.row.name }}</b-table-column>

                <b-table-column field="status" label="Status" v-slot="props">{{ props.row.status }}</b-table-column>

                <b-table-column field="appointment_time" label="Appointment Time" v-slot="props">
                  {{ props.row.appointment_time }}
                  <span v-if="props.row.is_checked_in">(Checked-In)</span>
                </b-table-column>

                <b-table-column label="Action" v-slot="props" centered>
                  <button
                    v-if="!props.row.is_checked_in"
                    class="py-2 px-4 border border-purple uppercase rounded cursor-pointer bg-white text-purple"
                    @click="updateCheckIn(props.row)"
                  >
                    <span>Check-In</span>
                  </button>
                </b-table-column>
              </b-table>
            </div>
          </div>
        </section>
      </template>

      <modal
        class="flex flex-col w-full items-center"
        :width="330"
        :height="237"
        name="modal_appointments_list"
      >
        <div class="flex justify-center w-full">
          <div class="w-full flex justify-center rounded-lg shadow-xl">
            <div class="p-6">
              <p class="text-purple text-center">Appointment type</p>
              <base-select
                v-model="slot_id"
                class="w-full"
                :custom-classes="['border border-purple']"
                placeholder="Select Appointment"
              >
                <option :value="''" disabled hidden>Select Appointment</option>
                <option
                  v-for="(item, index) in appointmentNotWalk.slots"
                  :value="item.id"
                  :key="index"
                >{{ item.time }}</option>
              </base-select>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center overflow-hidden">
          <base-button type="submit" class="mx-3 my-5" expanded @click="slotModalClose()">No</base-button>
          <base-button type="submit" class="mx-3 my-5" expanded @click.native="checkIn">Yes</base-button>
        </div>
      </modal>

      <modal class="flex flex-col w-full items-center" :width="540" height="197" name="modal_confirm_check_in">
        <div class="py-8 px-3">
            <h1 class="text-lg text-purple font-bold text-center">Manual Check-In</h1>
            <p class="text-lg text-purple text-center">Do you want to Manually Check-In this Performer?</p>
            <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                <div class="w-1/4">
                  <base-button type="submit" expanded @click="checkInDeclined()">
                      No
                  </base-button>
                </div>
                <div class="w-1/4 ml-3">
                  <base-button type="submit" expanded @click="confirmCheckin()">
                      Yes
                  </base-button>
                </div>

            </div>
        </div>
    </modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DEFINE from "../../utils/const.js";
import moment from "moment";
import { Table } from "buefy";
// import 'buefy/dist/buefy.css';
import "../../assets/scss/css/bue_table.css";
import Vue from "vue";

Vue.use(Table);

export default {
  components: {
    Loading,
  },
  data() {
    return {
      fullPage: true,
      slot_id: "",
      error: null,
      showAppointments: false,
      data: {},
      isLoading: false,
      nowTime: moment().format("HH:mm"),
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      checkInData: null,
      rows: [],
    };
  },
  created() {
    let passCode = localStorage.getItem(DEFINE.set_manual_pass_code_key);
    if (!passCode || passCode == "") {
      this.$toasted.error("You don't have passcode to access check-in mode.");
      this.$router.push({
        name: "auditions/detail",
        params: { id: this.$route.params.auditionId },
      });
    }
    this.getAllperforemrsWithSorting();
  },
  computed: {
    ...mapState("appointment", [
      "appointments",
      "userAppointment",
      "appointmentNotWalk",
    ]),
  },
  mounted() {},
  beforeDestroy() {
    //styles.unuse();
  },
  methods: {
    ...mapActions("appointment", [
      "fetch",
      "fetchUserAudition",
      "saveCheckIn",
      "fetchAppointmentNotWalk",
    ]),
    async updateCheckIn(data) {
      this.checkInData = {
        user: data.user,
        auditions: data.auditions,
        rol: data.rol,
        appointment_id: data.appointment_id,
      };
      if (data.slot != null) {
        this.checkInData.slot = data.slot;
        this.checkIn(this.checkInData);
        this.$modal.hide("modal_appointments_list");
      } else {
        await this.fetchAppointmentNotWalk(this.$route.params.id);
        this.$modal.show("modal_appointments_list");
      }
    },
    async checkIn(data) {
      if (data.slot == null) {
        this.checkInData.slot = this.slot_id;
        this.confirmCheckin();
      } else {
        this.checkInData.slot = data.slot;
        this.$modal.show("modal_confirm_check_in");
      }
    },
    checkInDeclined() {
      this.checkInData = {};
      this.$modal.hide("modal_confirm_check_in");
    },
    async confirmCheckin() {
      this.$modal.hide("modal_confirm_check_in");
      this.$modal.hide("modal_appointments_list");
      this.isLoading = true;
      let stateCheckin = await this.saveCheckIn(this.checkInData);
      if (stateCheckin) {
        this.isLoading = false;
        this.rows = [];
        this.$toasted.success("The Check-In has been successful");
        this.getAllperforemrsWithSorting();
        this.slot_id = "";
        this.checkInData = {};
      } else {
        this.isLoading = false;
        this.$modal.hide("modal_appointments_list");
        this.$modal.hide("modal_confirm_check_in");
        console.log("Invalid Data Given");
        this.slot_id = "";
        this.$toasted.error("Something went wrong!");
        this.checkInData = {};
      }
    },
    async getAllperforemrsWithSorting() {
      this.isLoading = true;
      let appointment_id = this.$route.params.id;
      let sort = "";
      try {
        let allData = await axios.get(
          `/t/auditions/getAllperforemrsWithSorting/${appointment_id}?orderByName=${sort}`
        );
        this.rows = allData.data.data;
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        this.$toasted.error("Something went wrong in fetching data!");
      } finally {
        this.isLoading = false;
      }
    },
    slotModalClose() {
      this.$modal.hide("modal_appointments_list");
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    logErrors(promise) {
      promise.catch(console.error);
    },
  },
};
</script>

<style  >
body,
html {
  height: 100%;
}
.button-detail {
  background-image: linear-gradient(#4d2545, #782541);
}
.back-button {
  margin-left: 27.5rem !important;
  margin-top: -1.9rem !important;
}
</style>
