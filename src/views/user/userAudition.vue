<!-- eslint-disable -->
<template>
  <div>
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="fullPage"></loading>
    <nav class="flex items-center h-12">
      <div
        class="cursor-pointer flex content-around w-1/6 items-center relative cmb-10"
        @click="backAudition()"
      >
        <img src="/images/icons/left_arrow_white.png" class="absolute left-0 pl-1" />
        <h1 class="absolute left-0 text-white text-lg back-mrg-l">Back</h1>
      </div>
      <div
        v-if="audition.online != 1"
        class="w-1/5 flex flex-wrap justify-center content-center h-10 border-2 ml-auto border-white rounded-sm cursor-pointer"
        @click="$refs.inputFile.click()"
      >
        <div class="w-full flex">
          <div class="w-1/4 flex justify-center">
            <img :src="'/images/icons/camera.png'" class="h-6 ml-auto" alt="star" />
          </div>
          <p
            class="w-full text-white tracking-wide text-lg ml-5 tracking-tight truncate"
          >{{file.name}}</p>
        </div>
      </div>
      <div v-else class="w-1/5"></div>
      <div
        class="w-1/8 flex flex-wrap justify-center content-center h-10 border-2 ml-auto border-white rounded-sm cursor-pointer"
        @click="chatManage()"
      >
        <div class="w-full flex">
          <div class="w-1/2 flex justify-center">
            <img :src="'/images/icons/message.png'" class="h-8 ml-2" alt="Chat" />
          </div>
          <p class="w-full text-white tracking-wide text-lg ml-5 tracking-tight truncate">Chat</p>
        </div>
      </div>
      <div class="w-8/11 z-40">
        <div
          v-show="invitation.adding"
          class="mt-16 mr-32 shadow-lg bg-white absolute left-50 top-0 z-40"
        >
          <base-input
            v-model="invitation.email"
            v-validate="'required|email'"
            name="email"
            placeholder="Email"
            :custom-classes="['border', 'border-purple']"
            :message="errors.first('invitation.email')"
            expanded
          />

          <base-button class="pt-2 pb-2" type="submit" expanded @click.native="sharedProfile">Send</base-button>
        </div>
      </div>
      <img
        :src="'/images/icons/12-layers@3x.png'"
        class="h-10 ml-auto mr-5"
        alt="star"
        @click="invitation.adding =invitation.adding == true?false:true"
      />
      <img
        v-if="favorite == 0"
        :src="'/images/icons/4-layers.png'"
        class="w-6 m-6"
        alt="star"
        @click="favorite=1"
      />
      <img
        v-else
        :src="'/images/icons/Path_56@2x.png'"
        class="w-6 m-6"
        alt="star"
        @click="favorite=0"
      />
      <div
        class="flex items-center border-l border-white text-white ml-auto cursor-pointer"
        @click="goToSettings"
        title="Settings"
      >
        <span
          class="mx-4"
        >{{profile.details && profile.details.first_name ? profile.details.first_name : ""}} {{profile.details ? profile.details.last_name : ""}}</span>
        <div v-lazy-container="{ selector: 'img' }">
          <img
            :data-loading="loading_placeholder"
            :data-error="user_placeholder"
            :data-src="(profile.image && profile.image.thumbnail) ? (profile.image.thumbnail ? profile.image.thumbnail : profile.image.url) : ''"
            class="w-12 img-h48 object-cover"
            alt="Avatar"
          />
        </div>
      </div>
    </nav>
    <input ref="inputFile" accept=".mp4" type="file" hidden @change="handleFile" />
    <modal name="marketplace" :scrollable="true" height="auto">
      <div class="w-full shadow-lg border border-gray-300">
        <p class="text-center text-2xl text-purple font-bold" @click="show">Marketplaces</p>
        <div class="flex flex-wrap justify-center w-full">
          <div class="flex flex-wrap justify-center w-full">
            <base-input
              v-model="marketplaceSearch"
              name="marketplace"
              class="w-full px-2"
              type="add"
              placeholder="Search marketplaces"
              :custom-classes="['border-2', 'border-purple']"
              @input="filterMarketplaces"
            />
          </div>
        </div>
        <div class="m-4 cursor-pointer">
          <div
            v-for="data in marketplace"
            :key="data.id"
            :class="{'bg-purple': currentMarketplace.id == data.id}"
            class="flex flex-wrap justify-center text-left content-center w-full rounded-sm border-b-2 border-gray-500 mb-4"
            @click="selectMarketplace(data)"
          >
            <p
              :class="{'text-white': currentMarketplace.id == data.id, 'text-purple': currentMarketplace.id != data.id}"
              class="w-1/2"
            >{{data.title}}</p>
            <div class="flex flex-wrap justify-end w-1/2">
              <!-- <img src="/images/icons/garbage@3x.png" alt="Icon" class="h-6" @click="deleteTag(data)"> -->
            </div>
          </div>
        </div>
      </div>
    </modal>
    <multipane class="custom-resizer h-full" layout="vertical">
      <!-- min-width: 75%; width: 68%; max-width: 100%; noraml user details -->
      <!-- :style="{ minWidth: 'calc(100% - 426px)', width: 'calc(100% - 426px)', maxWidth: '100%' }" -->
      <div
        class="pane content-pane bg-white p-2"
        :style="isChatView ? { minWidth: 'calc(100% - 426px)', width: 'calc(100% - 426px)', maxWidth: '100%' } : { minWidth: '75%', width: '68%', maxWidth: '100%' }"
      >
        <div class="flex flex-wrap">
          <div class="flex w-full">
            <div class="w-5/12 p-2">
              <div class="border rounded w-full h-50 overflow-auto px-0 py-2">
                <p class="text-center text-2xl text-purple font-semibold mb-2">Availability</p>
                <v-date-picker
                  :attributes="attrs"
                  class="border-none calendar-bar-inline mx-auto w-full"
                  :select-attribute="selectAttribute"
                  locale="en"
                  mode="range"
                  v-model="dates"
                  show-caps
                  is-inline
                  :rows="2"
                />
              </div>
            </div>
            <div class="w-3/12 p-2">
              <div
                class="border rounded w-full h-50 overflow-auto px-0 py-2 flex flex-wrap content-start"
              >
                <p class="text-center text-2xl text-purple font-semibold mb-2 w-full">Roles</p>

                <div
                  v-for="data in currentUserRoles"
                  :key="data.id"
                  class="flex flex-wrap justify-center w-1/2"
                >
                  <div class>
                    <div
                      class="rounded-full w-12 h-12 bg-cover mb-1 mx-auto"
                      :class="{'button-detail': data.id == rol, 'bg-gray-400': data.id != rol}"
                      :style="{ backgroundImage: 'url(' + data.image.url + ')' }"
                    ></div>
                    <p class="text-purple text-xs font-bold text-center">{{ data.name }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="audition.online == 0" class="w-4/12 p-2">
              <div class="border rounded w-full h-50 overflow-auto px-0 py-2">
                <div class="flex flex-wrap justify-center items-center mb-2">
                  <p class="text-center text-2xl text-purple font-semibold">Team Feedback</p>
                  <div
                    v-if="!isRealodTeamFeedback"
                    class="reafresh-spacing w-5 h-5 ml-3"
                    @click="updateTeamFeedBack(true)"
                  >
                    <img src="/images/icons/reload.png" alt="Reload" />
                  </div>
                  <div v-else class="reafresh-spacing w-5 h-5 ml-3">
                    <img src="/images/icons/reload_process.gif" alt="Reloading..." />
                  </div>
                </div>

                <div class="flex flex-wrap justify-center">
                  <div
                    v-if="teamFeedback.length == 0 && !isRealodTeamFeedback"
                    class="text-purple font-bold h-full"
                  >Not records created yet</div>
                  <template v-if="!isRealodTeamFeedback">
                    <div
                      v-for="data in teamFeedback"
                      :key="data.id"
                      class="text-center w-full flex flex-col justify-center"
                    >
                      <div class="w-full mb-5 mx-auto flex justify-center items-end">
                        <div class="flex flex-col w-1/6 px-2">
                          <figure
                            v-if="data.evaluation != null"
                            class="flex justify-center items-center w-8 h-8 border-2 border-purple rounded-sm text-purple text-xs font-bold mx-1"
                          >
                            <img
                              :src="'/images/icons/'+data.evaluation+'.png'"
                              alt="Icon"
                              class="content-center h-4"
                            />
                          </figure>
                        </div>
                        <div class="flex flex-col px-2 w-1/3">
                          <p
                            v-if="data.callback != null"
                            class="text-purple text-xs font-bold mb-1"
                          >Call Back</p>

                          <div
                            v-if="data.callback != null"
                            class="bg-white border border-purple rounded-full py-0 px-4 text-sm font-bold text-center flex items-center justify-center button-detail text-white w-full"
                          >{{ data.callback == 1? 'Yes' : 'No' }}</div>
                        </div>
                        <div class="flex flex-col px-2 w-1/3">
                          <p
                            v-if="data.work && data.work != ''"
                            class="text-purple text-xs font-bold mb-1"
                          >Work On</p>

                          <div
                            v-if="data.work && data.work != ''"
                            class="bg-white border border-purple rounded-full py-0 px-4 text-sm font-bold text-center flex items-center justify-center button-detail text-white w-full capitalize"
                          >{{ data.work }}</div>
                        </div>
                        <div class="flex flex-col px-2 w-1/3">
                          <p
                            v-if="data.rating != null"
                            class="text-purple text-xs font-bold mb-1"
                          >Rating</p>

                          <div
                            v-if="data.rating != null"
                            class="bg-white border border-purple rounded-full py-0 px-4 text-sm font-bold text-center flex items-center justify-center button-detail text-white w-full"
                          >{{ data.rating }}</div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div v-if="audition.online == 1" class="w-4/12 p-2">
              <div class="border rounded w-full h-50 overflow-auto">
                <p class="text-center text-2xl text-purple font-bold">Audition Documents</p>
                <div class="flex flex-wrap justify-center">
                  <div
                    v-if="onlineMedia.length  == 0"
                    class="text-purple font-bold h-full"
                  >No media added yet</div>
                  <carousel
                    class="flex flex-col mt-4 w-10/12"
                    :per-page="1"
                    :pagination-enabled="false"
                    :navigation-enabled="true"
                    :navigation-prev-label="'&#x279C;'"
                    :navigation-next-label="'&#x279C;'"
                  >
                    <slide
                      class="flex flex-wrap justify-center content-center mt-4 w-full p-3"
                      v-for="data in onlineMedia"
                      :key="data.id"
                      v-if="data.type == 'video'"
                    >
                      <div
                        class="container w-full rounded-lg shadow-lg overflow-hidden mb-3 shadow-lg"
                      >
                        <div class="flex-col p-4">
                          <img
                            v-lazy="data.preview"
                            class="w-full h-24 cursor-pointer"
                            @click="playVideo(data)"
                            title="Play Video"
                          />
                        </div>
                        <div class="p-2 bg-purple">
                          <span class="text-base truncate mb-3 text-white uppercase">{{ data.name }}</span>
                        </div>
                      </div>
                    </slide>
                  </carousel>
                  <carousel
                    class="flex flex-col mt-4 w-10/12"
                    :per-page="1"
                    :pagination-enabled="false"
                    :navigation-enabled="true"
                    :navigation-prev-label="'&#x279C;'"
                    :navigation-next-label="'&#x279C;'"
                  >
                    <slide
                      class="flex flex-wrap justify-center content-center mt-4 w-full p-3"
                      v-for="data in onlineMedia"
                      :key="data.id"
                      v-if="data.type == 'doc'"
                    >
                      <div class="flex m-3 content-center w-full h-16 flex justify-center">
                        <div class="flex justify-center w-full button-detail rounded-lg shadow-lg">
                          <div class="flex justify-center content-center flex-wrap w-1/2 h-full">
                            <img src="/images/icons/pdf-icon@3x.png" alt="Icon" class="h-10" />
                          </div>
                          <div
                            class="flex content-center relative flex-wrap w-full h-full bg-white truncate"
                          >
                            <span
                              class="text-center text-purple font-bold w-full truncate"
                            >{{ data.name }}</span>
                            <a target="_blank" :href="data.url">
                              <img
                                src="/images/icons/more-icon@3x.png"
                                alt="Icon"
                                class="h-6 absolute right-0 bottom-0"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </slide>
                  </carousel>
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full">
            <div class="w-2/4 p-2">
              <div class="border rounded w-full h-50 overflow-auto px-3 py-2">
                <div
                  class="flex flex-wrap justify-center flex-col content-center w-full mb-5"
                  v-if="audition.contract != 'ACADEMIC'"
                >
                  <p class="text-center text-2xl text-purple font-semibold mb-2">Feedback</p>
                  <div class="flex flex-wrap justify-center w-full mt-2">
                    <figure
                      :class="{'border-2 border-purple': emoji==1}"
                      class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg"
                      @click="emoji=1"
                    >
                      <img :src="'/images/icons/1.png'" alt="Icon" class="content-center h-8" />
                    </figure>
                    <figure
                      :class="{'border-2 border-purple': emoji==2}"
                      class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg"
                      @click="emoji=2"
                    >
                      <img :src="'/images/icons/2.png'" alt="Icon" class="content-center h-8" />
                    </figure>

                    <figure
                      :class="{'border-2 border-purple': emoji==3}"
                      class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg"
                      @click="emoji=3"
                    >
                      <img :src="'/images/icons/3.png'" alt="Icon" class="content-center h-8" />
                    </figure>

                    <figure
                      :class="{'border-2 border-purple': emoji==4}"
                      class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg"
                      @click="emoji=4"
                    >
                      <img :src="'/images/icons/4.png'" alt="Icon" class="content-center h-8" />
                    </figure>

                    <figure
                      :class="{'border-2 border-purple': emoji==5}"
                      class="flex justify-center flex-wrap content-center w-12 h-12 rounded-lg"
                      @click="emoji=5"
                    >
                      <img :src="'/images/icons/5.png'" alt="Icon" class="content-center h-8" />
                    </figure>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center flex-col content-center w-full mb-5">
                  <p class="text-center text-2xl text-purple font-semibold mb-2">Call Back</p>
                  <div class="flex justify-center w-full">
                    <div
                      @click="callback = 1"
                      :class="{'button-detail text-white': callback == 1, 'text-purple': callback != 1}"
                      class="bg-white border border-purple rounded-full w-24 h-10 text-sm font-bold text-center flex items-center justify-center mx-2"
                    >Yes</div>
                    <div
                      @click="callback = 0"
                      :class="{'button-detail text-white': callback == 0, 'text-purple': callback != 0}"
                      class="bg-white border border-purple rounded-full w-24 h-10 text-sm font-boldtext-center flex items-center justify-center mx-2"
                    >No</div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center flex-col content-center w-full mb-5">
                  <p class="text-center text-2xl text-purple font-semibold mb-2">Work On</p>
                  <div class="flex justify-center w-full">
                    <div
                      @click="workon = 1"
                      :class="{'button-detail text-white': workon == 1, 'text-purple': workon != 1}"
                      class="bg-white border border-purple rounded-full w-24 h-10 text-sm font-bold text-center flex items-center justify-center mx-2"
                    >Vocals</div>
                    <div
                      @click="workon = 2"
                      :class="{'button-detail text-white': workon == 2, 'text-purple': workon != 2}"
                      class="bg-white border border-purple rounded-full w-24 h-10 text-sm font-bold text-center flex items-center justify-center mx-2"
                    >Acting</div>
                    <div
                      @click="workon = 3"
                      :class="{'button-detail text-white': workon == 3, 'text-purple': workon != 3}"
                      class="bg-white border border-purple rounded-full w-24 h-10 text-sm font-bold text-center flex items-center justify-center mx-2"
                    >Dancing</div>
                  </div>
                </div>
                <div class="flex flex-wrap justify-center flex-col content-center w-full mb-5">
                  <p class="text-center text-2xl text-purple font-semibold mb-2">Rate</p>
                  <vue-slider
                    class="w-3/4 mb-10 mx-auto rate-slider"
                    v-model="rating"
                    ref="slider"
                    v-bind="sliderOptions"
                    :lazy="true"
                  />
                </div>
                <div class="flex flex-wrap justify-center flex-col content-center w-full">
                  <base-input
                    v-model="form.comment"
                    name="tag"
                    class="w-3/4 mb-3"
                    type="textarea"
                    placeholder="Add Comment"
                    :custom-classes="['border-2', 'border-purple']"
                  />
                </div>
              </div>
            </div>
            <div class="w-1/4 p-2">
              <div class="border rounded w-full h-50 overflow-auto px-3 py-2">
                <p class="text-center text-2xl text-purple font-semibold mb-2">Tags</p>
                <div class="flex flex-wrap justify-center w-full">
                  <base-input
                    v-model="tag"
                    name="tag"
                    class="w-full"
                    type="add"
                    placeholder="Add Tags"
                    :custom-classes="['border-2', 'border-purple']"
                    @added="setTags"
                  />
                </div>
                <div class="mt-2">
                  <template v-if="tags.length > 0">
                    <div
                      v-for="data in tags"
                      :key="data.id"
                      class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
                    >
                      <p class="text-purple w-1/2">{{data.title}}</p>
                      <div class="flex flex-wrap justify-end w-1/2">
                        <img
                          src="/images/icons/garbage@3x.png"
                          alt="Icon"
                          class="h-6"
                          @click="deleteTag(data)"
                        />
                      </div>
                    </div>
                  </template>
                  <div
                    v-else
                    class="flex flex-wrap justify-center text-left content-center w-full border-gray-500"
                  >
                    <p class="text-purple w-full">There are no tags added</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-1/4 p-2">
              <div class="border rounded w-full h-50 overflow-auto px-3 py-2">
                <p class="text-center text-2xl text-purple font-semibold mb-2">Recommendation</p>
                <div class="flex flex-wrap justify-center w-full">
                  <!-- <div class="flex flex-wrap justify-center w-full">
                    <base-input
                      v-model="marketplaceSearch"
                      name="marketplace"
                      class="w-full"
                      type="add"
                      @click.native="show"
                      placeholder="Search marketplaces"
                      :custom-classes="['border-2', 'border-purple']"
                      @input="filterMarketplaces"
                    />
                  </div> -->
                  <div class="flex flex-wrap justify-center flex-col content-center w-full">
                    <base-input
                      v-model="form.recommendation"
                      name="tag"
                      class="mb-3"
                      type="textarea"
                      rows="5"
                      placeholder="Add Recommendation"
                      :custom-classes="['border-2', 'border-purple']"
                    />
                  </div>
                </div>
                <!-- <div class="mt-2">
                  <template v-if="recommendations.length > 0">
                    <div
                      v-for="data in recommendations"
                      :key="data.id"
                      class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
                    >
                      <p class="text-purple w-1/2">{{data.markeplace.title}}</p>
                      <div class="flex flex-wrap justify-end w-1/2">
                        <img
                          src="/images/icons/garbage@3x.png"
                          alt="Icon"
                          class="h-6"
                          @click="deleteRecommended(data)"
                        />
                      </div>
                    </div>
                  </template>
                  <div
                    v-else
                    class="flex flex-wrap justify-center text-left content-center w-full border-gray-500"
                  >
                    <p class="text-purple w-full">There are no marketplaces added</p>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <multipane-resizer class="mt-0.1 bg-purple full-height"></multipane-resizer>
      <div class="pane relative sidebar-pane" style="flexGrow: 1; overflow-y: auto">
        <div v-if="isChatView" class="custom-side-back chat-side-min-width h-full overflow-auto">
          <div class="chat-head">
            <!-- <img
              src="/images/icons/left_arrow.png"
              class="absolute left-0 cursor-pointer"
              @click="chatToDetails"
            />-->
            <h1>Audition Chat</h1>
          </div>

          <!-- Message List start from here -->
          <div ref="chatlist" class="chat-message overflow-auto p-4">
            <div class="w-full mb-5" v-for="messageData of messageList" :key="messageData.id">
              <div class="flex content-center">
                <div class="flex h-8 chat-image">
                  <img
                    v-lazy="messageData.sender && messageData.sender.image && messageData.sender.image.thumbnail ? messageData.sender.image.thumbnail :  (messageData.sender && messageData.sender.image ? messageData.sender.image.url : '')"
                    alt="Icon"
                    class="rounded-full h-8"
                  />
                </div>
                <div class="ml-3 col-chat">
                  <div class="flex w-full mp-box">
                    <span
                      class="font-bold text-sm capitalize"
                    >{{ messageData.sender && messageData.sender.details ? messageData.sender.details.first_name +' '+ messageData.sender.details.last_name : ''}}</span>
                    <span class="text-sm">{{ chatTimeFormat(messageData.createDate) | chatDateTime}}</span>
                  </div>
                  <span class="w-full text-sm">{{messageData.message}}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="audition && audition.appointment_id == this.$route.params.round && audition.status == 1"
            class="flex w-full relative p-4"
          >
            <input
              v-model="chatMessage"
              name="chat_message"
              class="w-full p-2 chat-input"
              type="text"
              autocomplete="off"
              placeholder="Write Something..."
              @keyup.enter="sendMessage()"
              :custom-classes="['border-2', 'border-purple']"
            />
            <img
              src="/images/icons/send_purple.png"
              class="cursor-pointer h-8 chat-btn"
              @click="sendMessage()"
            />
          </div>
        </div>
        <template v-else>
          <div class="absolute" v-for="data in currentUser" :key="data.id">
            <div class="flex flex-wrap content-center justify-center text-center">
              <div class="mx-auto py-2" v-if="audition.online != 1">
                <base-input
                  v-if="!isAssignedNumber"
                  v-model="addNumberText"
                  name="tag"
                  class="w-full py-2"
                  type="add"
                  placeholder="Add Number"
                  :custom-classes="['border-2', 'border-purple']"
                  @added="addNumber"
                />
                <base-input
                  v-else
                  v-model="getAssignNumber"
                  name="tag"
                  class="w-full py-2"
                  type="text"
                  readonly="true"
                  placeholder="Add Number"
                  :custom-classes="['border-2', 'border-purple']"
                />
              </div>
              <img :src="data.image" alt="Icon" class="-ml-3 h-300 object-cover" />
              <p class="text-purple text-xl font-bold mt-4 w-full">{{data.name}}</p>
              <p
                class="text-purple text-m font-bold mt-2 w-full"
              >{{performerDetails.details && performerDetails.details.city ? performerDetails.details.city : ""}}</p>
              <div class="flex w-full mt-3">
                <a
                  class="social-a flex items-center justify-center content-center w-12 h-12"
                  v-if="performerDetails.details && performerDetails.details.facebook"
                  :href="setUrl(performerDetails.details.facebook)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img :src="'/images/icons/fb_link.png'" alt="Icon" class="h-6" />
                </a>
                <a
                  class="social-a flex items-center justify-center content-center w-12 h-12"
                  v-if="performerDetails.details && performerDetails.details.instagram"
                  :href="setUrl(performerDetails.details.instagram)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    v-if="performerDetails.details && performerDetails.details.instagram"
                    :src="'/images/icons/instagram_link.png'"
                    alt="Icon"
                    class="h-6"
                  />
                </a>
                <a
                  class="social-a flex items-center justify-center content-center w-12 h-12"
                  v-if="performerDetails.details && performerDetails.details.twitter"
                  :href="setUrl(performerDetails.details.twitter)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    v-if="performerDetails.details && performerDetails.details.twitter"
                    :src="'/images/icons/twitter_link.png'"
                    alt="Icon"
                    class="h-6"
                  />
                </a>
                <a
                  class="social-a flex items-center justify-center content-center w-12 h-12"
                  v-if="performerDetails.details && performerDetails.details.linkedin"
                  :href="setUrl(performerDetails.details.linkedin)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    v-if="performerDetails.details && performerDetails.details.linkedin"
                    :src="'/images/icons/linkedin_link.png'"
                    alt="Icon"
                    class="h-6"
                  />
                </a>
              </div>
              <div class="flex w-full justify-start">
                <a
                  target="_blank"
                  v-bind:href="'mailto:'+performerDetails.email+''"
                  type="button"
                  class="flex contact-btn justify-center mt-3 bg-purple-gradient text-white text-md rounded-sm rounded-tl-md p-1"
                >
                  <img :src="'/images/icons/mail_icon@2x.png'" alt="Icon" class="h-5 mr-2 mt-1" />
                  <span class>Contact</span>
                </a>
              </div>
              <!-- <div @click="viewResume()" class="flex w-full justify-start mt-6 cus-cur">
                <img :src="'/images/icons/icon.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Resume</p>
              </div>-->
              <div
                @click="getPerformerDetail('doc')"
                class="flex w-full justify-start mt-3 cus-cur"
              >
                <img :src="'/images/icons/icon.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Resume & Docs</p>
              </div>
              <!-- <div
                @click="getPerformerDetail('info')"
                class="flex w-full justify-start mt-12 cus-cur"
              >
                <img :src="'/images/icons/person.png'" alt="Icon" class="content-center h-8" />
                <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Info</p>
              </div>-->

              <!-- <div
                @click="getPerformerDetail('credit')"
                class="flex w-full justify-start mt-12 cus-cur"
              >
                <img :src="'/images/icons/icon.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Credit</p>
              </div>
              <div
                @click="getPerformerDetail('eduTra')"
                class="flex w-full justify-start mt-12 cus-cur"
              >
                <img :src="'/images/icons/book.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Education & Training</p>
              </div>-->
              <div
                @click="getPerformerDetail('appearance')"
                class="flex w-full justify-start mt-3 cus-cur"
              >
                <img :src="'/images/icons/12-layers.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Appearance</p>
              </div>
              <div
                @click="getPerformerDetail('video')"
                class="flex w-full justify-start mt-3 cus-cur"
              >
                <img :src="'/images/icons/video-icon.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Videos</p>
              </div>
              <div
                @click="getPerformerDetail('audio')"
                class="flex w-full justify-start mt-6 cus-cur"
              >
                <img :src="'/images/icons/music-icon.png'" alt="Icon" class="content-center h-8" />
                <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2">Music</p>
              </div>
              <div
                @click="getPerformerDetail('image')"
                class="flex w-full justify-start mt-3 cus-cur"
              >
                <img :src="'/images/icons/photo-icon.png'" alt="Icon" class="content-center h-8" />
                <p
                  class="text-purple text-m text-left ml-4 tracking-wide font-semibold w-1/2"
                >Photos</p>
              </div>
              <div
                @click="getPerformerDetail('sheet')"
                class="flex w-full justify-start mt-3 cus-cur"
              >
                <img :src="'/images/icons/sheet-icon.png'" alt="Icon" class="content-center h-8" />
                <p class="text-purple text-m text-left ml-4 tracking-wide font-semibold">Sheet Music</p>
              </div>
              <div
                class="flex flex-wrap justify-center mt-3 w-full cursor-pointer"
                v-if="audition.status!=2"
              >
                <div class="flex w-1/2" @click="saveFeedback">
                  <div class="flex w-full text-center justify-center flex-wrap">
                    <div
                      class="m-3 button-detail content-center border border-purple rounded-full w-32 h-10 flex items-center"
                    >
                      <p
                        class="text-white text-sm font-bold content-center tracking-tighter flex-1"
                      >{{isUpdateFeeback ? "Save":'Save' }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-wrap justify-center mt-1 w-full cursor-pointer"
                v-if="nextPerformerId"
              >
                <div class="flex w-1/2" @click="gotoNextPerformer()">
                  <div class="flex w-full text-center justify-center flex-wrap">
                    <div
                      class="m-3 content-center border border-purple bg-white rounded-full w-32 h-10 flex items-center"
                    >
                      <p
                        class="text-purple text-sm font-bold content-center tracking-tighter flex-1"
                      >Next</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </multipane>
    <modal :width="500" :adaptive="true" name="resumeModal" class="modal-height-90">
      <button @click="$modal.hide('resumeModal')" class="resume-popup-close-btn">
        <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
      </button>
      <pdf v-for="i in numPages" :key="i" :src="performerResume" :page="i"></pdf>
      <!-- style="display: inline-block; width: 25%" -->
    </modal>
    <modal :width="500" height="200" :adaptive="true" name="infoModal" class="custom-event-popup">
      <button @click="$modal.hide('infoModal')" class="popup-close-btn">
        <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
      </button>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Stage Name</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.details ? performerDetails.details.stage_name : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Professional/ Working Title</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.details ? performerDetails.details.profesion : ""}}</p>
        </div>
      </div>
    </modal>
    <modal :width="500" height="330" :adaptive="true" name="creditModal">
      <button @click="$modal.hide('creditModal')" class="popup-close-btn">
        <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
      </button>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Production Type</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.credits && performerDetails.credits[0] ? performerDetails.credits[0].type : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Project Name</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.credits && performerDetails.credits[0] ? performerDetails.credits[0].name : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Role</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.credits && performerDetails.credits[0] ? performerDetails.credits[0].rol : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Director/Production Company</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.credits && performerDetails.credits[0] ? performerDetails.credits[0].production : ""}}</p>
        </div>
      </div>
    </modal>
    <modal :width="500" height="390" :adaptive="true" name="eduTraModal">
      <button @click="$modal.hide('eduTraModal')" class="popup-close-btn">
        <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
      </button>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">School</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.education && performerDetails.education[0] ? performerDetails.education[0].school : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Degree/Cource</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.education && performerDetails.education[0] ? performerDetails.education[0].degree : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Instructor</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.education && performerDetails.education[0] ? performerDetails.education[0].instructor : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Location</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.education && performerDetails.education[0] ? performerDetails.education[0].location : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Year</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.education && performerDetails.education[0] ? performerDetails.education[0].year : ""}}</p>
        </div>
      </div>
    </modal>
    <modal :width="500" height="390" :adaptive="true" name="appearance">
      <button @click="$modal.hide('appearance')" class="popup-close-btn">
        <i class="material-icons" style="font-size: 35px;color: black;">clear</i>
      </button>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Height</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.aparence ? performerDetails.aparence.height : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Weight</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.aparence ? performerDetails.aparence.weight : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Hair Color</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.aparence ? performerDetails.aparence.hair : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Eye Color</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.aparence ? performerDetails.aparence.eyes : ""}}</p>
        </div>
      </div>
      <div class="m-4">
        <div
          class="flex flex-wrap justify-center text-left content-center w-full border-b-2 border-gray-500 mb-4"
        >
          <strong class="text-purple w-full">Race</strong>
          <p
            class="text-purple w-full"
          >{{performerDetails.aparence ? performerDetails.aparence.race : ""}}</p>
        </div>
      </div>
    </modal>

    <modal
      class="flex flex-col w-full items-center"
      :width="450"
      :height="200"
      name="modal_thumbnail_image"
    >
      <div class="content my-info-content">
        <section class="image-preview-area">
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-full ml-4 text-purple px-2">
              <base-input
                v-model="videoFileName"
                :custom-classes="['border border-b border-gray-300']"
                name="file_name"
                placeholder="File Name"
                data-vv-as="file name"
              />
            </div>
          </div>
          <div class="container flex w-full mt-3 cursor-pointer">
            <div class="flex w-full text-center justify-center flex-wrap actions">
              <a href="#" role="button" @click.prevent="imageRenameDone">Done</a>
              <a href="#" role="button" @click.prevent="imageRenameCancel">Cancel</a>
            </div>
          </div>
        </section>
      </div>
    </modal>
    <modal :width="500" height="auto" :adaptive="true" name="video_modal">
      <button @click="$modal.hide('video_modal');currentVideo = null;">
        <i class="material-icons" style="font-size: 35px;color: purple;">clear</i>
      </button>
      <div class="w-full rounded-lg shadow-lg overflow-hidden mb-3">
        <div class="flex-col p-4">
          <div
            id="load_div"
            v-if="!isLoadedVideo"
            class="w-full h-full justify-center mb-4 items-center px-3"
          >Video Loading Please Wait...</div>
          <iframe
            v-if="currentVideo"
            class="w-full h-full"
            id="myIframe"
            @load="loadedVideo"
            :src="currentVideo"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </modal>
    <modal
      class="flex flex-col w-full items-center modal-height-90 custom-event-popup"
      :width="500"
      :height="600"
      name="docModal"
    >
      <div>
        <div class="flex flex-col w-full shadow-md overflow-hidden p-3">
          <h1
            class="text-purple text-lg font-bold"
            style="margin-bottom: 10px; margin-top: 10px;"
          >Resume & Docs</h1>
          <div class>
            <div
              v-for="documentos in this.docs"
              :key="documentos.id"
              class="flex w-full shadow-lg mb-3 height-73"
              style="align-items: center;"
            >
              <div class="flex-col bg-purple mt-1 music-icon-parent music-border">
                <img
                  src="/images/icons/doc-icon3x.png"
                  alt="Icon"
                  class="custo-static-icon music-icon overflow-hidden"
                />
                <span class="text-lg truncate text-white uppercase">PDF</span>
              </div>
              <div
                class="flex h-100 content-center items-center relative w-full h-full bg-white mp-box"
                style="justify-content: space-between;"
              >
                <span
                  class="text-2xl truncate-custom mb-0 text-center text-purple ml-2"
                >{{ documentos.name }}</span>

                <ul id="navigation">
                  <li>
                    <a
                      href="javascript:void(0);"
                      :class="{ active }"
                      class="more-icon-a align-right cursor-pointer"
                      title="More"
                      @click="openMenu(documentos.id)"
                    >
                      <img
                        src="/images/icons/more-icon@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>
                    <div
                      class="dropdown cus-dropdown submanu"
                      v-bind:class="{ 'isOpen' : openId==documentos.id}"
                    >
                      <ul class="submanu-content">
                        <li>
                          <a :href="documentos.url" title="Open in" target="_blank">Open in</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span v-if="!this.docs.length">No Media Added</span>
          </div>
        </div>
      </div>
    </modal>

    <modal
      class="flex flex-col w-full items-center modal-height-90 custom-event-popup"
      :width="650"
      :height="600"
      name="videoModal"
    >
      <div>
        <div class="flex flex-col w-full shadow-md overflow-hidden" style="padding-left: 15px;">
          <h1
            class="text-purple text-lg font-bold"
            style="margin-bottom: 10px; margin-top: 10px;"
          >Videos</h1>
          <div class>
            <div
              v-for="video in this.videos"
              :key="video.id"
              class="w-full rounded-lg shadow-lg mb-3"
            >
              <div class="flex-col" v-if="isValidYoutubeLink(video.url)">
                <youtube :video-id="getYoutbeId(video.url)"></youtube>
              </div>
              <div class="flex-col" v-else>
                <iframe
                  class="yt_player_iframe w-full h-iframe"
                  id="vi"
                  :src="`${video.url}?rel=0&cc_load_policy=1`"
                  frameborder="0"
                  :autoplay="videoAutoPlay"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>
              <div class="flex relative flex-wrap w-full h-full bg-purple video-player-border">
                <span
                  class="text-2xl truncate text-left text-white ml-2 pt-2 pb-2 video-name"
                >{{ video.name }}</span>

                <ul id="navigation">
                  <li>
                    <a
                      href="javascript:void(0);"
                      :class="{ active }"
                      class="more-icon-a align-right cursor-pointer"
                      title="More"
                      @click="openMenu(video.id)"
                    >
                      <img
                        src="/images/icons/more-icon-white@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>
                    <div
                      class="dropdown cus-dropdown submanu"
                      v-bind:class="{ 'isOpen' : openId==video.id}"
                    >
                      <ul class="submanu-content">
                        <li>
                          <a :href="video.url" title="Open in" target="_blank">Open in</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span v-if="!this.videos.length">No Media Added</span>
          </div>
        </div>
      </div>
    </modal>

    <modal
      class="flex flex-col w-full items-center modal-height-90 custom-event-popup"
      :width="500"
      :height="600"
      name="audioModal"
    >
      <div>
        <div class="flex flex-col w-full shadow-md overflow-hidden p-3">
          <h1
            class="text-purple text-lg font-bold"
            style="margin-bottom: 10px; margin-top: 10px;"
          >Music</h1>
          <div class>
            <div
              v-for="music in this.music"
              :key="music.id"
              class="flex w-full shadow-lg mb-3 height-73"
              style="align-items: center;"
            >
              <div class="flex-col mt-1 bg-purple music-icon-parent music-border">
                <img
                  src="/images/icons/music@2x.png"
                  alt="Icon"
                  class="custo-static-icon music-icon overflow-hidden"
                />
                <span class="text-lg truncate text-white uppercase">MP3</span>
              </div>
              <div
                class="flex h-100 content-center items-center relative w-full h-full bg-white mp-box"
                style="justify-content: space-between;"
              >
                <span
                  class="text-2xl truncate-custom mb-0 text-center text-purple ml-2"
                >{{ music.name }}</span>

                <ul id="navigation">
                  <li>
                    <a
                      href="javascript:void(0);"
                      :class="{ active }"
                      class="more-icon-a align-right cursor-pointer"
                      title="More"
                      @click="openMenu(music.id)"
                    >
                      <img
                        src="/images/icons/more-icon@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>
                    <div
                      class="dropdown cus-dropdown submanu"
                      v-bind:class="{ 'isOpen' : openId==music.id}"
                    >
                      <ul class="submanu-content">
                        <li>
                          <a :href="music.url" title="Open in" target="_blank">Open in</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span v-if="!this.music.length">No Media Added</span>
          </div>
        </div>
      </div>
    </modal>

    <modal
      class="flex flex-col w-full items-center modal-height-90 custom-event-popup"
      :width="500"
      :height="600"
      name="imageModal"
    >
      <div>
        <div class="flex flex-col w-full shadow-md overflow-hidden p-3">
          <h1
            class="text-purple text-lg font-bold"
            style="margin-bottom: 10px; margin-top: 10px;"
          >Photos</h1>
          <div class>
            <div
              v-for="photo in this.photos"
              :key="photo.id"
              class="flex w-full shadow-lg mb-3 height-73"
              style="align-items: center;"
            >
              <div class="flex-col">
                <img
                  class="custom-photo-icon image-rounded custom-fixed-image"
                  v-lazy="photo.thumbnail ? photo.thumbnail : photo.url"
                  alt="image"
                />
              </div>
              <div
                class="flex h-100 content-center items-center relative w-full h-full bg-white mp-box"
                style="justify-content: space-between;"
              >
                <span
                  class="text-2xl truncate-custom mb-0 text-center text-purple ml-2"
                >{{ photo.name }}</span>

                <ul id="navigation">
                  <li>
                    <a
                      href="javascript:void(0);"
                      :class="{ active }"
                      class="more-icon-a align-right cursor-pointer"
                      title="More"
                      @click="openMenu(photo.id)"
                    >
                      <img
                        src="/images/icons/more-icon@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>
                    <div
                      class="dropdown cus-dropdown submanu"
                      v-bind:class="{ 'isOpen' : openId==photo.id}"
                    >
                      <ul class="submanu-content">
                        <li>
                          <a :href="photo.url" title="Open in" target="_blank">Open in</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span v-if="!this.photos.length">No Media Added</span>
          </div>
        </div>
      </div>
    </modal>

    <modal
      class="flex flex-col w-full items-center modal-height-90 custom-event-popup"
      :width="500"
      :height="600"
      name="sheetModal"
    >
      <div>
        <div class="flex flex-col w-full shadow-md overflow-hidden p-3">
          <h1
            class="text-purple text-lg font-bold"
            style="margin-bottom: 10px; margin-top: 10px;"
          >Sheet Music</h1>
          <div class>
            <div
              v-for="sheet in this.sheets"
              :key="sheet.id"
              class="flex w-full shadow-lg mb-3 height-73"
              style="align-items: center;"
            >
              <div class="flex-col bg-purple mt-1 music-icon-parent music-border">
                <img
                  src="/images/icons/doc-icon3x.png"
                  alt="Icon"
                  class="custo-static-icon music-icon overflow-hidden"
                />
                <span class="text-lg text-white uppercase">PDF</span>
              </div>
              <div
                class="flex h-100 content-center items-center relative w-full h-full bg-white mp-box"
                style="justify-content: space-between;"
              >
                <span
                  class="text-2xl truncate-custom mb-0 text-center text-purple ml-2"
                >{{ sheet.name }}</span>

                <ul id="navigation">
                  <li>
                    <a
                      href="javascript:void(0);"
                      :class="{ active }"
                      class="more-icon-a align-right cursor-pointer"
                      title="More"
                      @click="openMenu(sheet.id)"
                    >
                      <img
                        src="/images/icons/more-icon@3x.png"
                        alt="Icon"
                        class="h-6 absolute right-0 bottom-0"
                      />
                    </a>
                    <div
                      class="dropdown cus-dropdown submanu"
                      v-bind:class="{ 'isOpen' : openId==sheet.id}"
                    >
                      <ul class="submanu-content">
                        <li>
                          <a :href="sheet.url" title="Open in" target="_blank">Open in</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <span v-if="!this.sheets.length">No Media Added</span>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Multipane, MultipaneResizer } from "vue-multipane";
