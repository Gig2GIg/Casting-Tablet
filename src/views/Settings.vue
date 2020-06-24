<template>
  <div class="flex w-full container text-purple pl-6 py-8">
    <!-- Filters -->
    <div class="w-full p-4">
      <div class="flex items-center text-purple">
        <span class="ml-2 text-sm" />
      </div>

      <div v-if="!hideMenuInfo" class="tags w-2/5 mx-auto px-3 py-3 mt-6">
        <div class="py-4">
          <div class="flex items-center px-3">

            <div v-lazy-container="{ selector: 'img' }" class="mr-6">
                <img                    
                    :data-loading="loading_placeholder" :data-error="user_placeholder"
                    :data-src="user.image && user.image.thumbnail ? user.image.thumbnail : (user.image && user.image.url ? user.image.url : '' )"
                    class="h-24 w-24 rounded object-cover"
                    alt="Avatar"
                />
            </div>


            <div class="w-6/12 py-8">
              <p
                class="font-bold"
              >{{ user.details && user.details.first_name ? user.details.first_name + ' ' + user.details.last_name:"" }}</p>
              <p class="font-bold">{{ user.details ? user.details.agency_name : '' }}</p>
            </div>
          </div>
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300 mr-2 cursor-pointer"
          @click="manageSelectedTab('myinfo')"
        >
          <div class="w-10/12">
            <p class="font-bold">My Info</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          v-if="!user.is_invited"
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300 mr-2 cursor-pointer"
          @click="manageSelectedTab('subscription')"
        >
          <div class="w-10/12">
            <p class="font-bold">Subscription</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300 mr-2 cursor-pointer"
          @click="manageSelectedTab('notifications')"
        >
          <div class="w-10/12">
            <p class="font-bold">Push Notifications</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300 mr-2 cursor-pointer"
          @click="manageSelectedTab('instantFeedback')"
        >
          <div class="w-10/12">
            <p class="font-bold">Instant Feedback</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="manageSelectedTab('marketplace')"
        >
          <div class="w-10/12">
            <p class="font-bold">QR Code</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="manageSelectedTab('appinfo')"
        >
          <div class="w-10/12">
            <p class="font-bold">App Info</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <!-- <div
          class="flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="tabSelected = 'faq'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              FAQ
            </p>
          </div>
          <div class="w-2/12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10.926"
              height="19.213"
            >
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>-->
        <div
          class="flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="manageSelectedTab('termsofuse')"
        >
          <div class="w-10/12">
            <p class="font-bold">Terms of Use</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
        >
          <div class="w-10/12">
            <a
              target="_blank"
              v-bind:href="'mailto:'+contact_us_email+''"
              class="font-bold"
            >Contact Us</a>
          </div>
          <a target="_blank" v-bind:href="'mailto:'+contact_us_email+''">
            <div class="w-2/12">
              <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
                <g data-name="Grupo 1912">
                  <g data-name="Grupo 38">
                    <path
                      data-name="Trazado 24"
                      d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                      fill="#4d2545"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <div
          class="flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="manageSelectedTab('policy')"
        >
          <div class="w-10/12">
            <p class="font-bold">Privacy Policy</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div
        v-if="hideMenuInfo && showFeedBackOptionMenu"
        class="tags w-2/5 mx-auto pl-5 pr-3 py-3 mt-6"
      >
        <img
          src="/images/icons/left_arrow.png"
          class="cursor-pointer mb-3"
          @click="hideMenuInfo = false; showFeedBackOptionMenu = false; tabSelected= ''"
        />

        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300 mr-2 cursor-pointer feedback-option-ml"
          @click="tabSelected = 'instantGreenFeedbackTab'; showFeedBackOptionMenu = false;"
        >
          <div class="w-10/12">
            <p class="font-bold">Green Check</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300 mr-2 cursor-pointer feedback-option-ml"
          @click="tabSelected = 'instantRejectFeedbackTab'; showFeedBackOptionMenu = false;"
        >
          <div class="w-10/12">
            <p class="font-bold">Red X</p>
          </div>
          <div class="w-2/12">
            <svg xmlns="http://www.w3.org/2000/svg" width="10.926" height="19.213">
              <g data-name="Grupo 1912">
                <g data-name="Grupo 38">
                  <path
                    data-name="Trazado 24"
                    d="M7.804 9.606L.373 17.037a1.275 1.275 0 101.8 1.8l8.053-8.05a1.26 1.26 0 00.328-.231 1.267 1.267 0 00.372-.95 1.267 1.267 0 00-.369-.95 1.259 1.259 0 00-.328-.231L2.175.373a1.275 1.275 0 00-1.8 1.8z"
                    fill="#4d2545"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div v-if="tabSelected === 'marketplace'" class="tags w-2/5 shadow-lg mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="marketplace_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#marketplace_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="w-full flex flex-wrap justify-center">
          <img src="/images/icons/qr.png" alt="Icon" class />
          <div class="container flex w-full mt-3 cursor-pointer">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div
                class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center border-2 border-purple bg-white"
              >
                <p class="text-purple text-sm font-bold content-center tracking-tighter flex-1">Copy</p>
              </div>
            </div>
          </div>
          <div class="container flex w-full mt-3 cursor-pointer">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div
                class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail"
              >
                <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">Save</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabSelected === 'myinfo'" class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" v-if="user.details && user.details.agency_name" @click="cancelUpdateProfile">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="myinfo_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#myinfo_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4 mr-2 font-bold flex flex-wrap justify-center">
          <div class="py-4 w-full">
            <div class="flex justify-center items-center px-3 w-full">
              <div class="mr-6">
                <!-- <img
                :src="user.image && user.image.url ? user.image.url: ''"
                class="h-24 w-24 rounded"
                alt="Logo"
                >-->

                <div
                  class="ml-2 flex items-center cursor-pointer justify-center overflow-hidden h-24 w-24 rounded"
                  @click="$refs.profileFile.click()"
                >
                  <div
                    v-if="!previewProfile && previewProfile != ''"
                    class="flex flex-col flex-no-wrap justify-between"
                  >
                    <img src="/images/icons/upload.png" class="rounded" />
                  </div>
                  <div v-else v-lazy-container="{ selector: 'img' }" >
                      <img
                          :data-loading="loading_placeholder" :data-error="user_placeholder"
                          :data-src="previewProfile"
                          class="h-24 w-24 rounded object-cover"
                          alt="Avatar"
                      />
                  </div>
                </div>

                <input
                  ref="profileFile"
                  accept=".png, .jpg, .jpeg"
                  type="file"
                  hidden
                  @change="handleProfileFile"
                />
              </div>

              <div class="w-6/12 py-8">
                <p
                  class="font-bold"
                >{{ user.details && user.details.first_name ? user.details.first_name : ''}} {{ user.details && user.details.last_name ? user.details.last_name : '' }}</p>
                <p
                  class="font-bold"
                >{{ user.details && user.details.agency_name ? user.details.agency_name : '' }}</p>
              </div>
            </div>
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  v-model="form.first_name"
                  v-validate="'required|max:255'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="first_name"
                  placeholder="First Name"
                  :message="errors.first('first_name')"
                  data-vv-as="first name"
                />
              </div>
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  v-model="form.last_name"
                  v-validate="'required|max:255'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="last_name"
                  placeholder="Last Name"
                  :message="errors.first('last_name')"
                  data-vv-as="last name"
                />
              </div>
            </div>
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  v-model="form.email"
                  v-validate="'required|email'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="email"
                  v-bind:disabled="true"
                  placeholder="Email"
                  :message="errors.first('email')"
                />
              </div>
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  v-model="form.profesion"
                  v-validate="'required|max:255'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="profesion"
                  placeholder="Job Title"
                  :message="errors.first('profesion')"
                  data-vv-as="profesion"
                />
              </div>
            </div>
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-1/3 ml-4 text-purple px-2">
                <!-- <base-input
                  v-model="form.address"
                  v-validate="'required|max:300'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="address"
                  placeholder="Address"
                  :message="errors.first('address')"
                />-->
                <base-input
                  ref="password"
                  v-model="form.password"
                  v-validate="'min:8'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="password"
                  type="password"
                  placeholder="Password"
                  :message="errors.first('password')"
                  autocomplete="false"
                />
              </div>
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  v-model="form.agency_name"
                  v-validate="'required'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="agency_name"
                  placeholder="Agency Name"
                  :message="errors.first('agency_name')"
                  data-vv-as="agency name"
                />
              </div>
            </div>
            <!-- <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  key="city-input"
                  v-model="form.city"
                  v-validate="'required|max:255'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="city"
                  placeholder="City"
                  :message="errors.first('city')"
                />
              </div>
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-select
                  key="state-input"
                  v-model="form.state"
                  v-validate="'required'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="state"
                  placeholder="State"
                  :message="errors.first('state')"
                >
                  <option
                    v-for="state in states"
                    :key="state.value"
                    :value="state.value"
                  >{{ state.label }}</option>
                </base-select>
              </div>
            </div>-->
            <!-- <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  key="zip-input"
                  v-model="form.zip"
                  v-validate="'required|integer|max:5'"
                  v-mask="'#####'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="zip"
                  class
                  placeholder="Zip"
                  :message="errors.first('zip')"
                />
            </div>-->
            <div class="flex justify-center mb-4 items-center px-3 w-full">
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-select
                  key="country-input"
                  v-model="form.country"
                  v-validate="'required'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="country"
                  class="w-full"
                  placeholder="Country"
                  :message="errors.first('country')"
                >
                  <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                  >{{ country.name }}</option>
                </base-select>
              </div>
              <div class="w-1/3 ml-4 text-purple px-2">
                <base-input
                  id="birth"
                  key="birth-input"
                  v-model="form.birth"
                  v-validate="'required'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="birth"
                  type="date"
                  placeholder="Birth Date"
                  :message="errors.first('birth')"
                  data-vv-as="birth date"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="container flex w-full mt-3 cursor-pointer" @click="updateData">
          <div class="flex w-full text-center justify-center flex-wrap">
            <div
              class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail"
            >
              <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">Update</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!user.is_invited && tabSelected === 'subscription' && hideMenuInfo == true"
        class="tags w-80 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <invite-user-list />
      </div>
      <div
        v-if="tabSelected === 'notifications'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg"  width="30.049" height="39.187">
            <defs>
              <filter
                id="notifications_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#notifications_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4 mr-2 font-bold">
          <div
            v-for="notifications in listNotificacions"
            :key="notifications.id"
            class="flex flex-wrap py-6"
          >
            <div class="overflow-auto w-10/12">
              <span
                class="text-purple text-lg capitalize"
              >{{ notifications.code.replace('_', ' ') }} ({{ notifications.status }})</span>
            </div>
            <div class="w-1/12">
              <label class="switch">
                <input
                  id="notifications"
                  type="checkbox"
                  :checked="notifications.status === 'on' ? true : false"
                  @change="disableNotification(notifications)"
                />
                <span class="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="tabSelected === 'instantRejectFeedbackTab'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <img
          src="/images/icons/left_arrow.png"
          class="cursor-pointer"
          @click="hideMenuInfo = true; showFeedBackOptionMenu = true; tabSelected= 'instantFeedback'"
        />
        <div class="py-4 px-4 mr-2 font-bold">
          <form @submit.prevent="updateFeedBackTxt('negative')" class="custom-setting-form">
            <p style="text-align: center">Performers who have been hidden will receive the message:</p>
            <base-input
              type="text"
              v-model="feedbackText"
              class="w-full px-2"
              :custom-classes="['border', 'border-purple']"
            />
            <base-button type="submit" expanded>Edit</base-button>
          </form>
        </div>
      </div>

      <div
        v-if="tabSelected === 'instantGreenFeedbackTab'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <img
          src="/images/icons/left_arrow.png"
          class="cursor-pointer"
          @click="hideMenuInfo = true; showFeedBackOptionMenu = true; tabSelected= 'instantFeedback'"
        />

        <div class="py-4 px-4 mr-2 font-bold">
          <form @submit.prevent="updateFeedBackTxt('positive')" class="custom-setting-form">
            <p
              style="text-align: center"
            >Performers who have been "Green checked" will receive the message:</p>
            <base-input
              type="text"
              v-model="feedbackStdText"
              class="w-full px-2"
              :custom-classes="['border', 'border-purple']"
            />
            <base-button type="submit" expanded>Edit</base-button>
          </form>
        </div>
      </div>

      <div v-if="tabSelected === 'audition'" class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="audition_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#audition_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4 mr-2 font-bold">
          <div
            v-for="audition in listAuditionFeedback"
            :key="audition.id"
            class="flex flex-wrap py-6"
          >
            <div class="overflow-auto w-10/12">
              <span class="text-purple text-lg">{{ audition.setting }}</span>
            </div>
            <div class="w-1/12">
              <label class="switch">
                <input
                  id="auditioncheckbox"
                  type="checkbox"
                  :checked="audition.value === 1 ? true : false"
                  @change="disableAuditionFeedback(audition)"
                />
                <span class="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tabSelected === 'appinfo'" class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="appinfo_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#appinfo_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.app_info ? cmsContentDetails.app_info: ''"></div>
      </div>

      <div v-if="tabSelected === 'faq'" class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="faq_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#faq_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div
          class="py-4 px-4 mr-2 cursor-pointer font-bold text-justify"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nisi labore natus, quod repellendus cupiditate et facilis voluptates accusamus blanditiis? Necessitatibus repudiandae voluptatem explicabo tempora omnis accusamus eum! Facilis voluptate pariatur, corporis animi, quod quae quos fugiat amet nesciunt repellendus aut beatae facere quis consectetur dignissimos ratione rem hic molestias aliquid delectus sequi quas odit. Officiis blanditiis dicta ducimus exercitationem in perferendis expedita aliquid quibusdam doloremque mollitia aliquam suscipit autem reprehenderit ad explicabo incidunt consequuntur illo fuga, numquam cupiditate nisi! Ullam, neque repellendus unde deleniti tempore hic eligendi est recusandae inventore ipsam cupiditate placeat ut consectetur eaque laborum, ab officiis facilis delectus animi fugit. Maxime cumque natus, dicta eius voluptate nostrum ipsa consequatur, corporis quaerat repellat earum adipisci fugiat, laborum reprehenderit. Alias accusantium ut ipsa amet facere necessitatibus autem molestias! Repellat, harum maxime sunt corrupti eum qui amet quibusdam, quaerat optio odit iste rerum? Dolorem est ad doloremque reiciendis adipisci quas illo maiores veniam exercitationem a odit fuga nisi eligendi consectetur culpa facere, voluptate voluptas, modi explicabo perspiciatis. Illo dolores libero iure excepturi incidunt quam explicabo, fuga, harum quisquam placeat, debitis modi molestias quia sequi reiciendis necessitatibus corrupti aliquam atque vitae voluptatem! Velit fuga neque amet harum eius? Vitae, ut!</div>
      </div>

      <div v-if="tabSelected === 'termsofuse'" class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="termsofuse_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#termsofuse_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.term_of_use ? cmsContentDetails.term_of_use : ''"></div>
      </div>

      <div v-if="tabSelected === 'policy'" class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="policy_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#policy_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.privacy_policy ? cmsContentDetails.privacy_policy : ''"></div>
      </div>
      <div v-if="tabSelected === 'contact_us'" class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6">
        <div class="cursor-pointer" @click="hideMenuInfo = false; tabSelected = ''">
          <svg xmlns="http://www.w3.org/2000/svg" width="30.049" height="39.187">
            <defs>
              <filter
                id="contact_us_svg"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity=".161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g filter="url(#contact_us_svg)" data-name="Grupo 38">
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.contact_us ? cmsContentDetails.contact_us : ''"></div>
      </div>
    </div>

    <modal
      class="flex flex-col w-full items-center my-info-mdel"
      :width="600"
      :height="480"
      name="modal_crop_image"
    >
      <div class="content my-info-content" ng-if="imgSrc">
        <section class="cropper-area">
          <div class="img-cropper">
            <vue-cropper
              ref="cropper"
              :aspect-ratio="9/9"
              :initial-aspect-ratio="1/1"
              :src="imgSrc"
              preview=".preview"
              drag-mode="crop"
              :minCropBoxWidth="minHeight"
              :minCropBoxHeight="minWidth"
              :auto-crop-area="0.5"
              alt="Profile Picture"
              :img-style="{ 'width': '400px', 'height': '300px' }"
            />
          </div>
          <div class="actions">
            <a href="#" role="button" @click.prevent="cropSaveImage">Crop & Save</a>
            <!-- <a
              href="#"
              role="button"
              @click.prevent="cropImage"
            >
              Crop
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="reset"
            >
              Reset
            </a>            
            <a
              href="#"
              role="button"
              @click.prevent="showFileChooser"
            >
              Upload New Image
            </a>
            <a
              href="#"
              role="button"
              @click.prevent="cropImageDone"
            >
              Done
            </a>-->
            <a href="#" role="button" @click.prevent="cropImageCancel">Cancel</a>
          </div>
          <base-input
            v-model="profileFileName"
            :custom-classes="['border border-b border-gray-300']"
            name="cover_file_name"
            placeholder="Cover Name"
            data-vv-as="cover name"
            class="w-8/12"
          />
        </section>
        <!-- <section class="preview-area">
          <p>Image Preview</p>
          <div class="preview" />
          <p>Cropped Image</p>
          <div class="cropped-image">
            <img
              v-if="cropImg"
              :src="cropImg"
              alt="Cropped Profile"
            />
            <div v-else class="crop-placeholder" />
          </div>
        </section>-->
      </div>
    </modal>
  </div>
</template>

<script>
// const $ = require('jquery');
// window.$ = $;

import axios from "axios";
// import states from "@/utils/states";
import countries from "@/utils/countries";
import { mapActions, mapState } from "vuex";
import DEFINE from "../utils/const.js";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import firebase from "firebase/app";
import "firebase/storage";
import uuid from "uuid/v1";
import moment from "moment";
import Vue from "vue";
import ThumbService from "@/services/ThumbService";
import { eventBus } from "../main";

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      form: {},
      formfeatured: {},
      selectedFile: {},
      hideMenuInfo: false,
      showFeedBackOptionMenu: false,
      tabSelected: "",
      contact_us_email: DEFINE.contact_us,
      listNotificacions: [],
      listAuditionFeedback: [],
      feedbackText: "",
      feedbackStdText: "",
      cmsContentDetails: {},
      // states,
      countries,
      previewProfile: null,
      imgSrc: null,
      updatedImageFile: null,
      updatedImageBlob: null,
      cropImg: "",
      data: null,
      minHeight: Number(200),
      minWidth: Number(200),
      isLoading: false,
      profileFileName: null,
      profileNameObject: {},
      profileThumbnail: {},
      user_placeholder : DEFINE.role_placeholder,
      loading_placeholder : DEFINE.loading_placeholder
    };
  },
  async mounted() {
    const tab = this.$route.query.tab;
    if (tab && tab != "") {
      this.manageSelectedTab(tab);
    }
    this.getUserData();
  },
  async created() {
    eventBus.$on("settingNavViewChange", value => {
      this.hideMenuInfo = value;
      if(!this.hideMenuInfo) {
        this.$router.push(this.$route.path);      
      }      
    });
  },
  watch: {
    tabSelected: {
      immediate: true,
      async handler(value) {
        switch (value) {
          case "instantFeedback":
            this.getInstantFeedback();
            break;
          case "termsofuse":
            this.getCMSContent();
            break;
          case "policy":
            this.getCMSContent();
            break;
          case "appinfo":
            this.getCMSContent();
            break;
          // case "contact_us":
          //   this.getCMSContent();
          //   break;
          default:
            break;
        }
      }
    },
    '$route.query'() {
        const tab = this.$route.query.tab;
        if (tab && tab != "") {
          this.manageSelectedTab(tab);
        }
    }
  },
  computed: {
    ...mapState("profile", ["user"])
  },
  methods: {
    ...mapActions("profile", ["fetch"]),
    manageSelectedTab(tab) {
      this.$toasted.clear();
      const isPrimeUser = this.user && this.user.is_premium ? true : false;
      if (
        !isPrimeUser &&
        (tab == "instantFeedback" ||
          tab == "marketplace" ||
          tab == "notifications")
      ) {
        if(this.user.is_invited){
          this.$toasted.info(DEFINE.no_plan_sub_user_subscirbed_error);
        } else {
          this.$toasted.info(DEFINE.no_plan_subscirbed_error, {
            action: {
              text: 'Subscribe',
              onClick: (e, toastObject) => {
                this.$router.push({ name: 'my.settings', query: { tab: "subscription" } });
              }
            }
          });
        }
      } else {
        this.tabSelected = tab;
        this.hideMenuInfo = true;
        if (this.tabSelected == "instantFeedback") {
          this.showFeedBackOptionMenu = true;
        } else if (this.tabSelected == "subscription") {
          eventBus.$emit("settingNavViewChange", this.hideMenuInfo);
        }
      }
    },
    async updateFeedBackTxt(type) {
      try {
        let res = await axios.post(`/t/instantfeedbacks/changeDefault`, {
          feedback:
            type == "positive" ? this.feedbackStdText : this.feedbackText,
          type: type
        });
        this.$toasted.success("Feedback updated successfully.");
      } catch (e) {
        console.log(e);
        this.$toasted.success(e.response.data.data);
      }
    },
    async getUserData() {
      await this.fetch();
      this.user.details;
      this.setUserData();
    },
    setUserData() {
      this.form.first_name = this.user.details.first_name;
      this.form.last_name = this.user.details.last_name;
      this.form.profesion = this.user.details.profesion;
      this.form.email = this.user.email;
      this.form.address = this.user.details.address;
      this.form.city = this.user.details.city;
      this.form.zip = this.user.details.zip;
      this.form.agency_name = this.user.details.agency_name;
      this.form.gender = this.user.details.gender;
      this.form.state = this.user.details.state;
      this.form.country = this.user.details.country;
      this.form.location = "12,33334 - 23,00000";
      this.form.image = this.user.image.url;
      this.form.thumbnailImage = this.user.image.thumbnail;
      this.form.file_name = this.user.image.name;
      this.previewProfile = this.form.thumbnailImage
        ? this.form.thumbnailImage
        : this.form.image;

      if (this.user.details.birth) {
        const parts = this.user.details.birth.split("-");
        this.form.birth = new Date(parts[0], parts[1] - 1, parts[2]);
      }
    },
    async updateData() {
      try {
        if (this.isLoading || !(await this.$validator.validateAll())) {
          return;
        }
        this.isLoading = true;
        // upload image
        if (this.updatedImageBlob && this.updatedImageFile) {
          // upload cover thumbnail file
          let profileThumbnailUrl;
          if (this.profileThumbnail.file) {
            const thumbnailFileSnapshot = await firebase
              .storage()
              .ref(`profileImage/thumbnail/${uuid()}.png`)
              .put(this.profileThumbnail.file);
            profileThumbnailUrl = await thumbnailFileSnapshot.ref.getDownloadURL();
          }

          // const imageName = this.updatedImageFile.name;

          const profileExtension = this.profileNameObject.org_name.substring(
            this.profileNameObject.org_name.lastIndexOf(".") + 1
          );
          const profileFilePath = this.profileNameObject.name.includes(
            `${profileExtension}`
          )
            ? `profileImage/${uuid()}_${this.profileNameObject.name}`
            : `profileImage/${uuid()}_${
                this.profileNameObject.name
              }.${profileExtension}`;

          const snapshot = await firebase
            .storage()
            .ref(profileFilePath)
            .put(this.updatedImageBlob);

          this.form.image = await snapshot.ref.getDownloadURL();
          this.form.thumbnail = profileThumbnailUrl
            ? profileThumbnailUrl
            : null;
          this.form.file_name = this.profileNameObject.name;
        }
        const param = JSON.parse(JSON.stringify(this.form));
        if (param.birth) {
          param.birth = moment(param.birth).format("YYYY-MM-DD");
        }

        let action = await axios.put(
          `/t/users/update/${this.user.id}`,
          param
        );
        this.isLoading = false;
        this.$toasted.success("The user data has updated successfully.");
        this.cropImg = null;
        this.updatedImageBlob = null;
        this.updatedImageFile = null;
        this.getUserData();
      } catch (e) {
        this.isLoading = false;
        console.log(e);
        this.$toasted.error("User data not updated, try later.");
      }
    },
    async getInstantFeedback() {
      try {
        let {
          data: { data }
        } = await axios.get(
          `t/instantfeedbacks/defaultFeedback/${this.user.id}`
        );
        this.feedbackText = data.comment
          ? data.comment
          : "Thanks for attending. That's all we need today";
        this.feedbackStdText = data.positiveComment
          ? data.positiveComment
          : "Thanks for attending. That's all we need today";
      } catch (e) {
        console.log(e);
      }
    },
    async getCMSContent() {
      try {
        let {
          data: { data }
        } = await axios.get(`/t/content-settings`);
        this.cmsContentDetails = data[0] ? data[0] : {};
      } catch (e) {
        console.log(e);
      }
    },
    handleProfileFile(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        this.$toasted.error("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        this.cropImg = null;
        this.updatedImageBlob = null;
        this.profileFileName = null;
        this.updatedImageFile = file;
        this.profileNameObject.name = file.name;
        this.profileNameObject.org_name = file.name;
        this.profileFileName = JSON.parse(
          JSON.stringify(this.updatedImageFile.name)
        );
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          if (this.$refs.cropper) {
            this.$refs.cropper.replace(event.target.result);
            this.reset();
          }
          this.$modal.show("modal_crop_image");
        };
        reader.readAsDataURL(file);
      } else {
        this.$toasted.error("Something went to wrong, please try again!");
      }
    },
    async cropSaveImage() {
      this.$toasted.clear();
      if (
        !this.profileFileName ||
        this.profileFileName == "" ||
        this.profileFileName.trim() == ""
      ) {
        this.$toasted.error("Please enter filename!");
        return;
      } else if (this.profileFileName && this.profileFileName.length > 150) {
        this.$toasted.error(
          "Filename is too long, it should not be more than 150 characters!"
        );
        return;
      }
      this.profileThumbnail = {};
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      await this.$refs.cropper.getCroppedCanvas().toBlob(async blob => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(
          this.updatedImageBlob,
          DEFINE.thumbSize.imageThumbWidth
        ).then(thumb_data => {
          Vue.set(this.profileThumbnail, "preview", thumb_data.preview);
          Vue.set(this.profileThumbnail, "file", thumb_data.file);
        });
      });
      if (this.cropImg) {
        this.previewProfile = this.cropImg;
      }
      this.profileNameObject.name = this.profileFileName;
      this.imgSrc = null;
      this.$refs.profileFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    async cropImage() {
      this.profileThumbnail = {};
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(async blob => {
        this.updatedImageBlob = blob;
        await ThumbService.imageThumbnail(
          this.updatedImageBlob,
          DEFINE.thumbSize.imageThumbWidth
        ).then(thumb_data => {
          Vue.set(this.profileThumbnail, "preview", thumb_data.preview);
          Vue.set(this.profileThumbnail, "file", thumb_data.file);
        });
      });
    },
    reset() {
      this.$refs.cropper.reset();
      this.cropImg = null;
      this.profileFileName = null;
      this.profileFileName = JSON.parse(
        JSON.stringify(this.profileNameObject.name)
      );
    },
    showFileChooser() {
      this.$refs.profileFile.click();
    },
    cropImageDone() {
      this.$toasted.clear();
      if (
        !this.profileFileName ||
        this.profileFileName == "" ||
        this.profileFileName.trim() == ""
      ) {
        this.$toasted.error("Please enter filename!");
        return;
      } else if (this.profileFileName && this.profileFileName.length > 150) {
        this.$toasted.error(
          "Filename is too long, it should not be more than 150 characters!"
        );
        return;
      }
      if (this.cropImg) {
        this.previewProfile = this.cropImg;
      }
      this.profileNameObject.name = this.profileFileName;
      this.imgSrc = null;
      this.$refs.profileFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    cropImageCancel() {
      this.imgSrc = null;
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.profileNameObject = {};
      this.profileFileName = null;
      this.$refs.profileFile.value = "";
      this.$modal.hide("modal_crop_image");
    },
    cancelUpdateProfile() {
      this.hideMenuInfo = false;
      this.tabSelected = "";
      this.imgSrc = null;
      this.cropImg = null;
      this.updatedImageBlob = null;
      this.updatedImageFile = null;
      this.$refs.profileFile.value = "";
      this.setUserData();
    }
  }
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

.switch {
  position: relative;
  display: inline-block;
  width: 75px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4d2545;
}

input:focus + .slider {
  box-shadow: 0 0 1px #4d2545;
}

input:checked + .slider:before {
  -webkit-transform: translateX(38px);
  -ms-transform: translateX(38px);
  transform: translateX(38px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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
.custom-setting-form {
  width: 50%;
  margin: 0 auto;
  text-align: center;
}

.custom-setting-form p {
  font-weight: normal;
  margin-bottom: 15px;
}
.custom-setting-form input {
  background-color: #f5f5f5;
  border-radius: 8px !important;
  border: 0;
}
.custom-setting-form .bg-purple-gradient {
  width: 220px !important;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}
.header h2 {
  margin: 0;
}
.header a {
  text-decoration: none;
  color: black;
}
.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 614px;
}
.actions {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
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
textarea {
  width: 100%;
  height: 100px;
}
.preview-area {
  width: 307px;
}
.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}
.preview-area p:last-of-type {
  margin-top: 1rem;
}
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
}
.v--modal-box.v--modal {
  overflow: auto !important;
}
.feedback-option-ml {
  margin-left: 50px !important;
}
.tags svg {
  position: relative;
  top: 1px;
}
</style>
