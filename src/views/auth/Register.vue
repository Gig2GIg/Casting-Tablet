<template>
  <div>
    <p class="text-2xl">
      Create Your Account
    </p>

    <form
      class="w-full max-w-xs mt-16"
      @submit.prevent="step === 3 ? handleRegister() : nextStep()"
    >
      <template v-if="step === 1">
        <base-input
          v-model="form.name"
          v-validate="'required|max:255'"
          name="name"
          placeholder="Name"
          :message="errors.first('name')"
        />

        <base-input
          v-model="form.email"
          v-validate="'required|email'"
          name="email"
          placeholder="Email"
          :message="errors.first('email')"
        />

        <base-input
          ref="password"
          v-model="form.password"
          v-validate="'required|min:8'"
          name="password"
          type="password"
          placeholder="Password"
          :message="errors.first('password')"
        />

        <base-input
          v-model="form.password_confirmation"
          v-validate="'required|confirmed:password'"
          name="password_confirmation"
          type="password"
          placeholder="Re-enter Password"
          :message="errors.first('password_confirmation')"
          data-vv-as="password"
        />
      </template>

      <template v-else-if="step === 2">
        <base-input
          key="address-input"
          v-model="form.address"
          v-validate="'required|max:255'"
          name="address"
          placeholder="Address"
          :message="errors.first('address')"
        />

        <base-input
          key="city-input"
          v-model="form.city"
          v-validate="'required|max:255'"
          name="city"
          placeholder="City"
          :message="errors.first('city')"
        />

        <div class="flex items-start w-full">
          <base-select
            key="state-input"
            v-model="form.state"
            v-validate="'required'"
            name="state"
            class="w-2/5"
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
          <base-input
            key="zip-input"
            v-model="form.zip"
            v-validate="'required|integer|max:5'"
            v-mask="'#####'"
            name="zip"
            class="w-3/5 ml-4"
            placeholder="Zip"
            :message="errors.first('zip')"
          />
        </div>

        <base-input
          key="birth-input"
          v-model="form.birth"
          v-validate="'required'"
          name="birth"
          type="date"
          placeholder="Birth Date"
          :message="errors.first('birth')"
          data-vv-as="birth date"
        />
      </template>

      <template v-else>
        <div
          v-if="!preview"
          class="flex items-center rounded-full bg-white h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        >
          <img
            src="/images/icons/upload.png"
            alt="Upload"
            class="h-16 mx-auto ml-8 -mt-2"
          >
        </div>

        <img
          v-else
          :src="preview"
          alt="Image"
          class="rounded-full h-32 w-32 mx-auto mb-6 cursor-pointer"
          @click="$refs.inputFile.click()"
        >

        <input
          ref="inputFile"
          accept=".png, .jpg, .jpeg"
          type="file"
          hidden
          @change="handleImage"
        >

        <base-input
          v-model="form.agency_name"
          v-validate="'required|max:255'"
          name="agency_name"
          placeholder="Agency Name"
          :message="errors.first('agency_name')"
          data-vv-as="agency name"
        />

        <base-input
          v-model="form.profesion"
          v-validate="'required|max:255'"
          name="profesion"
          placeholder="Job Title"
          :message="errors.first('profesion')"
          data-vv-as="job title"
        />
        <base-select
            key="gender-input"
            v-model="form.gender"
            v-validate="'required'"
            name="gender"
            class="w-full"
            placeholder="Gender"
            :message="errors.first('gender')"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </base-select>
      </template>

      <base-button
        class="mt-16"
        type="submit"
        expanded
      >
        Next
      </base-button>
    </form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import states from '@/utils/states';

export default {
  data() {
    return {
      form: {},
      step: 1,
      isLoading: false,
      preview: null,
      states,
    };
  },
  methods: {
    async nextStep() {
      if (await this.$validator.validateAll()) {
        this.step += 1;
      }
    },

    handlePlace(place) {
      this.form.location = `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`;
    },

    handleImage(e) {
      const file = e.target.files[0];

      this.form.image = file;
      this.preview = URL.createObjectURL(file);
    },

    async handleRegister() {
      try {
        if (this.isLoading || !await this.$validator.validateAll()) {
          return;
        }

        // Validate image
        if (!this.form.image) {
          this.$toasted.error('The image field is required.');
          return;
        }

        // Validate location
        // if (!this.form.location) {
        //   this.$toasted.error('The location selected is invalid.');
        //   return;
        // }

        this.isLoading = true;

        await AuthService.register(this.form);

        this.$toasted.show('Account created successfully.');
        this.$router.push({ name: 'login' });        
      } catch (e) {
        this.$toasted.error(e.response.data.message);
        this.$setErrorsFromLaravel(e.response.data);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
