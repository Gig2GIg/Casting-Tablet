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
        </div>

        <div
          class="py-2 flex flex-wrap px-4 border-b-2 border-gray-300   mr-2 cursor-pointer "
          @click="tabSelected = 'notifications';notificationsList();hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              Notifications
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
              Marketplace
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
          @click="tabSelected = 'audition';auditionFeedBack();hideMenuInfo = true"
        >
          <div class="w-10/12">
            <p class="font-bold">
              Audition Feedback
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
        <div
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
        </div>
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
        <div class="mt-4 flex flex-wrap py-2 px-4 border-b-2 border-gray-300 mr-2 cursor-pointer font-bold">
          <a
            class="w-10/12"
            :href="['mailto:' + mailContactTo]"
          >
            <p class="font-bold">Contact Us</p>
          </a>
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
        <div
          class="py-4 px-4 border border-purple border-8 uppercase mr-2 shadow-lg  cursor-pointer font-bold"
          @click="openModalSubmitBussiness()"
        >
          Submit Bussiness
        </div>
        <div
          class="mt-4 py-4 px-4 border border-purple border-8 uppercase mr-2 shadow-lg cursor-pointer font-bold"
          @click="openModalFeatureListining()"
        >
          Feature Listening
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

        <div class="py-4 px-4 mr-2 cursor-pointer font-bold text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nisi labore natus, quod repellendus cupiditate et facilis voluptates accusamus blanditiis? Necessitatibus repudiandae voluptatem explicabo tempora omnis accusamus eum! Facilis voluptate pariatur, corporis animi, quod quae quos fugiat amet nesciunt repellendus aut beatae facere quis consectetur dignissimos ratione rem hic molestias aliquid delectus sequi quas odit. Officiis blanditiis dicta ducimus exercitationem in perferendis expedita aliquid quibusdam doloremque mollitia aliquam suscipit autem reprehenderit ad explicabo incidunt consequuntur illo fuga, numquam cupiditate nisi! Ullam, neque repellendus unde deleniti tempore hic eligendi est recusandae inventore ipsam cupiditate placeat ut consectetur eaque laborum, ab officiis facilis delectus animi fugit. Maxime cumque natus, dicta eius voluptate nostrum ipsa consequatur, corporis quaerat repellat earum adipisci fugiat, laborum reprehenderit. Alias accusantium ut ipsa amet facere necessitatibus autem molestias! Repellat, harum maxime sunt corrupti eum qui amet quibusdam, quaerat optio odit iste rerum? Dolorem est ad doloremque reiciendis adipisci quas illo maiores veniam exercitationem a odit fuga nisi eligendi consectetur culpa facere, voluptate voluptas, modi explicabo perspiciatis. Illo dolores libero iure excepturi incidunt quam explicabo, fuga, harum quisquam placeat, debitis modi molestias quia sequi reiciendis necessitatibus corrupti aliquam atque vitae voluptatem! Velit fuga neque amet harum eius? Vitae, ut!
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

        <div class="py-4 px-4 mr-2 cursor-pointer font-bold text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nisi labore natus, quod repellendus cupiditate et facilis voluptates accusamus blanditiis? Necessitatibus repudiandae voluptatem explicabo tempora omnis accusamus eum! Facilis voluptate pariatur, corporis animi, quod quae quos fugiat amet nesciunt repellendus aut beatae facere quis consectetur dignissimos ratione rem hic molestias aliquid delectus sequi quas odit. Officiis blanditiis dicta ducimus exercitationem in perferendis expedita aliquid quibusdam doloremque mollitia aliquam suscipit autem reprehenderit ad explicabo incidunt consequuntur illo fuga, numquam cupiditate nisi! Ullam, neque repellendus unde deleniti tempore hic eligendi est recusandae inventore ipsam cupiditate placeat ut consectetur eaque laborum, ab officiis facilis delectus animi fugit. Maxime cumque natus, dicta eius voluptate nostrum ipsa consequatur, corporis quaerat repellat earum adipisci fugiat, laborum reprehenderit. Alias accusantium ut ipsa amet facere necessitatibus autem molestias! Repellat, harum maxime sunt corrupti eum qui amet quibusdam, quaerat optio odit iste rerum? Dolorem est ad doloremque reiciendis adipisci quas illo maiores veniam exercitationem a odit fuga nisi eligendi consectetur culpa facere, voluptate voluptas, modi explicabo perspiciatis. Illo dolores libero iure excepturi incidunt quam explicabo, fuga, harum quisquam placeat, debitis modi molestias quia sequi reiciendis necessitatibus corrupti aliquam atque vitae voluptatem! Velit fuga neque amet harum eius? Vitae, ut!
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

        <div class="py-4 px-4 mr-2 cursor-pointer font-bold text-justify">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt nisi labore natus, quod repellendus cupiditate et facilis voluptates accusamus blanditiis? Necessitatibus repudiandae voluptatem explicabo tempora omnis accusamus eum! Facilis voluptate pariatur, corporis animi, quod quae quos fugiat amet nesciunt repellendus aut beatae facere quis consectetur dignissimos ratione rem hic molestias aliquid delectus sequi quas odit. Officiis blanditiis dicta ducimus exercitationem in perferendis expedita aliquid quibusdam doloremque mollitia aliquam suscipit autem reprehenderit ad explicabo incidunt consequuntur illo fuga, numquam cupiditate nisi! Ullam, neque repellendus unde deleniti tempore hic eligendi est recusandae inventore ipsam cupiditate placeat ut consectetur eaque laborum, ab officiis facilis delectus animi fugit. Maxime cumque natus, dicta eius voluptate nostrum ipsa consequatur, corporis quaerat repellat earum adipisci fugiat, laborum reprehenderit. Alias accusantium ut ipsa amet facere necessitatibus autem molestias! Repellat, harum maxime sunt corrupti eum qui amet quibusdam, quaerat optio odit iste rerum? Dolorem est ad doloremque reiciendis adipisci quas illo maiores veniam exercitationem a odit fuga nisi eligendi consectetur culpa facere, voluptate voluptas, modi explicabo perspiciatis. Illo dolores libero iure excepturi incidunt quam explicabo, fuga, harum quisquam placeat, debitis modi molestias quia sequi reiciendis necessitatibus corrupti aliquam atque vitae voluptatem! Velit fuga neque amet harum eius? Vitae, ut!
        </div>
      </div>
    </div>

    <modal
      class="flex flex-col w-full items-center"
      :width="600"
      height="auto"
      name="submit_bussiness"
    >
      <div class="w-3/5 mx-auto my-6">
        <div class="w-full">
          <base-input
            v-model="form.bussinessname"
            v-validate="'required'"
            :custom-classes="[' border border-black']"
            name="bussinessname"
            placeholder="Bussiness Name"
            :message="errors.first('bussinessname')"
            data-vv-as="Bussiness Name"
          />
        </div>

        <div class="w-full">
          <base-input
            v-model="form.address"
            v-validate="'required'"
            :custom-classes="[' border border-black']"
            name="address"
            placeholder="Address"
            :message="errors.first('address')"
            data-vv-as="Adress"
          />
        </div>

        <div class="w-full">
          <base-input
            v-model="form.phone"
            v-validate="'required'"
            v-mask="'###-###-####'"
            :custom-classes="[' border border-black']"
            name="phone"
            placeholder="Phone"
            :message="errors.first('phone')"
            data-vv-as="Phone"
          />
        </div>

        <div class="w-full">
          <base-input
            v-model="form.website"
            v-validate="'required'"
            :custom-classes="[' border border-black']"
            name="website"
            placeholder="Website"
            :message="errors.first('website')"
            data-vv-as="Website"
          />
        </div>

        <div class="w-full">
          <base-input
            v-model="form.email"
            v-validate="'required|email'"
            :custom-classes="[' border border-black']"
            name="email"
            placeholder="Email"
            :message="errors.first('email')"
            data-vv-as="Email"
          />
        </div>

        <div class="w-full">
          <base-input
            v-model="form.description"
            v-validate="'required'"
            class="mb-4"
            :custom-classes="[' border border-black']"
            name="description"
            placeholder="Description"
            :message="errors.first('description')"
            data-vv-as="Description"
            type="textarea"
          />
        </div>

        <div class="w-full">
          <div class="flex w-9/12  mx-auto bg-grey-lighter">
            <label
              v-if="!selectedFile.file"
              class="upcomingbtn text-center w-full py-2 h-20 px-3 bg-white border rounded-full shadow-lg tracking-wide border cursor-pointer"
              @click="$refs.inputFile.click()"
            >
              <span class="mt-2 text-center text-base leading-normal my-auto font-bold">Photo</span>
              <div class="mx-auto">
                <svg
                  class="mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  width="29.84"
                  height="23.287"
                >
                  <g data-name="Grupo 67">
                    <g data-name="Grupo 66">
                      <g data-name="Grupo 65">
                        <path
                          data-name="Trazado 45"
                          d="M10.547.5a.656.656 0 00-.5.317L8.314 3.778H2.466A1.977 1.977 0 00.5 5.744V20.82a1.977 1.977 0 001.966 1.966h20.32a.656.656 0 100-1.311H2.466a.64.64 0 01-.655-.655V5.744a.64.64 0 01.655-.655h6.227a.656.656 0 00.563-.328l1.721-2.95h7.845l1.4 2.9a.656.656 0 00.594.379h6.555a.64.64 0 01.655.655V20.82a.64.64 0 01-.655.655.656.656 0 100 1.311 1.977 1.977 0 001.969-1.966V5.744a1.977 1.977 0 00-1.966-1.966h-6.135L19.826.869A.656.656 0 0019.232.5h-8.685zm4.373 6.883a5.9 5.9 0 105.9 5.9 5.909 5.909 0 00-5.9-5.9zm0 1.311a4.588 4.588 0 11-4.588 4.588 4.578 4.578 0 014.588-4.588z"
                          fill="#4D2545"
                          stroke="#4D2545"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </label>

            <img
              v-else
              :src="selectedFile.preview"
              alt="Image"
              class="upcomingbtn text-center w-full h-20 object-cover border rounded-full shadow-lg 4 cursor-pointer"
              @click="$refs.inputFile.click()"
            >

            <input
              ref="inputFile"
              type="file"
              class="hidden"
              @change="handleFile"
            >
          </div>
        </div>

        <div class="w-1/2 mx-auto mt-6">
          <button
            class="mx-auto appointmentbtn text-center text-white w-full h-10 px-3 mx-auto rounded-full"
            @click="createMarketPlace"
          >
            Submit
          </button>
        </div>
      </div>
    </modal>

    <modal
      class="flex flex-col w-full items-center"
      :width="640"
      height="auto"
      name="feature_listing"
    >
      <div class="w-3/5 mx-auto my-8">
        <div class="w-full">
          <base-input
            v-model="formfeatured.bussinessname"
            v-validate="'required'"
            :custom-classes="[' border border-black']"
            name="bussinessname"
            placeholder="Bussiness Name"
            :message="errors.first('bussinessname')"
            data-vv-as="Bussiness Name"
          />
        </div>

        <div class="w-full">
          <base-input
            v-model="formfeatured.email"
            v-validate="'required|email'"
            :custom-classes="[' border border-black']"
            name="email"
            placeholder="Email"
            :message="errors.first('email')"
            data-vv-as="Email"
          />
        </div>

        <div class="w-1/2 mx-auto mt-6">
          <button
            class="mx-auto appointmentbtn text-center text-white w-full h-10 px-3 mx-auto rounded-full"
            @click="storeFeaturedListining();$modal.hide('feature_listing');hideMenuInfo = false; tabSelected = ''"
          >
            Submit
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import {
  mapActions,
  mapState,
} from 'vuex';