import { Calendar } from "vue-sweet-calendar";
import axios from "axios";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/storage";
import uuid from "uuid/v1";
import "vue-sweet-calendar/dist/SweetCalendar.css";
import TokenService from "../../services/core/TokenService";
import Vue from "vue";

// Import component
import Loading from "vue-loading-overlay";
import ThumbService from "@/services/ThumbService";
import DEFINE from "@/utils/const.js";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import pdf from "vue-pdf";
import VueYouTubeEmbed from "vue-youtube-embed";
import { getIdFromURL, getTimeFromURL } from "vue-youtube-embed";

Vue.use(VueYouTubeEmbed);
Vue.use(VueYouTubeEmbed, { global: false });

import "@firebase/firestore";
const db = firebase.firestore();
const $ = require("jquery");

window.$ = $;

export default {
  // ...
  components: {
    Multipane,
    MultipaneResizer,
    Calendar,
    Loading,
    VueSlider,
    pdf,
  },
  data() {
    return {
      active: false,
      isLoading: false,
      fullPage: true,
      rol: "",
      emoji: null,
      callback: null,
      rating: 0,
      favorite: 0,
      attrs: [],
      slot: "",
      tag: "",
      recommendation: "",
      workon: null,
      currentMarketplace: "",
      marketplaceSearch: "",
      currentUser: [],
      form: {},
      dates: {},
      file: {
        name: "Record Audition",
      },
      selectAttribute: {
        bar: true,
        color: "red",
      },
      addNumberText: "",
      isAssignedNumber: false,
      performerDetails: {},
      currentUserRoles: [],
      isRealodTeamFeedback: false,
      thumbnail: {},
      videoFileName: null,
      isLoadedVideo: false,
      currentVideo: null,
      nextPerformerId: null,
      user_placeholder: DEFINE.role_placeholder,
      loading_placeholder: DEFINE.loading_placeholder,
      isChatView: false,
      chatPrefix: DEFINE.CHAT_PEFIX,
      auditionChatRef: null,
      chatMessage: "",
      messageList: [],
      casterUserList: {},
      sliderOptions: {
        min: 0,
        max: 10,
        interval: 0.5,
        disabled: false,
        clickable: true,
        tooltip: "always",
        tooltipPlacement: "bottom",
      },
      performerResume: "",
      numPages: undefined,
      invitation: {
        adding: false,
        email: "",
      },
      base_url: "",
      refreshFBIntrval: undefined,
      isUpdateFeeback: false,
      docs: [],
      videos: [],
      music: [],
      photos: [],
      sheets: [],
      materialList: [],
      videoAutoPlay: false,
      openId: "",
      isOpen: false,
    };
  },
  computed: {
    ...mapState("audition", [
      "audition",
      "userList",
      "teamFeedback",
      "onlineMedia",
    ]),
    ...mapState("user", ["user"]),
    ...mapState("feedback", [
      "feedback",
      "tags",
      "marketplace",
      "recommendations",
    ]),
    ...mapState("profile", {
      profile: "user",
      calendar: "calendar",
      contract: "contract",
    }),
    getAssignNumber: function () {
      return this.addNumberText ? this.addNumberText.toString() : "";
    },
  },
  watch: {
    userList: function () {
      this.setNextPerform();
    },
    "$route.query"() {
      // console.log("route.query")
      this.userDetailsInit();
    },
  },
  async mounted() {
    await this.fetchAuditionData(this.$route.params.audition);
    await this.fetchUserList(this.$route.params.round);
    this.userDetailsInit();
    this.getCasterUsers();
  },
  async created() {
    this.base_url = window.location.origin;
    await this.initializeChat();
    // auto refresh feed back
    this.stopFeedbackRefresh();
    this.refreshFBIntrval = setInterval(
      function () {
        this.updateTeamFeedBack(false);
      }.bind(this),
      5000
    );
  },
  beforeDestroy() {
    this.stopFeedbackRefresh();
  },
  methods: {
    ...mapActions("user", ["fetch"]),
    ...mapActions("audition", [
      "fetchAuditionData",
      "fetchUserList",
      "fetchTeamFeedback",
      "searchMarketplace",
      "fetchOnlineMedia",
    ]),
    ...mapActions("profile", { fetchProfile: "fetch" }),
    ...mapActions("profile", {
      fetchProfile: "fetch",
      fetchData: "fetchData",
      myCalendar: "myCalendar",
      fetchContract: "fetchContract",
    }),
    ...mapActions("feedback", [
      "fetchUserFeedback",
      "storeTag",
      "storeRecommendation",
      "fetchTags",
      "fetchRecommendation",
      "delete",
      "searchMarketplace",
      "setRecommendations",
      "deleteRecommendation",
    ]),
    stopFeedbackRefresh() {
      clearInterval(this.refreshFBIntrval);
      this.refreshFBIntrval = undefined;
    },
    goToday() {
      this.$refs.calendar.goToday();
    },
    async userDetailsInit() {
      this.manageCurrentUserRoles();
      await this.fetchTags({
        round: this.$route.params.round,
        user: this.$route.params.id,
      });
      await this.fetchRecommendation({
        round: this.$route.params.audition,
        user: this.$route.params.id,
      });
      await this.fetchOnlineMedia({
        round: this.$route.params.round,
        user: this.$route.params.id,
      });
      let feedback = {
        user: this.$route.params.id,
        round: this.$route.params.round,
      };
      await this.fetchUserFeedback(feedback);

      if (Object.keys(this.feedback).length > 0) {
        this.isUpdateFeeback = true;
        for (data in this.feedback) {
          this.workon =
            this.feedback.work === null
              ? null
              : this.feedback.work == "vocals"
              ? 1
              : this.feedback.work == "acting"
              ? 2
              : 3;
          this.favorite = this.feedback.favorite;
          this.emoji = this.feedback.evaluation;
          this.callback =
            this.feedback.callback == 1
              ? true
              : this.feedback.callback === null
              ? null
              : false;
          this.rating = this.feedback.rating != null ? this.feedback.rating : 0;
          this.form.comment = this.feedback.comment;
          this.form.recommendation = this.feedback.recommendation;
        }
      } else {
        this.isUpdateFeeback = false;
        this.workon = null;
        this.favorite = 0;
        this.emoji = null;
        this.callback = null;
        this.rating = 0;
        this.form.comment = "";
        this.form.recommendation = "";
      }
      // Get Assigend Number
      let getPerformerDetails = await axios.get(
        `/t/auditions/profile/user/${this.$route.params.id}/appointment/${this.$route.params.round}`
      );
      if (getPerformerDetails.status == 200) {
        this.performerDetails = getPerformerDetails.data.data;
        this.addNumberText = getPerformerDetails.data.data.assign_number;
        if (this.addNumberText && this.addNumberText != "") {
          this.isAssignedNumber = true;
        } else {
          this.isAssignedNumber = false;
        }
      } else {
        this.performerDetails = {};
        this.addNumberText = "";
        this.isAssignedNumber = true;
      }
      this.currentUser = this.userList.filter(
        (userList) => userList.user_id == this.$route.params.id
      );
      if (this.currentUser != "") {
        this.slot = this.currentUser[0].slot_id;
        this.rol = this.currentUser[0].rol;
      }
      let data = {
        appointment_id: this.$route.params.round,
        performer: this.$route.params.id,
      };
      await this.fetchTeamFeedback(data);
      await this.myCalendar(this.$route.params.id);
      this.asignEvents();
    },
    async getCasterUsers() {
      try {
        const {
          data: { data },
        } = await axios.get(
          `/auditions/getAuditionUserData/${this.$route.params.audition}`
        );
        this.casterUserList = {};
        data.forEach((val, index) => {
          this.casterUserList[val.id] = val;
        });
        // console.log("getCasterUsers -> casterUserList", this.casterUserList)
      } catch (e) {
        console.log("getCasterUsers -> e", e);
      }
    },
    async updateTeamFeedBack(loaderView) {
      this.isRealodTeamFeedback = loaderView;
      let data = {
        appointment_id: this.$route.params.round,
        performer: this.$route.params.id,
      };
      await this.fetchTeamFeedback(data);
      this.isRealodTeamFeedback = false;
    },
    async sharedProfile() {
      this.$toasted.clear();
      try {
        if (!this.invitation.email || this.invitation.email == "") {
          this.$toasted.error("Please enter email!");
          return;
        }
        let requestParam = {
          code: this.performerDetails.share_code,
          email: this.invitation.email,
          link: `${this.base_url}/talent-shared/${window.btoa(
            this.$route.params.id
          )}`,
        };

        await axios.post(`/t/performers/code`, requestParam);
        this.$toasted.success("The user code has been shared successfully");
        this.invitation.email = "";
      } catch (error) {
        console.log(error.response);
        let errMsg =
          error.response && error.response.data && error.response.data.data
            ? error.response.data.data
            : DEFINE.common_error_message;
        this.$toasted.error(errMsg);
      }
    },
    viewResume() {
      this.$toasted.clear();

      this.performerResume = this.performerDetails.resume
        ? pdf.createLoadingTask(this.performerDetails.resume)
        : null;
      if (!this.performerResume) {
        this.$toasted.error(
          "This performer doesn't have any resume uploaded yet."
        );
      }
      // this.performerResume = this.performerDetails.resume;
      this.performerResume.promise.then((pdf) => {
        this.numPages = pdf.numPages;
      });
      this.$modal.show("resumeModal");
    },
    async getPerformerDetail(type) {
      // if (type == "info") {
      //   this.$modal.show("infoModal");
      // } else
      if (type == "appearance") {
        this.$modal.show("appearance");
      }
      // if (type == "credit") {
      //   this.$modal.show("creditModal");
      // }
      // if (type == "eduTra") {
      //   this.$modal.show("eduTraModal");
      // }
      if (type == "doc") {
        this.isOpen = false;
        this.openId = "";
        this.isLoading = true;
        try {
          let docs = await axios.get(
            `/t/media/user/list/doc?performer_id=${this.$route.params.id}`
          );
          this.docs = docs.data.data;
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
          this.$toasted.error("Something went wrong in fetching data!");
        } finally {
          this.isLoading = false;
        }

        this.$modal.show("docModal");
      }
      if (type == "video") {
        this.isOpen = false;
        this.openId = "";
        this.isLoading = true;
        try {
          let videos = await axios.get(
            `/t/media/user/list/video?performer_id=${this.$route.params.id}`
          );
          this.videos = videos.data.data;
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
          this.$toasted.error("Something went wrong in fetching data!");
        } finally {
          this.isLoading = false;
        }

        this.$modal.show("videoModal");
      }
      if (type == "audio") {
        this.isOpen = false;
        this.openId = "";
        this.isLoading = true;
        try {
          let music = await axios.get(
            `/t/media/user/list/audio?performer_id=${this.$route.params.id}`
          );
          this.music = music.data.data;
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
          this.$toasted.error("Something went wrong in fetching data!");
        } finally {
          this.isLoading = false;
        }

        this.$modal.show("audioModal");
      }
      if (type == "sheet") {
        this.isOpen = false;
        this.openId = "";
        this.isLoading = true;
        try {
          let sheets = await axios.get(
            `/t/media/user/list/sheet?performer_id=${this.$route.params.id}`
          );
          this.sheets = sheets.data.data;
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
          this.$toasted.error("Something went wrong in fetching data!");
        } finally {
          this.isLoading = false;
        }

        this.$modal.show("sheetModal");
      }
      if (type == "image") {
        this.isOpen = false;
        this.openId = "";
        this.isLoading = true;
        try {
          let photos = await axios.get(
            `/t/media/user/list/image?performer_id=${this.$route.params.id}`
          );
          this.photos = photos.data.data;
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
          this.$toasted.error("Something went wrong in fetching data!");
        } finally {
          this.isLoading = false;
        }

        this.$modal.show("imageModal");
      }
    },
    isValidYoutubeLink(url) {
      const regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      return url.match(regExp);
    },
    getYoutbeId(url) {
      return this.$youtube.getIdFromURL(url);
    },
    openMenu: function (id) {
      this.isOpen = false;

      if (this.openId == id) {
        this.openId = "";
      } else {
        this.openId = id;
      }
    },
    manageCurrentUserRoles() {
      this.currentUserRoles = [];
      let currentUser = this.userList.filter(
        (userList) => userList.user_id == this.$route.params.id
      );
      let userrolesArray =
        currentUser.length > 0 && currentUser[0] && currentUser[0].rol
          ? currentUser[0].rol.split(",")
          : [];
      this.audition.roles.map((rol) => {
        if (userrolesArray.includes(`${rol.id}`)) {
          this.currentUserRoles.push(rol);
        }
      });
    },
    async addNumber() {
      try {
        if (this.isLoading) {
          return;
        }
        this.$toasted.clear();
        if (!this.addNumberText) {
          this.$toasted.error("The field number is required.");
          return;
        } else if (isNaN(this.addNumberText)) {
          this.$toasted.error("Please enter valid number.");
          return;
        }

        this.isLoading = true;
        let appointmentId = this.$route.params.round;
        await axios.post(`/assignNumber`, {
          user_id: this.$route.params.id,
          appointment_id: appointmentId,
          assign_no: this.addNumberText,
        });
        this.isShowAddNoField = false;
        this.isAssignedNumber = true;
        this.$toasted.success("Number assigned successfully.");
      } catch (error) {
        console.log(error);
        this.isAssignedNumber = false;
        this.$toasted.error(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },
    async saveFeedback() {
      this.$toasted.clear();
      try {
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;
        if (this.file.name != "Record Audition") {
          // upload thumbnail file
          let thumbnailUrl;
          if (this.thumbnail.file) {
            let thumbnailFile = await firebase
              .storage()
              .ref(`temp/thumbnail/${uuid()}.png`)
              .put(this.thumbnail.file);
            thumbnailUrl = await thumbnailFile.ref.getDownloadURL();
          }

          // upload video file
          const extension = this.file.org_name.substring(
            this.file.org_name.lastIndexOf(".") + 1
          );
          const filePath = this.file.name.includes(`${extension}`)
            ? `temp/${uuid()}_${this.file.name}`
            : `temp/${uuid()}_${this.file.name}.${extension}`;
          const file = await firebase
            .storage()
            .ref(filePath)
            .put(this.form.file);
          const url = await file.ref.getDownloadURL();

          let audition_record = {
            url: url,
            thumbnail: thumbnailUrl ? thumbnailUrl : null,
            appointment_id: this.$route.params.round,
            performer: this.$route.params.id,
            slot_id: this.slot,
            name: this.file.name,
          };
          let files = await axios.post(
            "/t/auditions/video/save",
            audition_record
          );
          this.$toasted.success("Audition record saved");
          this.isLoading = false;
          this.$refs.inputFile.value = null;
          this.videoFileName = null;
          this.file.name = "Record Audition";
        }
      } catch (e) {
        // console.log("saveFeedback -> e", e);
        this.isLoading = false;
        this.$toasted.error("This performer already has a video, try later");
      }
      this.form.callback =
        this.callback && this.callback == 1
          ? true
          : this.callback === null
          ? null
          : false;
      this.form.rating = this.rating;
      this.form.data = this.$route.params.audition;
      this.form.appointment_id = this.$route.params.round;
      this.form.user = this.$route.params.id;
      this.form.work =
        this.workon === null
          ? null
          : this.workon == 1
          ? "vocals"
          : this.workon == 2
          ? "acting"
          : "dancing";
      this.form.favorite = this.favorite;
      this.form.evaluation = this.emoji ? this.emoji : null;
      this.form.slot_id = this.slot;
      // this.form.evaluator = this.profile.details.id;
      this.form.evaluator = TokenService.getUserId();
      let data = {
        appointment_id: this.$route.params.round,
        performer: this.$route.params.id,
      };
      this.isLoading = false;
      if (Object.keys(this.feedback).length == 0) {
        this.isUpdateFeeback = false;
        // console.log("saveFeedback -> this.form", this.form)
        let status = await axios.post("/t/feedbacks/add", this.form);
        this.$toasted.success("Feedback Created");
        let feedback = {
          user: this.$route.params.id,
          round: this.$route.params.round,
        };
        await this.fetchUserFeedback(feedback);
        await this.fetchTeamFeedback(data);
        this.isUpdateFeeback = true;
        return;
      }
      this.isUpdateFeeback = true;
      this.form.user_id = this.$route.params.id;
      // console.log("update Feedback -> this.form", this.form)
      let status = await axios.put(
        `/t/auditions/${this.$route.params.round}/feedbacks/update`,
        this.form
      );
      this.$toasted.success("Feedback Updated");
      await this.fetchTeamFeedback(data);
      return;
    },
    async handleFile(e) {
      this.thumbnail = {};
      this.form.file = null;
      let file = e.target.files[0];
      this.form.file = file;
      this.file.name = file.name;
      this.file.org_name = file.name;

      if (file.type.match("video")) {
        this.videoFileName = JSON.parse(JSON.stringify(this.file.name));
        await ThumbService.videoThumbnail(
          file,
          DEFINE.thumbSize.videoThumbWidth
        ).then((thumb_data) => {
          Vue.set(this.thumbnail, "preview", thumb_data.preview);
          Vue.set(this.thumbnail, "file", thumb_data.file);
        });
        this.$modal.show("modal_thumbnail_image");
      } else {
        this.$toasted.error("Please upload valid video file!");
        this.$refs.inputFile.value = null;
        this.file.name = "Record Audition";
        this.videoFileName = null;
      }
    },
    imageRenameDone() {
      this.$toasted.clear();
      if (
        !this.videoFileName ||
        this.videoFileName == "" ||
        this.videoFileName.trim() == ""
      ) {
        this.$toasted.error("Please enter filename!");
        return;
      } else if (this.videoFileName && this.videoFileName.length > 150) {
        this.$toasted.error(
          "Filename is too long, it should not be more than 150 characters!"
        );
        return;
      }
      this.file.name = JSON.parse(JSON.stringify(this.videoFileName));
      this.videoFileName = null;
      this.$modal.hide("modal_thumbnail_image");
    },
    imageRenameCancel() {
      this.videoFileName = null;
      this.$modal.hide("modal_thumbnail_image");
    },
    asignEvents() {
      var finalList = new Array();
      if (this.calendar && this.calendar.length > 0) {
        this.calendar.map(function (value) {
          let splitInitDate = value.start_date.split("-");
          let splitFinalDate = value.end_date.split("-");
          finalList.push({
            start: new Date(
              splitInitDate[0],
              splitInitDate[1] - 1,
              splitInitDate[2]
            ),
            end: new Date(
              splitFinalDate[0],
              splitFinalDate[1] - 1,
              splitFinalDate[2]
            ),
          });
        });
      }
      this.attrs = [
        {
          bar: {
            color: "yellow",
            class: "calender-bar-inside-line",
          },
          key: "today",
          dates: finalList,
        },
      ];
    },
    async setTags() {
      if (this.tag !== "") {
        let data = {
          title: this.tag,
          id: null,
          appointment_id: this.$route.params.round,
          user_id: this.$route.params.id,
        };

        if (await this.storeTag(data))
          this.$toasted.success("Tag created successfully");
        await this.fetchTags({
          round: this.$route.params.round,
          user: this.$route.params.id,
        });
      } else {
        this.$toasted.error("Tag not created, try later");
      }
      this.tag = "";
    },
    async setRecommendations() {
      if (this.recommendation !== "" && this.currentMarketplace !== "") {
        let data = {
          title: this.recommendation,
          marketplace_id: this.currentMarketplace.id,
          audition_id: this.$route.params.audition,
          user_id: this.$route.params.id,
          appointment_id: this.$route.params.round,
        };
        if (await this.storeRecommendation(data))
          this.$toasted.success("Recommendation created successfully");
        await this.fetchRecommendation({
          round: this.$route.params.audition,
          user: this.$route.params.id,
        });
      } else {
        this.$toasted.error(
          "Recommendation not created, select a Marketplace or try later"
        );
      }
      this.recommendation = "";
    },

    async filterMarketplaces() {
      await this.searchMarketplace(this.marketplaceSearch);
    },

    async selectMarketplace(item) {
      this.currentMarketplace = item;
      this.recommendation = item.name;
      await this.setRecommendations();
      this.currentMarketplace = "";
      this.recommendation = "";
    },

    async deleteTag(item) {
      try {
        await this.delete(item);
        this.$toasted.success("Tag deleted successfully");
        await this.fetchTags({
          round: this.$route.params.round,
          user: this.$route.params.id,
        });
      } catch (e) {
        this.$toasted.error("Tag not deleted, try later");
      }
    },

    async deleteRecommended(item) {
      try {
        await this.deleteRecommendation(item);
        this.$toasted.success("Recommendation deleted successfully");
        await this.fetchRecommendation({
          round: this.$route.params.audition,
          user: this.$route.params.id,
        });
      } catch (e) {
        console.log(e);
        this.$toasted.error("Recommendation not deleted, try later");
      }
    },

    show() {
      this.$modal.show("marketplace");
    },
    hide() {
      this.$modal.hide("marketplace");
    },
    setUrl(url) {
      var pattern = /^((http|https|ftp):\/\/)/;
      if (!pattern.test(url)) {
        url = "http://" + url;
      }
      return url;
    },
    loadedVideo() {
      this.isLoadedVideo = true;
    },
    playVideo(videoData) {
      this.isLoadedVideo = false;
      this.currentVideo = videoData.url;
      this.$modal.show("video_modal");
    },
    getChatUserDetails(user_id) {
      // it should be dynamic when audition wise all user list get
      return this.casterUserList && this.casterUserList[user_id]
        ? this.casterUserList[user_id]
        : null;
    },
    chatTimeFormat(timestamp) {
      // console.log("chatTimeFormat -> timestamp", timestamp)
      const date = timestamp ? timestamp.toDate() : null;
      // console.log("chatTimeFormat -> date", date)
      return date;
    },
    /**
     * This method is used for create chat collection for particular uadition if it's not exist if exist then set reference
     */
    async initializeChat() {
      const currentChatPath = `${this.chatPrefix}${this.$route.params.audition}`;

      this.auditionChatRef = db
        .collection("audition_chats")
        .doc(currentChatPath);
      await this.auditionChatRef
        .get()
        .then((doc) => {
          if (!doc.exists) {
            // console.log("initializeChat -> create doc");
            this.auditionChatRef.set({});
          } else {
            // console.log("initializeChat -> already exist doc");
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });
    },
    /**
     * On chat button click get list of message and set value with real time message change
     */
    async chatManage() {
      this.isChatView = !this.isChatView;
      // console.log("chatManage -> this.isChatView", this.isChatView);
      if (this.isChatView) {
        if (Object.keys(this.casterUserList).length === 0) {
          await this.getCasterUsers();
        }
        // const currentChatPath = `${this.chatPrefix}${this.$route.params.audition}`;
        const roundChatPath = `${this.$route.params.round}`;
        // console.log("chatManage -> this.auditionChatRef", this.auditionChatRef)
        this.auditionChatRef
          .collection(`${roundChatPath}`)
          .orderBy("createDate", "asc")
          .onSnapshot(async (querySnapshot) => {
            await querySnapshot.forEach((doc) => {
              // console.log("chatManage -> doc id", doc.id)
              // console.log("chatManage -> doc data", doc.data())
              let data = doc.data();
              data.sender = this.getChatUserDetails(data.sender_id);
              // console.log("chatManage -> data", data)

              const index =
                this.messageList && this.messageList.length > 0
                  ? this.messageList.findIndex((e) => e.id === doc.id)
                  : -1;

              if (index === -1) {
                this.messageList.push({
                  id: doc.id,
                  ...data,
                });
              } else {
                this.messageList[index] = {
                  id: doc.id,
                  ...data,
                };
              }
            });
            this.$refs.chatlist.scrollTop =
              this.$refs.chatlist.scrollHeight + 120;
          });
      }
      // this.messageList = this.messageList.sort(
      //     (a, b) =>
      //       new Date(a.createDate.seconds) - new Date(b.createDate.seconds)
      //   );
      // console.log("chatManage -> this.messageList", this.messageList);
    },
    chatToDetails() {
      this.isChatView = false;
    },
    show() {
      this.$modal.show("marketplace");
    },
    hide() {
      this.$modal.hide("marketplace");
    },
    setUrl(url) {
      var pattern = /^((http|https|ftp):\/\/)/;
      if (!pattern.test(url)) {
        url = "http://" + url;
      }
      return url;
    },
    loadedVideo() {
      this.isLoadedVideo = true;
    },
    playVideo(videoData) {
      this.isLoadedVideo = false;
      this.currentVideo = videoData.url;
      this.$modal.show("video_modal");
    },
    /**
     * Form nav bar click on back button then navigate to audition details
     */
    backAudition() {
      this.$router.push({
        name: "auditions/detail",
        params: { id: this.$route.params.audition },
      });
    },
    /**
     * When click on next button then navigate to next performer details of current audition
     */
    gotoNextPerformer() {
      if (this.nextPerformerId) {
        this.$router.push({
          name: "auditions/user",
          params: {
            audition: this.$route.params.audition,
            round: this.$route.params.round,
            id: this.nextPerformerId,
          },
        });
        this.setNextPerform();
      }
    },
    /**
     * Find out next perfomer id
     */
    setNextPerform() {
      if (this.userList && this.userList.length > 0) {
        const userIndex = this.userList.findIndex(
          (x) => x.user_id == this.$route.params.id
        );
        if (userIndex > -1 && userIndex < this.userList.length - 1) {
          this.nextPerformerId = this.userList[userIndex + 1].user_id;
        } else {
          this.nextPerformerId = null;
        }
      } else {
        this.nextPerformerId = null;
      }
    },
    async sendMessage() {
      if (this.chatMessage && this.chatMessage != "") {
        // const currentChatPath = `${this.chatPrefix}${this.$route.params.audition}`;
        const roundChatPath = `${this.$route.params.round}`;
        let chatMessageDoc = this.auditionChatRef.collection(roundChatPath);
        const message = this.chatMessage;
        this.chatMessage = "";
        await chatMessageDoc.add({
          message: message,
          sender_id: parseInt(TokenService.getUserId()),
          createDate: new Date(),
          read: false,
        });
      } else {
        this.$toasted.clear();
        this.$toasted.error("Please enter message!");
      }
      this.chatMessage = "";
      // console.log("sendMessage -> this.messageList", this.messageList);
    },
    goToSettings() {
      this.$router.push({
        name: "my.settings",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-resizer {
  width: 100%;
  height: 400px;
}
.custom-resizer > .pane {
  text-align: left;
  padding: 15px 15px;
  overflow: hidden;
  background: #f0f0f0;
}
.custom-resizer > .multipane-resizer {
  margin: 0;
  left: 0;
  position: relative;
  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -1.5px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
nav {
  background-image: linear-gradient(#4d2545, #782541);
}
.img-h48 {
  height: 48px;
}
.full-height {
  // height: 66rem !important;
  height: auto !important;
}
.cus-cur {
  cursor: pointer;
}
.work-on-btn {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
}
.w-610 {
  width: 610px;
}
.h-300 {
  height: 290px;
}
.button-detail {
  background-image: linear-gradient(#4d2545, #782541);
}
ul li {
  position: relative;
  margin: 0.25em;
  text-align: center;
}
ul#navigation {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.dropdown {
  position: absolute;
  left: 50%;
  margin-top: 0.55em;
  border-radius: 0.35em;
  background-color: rgba(33, 37, 41, 0.15);
  /*visibility: hidden;
  opacity: 0;*/
}

.cus-dropdown {
  position: absolute;
  left: 50%;
  margin-top: 0.55em;
  border-radius: 0.35em;
  background-color: rgba(33, 37, 41, 0.15);
  visibility: hidden;
  opacity: 0;
}
.cus-spn-cls {
  margin-left: 10px;
}

.dropdown.isOpen {
  visibility: visible;
  opacity: 1;
}
.dropdown.submanu {
  position: absolute;
  left: -130px;
  top: 2px;
  width: 130px;
  background-color: #f7f7f7;
  z-index: 111;
}
.dropdown.submanu ul {
  width: 100%;
}
ul#navigation li:first-child {
  position: relative;
}
.sidebar .sidebar-content {
  min-height: calc(100vh - 48px);
}
ul#navigation > li > a {
  padding: 0.55em 1em;
  transition: all 200ms ease;
}
ul#navigation {
  align-self: flex-end;
}
.submanu-content li a[title="Share"]::after,
.submanu-content li a[title="Open in"]::after,
.submanu-content li a[title="Rename"]::after,
.submanu-content li a[title="Delete"]::after {
  content: "";
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 10px;
  top: 3px;
  background-size: 18px 18px;
}
.submanu-content li a[title="Share"]::after {
  background-image: url(/images/icons/icon1.png);
}
.submanu-content li a[title="Open in"]::after {
  background-image: url(/images/icons/icon2.png);
}
.submanu-content li a[title="Rename"]::after {
  background-image: url(/images/icons/edit2.png);
}
.submanu-content li a[title="Delete"]::after {
  background-image: url(/images/icons/icon3.png);
}
ul.submanu-content > li > a {
  display: block;
  padding: 0;
  position: relative;
  padding-left: 48px;
  text-align: left;
  margin-bottom: 8px;
  cursor: pointer;
}
.calender-bar-inside-line {
  margin-bottom: 15px !important;
  background-color: #d8893a !important;
}
.calendar-bar-inline .vc-day-layer[data-v-47ef1cd6] {
  left: -6px !important;
  right: -6px !important;
}
.social-a {
  margin-right: 5px;
  background: #cacaca;
  border-radius: 10040px !important;
}

.reafresh-spacing {
  margin-right: -30px;
  padding-left: 18px;
}
.image-preview-area {
  width: 400px;
}
.actions {
  margin-top: 1rem;
}
.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #782541;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

// .v--modal-box.v--modal {
//   overflow: auto !important;
//   min-height: 200px !important;
// }

.w-70 {
  width: 70%;
}

.chat-side-min-width {
  width: 100%;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
}

.back-mrg-l {
  padding-left: 22px !important;
}
.chat-head {
  background-color: #bfbfbf;
  border-radius: 4px 4px 0px 0px;
  height: 45px;
  line-height: 45px;
  padding: 0px 15px;
}
.chat-image {
  min-width: 2rem;
}
.col-chat {
  width: 100%;
  max-width: calc(100% - 2.75rem);
}
.chat-btn {
  position: absolute;
  top: 0px;
  right: 5px;
  bottom: 0px;
  margin: auto;
}
.chat-input {
  padding-right: 40px !important;
  border-radius: 20px;
}
.ml-feedback {
  margin-left: 3.25rem !important;
}
.h-feedback {
  height: 7rem !important;
}
.h-bottom {
  height: 28rem !important;
}

/* //start: rating slider custom css */
.rate-slider .vue-slider-dot-handle {
  border: 2px solid #4d2544 !important;
}
.rate-slider .vue-slider-process {
  background-color: #4d2544 !important;
}
.vue-slider:hover .vue-slider-dot-handle:hover {
  border-color: #6f2541 !important;
}
.vue-slider .vue-slider-dot-handle-focus {
  border-color: #6f2541 !important;
  box-shadow: rgba(111, 37, 65, 0.4) !important;
}
.rate-slider:hover .vue-slider-process {
  background-color: #6f2541 !important;
}
.vue-slider:hover .vue-slider-dot-handle {
  border-color: #6f2541;
}
.rate-slider * {
  box-shadow: none !important;
}
.mp-box > span {
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  overflow: hidden;
  width: 170px !important;
}
.image-rounded {
  border-radius: 10px 0 0 10px;
  overflow: hidden;
}
/* //end: rating slider custom css */
.contact-btn {
  width: 6.3rem !important;
}
.h-50 {
  height: calc(70vh - 48px) !important;
}
.chat-message {
  height: calc(100vh - 225px);
}
.chat-message span {
  word-break: break-all;
}
.resume-popup-close-btn {
  top: 18px;
  left: 18px;
}
.modal-height-90 {
  height: 100vh !important;
  top: 0 !important;
}
.v--modal-box.v--modal {
  overflow: auto !important;
}
.modal-height-90 .v--modal-box.v--modal {
  height: 90vh !important;
  top: 5vh !important;
}
.video-player-border {
  border-radius: 0 0 10px 10px;
  justify-content: space-between;
}
.music-border {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.music-icon-parent {
  padding: 6px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.custom-fixed-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
}
</style>
