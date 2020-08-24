<template>
    <div>
        <loading
            :active.sync="isLoading"
            :can-cancel="true"
            :on-cancel="onCancel"
            :is-full-page="fullPage"
        >
        </loading>
        <div class="flex flex-col flex-1 justify-center items-center py-8" id='vue-root'>
            <template>
                <section class="w-full">
                    <div class="container">
                        <p class="w-full text-3xl mb-5 text-white text-center">Manual Check-In</p>
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
                                :mobile-cards="false">

                                <b-table-column field="image" label="Picture" v-slot="props" centered>
                                    <img :src=props.row.image width='50' height='50'>
                                </b-table-column>

                                <b-table-column field="name" label="Name" sortable v-slot="props">
                                    {{ props.row.name }}
                                </b-table-column>

                                <b-table-column field="status" label="Status" v-slot="props">
                                    {{ props.row.status }}
                                </b-table-column>

                                <b-table-column field="appointment_time" label="Appointment Time" v-slot="props">
                                    {{ props.row.appointment_time }} <p v-if="props.row.is_checked_in">(Checked-In)</p>
                                </b-table-column>

                                <b-table-column label="Action" v-slot="props" centered>
                                    <button v-if="!props.row.is_checked_in" class="py-2 px-4 border border-purple uppercase rounded cursor-pointer bg-white text-purple" @click="updateCheckIn(props.row)">
                                        <span>Check-In</span>
                                    </button>
                                </b-table-column>
                            </b-table>
                        </div>
                    </div>
                </section>
            </template>

            <div v-if="showAppointments" class="flex justify-center w-full mt-16">
                <div class="w-full flex justify-center rounded-lg shadow-xl">
                    <div class="m-6 w-1/5">
                        <p class="pt-5 text-purple">Appointment type</p>
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
                            >{{ item.time }}
                            </option>
                        </base-select>
                    </div>
                </div>
            </div>

            <div v-if="showAppointments" class="flex justify-center w-full">
                <div class="w-1/4 flex justify-center">
                    <base-button
                            @click.native="checkIn"
                            text="text-white"
                            color="button-detail"
                            type="submit"
                            class="m-5"
                            expanded
                    >Submit
                    </base-button>
                </div>
            </div>
        </div>
            
    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from "vuex";  
    import axios from "axios";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    import DEFINE from '../../utils/const.js';
    import moment from "moment";
    import { Table } from 'buefy'
    import 'buefy/dist/buefy.css'
    import Vue from 'vue';

    Vue.use(Table)

    export default {
        components: {
            Loading
        },
        data() {
            return {
                fullPage: true,
                slot_id: "",
                error: null,
                showAppointments: false,                
                data: {},
                isLoading: false,
                nowTime: moment().format('HH:mm'),
                defaultSortDirection: 'asc',
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                checkInData : null,
                rows: [],
            };
        },
        created() {
            let passCode = localStorage.getItem(DEFINE.set_manual_pass_code_key);
            if(!passCode || passCode == ''){
                this.$toasted.error("You don't have passcode to access check-in mode.");
                this.$router.push({ name: 'auditions/detail', params: {id: this.$route.params.auditionId } });
            }   
            this.getAllperforemrsWithSorting();
        },
        computed: {
            ...mapState("appointment", [
                "appointments",
                "userAppointment",
                "appointmentNotWalk"
            ])
        },
        mounted() {
        },
        methods: {
            ...mapActions("appointment", [
                "fetch",
                "fetchUserAudition",
                "saveCheckIn",
                "fetchAppointmentNotWalk"
            ]),
            async updateCheckIn(data) {
                this.checkInData = {
                    user: data.user,
                    auditions: data.auditions,
                    rol: data.rol,
                    appointment_id: data.appointment_id
                };
                if(data.slot != null){
                    this.checkInData.slot = data.slot;
                    this.checkIn(this.checkInData);
                    this.showAppointments = false;
                } else {
                    await this.fetchAppointmentNotWalk(this.$route.params.id);
                    this.showAppointments = true;
                }
            },
            async checkIn(data){
                if(data.slot == null){
                    this.checkInData.slot = this.slot_id;
                } else {
                    this.checkInData.slot = data.slot;
                }
                console.log(this.checkInData);
                this.isLoading = true;
                let stateCheckin = await this.saveCheckIn(this.checkInData);
                if (stateCheckin) {
                    this.isLoading = false;
                    this.showAppointments = false;
                    this.rows = [];
                    this.$toasted.success("The Check-In has been successful");
                    this.getAllperforemrsWithSorting();
                    this.slot_id = "";
                } else {
                    this.isLoading = false;
                    this.showAppointments = false;
                    console.log("Invalid Data Given");
                    this.slot_id = "";
                    this.$toasted.error("Something went wrong!");
                }
            },
            async getAllperforemrsWithSorting(){
                this.isLoading = true;
                let appointment_id = this.$route.params.id;
                let sort = "";
                try {
                    let allData = await axios.get(`/t/auditions/getAllperforemrsWithSorting/${appointment_id}?orderByName=${sort}`);
                    this.rows = allData.data.data;
                    this.isLoading = false;
                } catch (e) {
                    this.isLoading = false;
                    this.$toasted.error("Something went wrong in fetching data!");
                } finally {
                    this.isLoading = false;
                }
            },
            onCancel() {
                console.log("User cancelled the loader.");
            },
            logErrors(promise) {
                promise.catch(console.error);
            },
        }
    };
</script>
<style>
    body,
    html {
        height: 100%;
    }
    .button-detail {
        background-image: linear-gradient(#4d2545, #782541);
    }
    .back-button {
        margin-left: 27.5rem !important;
        margin-top: -1.9rem !important
    }
    .container {
        padding-left: 15px;
        padding-right: 15px;
    }
    .table-responsive {
        max-width: 100%;
        overflow: auto;
    }
    .table {
        border-collapse: collapse !important;
    }

    .table td{
        vertical-align: middle !important;
    }
    .table img{
        display: inline-block !important;
    }
    .table th{
        vertical-align: middle !important;
    }
    .manualCheckIn-layout {
        height: auto !important;
    }
    .table button span {
        white-space: nowrap;
    }
    .mdi-arrow-up {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #4D2545;
    }
</style>
