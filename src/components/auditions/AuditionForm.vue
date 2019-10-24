<!-- eslint-disable max-len -->
<template>
  <form
    class="relative"
    data-vv-scope="create"
    @submit.prevent="handleCreate"
  >
    <div class="flex flex-row-reverse mb-4 px-2">
      <div
        class="relative flex items-center text-purple cursor-pointer"
        @click="manageInvitations = !manageInvitations"
      >
        <img
          src="/images/icons/person.png"
          alt="Icon"
          class="h-4 mr-2"
        >
        <span class="select-none">
          Add Invitations
        </span>
      </div>
    </div>

    <form
      v-if="manageInvitations"
      class="bubble absolute right-0 w-64 -mr-12 z-50 p-3"
      data-vv-scope="invitation"
      @submit.prevent="handleInvitation"
    >
      <base-button
        v-if="!invitation.adding"
        class="pt-2 pb-2"
        border-classes="rounded-full border border-purple"
        color="bg-white"
        :hover="['bg-purple', 'text-white']"
        text="text-purple"
        expanded
        @click="invitation.adding = true"
      >
        Add Contributor
      </base-button>

      <div v-show="invitation.adding">
        <base-input
          v-model="invitation.email"
          v-validate="'required|email'"
          name="email"
          placeholder="Email"
          :custom-classes="['border', 'border-purple']"
          :message="errors.first('invitation.email')"
          expanded
        />

        <base-button
          class="pt-2 pb-2"
          type="submit"
          expanded
        >
          Send
        </base-button>
      </div>

      <contributor-item
        v-for="contributor in form.contributors"
        :key="contributor.email"
        class="-mx-3"
        :contributor="contributor"
        @destroy="handleDeleteContributor"
      />
    </form>

    <div class="flex">
      <base-input
        v-model="form.title"
        v-validate="'required|max:255'"
        name="title"
        class="w-2/3 px-2"
        placeholder="Title"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.title')"
        expanded
      />
      <base-checkbox
        v-model="form.status"
        class="w-1/3 px-2"
        :custom-classes="['border', 'border-purple']"
        name="title"
      >
        Online submition
      </base-checkbox>
    </div>
    <div class="flex">
      <base-input
        v-model="form.date"
        v-validate="'required'"
        name="date"
        class="w-1/3 px-2"
        type="date"
        placeholder="Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.date')"
      />
      <base-input
        v-model="form.time"
        v-validate="'required'"
        name="time"
        class="w-1/3 px-2"
        type="time"
        placeholder="Time"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.time')"
      />
      <base-input
        v-model="form.location"
        v-validate="'required'"
        name="location"
        class="w-1/3 px-2"
        type="location"
        :custom-classes="['w-1/4', 'border', 'border-purple']"
        :message="errors.first('create.location')"
        @place="handleLocation"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">
      Production Information
    </p>
    <div class="flex w-full">
      <base-input
        v-model="form.description"
        v-validate="'required|max:500'"
        name="description"
        class="px-2 py-2 w-2/3"
        type="textarea"
        placeholder="Description"
        :custom-classes="['border', 'border-purple', 'mt-0', { 'mb-0': !errors.has('create.description') }]"
        :message="errors.first('create.description')"
      />
      <div class="px-2 py-2 w-1/3">
        <div
          class="flex rounded-large h-40 items-center border border-purple cursor-pointer justify-center bg-grey-500 overflow-hidden"
          @click="$refs.coverFile.click()"
        >
          <div
            v-if="!previewCover"
            class="flex flex-col flex-no-wrap justify-between"
          >
            <p class="pb-6 text-purple">
              Cover photo
            </p>
            <img src="/images/icons/file.svg">
          </div>

          <img
            v-else
            :src="previewCover"
            alt="Cover"
            class="w-full h-full object-cover"
          >
        </div>

        <input
          ref="coverFile"
          accept=".png, .jpg, .jpeg"
          type="file"
          hidden
          @change="handleCoverFile"
        >
      </div>
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.personal_information"
        v-validate="'required|max:500'"
        name="personal_information"
        class="px-2 w-full h-40"
        type="textarea"
        placeholder="Personnel Information"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.personal_information')"
        data-vv-as="personnel information"
      />
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.additional_info"
        v-validate="'required|max:500'"
        name="additional_info"
        class="px-2 w-full h-40"
        type="textarea"
        placeholder="Additional Information"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.additional_info')"
        data-vv-as="additional information"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">
      Contract Information
    </p>
    <div class="flex w-full">
      <base-input
        v-model="form.dates[0].from"
        v-validate="'required'"
        name="contract_start_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Contract Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.contract_start_date')"
        data-vv-as="start date"
      />
      <base-input
        v-model="form.dates[0].to"
        v-validate="'required'"
        name="contract_end_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Contract End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.contract_end_date')"
        data-vv-as="end date"
      />
    </div>
    <div class="flex w-full">
      <base-input
        v-model="form.dates[1].from"
        v-validate="'required'"
        name="rehearsal_start_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal Start Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.rehearsal_start_date')"
        data-vv-as="start date"
      />
      <base-input
        v-model="form.dates[1].to"
        v-validate="'required'"
        name="rehearsal_end_date"
        class="w-1/2 px-2"
        type="date"
        placeholder="Rehearsal End Date"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.rehearsal_end_date')"
        data-vv-as="end date"
      />
    </div>

    <p class="px-5 text-purple font-medium py-8 pb-6">
      Contact Information
    </p>
    <div class="flex">
      <base-input
        v-model="form.url"
        v-validate="'required|url'"
        name="url"
        class="w-full px-2"
        placeholder="Audition URL"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.url')"
      />
    </div>
    <div class="flex">
      <base-input
        v-model="form.phone"
        v-validate="'required|integer|max:255'"
        name="phone"
        class="w-1/3 px-2"
        placeholder="Phone"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.phone')"
      />
      <base-input
        v-model="form.email"
        v-validate="'required|email'"
        name="email"
        class="w-1/3 px-2"
        placeholder="Email"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.email')"
      />
      <base-input
        v-model="form.other_info"
        v-validate="'required|max:255'"
        name="other_info"
        class="w-1/3 px-2"
        placeholder="Other"
        :custom-classes="['border', 'border-purple']"
        :message="errors.first('create.other_info')"
        data-vv-as="other information"
      />
    </div>

    <div class="flex pt-12">
      <div class="tags w-2/5">
        <p
          class="px-4 text-purple py-4"
        >
          Union Status
        </p>
        <div class="flex px-4">
          <div
            v-for="union in union_status"
            :key="union.key"
            class="py-2 px-4 border border-purple uppercase mr-2 rounded-full cursor-pointer"
            :class="[union.selected ? 'bg-purple text-white' : 'bg-white text-purple']"
            @click="setTags($event, 'union_status', false)"
          >
            {{ union.name }}
          </div>
        </div>

        <p
          class="px-5 text-purple py-4"
        >
          Contract type
        </p>
        <div class="flex px-4">
          <div
            v-for="contract_type in contract_types"
            :key="contract_type.key"
            class="py-2 px-4 uppercase border border-orange-500 mr-2 rounded-full cursor-pointer"
            :class="[contract_type.selected ? 'bg-orange-500 text-white' : 'bg-white text-orange-500']"
            @click="setTags($event, 'contract_types', false)"
          >
            {{ contract_type.name }}
          </div>
        </div>
        <p
          class="px-4 text-purple pt-4 pb-2"
        >
          Production Type
        </p>
        <div class="flex flex-wrap px-4">
          <div
            v-for="production_type in production_types"
            :key="production_type.key"
            class="py-2 px-4 uppercase border border-pink-800 my-2 mr-2 rounded-full cursor-pointer"
            :class="[production_type.selected ? 'bg-pink-800 text-white' : 'bg-white text-pink-800']"
            @click="setTags($event, 'production_types', true)"
          >
            {{ production_type.name }}
          </div>
        </div>
      </div>
      <div class="managers w-3/5 flex flex-col items-end">
        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none"
          type="button"
          @click.prevent="manageAppointments = true"
        >
          Manage Appointments
        </button>

        <div
          v-if="!!form.roles.length"
          class="flex flex-col items-center my-5 w-2/3"
        >
          <p class="text-purple text-lg mb-4">
            Roles
          </p>

          <carousel
            class="flex-none w-full"
            :per-page="innerWidth < 1920 ? 2 : 4"
            :pagination-enabled="false"
          >
            <slide
              v-for="(role, index) in form.roles"
              :key="index"
              :data-index="index"
              @slide-click="openRole"
            >
              <div class="flex flex-col items-center cursor-pointer">
                <div class="bg-purple-gradient flex items-center justify-center rounded-full h-12 w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.486"
                    height="21.574"
                    viewBox="0 0 19.486 21.574"
                  >
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M24.98,19.435a14.3,14.3,0,0,0-6.919-2.814A.872.872,0,0,0,17.24,17a.925.925,0,0,0-.141.352.846.846,0,0,0,.727.938,12.611,12.611,0,0,1,5.793,2.275v2.064H7.554v-2.04a12.431,12.431,0,0,1,5.77-2.275.859.859,0,0,0,.751-.844V15.589a4.318,4.318,0,0,0,.774.07h1.478a4.664,4.664,0,0,0,4.667-4.667V7.4A4.654,4.654,0,0,0,16.349,2.76H14.871A4.659,4.659,0,0,0,10.2,7.4v3.588a4.63,4.63,0,0,0,2.181,3.94v1.782a15.084,15.084,0,0,0-6.168,2.721.824.824,0,0,0-.352.68v3.354a.841.841,0,0,0,.844.844H24.487a.841.841,0,0,0,.844-.844v-3.33A.836.836,0,0,0,24.98,19.435ZM11.893,7.4a2.958,2.958,0,0,1,2.955-2.955h1.478A2.958,2.958,0,0,1,19.28,7.4v3.588a2.958,2.958,0,0,1-2.955,2.955H14.848a2.958,2.958,0,0,1-2.955-2.955V7.4Z"
                      transform="translate(-5.855 -2.75)"
                      fill="#fff"
                      stroke="#d6d6d6"
                      stroke-width="0.02"
                    />
                  </svg>
                </div>
                <span class="text-purple font-medium mt-2">
                  {{ role.name }}
                </span>
              </div>
            </slide>
          </carousel>
        </div>

        <button
          class="w-2/3 mt-4 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none"
          type="button"
          @click.prevent="manageRoles = true"
        >
          {{ form.roles.length ? 'Add' : 'Edit' }} Roles
        </button>

        <div
          v-if="!!form.media.length"
          class="flex flex-col items-center my-5 w-2/3"
        >
          <p class="text-purple text-lg mb-4">
            Documents
          </p>

          <carousel
            class="flex-none w-full"
            :per-page="innerWidth < 1920 ? 1 : 2"
            :pagination-enabled="false"
          >
            <slide
              v-for="(media, index) in form.media"
              :key="index"
            >
              <DocumentItem
                :media="media"
                @destroy="handleDeleteDocument"
              />
            </slide>
          </carousel>
        </div>

        <input
          ref="inputFile"
          accept=".png, .jpg, .jpeg"
          type="file"
          multiple
          hidden
          @change="handleFile"
        >

        <button
          class="w-2/3 py-3 px-4 border-4 border-purple text-purple rounded-full focus:outline-none mb-4"
          type="button"
          :class="{ 'mt-4': !form.media.length }"
          @click="$refs.inputFile.click()"
        >
          Manage Documents
        </button>

        <base-button
          class="mt-auto w-2/3 mb-12"
          type="submit"
        >
          Create Audition
        </base-button>
      </div>
    </div>

    <AppointmentsModal
      v-if="manageAppointments"
      :data="form.appointment"
      @change="form.appointment = $event"
      @close="manageAppointments = false"
    />

    <RolesModal
      v-if="manageRoles"
      :data="selectedRole"
      @save="handleSaveRole"
      @destroy="handleDeleteRole"
      @close="manageRoles = false"
    />
  </form>
