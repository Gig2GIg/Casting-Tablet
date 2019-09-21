<!-- eslint-disable max-len -->
<template>
  <div class="relative">
    <svg
      v-if="type === 'location'"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute top-0 right-0 bottom-0 my-auto mr-2"
      width="21"
      height="21"
      viewBox="0 0 21.862 32.752"
    ><path
      d="M28.976,10.35a.456.456,0,1,0,.085.907A9.527,9.527,0,0,1,38.585,20.8c0,2.617-1.245,6.169-3.118,9.85a76.4,76.4,0,0,1-6.406,10.19,76.4,76.4,0,0,1-6.406-10.19c-1.873-3.681-3.118-7.234-3.118-9.85,0-4.36,2.23-8.064,6.215-9.2a.456.456,0,0,0-.241-.879C21.143,11.961,18.63,16.03,18.63,20.8c0,2.9,1.313,6.518,3.217,10.261a78.122,78.122,0,0,0,6.845,10.856.454.454,0,0,0,.737,0,78.12,78.12,0,0,0,6.845-10.856c1.9-3.744,3.217-7.363,3.217-10.261A10.448,10.448,0,0,0,29.061,10.35h-.085Zm.085,4.535a5.9,5.9,0,1,0,5.9,5.9A5.9,5.9,0,0,0,29.061,14.885Zm0,.907a4.989,4.989,0,1,1-4.989,4.989A4.982,4.982,0,0,1,29.061,15.792Z"
      transform="translate(-18.13 -9.85)"
      fill="#4d2545"
      stroke="#4d2545"
      stroke-width="1"
    /></svg>

    <input
      ref="inputTag"
      class="text-black rounded-full overflow-hidden my-2 w-full h-full py-3 px-6 placeholder-purple"
      :class="{ 'pr-8': type === 'location' }"
      :value="value"
      :type="type"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    >

    <p
      v-if="message"
      class="ml-6 mb-2"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.value;
    },
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      validator: value => [
        'text',
        'password',
        'location',
      ].indexOf(value) >= 0,
    },
    message: {
      type: String,
      default: null,
    },
  },
  mounted() {
    if (this.type === 'location') {
      /* global google */
      const input = new google.maps.places.Autocomplete(
        (this.$refs.inputTag),
        { types: ['geocode'] },
      );

      input.addListener('place_changed', () => {
        const place = input.getPlace();
        this.$emit('input', place.formatted_address);
        this.$emit('place', place);
      });
    }
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
