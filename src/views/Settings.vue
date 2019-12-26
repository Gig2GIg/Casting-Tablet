<template>
  <div class="flex w-full  container text-purple pl-6 py-8">
    <!-- Filters -->
    <div class="w-full  p-4">
      <div class="flex items-center text-purple">
        <span class="ml-2 text-sm" />
      </div>

      <div
        v-if="!hideMenuInfo"
        class="tags w-2/5  mx-auto px-3 py-3 mt-6"
      >
        <div class="py-4">
          <div class="flex items-center px-3">
            <div class="mr-6">
              <img                
                :src="user.image ? user.image.url : ''"
                class="h-24 w-24 rounded"
                alt="Logo"
              >
            </div>
            <div class="w-6/12 py-8">
              <p class="font-bold">
                {{ user.details?user.details.first_name + ' ' + user.details.last_name:"" }}
              </p>
              <p class="font-bold">
                {{ user.details ? user.details.agency_name : '' }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300   mr-2 cursor-pointer "
          @click="tabSelected = 'myinfo'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              My info
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
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300   mr-2 cursor-pointer "
          @click="tabSelected = 'notifications'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              Push Notifications
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
        </div>
        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300   mr-2 cursor-pointer "
          @click="tabSelected = 'instantFeedback'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              Instant Feedback
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
        </div>
        <div
          class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="tabSelected = 'marketplace'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              QR Code
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
        </div>
        <div
          class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="tabSelected = 'appinfo'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              App Info
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
        </div>
        <!-- <div
          class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
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
        </div> -->
        <div
          class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="tabSelected = 'termsofuse'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              Terms of Use
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
        </div>
        <div class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
            @click="tabSelected = 'contact_us'; hideMenuInfo = true"
            >          
            <div class="w-10/12">
              <p class="font-bold">Contact Us</p>
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
        </div>
        <div
          class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold"
          @click="tabSelected = 'policy'; hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              Privacy Policy
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
        </div>
      </div>
      <div
        v-if="tabSelected === 'marketplace'"
        class="tags w-2/5 shadow-lg mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
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
          <img
          src="/images/icons/qr.png"
          alt="Icon"
          class=""
          >
          <div class="container flex w-full mt-3 cursor-pointer">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center border-2 border-purple bg-white">
                <p class="text-purple text-sm font-bold content-center tracking-tighter flex-1">
                  Copy
                </p>
              </div>
            </div>
          </div>
          <div class="container flex w-full mt-3 cursor-pointer">
            <div class="flex w-full text-center justify-center flex-wrap">
              <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail">
                <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                  Save
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="tabSelected === 'myinfo'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4  mr-2 font-bold flex flex-wrap justify-center">
          <div class="py-4 w-full">
          <div class="flex justify-center items-center px-3 w-full">
            <div class="mr-6">
              <img
                :src="user.image.url"
                class="h-24 w-24 rounded"
                alt="Logo"
              >
            </div>
            <div class="w-6/12 py-8">
              <p class="font-bold">
                {{ user.details.first_name }} {{ user.details.last_name }}
              </p>
              <p class="font-bold">
                {{ user.details.agency_name }}
              </p>
            </div>
          </div>
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/3  ml-4 text-purple px-2">
            <base-input
              v-model="form.name"
              v-validate="'required|max:255'"
              :custom-classes="['border border-b border-gray-300']"
              name="name"
              placeholder="Name"
              :message="errors.first('name')"
              data-vv-as="name"
            />
            </div>
            <div class="w-1/3  ml-4 text-purple px-2">

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
            <div class="w-1/3  ml-4 text-purple px-2">
              <base-input
                v-model="form.email"
                v-validate="'required|email'"
                :custom-classes="['border border-b border-gray-300']"
                name="email"
                placeholder="Email"
                :message="errors.first('email')"
              />
            </div>
            <div class="w-1/3  ml-4 text-purple px-2">
              <base-input
                v-model="form.address"
                v-validate="'required|email'"
                :custom-classes="['border border-b border-gray-300']"
                name="address"
                placeholder="Address"
                :message="errors.first('address')"
              />
            </div>
          </div>
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/3  ml-4 text-purple px-2">
              <base-input
                v-model="form.agency_name"
                v-validate="'required'"
                :custom-classes="['border border-b border-gray-300']"
                name="agency_name"
                placeholder="Agency Name"
                :message="errors.first('agency_name')"
              />
            </div>
            <div class="w-1/3  ml-4 text-purple px-2">
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
          </div>
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/3  ml-4 text-purple px-2">
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
                  >
                    {{ state.label }}
                  </option>
                </base-select>
            </div>
            <div class="w-1/3  ml-4 text-purple px-2">
                <base-input
                  key="zip-input"
                  v-model="form.zip"
                  v-validate="'required|integer|max:5'"
                  v-mask="'#####'"
                  :custom-classes="['border border-b border-gray-300']"
                  name="zip"
                  class=""
                  placeholder="Zip"
                  :message="errors.first('zip')"
                />
              </div>
            </div>
          <div class="flex justify-center mb-4 items-center px-3 w-full">
            <div class="w-1/3  ml-4 text-purple px-2">
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
              <div class="m-3 content-center rounded-full red-light w-40 h-10 flex items-center button-detail">
                <p class="text-white text-sm font-bold content-center tracking-tighter flex-1">
                  Update
                </p>
              </div>
            </div>
        </div>
      </div>
      <div
        v-if="tabSelected === 'notifications'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4  mr-2 font-bold">
          <div
            v-for="notifications in listNotificacions"
            :key="notifications.id"
            class="flex flex-wrap py-6"
          >
            <div class="overflow-auto w-10/12">
              <span class="text-purple text-lg capitalize">{{ notifications.code.replace('_', ' ') }} ({{ notifications.status }})</span>
            </div>
            <div class="w-1/12">
              <label class="switch">
                <input
                  id="notifications"
                  type="checkbox"
                  :checked="notifications.status === 'on' ? true : false"
                  @change="disableNotification(notifications)"
                >
                <span class="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="tabSelected === 'instantFeedback'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false, tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4  mr-2 font-bold">
          <form @submit.prevent="updateFeedBackTxt()">
            <h2 style="text-align: center">Performers who have been hidden will receive the message:</h2>
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
        v-if="tabSelected === 'audition'"
        class="tags w-9/12 shadow-md mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>
        <div class="py-4 px-4  mr-2 font-bold">
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
                >
                <span class="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="tabSelected === 'appinfo'"
        class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.app_info ? cmsContentDetails.app_info: ''">
        </div>

      </div>

      <div
        v-if="tabSelected === 'faq'"
        class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div class="py-4 px-4 mr-2 cursor-pointer font-bold text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nisi labore natus, quod repellendus cupiditate et facilis voluptates accusamus blanditiis? Necessitatibus repudiandae voluptatem explicabo tempora omnis accusamus eum! Facilis voluptate pariatur, corporis animi, quod quae quos fugiat amet nesciunt repellendus aut beatae facere quis consectetur dignissimos ratione rem hic molestias aliquid delectus sequi quas odit. Officiis blanditiis dicta ducimus exercitationem in perferendis expedita aliquid quibusdam doloremque mollitia aliquam suscipit autem reprehenderit ad explicabo incidunt consequuntur illo fuga, numquam cupiditate nisi! Ullam, neque repellendus unde deleniti tempore hic eligendi est recusandae inventore ipsam cupiditate placeat ut consectetur eaque laborum, ab officiis facilis delectus animi fugit. Maxime cumque natus, dicta eius voluptate nostrum ipsa consequatur, corporis quaerat repellat earum adipisci fugiat, laborum reprehenderit. Alias accusantium ut ipsa amet facere necessitatibus autem molestias! Repellat, harum maxime sunt corrupti eum qui amet quibusdam, quaerat optio odit iste rerum? Dolorem est ad doloremque reiciendis adipisci quas illo maiores veniam exercitationem a odit fuga nisi eligendi consectetur culpa facere, voluptate voluptas, modi explicabo perspiciatis. Illo dolores libero iure excepturi incidunt quam explicabo, fuga, harum quisquam placeat, debitis modi molestias quia sequi reiciendis necessitatibus corrupti aliquam atque vitae voluptatem! Velit fuga neque amet harum eius? Vitae, ut!
        </div>
      </div>

      <div
        v-if="tabSelected === 'termsofuse'"
        class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.term_of_use ? cmsContentDetails.term_of_use : ''">
        </div>
      </div>

      <div
        v-if="tabSelected === 'policy'"
        class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.privacy_policy ? cmsContentDetails.privacy_policy : ''">          
        </div>
      </div>
      <div
        v-if="tabSelected === 'contact_us'"
        class="tags w-9/12 shadow-lg mx-auto px-3 py-3 mt-6"
      >
        <div
          class="cursor-pointer"
          @click="hideMenuInfo = false; tabSelected = ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30.049"
            height="39.187"
          >
            <defs>
              <filter
                id="a"
                x="0"
                y="0"
                width="30.049"
                height="39.187"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" />
                <feGaussianBlur
                  stdDeviation="3"
                  result="blur"
                />
                <feFlood flood-opacity=".161" />
                <feComposite
                  operator="in"
                  in2="blur"
                />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g data-name="Grupo 39">
              <g
                filter="url(#a)"
                data-name="Grupo 38"
              >
                <path
                  data-name="Trazado 24"
                  d="M12.447 16.594L20.641 8.4a1.406 1.406 0 10-1.988-1.988l-8.88 8.88a1.453 1.453 0 000 2.6l8.88 8.88a1.406 1.406 0 101.988-1.988z"
                  fill="#4d2545"
                />
              </g>
            </g>
          </svg>
        </div>

        <div v-html="cmsContentDetails.contact_us ? cmsContentDetails.contact_us : ''">          
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import states from "@/utils/states";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      form: {},
      formfeatured: {},
      selectedFile: {},
      hideMenuInfo: false,
      tabSelected: "",
      mailContactTo: "info@gig2gig.com",
      listNotificacions: [],
      listAuditionFeedback: [],
      feedbackText: "",
      cmsContentDetails: {},
      states
    };
  },
  async mounted() {
    await this.fetch();
    this.user.details;
    this.form.name = this.user.details.first_name;
    this.form.profesion = this.user.details.profesion;
    this.form.email = this.user.email;
    this.form.address = this.user.details.address;
    this.form.city = this.user.details.city;
    this.form.zip = this.user.details.zip;
    this.form.agency_name = this.user.details.agency_name;
    this.form.gender = this.user.details.gender;
    this.form.state = this.user.details.state;
    let birth = new Date(this.user.details.birth);
    this.form.location = "12,33334 - 23,00000";
    this.form.image = this.user.image.url;
    birth.setDate(birth.getDate() + 1);
    this.form.birth = birth;
    // debugger;
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
          case "contact_us":
            this.getCMSContent();
            break;
          default:
            break;
        }
      }
    }
  },
  computed: {
    ...mapState("profile", ["user"])
  },
  methods: {
    ...mapActions("profile", ["fetch"]),
    async updateFeedBackTxt() {
      try {
        let res = await axios.post(`/t/instantfeedbacks/changeDefault`, {
          feedback: this.feedbackText
        });
        this.$toasted.success("Feedback updated successfully.");
      } catch (e) {
        console.log(e);
        this.$toasted.success(e.response.data.data);
      }
    },
    async updateData() {
      try {
        let action = await axios.put(
          `/t/users/update/${this.user.id}`,
          this.form
        );
        this.$toasted.success("The user data has updated successfully.");
      } catch (e) {
        console.log(e);
        this.$toasted.error("User data not updated, try later.");
      }
    },
    async getInstantFeedback() {
      try {
        let { data: { data } } = await axios.get(
          `t/instantfeedbacks/defaultFeedback/${this.user.id}`
        );
        this.feedbackText = data.comment
          ? data.comment
          : "Default Feedback Text";
      } catch (e) {
        console.log(e);
      }
    },
    async getCMSContent() {
      try {
        let { data: { data } } = await axios.get(`/t/content-settings`);
        this.cmsContentDetails = data[0] ? data[0] : {};
      } catch (e) {
        console.log(e);
      }
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
</style>