</template>

<script>
import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import axios from 'axios';
import AppointmentsModal from './AppointmentsModal.vue';
import RolesModal from './RolesModal.vue';
import ContributorItem from './ContributorItem.vue';
import DocumentItem from './DocumentItem.vue';
import 'firebase/storage';

export default {
  name: 'AuditionForm',
  components: {
    AppointmentsModal, RolesModal, ContributorItem, DocumentItem,
  },
  data() {
    return {
      innerWidth: window.innerWidth,
      manageAppointments: false,
      manageInvitations: false,
      manageRoles: false,
      selectedRole: null,
      selectedLocation: null,
      previewCover: null,
      isLoading: false,
      invitation: {
        adding: false,
        email: '',
      },
      form: {
        dates: [
          {
            type: 1,
          },
          {
            type: 2,
          },
        ],
        roles: [],
        appointment: undefined,
        contributors: [],
        media: [],
      },
      union_status: [
        {
          value: 'any', name: 'Any', selected: false,
        },
        {
          value: 'union', name: 'Union', selected: true,
        },
        {
          value: 'nounion', name: 'Nounion', selected: false,
        },
      ],
      contract_types: [
        {
          key: 'any', name: 'Any', selected: false,
        },
        {
          key: 'paid', name: 'Paid', selected: true,
        },
        {
          key: 'unpaid', name: 'Unpaid', selected: false,
        },
      ],
      production_types: [
        {
          key: 'theater', name: 'Theater', selected: true,
        },
        {
          key: 'film', name: 'Film', selected: false,
        },
        {
          key: 'voiceover', name: 'VoiceOver', selected: false,
        },
        {
          key: 'commercials', name: 'Commercials', selected: false,
        },
        {
          key: 'performing arts', name: 'Performing Arts', selected: false,
        },
        {
          key: 'modeling', name: 'Modeling', selected: false,
        },
        {
          key: 'tv & video', name: 'TV & Video', selected: false,
        },
      ],
    };
  },
  watch: {
    manageRoles(value) {
      if (!value) {
        this.selectedRole = null;
      }
    },
  },
  created() {
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.innerWidth = window.innerWidth;
    },

    async handleInvitation() {
      if (
        !this.invitation.email
          || this.form.contributors.find(x => x.email === this.invitation.email.toLowerCase())
          || !await this.$validator.validateAll('invitation')
      ) {
        return;
      }

      this.form.contributors.push({
        email: this.invitation.email.toLowerCase(),
      });

      this.invitation.adding = false;
      this.invitation.email = '';
    },

    handleDeleteContributor(contributor) {
      const index = this.form.contributors.indexOf(contributor);
      this.form.contributors.splice(index, 1);
    },

    openRole(dataset) {
      this.selectedRole = this.form.roles[dataset.index];
      this.manageRoles = true;
    },

    handleSaveRole(role) {
      const index = this.form.roles.findIndex(x => x.id === role.id);

      if (index !== -1) {
        this.$set(this.form.roles, index, role);
      } else {
        this.form.roles.push(role);
      }
    },

    handleDeleteRole(role) {
      const index = this.form.roles.findIndex(x => x.id === role.id);
      this.form.roles.splice(index, 1);
    },

    handleFile(e) {
      const files = Array.from(e.target.files);

      files
        .filter(file => !this.form.media.some(x => x.name === file.name))
        .forEach((file) => {
          const extension = file.name.split('.').pop();
          this.form.media.push({
            name: file.name,
            type: 1,
            url: file,
            share: true,
          });
        });

      this.$refs.inputFile.value = '';
    },

    handleCoverFile(e) {
      const file = e.target.files[0];

      this.previewCover = URL.createObjectURL(file);
      this.form.cover = file;
      this.form.cover_name = file.name;

      this.$refs.coverFile.value = '';
    },

    handleDeleteDocument(media) {
      const index = this.form.media.indexOf(media);
      this.form.media.splice(index, 1);
    },

    handleLocation(place) {
      this.selectedLocation = place;
    },

    async handleCreate() {
      let coverSnapshot = null,
          rolesSnapshots = [],
          filesSnaphosts = [];

      try {
        if (this.isLoading || !await this.$validator.validateAll('create')) {
          return;
        }

        if (!this.form.cover) {
          this.$toasted.error('The cover field is required.');
          return;
        }

        const data = Object.assign({}, this.form);

        data.union = this.union_status.find(x => x.selected).value;
        data.contract = this.contract_types.find(x => x.selected).key;
        data.production = this.production_types.filter(x => x.selected).map(x => x.key).join(', ');

        data.location = {
          latitude: this.selectedLocation.geometry.location.lat(),
          longitude: this.selectedLocation.geometry.location.lng(),
        };

        // Upload cover
        coverSnapshot = await firebase.storage()
          .ref(`temp/${uuid()}.${data.cover_name.split('.').pop()}`)
          .put(data.cover);

        data.cover = await coverSnapshot.ref.getDownloadURL();

        // Upload roles
        await Promise.all(data.roles.map(async (role) => {
          const snapshot = await firebase.storage()
            .ref(`temp/${uuid()}.${role.name_cover.split('.').pop()}`)
            .put(role.cover);

          role.cover = await snapshot.ref.getDownloadURL();

          rolesSnapshots.push(snapshot);
        }));

        // Upload files
        await Promise.all(data.media.map(async (media) => {
          const snapshot = await firebase.storage()
            .ref(`temp/${uuid()}.${media.name.split('.').pop()}`)
            .put(media.url);

          media.url = await snapshot.ref.getDownloadURL();

          filesSnaphosts.push(snapshot);
        }));

        await axios.post('/t/auditions/create', data);
      } catch (e) {
        console.log(e);
        coverSnapshot && coverSnapshot.ref.delete();
        await Promise.all(rolesSnapshots.map(role => role.ref.delete()));
        await Promise.all(filesSnaphosts.map(file => file.ref.delete()));
      }
    },

    setTags({ target }, type, multiple = false) {
      const text = target.textContent.trim();
      const itemSelected = this[type].find(item => item.name === text);
      if (multiple) {
        if (itemSelected.selected) {
          itemSelected.selected = false;
          return;
        }
        itemSelected.selected = true;
        return;
      }

      this[type].forEach(item => item.selected = false);
      itemSelected.selected = true;
    },
  },
};
</script>

<style scoped>
.bubble {
	background: #fff;
  border-radius: .4em;
  box-shadow: 0px 0px 6px #B2B2B2;
}
</style>
