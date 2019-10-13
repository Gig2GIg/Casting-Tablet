<!-- eslint-disable max-len -->
<template>
  <div class="flex flex-col">
    <div
      v-if="type !== 'textarea'"
      class="relative h-12 my-2"
    >
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

      <svg
        v-else-if="type === 'date'"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute top-0 right-0 bottom-0 my-auto mr-3"
        width="21"
        height="21"
        viewBox="0 0 20 20"
      >
        <path
          fill="#4d2545"
          d="M2.131 16.795c0 .524.407.93.931.93h13.679c.524 0 .93-.406.93-.93v-7.95H2.132zM13.608 5.087c0 .313.242.555.555.555a.547.547 0 0 0 .555-.555.547.547 0 0 0-.555-.555.547.547 0 0 0-.555.555zm-8.51 0c0 .313.242.555.555.555a.547.547 0 0 0 .555-.555.547.547 0 0 0-.555-.555.547.547 0 0 0-.555.555zm6.967-2.532a.555.555 0 1 1 0 1.11H8.093a.555.555 0 0 1 0-1.11zm-8.51 0a.575.575 0 0 1 .56.555c0 .293-.267.56-.56.555h-.492a.918.918 0 0 0-.93.931v3.14h15.54v-3.14a.918.918 0 0 0-.931-.93h-.491a.575.575 0 0 1-.56-.556c0-.293.267-.559.56-.555h.49c1.122 0 2.042.92 2.042 2.041v12.199c0 1.12-.92 2.04-2.041 2.04H3.062c-1.12 0-2.04-.92-2.04-2.04V4.596c0-1.12.92-2.04 2.04-2.04zM14.161.832c.307 0 .555.249.555.555V3.52c.644.231 1.11.848 1.11 1.567 0 .913-.752 1.665-1.665 1.665a1.674 1.674 0 0 1-1.665-1.665c0-.719.467-1.336 1.11-1.567V1.387c0-.306.249-.555.555-.555zm-7.955.555V3.52c.644.231 1.11.848 1.11 1.567 0 .913-.752 1.665-1.665 1.665a1.674 1.674 0 0 1-1.665-1.665c0-.719.467-1.336 1.11-1.567V1.387a.555.555 0 0 1 1.11 0z"
        />
        <path
          fill="none"
          stroke="#4d2545"
          stroke-miterlimit="50"
          stroke-width=".25"
          d="M2.131 16.795c0 .524.407.93.931.93h13.679c.524 0 .93-.406.93-.93v-7.95H2.132zM13.608 5.087c0 .313.242.555.555.555a.547.547 0 0 0 .555-.555.547.547 0 0 0-.555-.555.547.547 0 0 0-.555.555zm-8.51 0c0 .313.242.555.555.555a.547.547 0 0 0 .555-.555.547.547 0 0 0-.555-.555.547.547 0 0 0-.555.555zm6.967-2.532a.555.555 0 1 1 0 1.11H8.093a.555.555 0 0 1 0-1.11zm-8.51 0a.575.575 0 0 1 .56.555c0 .293-.267.56-.56.555h-.492a.918.918 0 0 0-.93.931v3.14h15.54v-3.14a.918.918 0 0 0-.931-.93h-.491a.575.575 0 0 1-.56-.556c0-.293.267-.559.56-.555h.49c1.122 0 2.042.92 2.042 2.041v12.199c0 1.12-.92 2.04-2.041 2.04H3.062c-1.12 0-2.04-.92-2.04-2.04V4.596c0-1.12.92-2.04 2.04-2.04zM14.161.832c.307 0 .555.249.555.555V3.52c.644.231 1.11.848 1.11 1.567 0 .913-.752 1.665-1.665 1.665a1.674 1.674 0 0 1-1.665-1.665c0-.719.467-1.336 1.11-1.567V1.387c0-.306.249-.555.555-.555zm-7.955.555V3.52c.644.231 1.11.848 1.11 1.567 0 .913-.752 1.665-1.665 1.665a1.674 1.674 0 0 1-1.665-1.665c0-.719.467-1.336 1.11-1.567V1.387a.555.555 0 0 1 1.11 0z"
        />
      </svg>

      <svg
        v-else-if="type === 'time'"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute top-0 right-0 bottom-0 my-auto mr-3 z-50"
        width="21"
        height="21"
        viewBox="0 0 21 21"
      >
        <defs>
          <linearGradient
            id="v0rca"
            x1="10.18"
            x2="10.18"
            y1="-8.03"
            y2="30.77"
            gradientUnits="userSpaceOnUse"
          ><stop
            offset="0"
            stop-color="#4d2545"
          /><stop
            offset="1"
            stop-color="#782541"
          /></linearGradient>
        </defs>
        <path
          fill="url(#v0rca)"
          d="M12.497 1.718l-.003.01a8.805 8.805 0 0 0-2.32-.32 8.818 8.818 0 1 0 8.817 8.818c0-.45-.044-.888-.109-1.32l.017-.002a.655.655 0 0 1-.027-.166.678.678 0 0 1 1.356-.03l-.002.027c.072.488.122.983.122 1.49 0 5.62-4.555 10.175-10.174 10.175S0 15.844 0 10.226C0 4.606 4.555.052 10.174.052c.87 0 1.71.122 2.516.329a.68.68 0 0 1 .201.045.678.678 0 0 1-.394 1.292zm-.586 10.864l-2.169-1.774c-.3-.118-.585-.333-.585-.582l.005-.064a.922.922 0 0 1 .02-.273l.314-4.072a.679.679 0 0 1 1.356 0l.284 3.687 1.734 2.12a.678.678 0 1 1-.96.958z"
        />
      </svg>

      <v-date-picker
        v-if="type === 'date'"
        :value="value"
        color="indigo"
        :input-props="{
          class: `text-black rounded-full overflow-hidden w-full h-full py-3 pl-6 pr-10 placeholder-purple focus:outline-none ${ customClasses.join(' ') }`,
          placeholder: $attrs.placeholder ? $attrs.placeholder : '',
        }"
        @input="$emit('input', $event)"
      />

      <vue-timepicker
        v-else-if="type === 'time'"
        v-bind="$attrs"
        :value="value"
        class="w-full h-full"
        :input-class="`text-black rounded-full overflow-hidden w-full h-full py-3 px-6 placeholder-purple focus:outline-none ${ type === 'location' ? 'pr-8': '' } ${customClasses.join(' ')}`"
        :disabled="$attrs.readonly"
        hide-clear-button
        close-on-complete
        @change="$emit('input', $event.displayTime)"
      />

      <input
        v-else
        ref="inputTag"
        class="text-black rounded-full overflow-hidden w-full h-full py-3 px-6 placeholder-purple focus:outline-none"
        :class="[{ 'pr-8': type === 'location' }, ...customClasses]"
        :value="value"
        :type="type"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      >
    </div>

    <div
      v-else
      class="flex-1 my-2 rounded-large w-full h-full overflow-hidden"
      :class="customClasses"
    >
      <textarea
        class="text-black w-full h-full py-3 px-6 placeholder-purple focus:outline-none resize-none"
        :value="value"
        v-bind="$attrs"
        @input="$emit('input', $event.target.value)"
      />
    </div>

    <p
      v-if="message"
      class="ml-6 mb-2"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';

export default {
  inheritAttrs: false,
  components: {
    VueTimepicker,
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Date, Object],
      default: null,
    },
    type: {
      type: String,
      default: 'text',
      validator: value => [
        'text',
        'password',
        'location',
        'date',
        'number',
        'textarea',
        'time',
      ].indexOf(value) >= 0,
    },
    message: {
      type: String,
      default: null,
    },
    customClasses: {
      type: Array,
      default: () => [],
    },
    time: {
      type: Boolean,
      default: false,
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
  methods: {
    focus() {
      this.$refs.inputTag.focus();
    },
  },
};
</script>

<style>
.vue__time-picker .dropdown ul li:not([disabled]).active, .vue__time-picker .dropdown ul li:not([disabled]).active:focus, .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
  background-color: #4D2545;
}
</style>

<style scoped>
.top-1\/2 {
  top: 50%;
  transform: translateY(-50%);
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
