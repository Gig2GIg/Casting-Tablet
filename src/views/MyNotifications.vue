<template>
<div class="flex w-full  container text-purple pl-6 py-8">
    <!-- Filters -->
    <div class="w-full  p-4">
        <div class="flex items-center text-purple">
            <span class="ml-2 text-sm"></span>
        </div>

        <div class="tags w-full shadow-md mx-auto px-3 py-3 mt-6">
            <div class="py-4 px-4  mr-2 ">
                <div v-if="notificationHistoryList.length == 0" class="flex w-full justify-center text-purple text-2xl">
                    <p>There are no notifications</p>
                </div>
                <div class="flex flex-wrap py-4 border-b border-gray-300" v-for="notifications in notificationHistoryList" :key="notifications.id">
                    <div class="flex flex-nowrap overflow-auto w-9/12">
                        <figure class="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">
                                <defs>
                                    <linearGradient id="a" x1="25.1" x2="25.1" y1="-9.47" y2="92.36" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#4d2545" />
                                        <stop offset="1" stop-color="#782541" />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#a)" d="M.684 24.712C.684 11.226 11.616.293 25.103.293c13.486 0 24.419 10.933 24.419 24.42 0 13.486-10.933 24.418-24.42 24.418C11.617 49.131.685 38.2.685 24.712z" />
                                <path fill="#fff" d="M29.894 14.422H19.54a6.411 6.411 0 00-6.404 6.404v3.445a6.42 6.42 0 006.241 6.384 1.26 1.26 0 001.33-1.094 1.19 1.19 0 00-1.154-1.283c-2.302-.06-4.038-1.754-4.038-3.936v-3.517a4.03 4.03 0 014.024-4.024h10.356a4.03 4.03 0 014.024 4.024v3.428a4.03 4.03 0 01-4.024 4.023h-3.437a1.22 1.22 0 00-.856.354l-5.19 5.192a1.188 1.188 0 000 1.682c.47.45 1.212.45 1.682 0l4.842-4.842.238-.005h2.721a6.411 6.411 0 006.404-6.404v-3.427a6.411 6.411 0 00-6.404-6.404z" />
                            </svg>
                        </figure>
                        <div class="flex flex-wrap"
                            :class="notifications.code = 'autidion_add_contribuidor' && notifications.status !== 'accepted' && notifications.status !== 'rejected' ? 'flex-dir-column' : ''">
                            <span class="text-purple text-xl overflow-auto my-auto">{{ notifications.title }}</span>
                            <div class="flex flex-no-wrap" v-if="notifications.code = 'autidion_add_contribuidor' && notifications.status !== 'accepted' && notifications.status !== 'rejected'">
                                <div class="cursor-pointer m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail accept-decline-btn" @click="manageNotification(notifications,true)">
                                    <p class="text-white text-sm text-center font-bold content-center flex-1">Accept</p>
                                </div>
                                <div class="cursor-pointer m-3 content-center rounded-full red-light w-40 h-10 flex items-center bg-white border border-purple accept-decline-btn" @click="manageNotification(notifications,false)">
                                    <p class="text-purple text-sm text-center font-bold content-center flex-1">Decline</p>
                                </div>
                            </div>
                            <span v-else class="text-purple text-xl overflow-auto ml-1 my-auto capitalize">- {{ notifications.status}}</span>
                        </div>
                        
                    </div>
                    <div class="w-3/12 text-right">
                        <div class="w-3/12 items-end ml-auto cursor-pointer" @click="notificationDetail(notifications)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="29" @click="displayToogleMenu = true">
                                <defs>
                                    <linearGradient id="c" x1="14.67" x2="14.67" y1="7.13" y2="24.37" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#4d2545" />
                                        <stop offset="1" stop-color="#782541" />
                                    </linearGradient>
                                    <linearGradient id="f" x1="26.89" x2="26.89" y1="7.13" y2="24.37" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#4d2545" />
                                        <stop offset="1" stop-color="#782541" />
                                    </linearGradient>
                                    <linearGradient id="i" x1="39.11" x2="39.11" y1="7.13" y2="24.37" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stop-color="#4d2545" />
                                        <stop offset="1" stop-color="#782541" />
                                    </linearGradient>
                                    <filter id="a" width="59" height="59" x="-15" y="-15" filterUnits="userSpaceOnUse">
                                        <feOffset in="SourceGraphic" result="FeOffset1042Out" />
                                        <feGaussianBlur in="FeOffset1042Out" result="FeGaussianBlur1043Out" stdDeviation="6 6" />
                                    </filter>
                                    <filter id="d" width="59" height="59" x="-3" y="-15" filterUnits="userSpaceOnUse">
                                        <feOffset in="SourceGraphic" result="FeOffset1061Out" />
                                        <feGaussianBlur in="FeOffset1061Out" result="FeGaussianBlur1062Out" stdDeviation="6 6" />
                                    </filter>
                                    <filter id="g" width="59" height="59" x="10" y="-15" filterUnits="userSpaceOnUse">
                                        <feOffset in="SourceGraphic" result="FeOffset1080Out" />
                                        <feGaussianBlur in="FeOffset1080Out" result="FeGaussianBlur1081Out" stdDeviation="6 6" />
                                    </filter>
                                    <mask id="b" width="2" height="2" x="-1" y="-1">
                                        <path fill="#fff" d="M10 10h9v9h-9z" />
                                        <path d="M10.592 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                    </mask>
                                    <mask id="e" width="2" height="2" x="-1" y="-1">
                                        <path fill="#fff" d="M22 10h9v9h-9z" />
                                        <path d="M22.812 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                    </mask>
                                    <mask id="h" width="2" height="2" x="-1" y="-1">
                                        <path fill="#fff" d="M35 10h9v9h-9z" />
                                        <path d="M35.032 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                    </mask>
                                </defs>
                                <g filter="url(#a)">
                                    <path fill="none" d="M10.592 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" mask="url(&quot;#b&quot;)" />
                                    <path fill-opacity=".16" d="M10.592 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                </g>
                                <path fill="url(#c)" d="M10.592 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                <g filter="url(#d)">
                                    <path fill="none" d="M22.812 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" mask="url(&quot;#e&quot;)" />
                                    <path fill-opacity=".16" d="M22.812 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                </g>
                                <path fill="url(#f)" d="M22.812 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                <g>
                                    <g filter="url(#g)">
                                        <path fill="none" d="M35.032 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" mask="url(&quot;#h&quot;)" />
                                        <path fill-opacity=".16" d="M35.032 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                    </g>
                                    <path fill="url(#i)" d="M35.032 14.73a4.073 4.073 0 118.147 0 4.073 4.073 0 01-8.147 0z" />
                                </g>
                            </svg>
                        </div>
                        <span class="text-base ">{{ notifications.time_ago }}</span>
                    </div>
                </div>

            </div>
        </div>

        <modal class="flex flex-col w-full items-center mt-4" :width="540" height="175" name="modal_confirm_notification_delete">
            <div class="py-8 px-3">
                <p class="text-lg text-purple font-bold text-center">¿Do you want delete this Notification?</p>
                <div class="w-full flex flex-wrap justify-center overflow-hidden mt-3">
                    <div class="w-1/2">
                        <base-button type="submit" expanded @click="deleteNotification()">
                            Delete
                        </base-button>
                    </div>

                </div>
            </div>
        </modal>

    </div>

</div>
</template>

<script>
const $ = require("jquery");
window.$ = $;
import axios from "axios";
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
    data() {
        return {
            notificationHistoryList: [],
            displayToogleMenu: false,
            objNotification: [],
            loading : false
        };
    },

    created() {
        this.notificationHistory();
    },

    methods: {

        notificationDetail(item) {
            this.$modal.show('modal_confirm_notification_delete');
            this.objNotification = item;
        },

        async notificationHistory() {
            try {
                let url = "/t/notification-history";
                const {
                    data: {
                        data
                    }
                } = await axios.get(url);
                this.notificationHistoryList = data;
            } catch (ex) {
                console.log(ex);
            }

        },

        async deleteNotification() {
            let url = '/t/notification-history/delete/' + this.objNotification.id;
            try {
                const {
                    data: {
                        data
                    }
                } = await axios.delete(url);
                this.$toasted.show('Notification deleted successfully.');
            } catch (ex) {
                console.log(ex);
            }
            this.$modal.hide("modal_confirm_notification_delete");
            this.notificationHistory();
        },
        async manageNotification(data, status) {
            let finalMsg = status ? 'Notification accepted successfully.' : 'Notification rejected successfully.';
            let finalStatus = status ? 1 : 0;
            let url = `t/auditions/invite-accept/${data.custom_data}?status=${finalStatus}&notification_id=${data.id}`;

            try {
                const {
                    data: {
                        data
                    }
                } = await axios.get(url);
                this.$toasted.show(finalMsg);
            } catch (ex) {
                console.log(ex);
            }            
            this.notificationHistory();
        }

    },

};
</script>

<style>
@media (min-width: 1280px) {
    .container {
        max-width: 1450px;
    }

    .upcomingbtn {
        border-color: #4d2545;
        color: #4d2545;
    }

    .appointmentbtn {
        background-color: #4d2545;
    }
}

.description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 16px;
    max-height: 48px;
}
.accept-decline-btn{
    display:inline;
    float:left;
}
.flex-dir-column {
    flex-direction: column;
}
</style>