const $ = require('jquery');

window.$ = $;
export default {
  data() {
    return {
      form: {},
      formfeatured: {},
      selectedFile: {},
      hideMenuInfo: false,
      tabSelected: '',
      mailContactTo: 'info@gig2gig.com',
      listNotificacions: [],
      listAuditionFeedback: [],
    };
  },

  computed: {
    ...mapState('profile', ['user']),
  },

  methods: {
    openModalSubmitBussiness() {
      this.form = {};
      this.selectedFile = {};
      this.$modal.show('submit_bussiness');
    },
    openModalFeatureListining() {
      this.formfeatured = {};
      this.$modal.show('feature_listing');
    },

    ...mapActions('marketplace', ['storeMarketPlace']),

    async createMarketPlace() {
      await this.storeMarketPlace({
        objData: this.form,
        file: this.selectedFile.file,
      });

      this.hideMenuInfo = false;
      this.tabSelected = '';
      this.$modal.hide('submit_bussiness');

      this.$toasted.show('Marketplace Created');
    },

    handleFile(event) {
      const file = event.target.files[0];

      if (file) {
        this.selectedFile = {
          file: event.target.files[0],
          preview: URL.createObjectURL(file),
        };
      } else {
        this.selectedFile = {};
      }
    },

    async storeFeaturedListining() {
      try {
        const url = 'a/marketplace-featured-listing/create';
        const {
          data: {
            data,
          },
        } = await axios.post(url, this.formfeatured);
        this.$toasted.show('Featured Listining Created');
      } catch (ex) {
        console.log(ex);
      }
    },

    async notificationsList() {
      try {
        const url = 'a/notification-settings';
        const {
          data: {
            data,
          },
        } = await axios.get(url);
        this.listNotificacions = data;
        console.log(data);
      } catch (ex) {
        console.log(ex);
      }
    },

    async disableNotification(obj) {
      let status = 'off';
      let message = 'Notification Disabled';
      const url = `a/notification-setting/update/${obj.id}`;
      try {
        if ($('#notifications').is(':checked')) {
          status = 'on';
          message = 'Notification Enabled';
        }
        const paramData = {
          status,
        };
        const {
          data: {
            data,
          },
        } = await axios.put(url, paramData);
        this.$toasted.show(message);
      } catch (ex) {
        this.$toasted.error(ex);
        console.log(ex);
      }
      this.notificationsList();
    },

    async auditionFeedBack() {
      try {
        const url = 'users/settings';
        const {
          data: {
            data,
          },
        } = await axios.get(url);
        this.listAuditionFeedback = data;
        console.log(data);
      } catch (ex) {
        console.log(ex);
      }
    },

    async disableAuditionFeedback(obj) {
      let status = 0;
      let message = 'Audition Feedback Disabled';
      const url = `/users/settings/${obj.id}`;
      try {
        if ($('#auditioncheckbox').is(':checked')) {
          status = 1;
          message = 'Audition Feedback Enabled';
        }
        const paramData = {
          value: status,
        };
        const {
          data: {
            data,
          },
        } = await axios.put(url, paramData);
        this.$toasted.show(message);
      } catch (ex) {
        this.$toasted.error(ex);
        console.log(ex);
      }
      this.auditionFeedBack();
    },

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
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #4D2545;
}

input:focus+.slider {
    box-shadow: 0 0 1px #4D2545;
}

input:checked+.slider:before {
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
