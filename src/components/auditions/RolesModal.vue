<template>
  <form
    v-if="editMode"
    class="modal-container flex flex-col items-center bg-white w-1/4 rounded-large left-1/2 absolute top-1/2 shadow-2xl overflow-hidden max-h-full p-5"
    data-vv-scope="role"
    @submit.prevent="handleDone(false)"
  >
    <svg
      class="absolute left-0 ml-5 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="16.16"
      height="16.165"
      viewBox="0 0 16.16 16.165"
      @click="$emit('close')"
    >
      <path id="Path_31" data-name="Path 31" d="M11.609,9.822,17.532,3.9a1.264,1.264,0,0,0-1.787-1.787L9.822,8.035,3.9,2.112A1.264,1.264,0,0,0,2.112,3.9L8.035,9.822,2.112,15.745A1.268,1.268,0,0,0,3,17.907a1.2,1.2,0,0,0,.885-.374l5.94-5.923,5.923,5.923a1.266,1.266,0,0,0,.885.374,1.2,1.2,0,0,0,.885-.374,1.263,1.263,0,0,0,0-1.787Z" transform="translate(-1.742 -1.742)" fill="#4d2545"/>
    </svg>

    <div class="flex flex-col items-center">
      <p class="text-lg text-purple">Upload Photo</p>
      <svg
        v-if="!preview"
        class="my-5 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        width="72.197"
        height="55.904"
        viewBox="0 0 72.197 55.904"
        @click="$refs.inputFile.click()"
      >
        <path id="Path_45" data-name="Path 45" d="M29.117,11.04a1.63,1.63,0,0,0-1.248.789l-4.3,7.358H9.028A4.914,4.914,0,0,0,4.14,24.076V61.554a4.914,4.914,0,0,0,4.888,4.888H59.542a1.63,1.63,0,1,0,0-3.259H9.028A1.591,1.591,0,0,1,7.4,61.554V24.076a1.591,1.591,0,0,1,1.629-1.629h15.48a1.63,1.63,0,0,0,1.4-.815L30.186,14.3h19.5L53.177,21.5a1.63,1.63,0,0,0,1.477.942H70.948a1.591,1.591,0,0,1,1.629,1.629V61.554a1.591,1.591,0,0,1-1.629,1.629,1.63,1.63,0,1,0,0,3.259,4.914,4.914,0,0,0,4.888-4.889V24.076a4.914,4.914,0,0,0-4.888-4.888H55.7l-3.514-7.231a1.63,1.63,0,0,0-1.477-.917H29.27Q29.193,11.037,29.117,11.04ZM39.988,28.15A14.665,14.665,0,1,0,54.654,42.815,14.69,14.69,0,0,0,39.988,28.15Zm0,3.259A11.406,11.406,0,1,1,28.582,42.815,11.382,11.382,0,0,1,39.988,31.409Z" transform="translate(-3.89 -10.788)" fill="#4d2545" stroke="#4d2545" stroke-width="0.5"/>
      </svg>

      <div
        v-else
        class="rounded-full h-24 w-24 overflow-hidden m-6 cursor-pointer"
        @click="$refs.inputFile.click()"
      >
        <img
          :src="preview"
          alt="Cover"
          class="w-full h-full object-cover"
        >
      </div>

      <input
        ref="inputFile"
        accept=".png, .jpg, .jpeg"
        type="file"
        hidden
        @change="handleImage"
      >
    </div>

    <base-input
      v-model="form.name"
      v-validate="'required|max:255'"
      ref="inputName"
      name="name"
      class="w-full"
      :custom-classes="['border', 'border-purple']"
      placeholder="Role Name"
      :message="errors.first('role.name')"
    />

    <base-input
      v-model="form.description"
      v-validate="'required|max:255'"
      name="description"
      class="w-full h-32"
      :custom-classes="['border', 'border-purple']"
      placeholder="Description"
      type="textarea"
      :message="errors.first('role.description')"
    />

    <base-button
      class="pt-2 pb-2 w-48 mt-6"
      border-classes="rounded-full border border-purple"
      color="bg-white"
      :hover="['bg-purple', 'text-white']"
      text="text-purple"
      @click="handleDone(true)"
    >
      Add Another Role
    </base-button>

    <base-button
      class="pt-2 pb-2 w-48"
      border-classes="rounded-full"
      type="submit"
    >
      Done
    </base-button>
  </form>
  <div
    v-else
    class="modal-container flex flex-col items-center bg-white w-1/4 rounded-large left-1/2 absolute top-1/2 shadow-2xl overflow-hidden max-h-full py-5 px-10"
  >
    <svg
      class="absolute left-0 ml-5 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      width="16.16"
      height="16.165"
      viewBox="0 0 16.16 16.165"
      @click="$emit('close')"
    >
      <path id="Path_31" data-name="Path 31" d="M11.609,9.822,17.532,3.9a1.264,1.264,0,0,0-1.787-1.787L9.822,8.035,3.9,2.112A1.264,1.264,0,0,0,2.112,3.9L8.035,9.822,2.112,15.745A1.268,1.268,0,0,0,3,17.907a1.2,1.2,0,0,0,.885-.374l5.94-5.923,5.923,5.923a1.266,1.266,0,0,0,.885.374,1.2,1.2,0,0,0,.885-.374,1.263,1.263,0,0,0,0-1.787Z" transform="translate(-1.742 -1.742)" fill="#4d2545"/>
    </svg>

    <div class="rounded-full h-24 w-24 overflow-hidden m-8">
      <img
        :src="preview"
        alt="Cover"
        class="w-full h-full object-cover"
      >
    </div>

    <p class="text-purple font-medium text-2xl truncate text-left w-full">{{ data.name }}</p>
    <p class="mt-2 text-left w-full">{{ data.description }}</p>

    <base-button
      class="pt-2 pb-2 w-48 mt-6"
      border-classes="rounded-full border border-purple"
      color="bg-white"
      :hover="['bg-purple', 'text-white']"
      text="text-purple"
      @click="editMode = true"
    >
      Edit
    </base-button>

    <base-button
      class="pt-2 pb-2 w-48"
      border-classes="rounded-full"
      @click="handleDelete"
    >
      Delete
    </base-button>
  </div>
</template>

<script>
import uuid from 'uuid/v1';

export default {
  name: 'RolesModal',
  props: {
    data: Object,
  },
  data() {
    return {
      form: {},
      preview: null,
      editMode: true,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        if (value) {
          this.editMode = false;
          this.form = Object.assign({}, value);
          this.preview = URL.createObjectURL(this.form.cover);
        }
      },
    },
  },
  methods: {
    async handleDone(preventClose = false) {
      if (await this.$validator.validateAll('role')) {
        if (!this.form.cover) {
          this.$toasted.error('The photo field is required.');
          return;
        }

        if (!this.form.id) {
          this.form.id = uuid();
        }

        this.$emit('save', this.form);

        if (!preventClose) {
          this.$emit('close');
        } else {
          this.form = {};
          this.preview = null;
          this.$refs.inputFile.value = '';
          this.$refs.inputName.focus();
        }

        return true;
      }

      return false;
    },

    handleImage(e) {
      const file = e.target.files[0];

      this.form.cover = file;
      this.form.name_cover = file.name;
      this.preview = URL.createObjectURL(file);
    },

    handleDelete() {
      this.$emit('destroy', this.data);
      this.$emit('close');
    }
  },
};
</script>

<style lang="scss" scoped>
.top-1\/2 {
  top: 50%;
  transform: translateY(-50%);
}
.left-1\/2 {
  left: 50%;
  transform: translateX(-50%);
}
</style>
