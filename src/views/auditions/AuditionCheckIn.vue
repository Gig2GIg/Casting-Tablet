<template>
    <div>
        <img v-if="showWalkInQr" src="/images/icons/left_arrow_white.png" class="absolute back-button cursor-pointer" @click="useWalkinQRClose()">
        <div class="flex flex-col flex-1 justify-center items-center text-white py-16 h-full">
            <p
                    v-if="init"
                    class="text-xl tracking-wider font-bold"
            >{{this.$route.params.title}} | {{this.$route.params.startTime}}</p>
            
            <p v-if="scan" class="text-xl tracking-wider font-bold">Scan Your QR code to Sign In</p>
            <p v-if="showWalkInQr" class="text-xl tracking-wider font-bold">I'm a New User</p>

            <!-- <p v-if="scan" class="text-xl tracking-wider font-bold">
            You've Checked-In Successfully!
            </p>-->
            <div v-if="init" class="flex w-full max-w-xl mt-16">
                <base-button
                        type="submit"
                        text="text-purple"
                        color="bg-white"
                        class="m-5 bg-white"
                        expanded
                        @click.native="useScanner"
                >I Have an Appoinment
                </base-button>

                <base-button
                        text="text-white"
                        color="bg-purple"
                        type="submit"
                        class="m-5"
                        expanded
                        @click.native="useWalkinQR"
                >I'm a Walk In
                </base-button>
            </div>
            <div v-if="init" class="flex w-half max-w-xl mt-16">
                <router-link :to="{ name: 'auditions/detail', params: {id: this.$route.params.auditionId } }">
                    <base-button
                            type="submit"
                            text="text-white"
                            color="bg-orange-500"
                            class="m-5 bg-orange-500"
                            expanded
                    >Not Now
                    </base-button>
                </router-link>
            </div>
            <p v-if="scan" class="decode-result" @click="changeScanner">Change method</p>
            <div v-if="showWalkInQr" class="flex justify-center w-full max-w-xl mt-16">
                <div class="w-1/1 flex justify-center rounded-lg shadow-xl">
                    <div class="m-6">
                        <img :src="qr_code_walkin" class="w-32 h-32 block m-auto"/>
                    </div>
                </div>
            </div>
            <p v-if="showWalkInQr" class="text-xl tracking-wider font-bold">Scan To Download and Create Your Account!</p>
            <div v-if="scan" class="flex w-full max-w-xl mt-16">
                <p v-if="error !== null" class="drop-error">{{ error }}</p>
                <qrcode-stream v-if="cam" @decode="onDecode" @init="onInit"/>
                <qrcode-drop-zone
                        v-if="image"
                        class="w-full"
                        @detect="onDetect"
                        @dragover="onDragOver"
                        @init="logErrors"
                >
                    <div class="drop-area" :class="{ 'dragover': dragover }">DROP SOME IMAGES HERE</div>
                </qrcode-drop-zone>
            </div>
            <div v-if="prechecked" class="flex justify-center w-full max-w-xl mt-16">
                <div class="bg-white w-8/12 flex justify-center rounded-lg shadow-xl">
                    <div class="m-6">
                        <img :src="userAppointment.image" class="w-32 h-32 block m-auto"/>
                        <p
                                class="text-purple text-3xl tracking-wider font-bold text-center"
                        >{{userAppointment.name}}</p>
                        <p class="text-purple text-lg font-bold text-center">{{userAppointment.hour}} Appoinment</p>
                    </div>
                </div>
            </div>

            <div v-if="prechecked" class="flex justify-center w-full mt-16">
                <div class="w-1/4 flex justify-center">
                    <base-button
                            @click="reset"
                            text="text-white"
                            color="button-detail"
                            type="submit"
                            class="m-5"
                            expanded
                    >Done
                    </base-button>
                </div>
            </div>

            <div v-if="showAppointments" class="flex justify-center w-full mt-16">
                <div class="w-full flex justify-center rounded-lg shadow-xl">
                    <div class="m-6 w-1/5">
                        <p class="pt-5 text-purple">Appointment type</p>
                        <base-select
                                v-model="appointment_id"
                                class="w-full"
                                :custom-classes="['border border-purple']"
                                @input="makeSlots"
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
                            @click.native="updateCheckIn"
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
        <section
                v-if="scan||prechecked||showAppointments"
                class="bg-gray-100 flex flex-col items-center h-full w-1/5 overflow-scroll"
        >
            <div class="flex w-full mt-10">
                <div class="w-full text-center font-bold text-purple text-xl">
                    Audition
                    <br/>Appointments
                </div>
            </div>
            <div v-for="data in appointments" :key="data.id" class="w-full">
                <div class="flex w-full -mb-5">
                    <div class="w-1/2 text-center m-8 float-left">
                        <h4 class="text-left text-sm text-purple">{{ data.name }}</h4>
                    </div>
                    <div class="w-1/2 text-center m-8 float-right">
                        <h4 class="text-right text-sm font-bold text-purple">{{ data.time }}</h4>
                    </div>
                </div>
                <div class="w-full border border-gray-300"/>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapActions, mapState, mapGetters} from "vuex";
    import DEFINE from '../../utils/const.js';
    console.log("TCL: DEFINE", DEFINE)
    export default {
        data() {
            return {
                email: "",
                password: "",
                init: true,
                scan: false,
                prechecked: false,
                appointment_id: "",
                isLoading: false,
                result: null,
                error: null,
                dragover: false,
                showAppointments: false,                
                cam: true,
                image: false,
                showWalkInQr : false,
                qr_code_walkin : DEFINE.qr_code_walkin,
                data: {}
            };
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
            async reset() {
                let stateCheckin = await this.saveCheckIn(this.data);
                this.$toasted.success("The check-in has been successfully");
                this.data = {};
                this.init = true;
                this.scan = false;
                this.prechecked = false;
                this.appointment_id = "";
            },
            useScanner() {
                this.init = false;
                this.scan = true;
                this.showWalkInQr = false;
                this.fetch(this.$route.params.id);
            },
            useWalkinQR(){
                this.init = false;
                this.scan = false;
                this.showWalkInQr = true;
            },
            useWalkinQRClose(){
                this.init = true;
                this.scan = false;
                this.showWalkInQr = false;
            },
            async onInit(promise) {
                try {
                    await promise;
                } catch (error) {
                    if (error.name === "NotAllowedError") {
                        this.error = "ERROR: you need to grant camera access permisson";
                    } else if (error.name === "NotFoundError") {
                        this.error = "ERROR: no camera on this device";
                    } else if (error.name === "NotSupportedError") {
                        this.error = "ERROR: secure context required (HTTPS, localhost)";
                    } else if (error.name === "NotReadableError") {
                        this.error = "ERROR: is the camera already in use?";
                    } else if (error.name === "OverconstrainedError") {
                        this.error = "ERROR: installed cameras are not suitable";
                    } else if (error.name === "StreamApiNotSupportedError") {
                        this.error = "ERROR: Stream API is not supported in this browser";
                    }
                }
            },
            async onDecode(result) {
                this.result = JSON.parse(result);
                if (this.result.hour !== null) {
                    await this.fetchUserAudition(this.result);
                    let data = {
                        slot: this.userAppointment.slot_id,
                        user: this.result.userId,
                        auditions: this.result.auditionId,
                        rol: this.result.rolId,
                        appointment_id: this.result.appointmentId
                    };
                    let stateCheckin = await this.saveCheckIn(data);
                    if (stateCheckin) {
                        this.scan = false;
                        this.prechecked = true;
                    } else {
                        this.$toasted.error("Invalid Data Given");
                    }
                } else {
                    await this.fetchAppointmentNotWalk(this.$route.params.id);
                    this.scan = false;
                    this.showAppointments = true;
                }
            },
            async updateCheckIn() {
                console.log(this.appointment_id);
                await this.fetchUserAudition(this.result);
                let data = {
                    slot: this.appointment_id,
                    user: this.result.userId,
                    auditions: this.result.auditionId,
                    rol: this.result.rolId,
                    appointment_id: this.result.appointmentId
                };
                let stateCheckin = await this.saveCheckIn(data);
                if (stateCheckin) {
                    this.scan = false;
                    this.showAppointments = false;
                    this.prechecked = true;
                    await this.fetchUserAudition(this.result);
                } else {
                    console.log("Invalid Data Given");
                }
            },
            changeScanner() {
                if (this.cam) {
                    this.cam = false;
                    this.image = true;
                } else {
                    this.cam = true;
                    this.image = false;
                }
            },
            async onDetect(promise) {
                try {
                    const {content} = await promise;

                    this.result = JSON.parse(content);
                    if (this.result.hour !== null) {
                        await this.fetchUserAudition(this.result);
                        let data = {
                            slot: this.userAppointment.slot_id,
                            user: this.result.userId,
                            auditions: this.result.auditionId,
                            rol: this.result.rolId,
                            appointment_id: this.result.appointmentId
                        };
                        let stateCheckin = await this.saveCheckIn(data);

                        if (stateCheckin) {
                            this.scan = false;
                            this.prechecked = true;
                        } else {
                            console.log("Invalid Data Given");
                        }
                    } else {
                        await this.fetchAppointmentNotWalk(this.$route.params.id);
                        this.scan = false;
                        this.showAppointments = true;
                    }
                } catch (error) {
                    if (error.name === "DropImageFetchError") {
                        this.error = "Sorry, you can't load cross-origin images :/";
                    } else if (error.name === "DropImageDecodeError") {
                        this.error = "Ok, that's not an image. That can't be decoded.";
                    } else {
                        this.error = `Ups, what kind of error is this?! ${error.message}`;
                    }
                }
            },

            logErrors(promise) {
                promise.catch(console.error);
            },

            onDragOver(isDraggingOver) {
                this.dragover = isDraggingOver;
            }
        }
    };
</script>
<style scoped>
    body,
    html {
        height: 100%;
    }

    .drop-area {
        height: 300px;
        color: #fff;
        text-align: center;
        font-weight: bold;
        padding: 10px;

        background-color: rgba(0, 0, 0, 0.5);
    }

    .dragover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .drop-error {
        color: red;
        font-weight: bold;
    }

    .button-detail {
        background-image: linear-gradient(#4d2545, #782541);
    }
    .back-button {
        margin-left: 27.5rem !important;
        margin-top: -1.9rem !important
    }
</style>
