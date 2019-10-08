<template>
  <div class="modal-container flex flex-col items-center bg-white w-2/6 rounded-large left-1/2 absolute top-1/2 shadow-2xl overflow-hidden max-h-full p-4">
    <div class="flex flex-col">
      <p class="text-lg text-purple">Upload Photo</p>
    </div>

    <base-input
      class="w-full"
      :custom-classes="['border', 'border-purple']"
      placeholder="Role Name"
    />

    <base-input
      class="w-full h-32"
      :custom-classes="['border', 'border-purple']"
      placeholder="Description"
      type="textarea"
    />

    <base-button
      class="pt-2 pb-2 w-48 mt-6"
      border-classes="rounded-full border border-purple"
      color="bg-white"
      :hover="['bg-purple', 'text-white']"
      text="text-purple"
    >
      Add Another Role
    </base-button>

    <base-button
      class="pt-2 pb-2 w-48"
      border-classes="rounded-full"
    >
      Done
    </base-button>
  </div>
</template>

<script>
export default {
  name: 'RolesModal',
  props: {
    data: Object,
  },
  data() {
    return {
      form: {},
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.form = Object.assign({}, value);
      },
    },
  },
  methods: {

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
